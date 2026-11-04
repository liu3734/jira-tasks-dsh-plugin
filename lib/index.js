/**
 * dsh-jira-tasks — HOST half (persistent profile plugin).
 * Serves POST /jira/api/search: reads the JIRA base URL from this entry's own
 * Config (the `jira-tasks` profile entry, editable on the Plugins settings
 * page) and the token from the credentials service — the settings-page
 * JIRA_TASKS_TOKEN first, so it overrides an exported JIRA_API_TOKEN /
 * JIRA_TOKEN — then queries JIRA /rest/api/2/search through subprocess+curl
 * (auth header via stdin --config -), returning normalized issue JSON.
 *
 * Also serves the sidebar statistics page: POST /jira/api/stats pages through a
 * project's issues, aggregating a status-category summary and merging the
 * project version API into a version-statistics list; POST /jira/api/version-issues
 * returns one version's issue rows (plus the current user, so the client can put
 * that user's issues first). The picker itself is client-side: its options are
 * the project keys already configured in this browser, not the whole JIRA
 * project list.
 */
import z from '@deepseek-ai/schemastery';

/** Settings namespace exposing the editable connection fields in the GUI. */
const SETTINGS_NS = 'jira-tasks';

/**
 * Diagnostics name for this plugin instance. Deliberately the same string as
 * {@link SETTINGS_NS} (= the profile entry id, `jira-tasks`): that id — not this
 * name and not the package name `dsh-jira-tasks` — is the settings namespace the
 * client card edits, so deriving one from the other removes a whole class of
 * confusion when reading loader logs.
 */
const name = SETTINGS_NS;

/**
 * Token references in precedence order. `JIRA_TASKS_TOKEN` is the plugin-owned
 * ref the settings card writes to: unlike `JIRA_API_TOKEN`, the credentials
 * provider can always store it, because the launching environment does not
 * supply it. Listing it first is what makes a saved token override an exported
 * `JIRA_API_TOKEN` / `JIRA_TOKEN`.
 */
const TOKEN_REFS = ['JIRA_TASKS_TOKEN', 'JIRA_API_TOKEN', 'JIRA_TOKEN'];

/**
 * 统计页单次取数的任务上限。统计在前端渲染前由 Host 聚合，因此必须分页扫描
 * 项目的全部任务；用上限兜住超大项目（几万条）的请求时间，超过时结果标记
 * `truncated`，客户端会明确提示“仅统计前 N 条”。
 */
const STATS_MAX_ISSUES = 20000;

/**
 * 统计分页的每页条数。JIRA Server 的 search 接口接受 1000；若实例把上限压得
 * 更小，实际返回条目数会变少，循环按实际条目数推进，不会漏数。
 */
const STATS_PAGE_SIZE = 1000;

/** 统计只取聚合需要的字段（状态分类 + 版本）；不再拉类型/优先级/负责人。 */
const STATS_FIELDS = 'status,fixVersions';

/** 「版本任务列表」需要的字段（列表展示 + 客户端点表头排序）。 */
const VERSION_ISSUE_FIELDS = 'summary,status,priority,issuetype,assignee,updated';

/** 版本任务列表单页条数与总量上限（版本通常只有几十~几百条）。 */
const VERSION_ISSUE_PAGE_SIZE = 1000;
const VERSION_ISSUE_MAX = 5000;

/** 版本任务列表的整体时间预算（若实例把每页压到 100 条，避免串行拖太久）。 */
const VERSION_ISSUE_DEADLINE_MS = 60000;

/**
 * 统计整体时间预算。分页走 curl，每页有 30s 超时；如果没有整体上限，极大项目会
 * 让请求拖到几分钟。预算在每页请求前检查，超过就停止翻页，用已取到的任务出结果
 * 并标记 truncated（最坏情况还会再等当前这一页最多 30s）。
 */
const STATS_DEADLINE_MS = 120000;

