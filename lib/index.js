/**
 * dsh-jira-tasks — HOST half (persistent profile plugin).
 * Serves POST /jira/api/search: reads the JIRA base URL from this entry's own
 * Config (the `jira-tasks` profile entry, editable on the Plugins settings
 * page) and the token from the credentials service — the settings-page
 * JIRA_TASKS_TOKEN first, so it overrides an exported JIRA_API_TOKEN /
 * JIRA_TOKEN — then queries JIRA /rest/api/2/search through subprocess+curl
 * (auth header via stdin --config -), returning normalized issue JSON.
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
        if (!baseUrl) return { ok: false, error: '未配置 JIRA 地址（设置 → 插件 → JIRA，或环境变量 JIRA_BASE_URL）' };
        const token = await resolveFirst(TOKEN_REFS);
        if (!token) return { ok: false, error: '未配置 JIRA 令牌（设置 → 插件 → JIRA，或环境变量 JIRA_API_TOKEN）' };

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
    }
}

export { Config, apply, inject, name };
