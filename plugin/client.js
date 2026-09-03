// JIRA 开启任务面板 —— Client 半（DSH 动态 Cordis 插件）
// 用法：作为 cordis_define 的 code.client 函数体传入。
// 依赖：React / host / styles 闭包符号；槽位 conversation.composer.dock 与 conversation.input.dock
return {
  inject: ['slots'],
  apply(ctx) {
    const STORAGE_KEY = 'dsh.jiraTasks.config.v1';

    // 与 Host 端 buildJql 默认模板保持一致；key 为空时用 {projectKey} 占位
    function defaultJql(key) {
      return 'project = "' + (key || '{projectKey}') + '" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC';
    }

    ctx.effect(() => styles.insert(
      '.jt-root{box-sizing:border-box;width:100%;padding:2px 0 6px;flex:none;display:flex;flex-direction:column}'
      + '.jt-hero{order:99;padding:0 var(--dsh-composer-side-clearance, 16px)}'
      + '.jt-panel{box-sizing:border-box;width:100%;max-width:var(--dsh-composer-card-max-width, 780px);margin:0 auto;border:1px solid var(--dsw-alias-border-l1, rgba(127,127,127,.28));background:var(--dsw-alias-bg-layer-1, rgba(127,127,127,.07));border-radius:10px;overflow:hidden}'
      + '.jt-header{display:flex;align-items:center;gap:8px;min-height:30px;padding:2px 6px 2px 4px}'
      + '.jt-toggle{display:flex;align-items:center;gap:6px;flex:1;min-width:0;background:none;border:none;cursor:pointer;color:var(--dsw-alias-label-primary, #222);padding:4px 6px;border-radius:6px;font-size:12px;text-align:left}'
      + '.jt-toggle:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1))}'
      + '.jt-chevron{flex:none;font-size:10px;color:var(--dsw-alias-label-secondary, #666)}'
      + '.jt-title{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
      + '.jt-badge{flex:none;font-size:11px;padding:0 6px;border-radius:999px;background:var(--dsw-alias-button-primary-fill, #2f6fed);color:var(--dsw-alias-label-primary-foreground, #fff)}'
      + '.jt-actions{display:flex;align-items:center;gap:2px;flex:none}'
      + '.jt-action{width:24px;height:24px;border:none;background:none;cursor:pointer;border-radius:6px;color:var(--dsw-alias-label-secondary, #666);font-size:13px;line-height:1}'
      + '.jt-action:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.14))}'
      + '.jt-body{padding:0 8px 8px}'
      + '.jt-hint{color:var(--dsw-alias-label-secondary, #666);font-size:12px;line-height:1.7}'
      + '.jt-error{color:var(--dsw-alias-state-error-primary, #d93026);font-size:12px;line-height:1.7;word-break:break-word}'
      + '.jt-empty{color:var(--dsw-alias-label-secondary, #666);font-size:12px;padding:4px 0}'
      + '.jt-list{margin:0;padding:2px 0;list-style:none;max-height:190px;overflow-y:auto;display:flex;flex-direction:column;gap:2px}'
      + '.jt-item{margin:0;padding:0;list-style:none}'
      + '.jt-row{display:flex;align-items:baseline;gap:8px;padding:4px 6px;border-radius:6px;text-decoration:none;color:var(--dsw-alias-label-primary, #222)}'
      + '.jt-row:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.09))}'
      + '.jt-key{flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:var(--dsw-alias-brand-primary, #2f6fed);font-weight:600}'
      + '.jt-summary{flex:1;min-width:0;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
      + '.jt-meta{flex:none;display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary, #666)}'
      + '.jt-chip{padding:0 6px;border-radius:999px;font-size:11px;line-height:16px;white-space:nowrap;color:var(--dsw-alias-label-secondary, #888);background:color-mix(in srgb, var(--dsw-alias-label-secondary, #888) 12%, transparent)}'
      + '.jt-chip-new{color:var(--dsw-alias-state-warn-primary, #b76e00);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary, #b76e00) 14%, transparent)}'
      + '.jt-chip-progress{color:var(--dsw-alias-brand-primary, #2f6fed);background:color-mix(in srgb, var(--dsw-alias-brand-primary, #2f6fed) 12%, transparent)}'
      + '.jt-field{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}'
      + '.jt-field label{font-size:12px;color:var(--dsw-alias-label-secondary, #666)}'
      + '.jt-input{box-sizing:border-box;width:100%;padding:5px 8px;font-size:12px;font-family:inherit;border:1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.32));border-radius:6px;background:var(--dsw-alias-bg-base, #fff);color:var(--dsw-alias-label-primary, #222);outline:none}'
      + '.jt-input:focus{border-color:var(--dsw-alias-brand-primary, #2f6fed)}'
      + '.jt-textarea{min-height:64px;resize:vertical;line-height:1.5}'
      + '.jt-buttons{display:flex;gap:8px;justify-content:flex-end}'
      + '.jt-btn{padding:4px 12px;font-size:12px;border-radius:6px;cursor:pointer;border:1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.32));background:transparent;color:var(--dsw-alias-label-primary, #222)}'
      + '.jt-btn:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));opacity:1}'
      + '.jt-btn-primary{background:var(--dsw-alias-button-primary-fill, #2f6fed);border-color:transparent;color:var(--dsw-alias-label-primary-foreground, #fff)}'
      + '.jt-btn-primary:hover{background:var(--dsw-alias-button-primary-hover, #3a7bfd)}'
      + '.jt-linklike{background:none;border:none;padding:0;cursor:pointer;color:var(--dsw-alias-brand-primary, #2f6fed);font-size:12px;text-decoration:underline}'
    ));

    // ---- 按工作区存储配置：{ [workspaceKey]: { projectKey, jql } } ----
    function loadAll() {
      try {
        if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return null;
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }
    function persistAll(all) {
      try {
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        }
      } catch (e) { /* 忽略存储失败 */ }
    }
    function isLegacy(all) {
      return all !== null && typeof all === 'object' && (typeof all.projectKey === 'string' || typeof all.jql === 'string');
    }
    function loadConfigFor(wsKey) {
      const all = loadAll();
      if (all === null) return { projectKey: '', jql: '' };
      // 旧版全局格式 → 迁移到当前工作区
      if (isLegacy(all)) {
        const legacy = { projectKey: String(all.projectKey || ''), jql: String(all.jql || '') };
        if (wsKey) {
          persistAll({ [wsKey]: legacy });
          return legacy;
        }
        return { projectKey: '', jql: '' };
      }
      const entry = all[wsKey];
      if (!entry) return { projectKey: '', jql: '' };
      return { projectKey: String(entry.projectKey || ''), jql: String(entry.jql || '') };
    }
    function saveConfigFor(wsKey, config) {
      let all = loadAll();
      if (all === null || isLegacy(all)) all = {};
      all[wsKey] = { projectKey: config.projectKey, jql: config.jql };
      persistAll(all);
    }

    const h = React.createElement;

    // 会话是否已有消息（用于区分“新会话/空白”与“活跃会话”）
    // 新版 DSH：SessionSnapshot.blank 是“会话日志为空”的规范标记（任务队列/提交中也会翻转为 false）；
    // 旧版 DSH：消息位于 chat.timeline / chat.legacy.nodes。
    function hasMessages(session) {
      if (!session) return false;
      if (typeof session.blank === 'boolean') return !session.blank;
      if (session.chat && session.chat.timeline && session.chat.timeline.length > 0) return true;
      if (session.chat && session.chat.legacy && session.chat.legacy.nodes && session.chat.legacy.nodes.length > 0) return true;
      return false;
    }

    function JiraTasksDock(props) {
      const blankOnly = !!(props && props.blankOnly === true);

      // 通过标准 props 取当前工作区（会话 → 所属工作区 → path/workspaceId 作为配置键）
      const useWorkspaces = props && typeof props.useWorkspaces === 'function' ? props.useWorkspaces : null;
      const sessionId = props && props.sessionId;
      const wsState = useWorkspaces ? useWorkspaces((s) => s) : null;
      let wsKey = '';
      let wsTitle = '';
      try {
        if (sessionId && wsState && wsState.items && Array.isArray(wsState.items)) {
          const item = wsState.items.find((w) => w.sessionIds && w.sessionIds.includes(sessionId));
          if (item) {
            wsKey = String(item.path || item.workspaceId || '');
            wsTitle = String(item.title || '');
          }
        }
      } catch (e) { /* 保持未配置 */ }

      const [config, setConfig] = React.useState(() => loadConfigFor(wsKey));
      const [phase, setPhase] = React.useState('idle'); // idle | loading | ready | error
      const [result, setResult] = React.useState(null);
      const [tick, setTick] = React.useState(0);
      const [editing, setEditing] = React.useState(false);
      const [collapsed, setCollapsed] = React.useState(false);
      const [draftKey, setDraftKey] = React.useState('');
      const [draftJql, setDraftJql] = React.useState('');

      // 工作区切换时加载该工作区的配置
      React.useEffect(() => {
        setConfig(loadConfigFor(wsKey));
      }, [wsKey]);

      // 每次挂载（新会话）与配置/刷新变化时自动查询
      React.useEffect(() => {
        const key = (config.projectKey || '').trim();
        if (!key) {
          setPhase('idle');
          setResult(null);
          return;
        }
        let cancelled = false;
        setPhase('loading');
        host.call('jira/list', { projectKey: key, jql: (config.jql || '').trim() })
          .then((res) => {
            if (cancelled) return;
            setResult(res || null);
            setPhase(res && res.ok ? 'ready' : 'error');
          })
          .catch((err) => {
            if (cancelled) return;
            setResult({ ok: false, error: String((err && err.message) || err) });
            setPhase('error');
          });
        return () => { cancelled = true; };
      }, [config, tick]);

      // 新会话（input.dock 槽位）条目：仅当会话为空时渲染（所有 hook 之后返回，保证 hook 顺序一致）
      if (blankOnly && hasMessages(props.session)) return null;

      const openEditor = () => {
        setDraftKey(config.projectKey);
        setDraftJql(config.jql || defaultJql(config.projectKey));
        setEditing(true);
      };
      const saveEditor = () => {
        const next = { projectKey: (draftKey || '').trim(), jql: (draftJql || '').trim() };
        saveConfigFor(wsKey, next);
        setConfig(next);
        setEditing(false);
      };

      // 新会话条目使用 hero 布局（位于输入框下方、与输入框等宽）
      const heroLayout = blankOnly;

      // ---- 编辑表单 ----
      if (editing) {
        return h('div', { className: heroLayout ? 'jt-root jt-hero' : 'jt-root' },
          h('div', { className: 'jt-panel' },
            h('div', { className: 'jt-header' },
              h('span', { className: 'jt-title' }, 'JIRA 任务设置')
            ),
            h('div', { className: 'jt-body' },
              h('div', { className: 'jt-hint', style: { marginBottom: '8px' } }, '配置保存到当前工作区：' + (wsTitle || wsKey || '（无工作区）')),
              h('div', { className: 'jt-field' },
                h('label', null, '项目 Key'),
                h('input', {
                  className: 'jt-input',
                  value: draftKey,
                  placeholder: '例如 ROMS',
                  onChange: (e) => {
                    const nextKey = e.target.value;
                    setDraftKey(nextKey);
                    // JQL 仍为旧 Key 的自动默认值时，随 Key 联动更新；已手改则不动
                    setDraftJql((prev) => (prev === defaultJql(draftKey) ? defaultJql(nextKey) : prev));
                  },
                  onKeyDown: (e) => { if (e.key === 'Enter') saveEditor(); }
                })
              ),
              h('div', { className: 'jt-field' },
                h('label', null, 'JQL（留空则使用默认查询；{projectKey} 会被替换为项目 Key）'),
                h('textarea', {
                  className: 'jt-input jt-textarea',
                  value: draftJql,
                  rows: 4,
                  placeholder: defaultJql(''),
                  onChange: (e) => setDraftJql(e.target.value)
                })
              ),
              h('div', { className: 'jt-buttons' },
                h('button', { className: 'jt-btn', onClick: () => setEditing(false) }, '取消'),
                h('button', { className: 'jt-btn jt-btn-primary', onClick: saveEditor }, '保存并查询')
              )
            )
          )
        );
      }

      // ---- 常规展示 ----
      const projectKey = (config.projectKey || '').trim();
      const error = result && !result.ok ? result.error : '';
      const count = result && result.ok && typeof result.total === 'number' ? result.total : null;
      const baseUrl = result && result.ok ? result.baseUrl : '';

      const rows = (result && result.ok && Array.isArray(result.issues) ? result.issues : []).map((issue) => {
        const chipClass = issue.statusCategory === 'new'
          ? 'jt-chip jt-chip-new'
          : (issue.statusCategory === 'indeterminate' ? 'jt-chip jt-chip-progress' : 'jt-chip');
        const meta = [
          issue.status ? h('span', { className: chipClass }, issue.status) : null,
          issue.priority ? h('span', null, issue.priority) : null,
          issue.issueType ? h('span', null, issue.issueType) : null
        ].filter(Boolean);
        return h('li', { key: issue.key, className: 'jt-item' },
          h('a', {
            className: 'jt-row',
            href: baseUrl ? baseUrl + '/browse/' + encodeURIComponent(issue.key) : undefined,
            target: baseUrl ? '_blank' : undefined,
            rel: 'noreferrer',
            title: issue.key + ' ' + issue.summary
          },
            h('span', { className: 'jt-key' }, issue.key),
            h('span', { className: 'jt-summary' }, issue.summary),
            h('span', { className: 'jt-meta' }, ...meta)
          )
        );
      });

      let body;
      if (phase === 'loading') {
        body = h('div', { className: 'jt-hint' }, '正在查询 JIRA 任务…');
      } else if (phase === 'error') {
        body = h('div', { className: 'jt-error' }, '查询失败：' + error);
      } else if (phase === 'ready') {
        body = rows.length > 0
          ? h('ul', { className: 'jt-list' }, ...rows)
          : h('div', { className: 'jt-empty' }, '该项目暂无未解决的任务');
      } else {
        body = h('div', { className: 'jt-hint' },
          '未设置 JIRA 项目 Key，',
          h('button', { className: 'jt-linklike', onClick: openEditor }, '点击配置')
        );
      }

      return h('div', { className: heroLayout ? 'jt-root jt-hero' : 'jt-root' },
        h('div', { className: 'jt-panel' },
          h('div', { className: 'jt-header' },
            h('button', {
              className: 'jt-toggle',
              onClick: () => setCollapsed(!collapsed),
              title: collapsed ? '展开' : '收起'
            },
              h('span', { className: 'jt-chevron' }, collapsed ? '▸' : '▾'),
              h('span', { className: 'jt-title' }, 'JIRA · ' + (projectKey || '未配置')),
              count !== null ? h('span', { className: 'jt-badge' }, String(count)) : null
            ),
            h('div', { className: 'jt-actions' },
              h('button', {
                className: 'jt-action',
                title: '刷新',
                onClick: () => setTick((t) => t + 1)
              }, '⟳'),
              h('button', {
                className: 'jt-action',
                title: '设置项目 Key / JQL',
                onClick: openEditor
              }, '⚙')
            )
          ),
          collapsed ? null : h('div', { className: 'jt-body' }, body)
        )
      );
    }

    // 活跃会话：输入框下方（原位置）
    ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
      name: 'conversation.composer.dock',
      id: 'jira-open-tasks',
      order: 5
    }, JiraTasksDock));

    // 新会话（空白阶段）：注册到 input.dock，但通过 order:99 排到输入框之后（下方），
    // 并用与输入卡一致的盒模型（side-clearance + card-max-width 居中）保证左右等宽
    ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
      name: 'conversation.input.dock',
      id: 'jira-open-tasks-hero',
      order: 10
    }, (props) => h(JiraTasksDock, Object.assign({}, props, { blankOnly: true }))));
  }
};