/**
 * Durable connection schema. Since DSH 0.1.5 the settings service no longer
 * takes a `register(ns, schema)` call: a plugin's OWN Config IS the form its
 * settings page is built from, keyed by the profile entry id (`jira-tasks`).
 * `baseUrl` is volatile, so a saved change reaches the running plugin without
 * remounting it. The token is deliberately NOT here — it stays in the
 * credentials store (write-only from the client), so no secret ever lands in
 * the profile configuration document.
 */
const Config = z.object({
  baseUrl: z.string().default('').volatile().description('JIRA 地址，例如 http://jira.example.com/')
});

const inject = ['subprocess', 'credentials', 'sandboxPolicy', 'webServer'];

/**
 * Answer a non-POST request with 405. `webServer.register` dispatches on the
 * pathname only, so without this guard a stray GET would run a real JIRA
 * query. Returns true when the caller may handle the request.
 * @param req - the HTTP request.
 * @param res - the response the guard writes to on refusal.
 * @returns true for POST, false after answering 405.
 */
function methodIsPost(req, res) {
  if (req.method === 'POST') return true;
  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', Allow: 'POST' });
  res.end('method not allowed');
  return false;
}

/**
 * Mount the host half: the /jira/api/* routes and the settings-page policy.
 * @param ctx - plugin context.
 * @param config - this entry's live Config (profile entry `jira-tasks`).
 */
