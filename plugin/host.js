// JIRA 开启任务面板 —— Host 半（DSH 动态 Cordis 插件）
// 用法：作为 cordis_define 的 code.host 函数体传入。
// 依赖服务：subprocess / credentials / sandboxPolicy（均为 DSH Host 服务，inject 声明）
return {
  inject: ['subprocess', 'credentials', 'sandboxPolicy'],
  apply(ctx) {
    const subprocess = ctx.subprocess;
    const credentials = ctx.credentials;
    const workspaceRoot = ctx.sandboxPolicy.workspaceRoot;

    async function resolveFirst(names) {
      for (const name of names) {
        try {
          const cred = await credentials.resolve(name);
          if (cred && typeof cred.value === 'string' && cred.value.length > 0) return cred.value;
        } catch (e) { /* 继续尝试下一个 */ }
      }
      return undefined;
    }

    function buildAuthHeader(token) {
      if (token.indexOf(':') !== -1) return 'Basic ' + btoa(token);
      return 'Bearer ' + token;
    }

    // 默认查询：当前用户、状态“开启/重新开启”的任务（{projectKey}/{key} 占位符可替换）
    function buildJql(template, projectKey) {
      const t = (template || '').trim();
      if (!t) return 'project = "' + projectKey + '" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC';
      return t.replace(/\{projectKey\}/g, projectKey).replace(/\{key\}/g, projectKey);
    }

    // 直接通过 subprocess 服务起 curl：显式 argv 无需 shell 引号转义，
    // 认证头经 stdin(--config -) 传入，避免 token 出现在命令行参数中。
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

    function cleanBaseOf(baseUrl) {
      return baseUrl.replace(/\/+$/, '');
    }

    const handler = async (args) => {
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
          } catch (e) { /* stdout 非 JSON，保留 stderr 信息 */ }
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
          baseUrl: cleanBaseOf(baseUrl),
          projectKey,
          total: typeof data.total === 'number' ? data.total : issues.length,
          issues
        };
      } catch (err) {
        return { ok: false, error: String((err && err.message) || err) };
      }
    };

    ctx.effect(() => harness.handle('jira/list', handler));

    // 调试工具（可选）：以项目 HCPFYH1 执行一次完整查询
    const debugTool = harness.defineTool({
      name: 'jira_debug',
      description: 'JIRA 插件调试：以项目 HCPFYH1 执行一次完整查询并返回原始结果（含退出码/输出诊断）。',
      parameters: { type: 'object', properties: {}, required: [] },
      output: {
        schema: { type: 'object', additionalProperties: true },
        render: (args, value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
      },
      execute: async () => {
        try {
          return await handler({ projectKey: 'HCPFYH1', jql: '' });
        } catch (err) {
          return { ok: false, error: String((err && err.message) || err) };
        }
      }
    });
    ctx.effect(() => harness.registerTool(ctx, debugTool));
  }
};
