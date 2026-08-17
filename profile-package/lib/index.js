/**
 * dsh-jira-tasks — HOST half (persistent profile plugin).
 * Serves POST /jira/api/search: reads JIRA_BASE_URL / JIRA_API_TOKEN via the
 * credentials service, queries JIRA /rest/api/2/search through subprocess+curl
 * (auth header via stdin --config -), returns normalized issue JSON.
 */
export default {
  inject: ['subprocess', 'credentials', 'sandboxPolicy', 'webServer'],
  apply(ctx) {
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

    async function handleSearch(args) {
      const projectKey = String((args && args.projectKey) || '').trim();
      if (!projectKey) return { ok: false, error: '未设置项目 Key' };
      try {
        const baseUrl = await resolveFirst(['JIRA_BASE_URL', 'JIRA_URL']);
        if (!baseUrl) return { ok: false, error: '未配置环境变量 JIRA_BASE_URL（或 JIRA_URL）' };
        const token = await resolveFirst(['JIRA_API_TOKEN', 'JIRA_TOKEN']);
        if (!token) return { ok: false, error: '未配置环境变量 JIRA_API_TOKEN（或 JIRA_TOKEN）' };

        const jql = buildJql(args && args.jql ? String(args.jql) : '', projectKey);
        const raw = await queryJira(baseUrl, token, jql);
        const stdout = raw.stdout;
        const stderr = raw.stderr;

        if (raw.exitCode !== 0) {
          let message = stderr.trim() || ('curl 退出码 ' + String(raw.exitCode));
          try {
            const parsed = JSON.parse(stdout);
            if (parsed.errorMessages && parsed.errorMessages.length) message = parsed.errorMessages.join('；');
            else if (parsed.message) message = parsed.message;
          } catch (e) { /* stdout 非 JSON */ }
          return { ok: false, error: message };
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

    if (webServer && typeof webServer.register === 'function') {
      webServer.register({
        kind: 'exact',
        path: '/jira/api/search',
        handler: async (req, res) => {
          try {
            sendJson(res, await handleSearch(await readBody(req)));
          } catch (e) {
            sendJson(res, { ok: false, error: String((e && e.message) || e) });
          }
        }
      });
    }
  }
};