function apply(ctx, config) {
    const sendJson = (res, obj) => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(obj));
    };
    const readBody = (req) => new Promise((resolve) => {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => {
        try {
          const text = Buffer.concat(chunks).toString('utf-8') || '{}';
          resolve(JSON.parse(text));
        } catch (e) { resolve({}); }
      });
      req.on('error', () => resolve({}));
    });

    const subprocess = ctx.get('subprocess');
    const credentials = ctx.get('credentials');
    const sandboxPolicy = ctx.get('sandboxPolicy');
    const webServer = ctx.get('webServer');
    const workspaceRoot = sandboxPolicy && sandboxPolicy.workspaceRoot ? sandboxPolicy.workspaceRoot : '/tmp';

    async function resolveFirst(names) {
      for (const name of names) {
        try {
          const cred = await credentials.resolve(name);
          if (cred && typeof cred.value === 'string' && cred.value.length > 0) return cred.value;
        } catch (e) { /* try next */ }
      }
      return undefined;
    }

    // DSH 0.1.5+ ：设置页的表单直接来自本条目自己的 Config，settings 服务不再有
    // register(ns, schema)。这里把本实例的“自动生成页”关掉，改由客户端注册的
    // 自定义卡片（地址 + 令牌 + 连通性测试）接管。
    // 两个易错点：1) configure 的第二个参数必须是**本插件实例**的 fiber——默认值是
    // settings 服务自己的 fiber，而 describe() 是按 entry.fiber 查策略的，传错不生效；
    // 2) 返回值是注销函数，必须交回 effect，否则卸载后策略会一直挂在死 fiber 上。
    ctx.inject(['settings'], (settingsCtx) => {
      settingsCtx.effect(() => {
        try {
          return settingsCtx.settings.configure({ auto: false }, ctx.fiber);
        } catch (e) {
          // 同一实例重复配置等情况下不阻断插件加载，但要留下可诊断的日志。
          if (ctx.logger && typeof ctx.logger.warn === 'function') {
            ctx.logger.warn('jira-tasks: settings page policy not applied: %s', (e && e.message) || e);
          }
          return undefined;
        }
      }, 'jira-tasks: settings page policy');
    });

    /** 本条目 Config 里的 JIRA 地址（volatile 引用），未配置时返回 ''。 */
    function settingsBaseUrl() {
      try {
        const ref = config && config.baseUrl;
        const value = ref && typeof ref.get === 'function' ? ref.get() : ref;
        return typeof value === 'string' ? value.trim() : '';
      } catch (e) {
        return '';
      }
    }

    function buildAuthHeader(token) {
      if (token.indexOf(':') !== -1) return 'Basic ' + Buffer.from(token, 'utf-8').toString('base64');
      return 'Bearer ' + token;
    }

    /** 把值安全地放进 JQL 双引号里（转义反斜杠与引号）。 */
    function escapeJqlValue(value) {
      return String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }

    function buildJql(template, projectKey) {
      const t = (template || '').trim();
      if (!t) return 'project = "' + projectKey + '" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC';
      return t.replace(/\{projectKey\}/g, projectKey).replace(/\{key\}/g, projectKey);
    }

    async function queryJira(baseUrl, token, jql) {
      const auth = buildAuthHeader(token);
      const cleanBase = baseUrl.replace(/\/+$/, '');
      let curl;
      try {
        curl = await subprocess.resolveExecutable('curl');
      } catch (e) {
        curl = '/usr/bin/curl';
      }
      const handle = subprocess.spawn({
        argv: [
          curl, '-sS', '--fail-with-body', '--max-time', '20', '-G',
          cleanBase + '/rest/api/2/search',
          '--data-urlencode', 'jql=' + jql,
          '--data-urlencode', 'maxResults=50',
          '--data-urlencode', 'fields=summary,status,priority,issuetype,statuscategorykey',
          '-H', 'Accept: application/json',
          '--config', '-'
        ],
        cwd: workspaceRoot,
        stdio: {
          stdin: { data: 'header = "Authorization: ' + auth + '"\n' },
          stdout: { maxBytes: 4 * 1024 * 1024, spill: { maxBytes: 64 * 1024 * 1024 } },
          stderr: { maxBytes: 1024 * 1024, spill: { maxBytes: 16 * 1024 * 1024 } }
        },
        graceMs: 5000
      });
      const outcome = await handle.done;
      const stdout = (handle.collected.stdout ? handle.collected.stdout.readFrom(0).text : '') || '';
      const stderr = (handle.collected.stderr ? handle.collected.stderr.readFrom(0).text : '') || '';
      return { exitCode: outcome.exitCode, stdout, stderr };
    }

    /**
     * 通用 JSON GET：路径和查询参数由调用方给出，供项目版本列表和统计页的分页
     * 检索复用。认证头同样经 stdin（curl --config -）传入，不出现在命令行。
     * @returns {Promise<{exitCode: number, stdout: string, stderr: string}>}
     */
    async function curlJson(baseUrl, token, path, query, options) {
      const auth = buildAuthHeader(token);
      const cleanBase = baseUrl.replace(/\/+$/, '');
      const timeout = (options && options.timeout) || 30;
      let curl;
      try {
        curl = await subprocess.resolveExecutable('curl');
      } catch (e) {
        curl = '/usr/bin/curl';
      }
      const argv = [curl, '-sS', '--fail-with-body', '--max-time', String(timeout)];
      if (query) argv.push('-G');
      argv.push(cleanBase + path);
      if (query) {
        for (const key of Object.keys(query)) argv.push('--data-urlencode', key + '=' + String(query[key]));
      }
      argv.push('-H', 'Accept: application/json', '--config', '-');
      const handle = subprocess.spawn({
        argv,
        cwd: workspaceRoot,
        stdio: {
          stdin: { data: 'header = "Authorization: ' + auth + '"\n' },
          stdout: { maxBytes: 8 * 1024 * 1024, spill: { maxBytes: 64 * 1024 * 1024 } },
          stderr: { maxBytes: 1024 * 1024, spill: { maxBytes: 16 * 1024 * 1024 } }
        },
        graceMs: 5000
      });
      const outcome = await handle.done;
      const stdout = (handle.collected.stdout ? handle.collected.stdout.readFrom(0).text : '') || '';
      const stderr = (handle.collected.stderr ? handle.collected.stderr.readFrom(0).text : '') || '';
      return { exitCode: outcome.exitCode, stdout, stderr };
    }

    /** 解析连接配置：设置页保存的地址优先，其次凭据存储 / 环境变量。 */
    async function resolveConnection() {
      const baseUrl = settingsBaseUrl() || await resolveFirst(['JIRA_BASE_URL', 'JIRA_URL']);
      const token = await resolveFirst(TOKEN_REFS);
      return { baseUrl, token };
    }

    function emptyVersionBucket() {
      return { total: 0, done: 0, inProgress: 0, todo: 0 };
    }

    /**
     * 「版本统计」行的分组顺序：未发布(0) → 已发布(1) → 已归档(2) → 只在任务里出现的版本(3)。
     * 客户端表格默认把已归档组折叠，所以实际展示是 未发布 → 已发布 → 仅任务 →（展开后）归档。
     * 同一组内按发布日期（新的在前，无日期在后），extra 组再按任务数倒序。
     */
    function compareVersionRows(a, b) {
      const groupOf = (row) => (row.extra ? 3 : (row.archived ? 2 : (row.released ? 1 : 0)));
      const groupA = groupOf(a);
      const groupB = groupOf(b);
      if (groupA !== groupB) return groupA - groupB;
      if (a.releaseDate !== b.releaseDate) {
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;
        return a.releaseDate < b.releaseDate ? 1 : -1;
      }
      if (groupA === 3 && a.total !== b.total) return b.total - a.total;
      return a.name.localeCompare(b.name);
    }

    // 从 JIRA 错误响应体/curl stderr 中提取可读信息。
    function errorTextFrom(body, stderr, fallback) {
      let message = (stderr || '').trim() || fallback;
      try {
        const parsed = JSON.parse(body);
        if (parsed.errorMessages && parsed.errorMessages.length) message = parsed.errorMessages.join('；');
        else if (parsed.message) message = parsed.message;
      } catch (e) { /* body 非 JSON */ }
      return message;
    }

    // 连通性/鉴权探测：GET /rest/api/2/myself，stdout 末尾追加 HTTP 状态码。
    async function probeJira(baseUrl, token) {
      const auth = buildAuthHeader(token);
      const cleanBase = baseUrl.replace(/\/+$/, '');
      let curl;
      try {
        curl = await subprocess.resolveExecutable('curl');
      } catch (e) {
        curl = '/usr/bin/curl';
      }
      const handle = subprocess.spawn({
        argv: [
          curl, '-sS', '--max-time', '15',
          '-H', 'Accept: application/json',
          '--config', '-',
          '-w', '\n%{http_code}',
          cleanBase + '/rest/api/2/myself'
        ],
        cwd: workspaceRoot,
        stdio: {
          stdin: { data: 'header = "Authorization: ' + auth + '"\n' },
          stdout: { maxBytes: 1024 * 1024, spill: { maxBytes: 4 * 1024 * 1024 } },
          stderr: { maxBytes: 256 * 1024, spill: { maxBytes: 1024 * 1024 } }
        },
        graceMs: 5000
      });
      const outcome = await handle.done;
      const stdout = (handle.collected.stdout ? handle.collected.stdout.readFrom(0).text : '') || '';
      const stderr = (handle.collected.stderr ? handle.collected.stderr.readFrom(0).text : '') || '';
      return { exitCode: outcome.exitCode, stdout, stderr };
    }

    async function handleSearch(args) {
      const projectKey = String((args && args.projectKey) || '').trim();
      if (!projectKey) return { ok: false, error: '未设置项目 Key' };
      try {
        const baseUrl = settingsBaseUrl() || await resolveFirst(['JIRA_BASE_URL', 'JIRA_URL']);
        if (!baseUrl) return { ok: false, error: '未配置 JIRA 地址（设置 → JIRA 配置，或环境变量 JIRA_BASE_URL）' };
        const token = await resolveFirst(TOKEN_REFS);
        if (!token) return { ok: false, error: '未配置 JIRA 令牌（设置 → JIRA 配置，或环境变量 JIRA_API_TOKEN）' };

        const jql = buildJql(args && args.jql ? String(args.jql) : '', projectKey);
        const raw = await queryJira(baseUrl, token, jql);
        const stdout = raw.stdout;
        const stderr = raw.stderr;

        if (raw.exitCode !== 0) {
          return { ok: false, error: errorTextFrom(stdout, stderr, 'curl 退出码 ' + String(raw.exitCode)) };
        }

        let data;
        try {
          data = JSON.parse(stdout);
        } catch (e) {
          return { ok: false, error: '无法解析 JIRA 响应：' + (stderr.trim() || '空响应') };
        }

        const issues = (data.issues || []).map((issue) => ({
          key: issue.key || '',
          summary: (issue.fields && issue.fields.summary) || '',
          status: (issue.fields && issue.fields.status && issue.fields.status.name) || '',
          statusCategory: (issue.fields && issue.fields.statuscategorykey) || '',
          priority: (issue.fields && issue.fields.priority && issue.fields.priority.name) || '',
          issueType: (issue.fields && issue.fields.issuetype && issue.fields.issuetype.name) || ''
        }));

        return {
          ok: true,
          baseUrl: baseUrl.replace(/\/+$/, ''),
          projectKey,
          total: typeof data.total === 'number' ? data.total : issues.length,
          issues
        };
      } catch (err) {
        return { ok: false, error: String((err && err.message) || err) };
      }
    }

    // 设置卡片“测试连接”：用草稿值（未保存也可测）或已保存/环境配置探测 JIRA。
    async function handleTest(args) {
      try {
        const draftBase = args && typeof args.baseUrl === 'string' ? args.baseUrl.trim() : '';
        const draftToken = args && typeof args.token === 'string' ? args.token.trim() : '';
        const baseUrl = draftBase || settingsBaseUrl() || await resolveFirst(['JIRA_BASE_URL', 'JIRA_URL']);
        if (!baseUrl) return { ok: false, code: 'unconfigured', error: '未配置 JIRA 地址' };
        const token = draftToken || await resolveFirst(TOKEN_REFS);
        if (!token) return { ok: false, code: 'unconfigured', error: '未配置 JIRA 令牌' };

        const raw = await probeJira(baseUrl, token);
        if (raw.exitCode !== 0) {
          return { ok: false, code: 'network', error: (raw.stderr || '').trim() || ('curl 退出码 ' + String(raw.exitCode)) };
        }
        const nl = raw.stdout.lastIndexOf('\n');
        const body = nl === -1 ? raw.stdout : raw.stdout.slice(0, nl);
        const httpCode = Number((nl === -1 ? '' : raw.stdout.slice(nl + 1)).trim()) || 0;

        if (httpCode >= 200 && httpCode < 300) {
          let data = {};
          try { data = JSON.parse(body); } catch (e) { /* 空/非 JSON 也视为连通 */ }
          return {
            ok: true,
            baseUrl: baseUrl.replace(/\/+$/, ''),
            user: data.displayName || data.name || data.key || ''
          };
        }
        return {
          ok: false,
          code: httpCode === 401 || httpCode === 403 ? 'auth' : 'http',
          error: errorTextFrom(body, raw.stderr, 'HTTP ' + String(httpCode))
        };
      } catch (err) {
        return { ok: false, code: 'error', error: String((err && err.message) || err) };
      }
    }

    /**
     * 统计页数据（项目 Key 由客户端输入/下拉提供）：按 STATS_PAGE_SIZE 分页扫描
     * 项目任务（最多 STATS_MAX_ISSUES 条），在 Host 侧聚合概览计数与版本统计，
     * 并合并 GET /rest/api/2/project/{key}/versions 的发布状态、发布日期。
     * 客户端只渲染，不重复计算。
     */
    async function handleStats(args) {
      const projectKey = String((args && args.projectKey) || '').trim();
      if (!projectKey) return { ok: false, error: '未设置项目编号' };
      try {
        const { baseUrl, token } = await resolveConnection();
        if (!baseUrl) return { ok: false, error: '未配置 JIRA 地址（设置 → JIRA 配置，或环境变量 JIRA_BASE_URL）' };
        if (!token) return { ok: false, error: '未配置 JIRA 令牌（设置 → JIRA 配置，或环境变量 JIRA_API_TOKEN）' };

        // ORDER BY created 让分页在扫描期间保持稳定顺序（不加排序时，扫描途中的
        // 新增/改动可能造成索引漂移，出现少量重复或漏计）。
        const jql = 'project = "' + escapeJqlValue(projectKey) + '" ORDER BY created ASC';
        const versionMap = new Map();
        const summary = { total: 0, done: 0, inProgress: 0, todo: 0 };
        let noVersionCount = 0;

        /** 取一页任务（只带聚合需要的字段）；失败时返回 { error }。 */
        async function fetchPage(pageStartAt) {
          const raw = await curlJson(baseUrl, token, '/rest/api/2/search', {
            jql,
            fields: STATS_FIELDS,
            startAt: pageStartAt,
            maxResults: STATS_PAGE_SIZE
          });
          if (raw.exitCode !== 0) {
            return { error: errorTextFrom(raw.stdout, raw.stderr, 'curl 退出码 ' + String(raw.exitCode)) };
          }
          let data;
          try {
            data = JSON.parse(raw.stdout);
          } catch (e) {
            return { error: '无法解析 JIRA 响应：' + (raw.stderr.trim() || '空响应') };
          }
          return {
            total: typeof data.total === 'number' ? data.total : 0,
            issues: Array.isArray(data.issues) ? data.issues : []
          };
        }

        /** 把一页任务并入概览计数与版本聚合。 */
        function absorb(page) {
          for (const issue of page) {
            const fields = (issue && issue.fields) || {};
            const status = fields.status || {};
            const category = (status.statusCategory && status.statusCategory.key) || '';
            const bucket = category === 'done' ? 'done' : (category === 'indeterminate' ? 'inProgress' : 'todo');
            summary.total += 1;
            summary[bucket] += 1;

            const fixVersions = Array.isArray(fields.fixVersions) ? fields.fixVersions : [];
            if (fixVersions.length === 0) {
              noVersionCount += 1;
            } else {
              for (const version of fixVersions) {
                const versionName = String((version && version.name) || '').trim();
                if (!versionName) continue;
                const entry = versionMap.get(versionName) || emptyVersionBucket();
                entry.total += 1;
                entry[bucket] += 1;
                versionMap.set(versionName, entry);
              }
            }
          }
        }

        // 逐页扫描：JIRA 会对同一用户的 search 请求串行处理，并发分页并不会更快
        // （实测 4 路并发反而更慢），因此保持顺序分页，按响应实际条数推进。
        // 超过 STATS_MAX_ISSUES 时截断并标记 truncated，客户端会提示“仅统计前 N 条”。
        const startedAt = Date.now();
        let fetched = 0;
        let startAt = 0;
        let total = 0;
        let page = [];
        while (true) {
          if (fetched > 0 && Date.now() - startedAt > STATS_DEADLINE_MS) break;
          const result = await fetchPage(startAt);
          if (result.error) return { ok: false, error: result.error };
          total = result.total;
          page = result.issues;
          absorb(page);
          fetched += page.length;
          startAt += page.length;
          if (page.length === 0 || fetched >= total || fetched >= STATS_MAX_ISSUES) break;
        }
        const truncated = fetched < total;

        // 项目版本接口提供发布状态/发布日期；接口不可用时退化为「任务里出现的版本」。
        let apiVersions = [];
        try {
          const versionsRaw = await curlJson(baseUrl, token, '/rest/api/2/project/' + encodeURIComponent(projectKey) + '/versions', null, { timeout: 20 });
          if (versionsRaw.exitCode === 0) {
            const parsed = JSON.parse(versionsRaw.stdout);
            if (Array.isArray(parsed)) apiVersions = parsed;
          }
        } catch (e) { /* 版本接口失败不影响任务统计 */ }

        const versionRows = [];
        const seenVersions = new Set();
        for (const version of apiVersions) {
          const versionName = String((version && version.name) || '').trim();
          if (!versionName || seenVersions.has(versionName)) continue;
          seenVersions.add(versionName);
          const bucket = versionMap.get(versionName) || emptyVersionBucket();
          versionRows.push({
            name: versionName,
            id: version && version.id ? String(version.id) : '',
            released: !!(version && version.released),
            archived: !!(version && version.archived),
            releaseDate: version && typeof version.releaseDate === 'string' ? version.releaseDate : '',
            total: bucket.total,
            done: bucket.done,
            inProgress: bucket.inProgress,
            todo: bucket.todo,
            extra: false
          });
        }
        for (const [versionName, bucket] of versionMap) {
          if (seenVersions.has(versionName)) continue;
          versionRows.push({
            name: versionName,
            id: '',
            released: false,
            archived: false,
            releaseDate: '',
            total: bucket.total,
            done: bucket.done,
            inProgress: bucket.inProgress,
            todo: bucket.todo,
            extra: true
          });
        }
        versionRows.sort(compareVersionRows);

        return {
          ok: true,
          baseUrl: baseUrl.replace(/\/+$/, ''),
          projectKey,
          fetchedAt: new Date().toISOString(),
          total,
          fetched,
          truncated,
          summary,
          versions: versionRows,
          noVersionCount,
          versionTotal: versionRows.length
        };
      } catch (err) {
        return { ok: false, error: String((err && err.message) || err) };
      }
    }

    /** 版本任务列表的一行：只返回列表展示与排序需要的字段。 */
    function mapVersionIssue(issue) {
      const fields = (issue && issue.fields) || {};
      const status = fields.status || {};
      const assignee = fields.assignee || null;
      return {
        key: (issue && issue.key) || '',
        summary: fields.summary || '',
        status: status.name || '',
        statusCategory: (status.statusCategory && status.statusCategory.key) || '',
        priority: (fields.priority && fields.priority.name) || '',
        issueType: (fields.issuetype && fields.issuetype.name) || '',
        assignee: assignee ? String(assignee.displayName || assignee.name || '') : '',
        assigneeKey: assignee ? String(assignee.name || assignee.key || assignee.accountId || '') : '',
        updated: typeof fields.updated === 'string' ? fields.updated : ''
      };
    }

    /**
     * 版本任务列表：`project = KEY AND fixVersion = NAME`，返回任务行与「当前用户」
     * （客户端用它把本人的任务默认排在最前面）。最多扫描 VERSION_ISSUE_MAX 条。
     */
    async function handleVersionIssues(args) {
      const projectKey = String((args && args.projectKey) || '').trim();
      const versionName = String((args && args.versionName) || '').trim();
      if (!projectKey) return { ok: false, error: '未设置项目编号' };
      if (!versionName) return { ok: false, error: '未指定版本' };
      try {
        const { baseUrl, token } = await resolveConnection();
        if (!baseUrl) return { ok: false, error: '未配置 JIRA 地址（设置 → JIRA 配置，或环境变量 JIRA_BASE_URL）' };
        if (!token) return { ok: false, error: '未配置 JIRA 令牌（设置 → JIRA 配置，或环境变量 JIRA_API_TOKEN）' };

        const jql = 'project = "' + escapeJqlValue(projectKey) + '" AND fixVersion = "' + escapeJqlValue(versionName) + '" ORDER BY updated DESC';

        /** 取一页版本任务；失败时返回 { error }。 */
        async function fetchPage(startAt) {
          const raw = await curlJson(baseUrl, token, '/rest/api/2/search', {
            jql,
            fields: VERSION_ISSUE_FIELDS,
            startAt,
            maxResults: VERSION_ISSUE_PAGE_SIZE
          });
          if (raw.exitCode !== 0) {
            return { error: errorTextFrom(raw.stdout, raw.stderr, 'curl 退出码 ' + String(raw.exitCode)) };
          }
          let data;
          try {
            data = JSON.parse(raw.stdout);
          } catch (e) {
            return { error: '无法解析 JIRA 响应：' + (raw.stderr.trim() || '空响应') };
          }
          return {
            total: typeof data.total === 'number' ? data.total : 0,
            issues: Array.isArray(data.issues) ? data.issues : []
          };
        }

        // 首页与 /myself 并行：myself 只用于让客户端把「本人」排前面，失败不阻断列表。
        const [firstPage, myselfRaw] = await Promise.all([
          fetchPage(0),
          curlJson(baseUrl, token, '/rest/api/2/myself', null, { timeout: 15 })
        ]);
        if (firstPage.error) return { ok: false, error: firstPage.error };

        let me = { name: '', displayName: '' };
        if (myselfRaw.exitCode === 0) {
          try {
            const data = JSON.parse(myselfRaw.stdout);
            me = { name: String(data.name || ''), displayName: String(data.displayName || '') };
          } catch (e) { /* 忽略：没有本人信息时客户端按更新时间排序 */ }
        }

        const limit = Math.min(firstPage.total, VERSION_ISSUE_MAX);
        const collected = firstPage.issues.slice(0, VERSION_ISSUE_MAX);
        let startAt = firstPage.issues.length;
        let page = firstPage.issues;
        const startedAt = Date.now();
        while (collected.length < limit && page.length > 0) {
          if (Date.now() - startedAt > VERSION_ISSUE_DEADLINE_MS) break;
          const next = await fetchPage(startAt);
          if (next.error) return { ok: false, error: next.error };
          if (next.issues.length === 0) break;
          collected.push.apply(collected, next.issues);
          startAt += next.issues.length;
          page = next.issues;
        }
        const issues = collected.slice(0, VERSION_ISSUE_MAX);

        return {
          ok: true,
          baseUrl: baseUrl.replace(/\/+$/, ''),
          projectKey,
          versionName,
          total: firstPage.total,
          fetched: issues.length,
          truncated: issues.length < firstPage.total,
          me,
          issues: issues.map(mapVersionIssue)
        };
      } catch (err) {
        return { ok: false, error: String((err && err.message) || err) };
      }
    }

    if (webServer && typeof webServer.register === 'function') {
      // 每条路由都必须挂在自己的 effect 上：register 返回注销函数，卸载/重载时先释放，
      // 否则重挂载会因为“同一 (kind, path) 只允许一条路由”直接抛错，整个插件激活失败。
      ctx.effect(() => webServer.register({
        kind: 'exact',
        path: '/jira/api/search',
        handler: async (req, res) => {
          if (!methodIsPost(req, res)) return;
          try {
            sendJson(res, await handleSearch(await readBody(req)));
          } catch (e) {
            sendJson(res, { ok: false, error: String((e && e.message) || e) });
          }
        }
      }), 'jira-tasks: /jira/api/search');
      ctx.effect(() => webServer.register({
        kind: 'exact',
        path: '/jira/api/test',
        handler: async (req, res) => {
          if (!methodIsPost(req, res)) return;
          try {
            sendJson(res, await handleTest(await readBody(req)));
          } catch (e) {
            sendJson(res, { ok: false, code: 'error', error: String((e && e.message) || e) });
          }
        }
      }), 'jira-tasks: /jira/api/test');
      // 任务统计页（左侧栏入口）：返回聚合结果与版本统计列表。
      ctx.effect(() => webServer.register({
        kind: 'exact',
        path: '/jira/api/stats',
        handler: async (req, res) => {
          if (!methodIsPost(req, res)) return;
          try {
            sendJson(res, await handleStats(await readBody(req)));
          } catch (e) {
            sendJson(res, { ok: false, error: String((e && e.message) || e) });
          }
        }
      }), 'jira-tasks: /jira/api/stats');
      // 版本任务列表（点版本名后加载）：project + fixVersion 的任务行，含本人信息。
      ctx.effect(() => webServer.register({
        kind: 'exact',
        path: '/jira/api/version-issues',
        handler: async (req, res) => {
          if (!methodIsPost(req, res)) return;
          try {
            sendJson(res, await handleVersionIssues(await readBody(req)));
          } catch (e) {
            sendJson(res, { ok: false, error: String((e && e.message) || e) });
          }
        }
      }), 'jira-tasks: /jira/api/version-issues');
    }
}

export { Config, apply, inject, name };
