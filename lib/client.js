window.__ModuleLoader__.load({
  id: "dsh-jira-tasks",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var React = require("react");
    var h = React.createElement;

    var CSS = ".jt-root{box-sizing:border-box;width:100%;padding:2px 0 6px;flex:none;display:flex;flex-direction:column}"
      + "/* composerStack 是 flex-direction:column：order:99 把面板排到输入卡之后，即输入框下方。 */"
      + ".jt-hero{order:99;padding:0 var(--dsh-composer-side-clearance, 16px)}"
      + ".jt-panel{box-sizing:border-box;width:100%;max-width:var(--dsh-composer-card-max-width, 780px);margin:0 auto;border:1px solid var(--dsw-alias-border-l1, rgba(127,127,127,.28));background:var(--dsw-alias-bg-layer-1, rgba(127,127,127,.07));border-radius:10px;overflow:hidden}"
      + ".jt-header{display:flex;align-items:center;gap:8px;min-height:30px;padding:2px 6px 2px 4px}"
      + ".jt-toggle{display:flex;align-items:center;gap:6px;flex:1;min-width:0;background:none;border:none;cursor:pointer;color:var(--dsw-alias-label-primary, #222);padding:4px 6px;border-radius:6px;font-size:12px;text-align:left}"
      + ".jt-toggle:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1))}"
      + ".jt-chevron{flex:none;font-size:10px;color:var(--dsw-alias-label-secondary, #666)}"
      + ".jt-title{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
      + ".jt-badge{flex:none;font-size:11px;padding:0 6px;border-radius:999px;background:var(--dsw-alias-button-primary-fill, #2f6fed);color:var(--dsw-alias-label-primary-foreground, #fff)}"
      + ".jt-actions{display:flex;align-items:center;gap:2px;flex:none}"
      + ".jt-action{width:24px;height:24px;border:none;background:none;cursor:pointer;border-radius:6px;color:var(--dsw-alias-label-secondary, #666);font-size:13px;line-height:1}"
      + ".jt-action:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.14))}"
      + ".jt-body{padding:0 8px 8px}"
      + ".jt-hint{color:var(--dsw-alias-label-secondary, #666);font-size:12px;line-height:1.7}"
      + ".jt-error{color:var(--dsw-alias-state-error-primary, #d93026);font-size:12px;line-height:1.7;word-break:break-word}"
      + ".jt-empty{color:var(--dsw-alias-label-secondary, #666);font-size:12px;padding:4px 0}"
      + ".jt-list{margin:0;padding:2px 0;list-style:none;max-height:190px;overflow-y:auto;display:flex;flex-direction:column;gap:2px}"
      + ".jt-item{margin:0;padding:0;list-style:none}"
      + ".jt-row{display:flex;align-items:baseline;gap:8px;padding:4px 6px;border-radius:6px;text-decoration:none;color:var(--dsw-alias-label-primary, #222)}"
      + ".jt-row:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.09))}"
      + ".jt-key{flex:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:var(--dsw-alias-brand-primary, #2f6fed);font-weight:600}"
      + ".jt-summary{flex:1;min-width:0;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
      + ".jt-meta{flex:none;display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary, #666)}"
      + ".jt-chip{padding:0 6px;border-radius:999px;font-size:11px;line-height:16px;white-space:nowrap;color:var(--dsw-alias-label-secondary, #888);background:color-mix(in srgb, var(--dsw-alias-label-secondary, #888) 12%, transparent)}"
      + ".jt-chip-new{color:var(--dsw-alias-state-warn-primary, #b76e00);background:color-mix(in srgb, var(--dsw-alias-state-warn-primary, #b76e00) 14%, transparent)}"
      + ".jt-chip-progress{color:var(--dsw-alias-brand-primary, #2f6fed);background:color-mix(in srgb, var(--dsw-alias-brand-primary, #2f6fed) 12%, transparent)}"
      + ".jt-field{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}"
      + ".jt-field label{font-size:12px;color:var(--dsw-alias-label-secondary, #666)}"
      + ".jt-input{box-sizing:border-box;width:100%;padding:5px 8px;font-size:12px;font-family:inherit;border:1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.32));border-radius:6px;background:var(--dsw-alias-bg-base, #fff);color:var(--dsw-alias-label-primary, #222);outline:none}"
      + ".jt-input:focus{border-color:var(--dsw-alias-brand-primary, #2f6fed)}"
      + ".jt-textarea{min-height:64px;resize:vertical;line-height:1.5}"
      + ".jt-buttons{display:flex;gap:8px;justify-content:flex-end}"
      + ".jt-btn{padding:4px 12px;font-size:12px;border-radius:6px;cursor:pointer;border:1px solid var(--dsw-alias-border-l2, rgba(127,127,127,.32));background:transparent;color:var(--dsw-alias-label-primary, #222)}"
      + ".jt-btn:hover{background:var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.1));opacity:1}"
      + ".jt-btn-primary{background:var(--dsw-alias-button-primary-fill, #2f6fed);border-color:transparent;color:var(--dsw-alias-label-primary-foreground, #fff)}"
      + ".jt-btn-primary:hover{background:var(--dsw-alias-button-primary-hover, #3a7bfd)}"
      + ".jt-linklike{background:none;border:none;padding:0;cursor:pointer;color:var(--dsw-alias-brand-primary, #2f6fed);font-size:12px;text-decoration:underline}"
      + ".jt-set-card{box-sizing:border-box;list-style:none;margin:0;border:1px solid var(--dsw-alias-border-l1, rgba(127,127,127,.28));background:var(--dsw-alias-bg-layer-1, rgba(127,127,127,.05));border-radius:10px;padding:10px 12px}"
      + ".jt-set-head{display:flex;flex-direction:column;gap:2px;margin-bottom:8px}"
      + ".jt-set-title{font-weight:600;font-size:13px;color:var(--dsw-alias-label-primary, #222)}"
      + ".jt-set-desc{font-size:12px;color:var(--dsw-alias-label-secondary, #666);line-height:1.6}"
      + ".jt-probe{display:flex;align-items:center;gap:6px;margin:0 0 8px;font-size:12px;color:var(--dsw-alias-label-secondary, #666);line-height:1.6;word-break:break-word}"
      + ".jt-dot{flex:none;width:8px;height:8px;border-radius:50%;background:var(--dsw-alias-label-secondary, #999)}"
      + ".jt-dot-ok{background:var(--dsw-alias-state-success-primary, #1a9d4f)}"
      + ".jt-dot-fail{background:var(--dsw-alias-state-error-primary, #d93026)}"
      + ".jt-dot-testing{background:var(--dsw-alias-state-warn-primary, #b76e00)}";

    var STORAGE_KEY = "dsh.jiraTasks.config.v1";

    function defaultJql(key) {
      return 'project = "' + (key || "{projectKey}") + '" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC';
    }

    function loadAll() {
      try {
        if (typeof window === "undefined" || typeof window.localStorage === "undefined") return null;
        var raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) { return null; }
    }
    function persistAll(all) {
      try {
        if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      } catch (e) {}
    }
    function isLegacy(all) {
      return all !== null && typeof all === "object" && (typeof all.projectKey === "string" || typeof all.jql === "string");
    }
    function loadConfigFor(wsKey) {
      var all = loadAll();
      if (all === null) return { projectKey: "", jql: "" };
      if (isLegacy(all)) {
        var legacy = { projectKey: String(all.projectKey || ""), jql: String(all.jql || "") };
        if (wsKey) { var mig = {}; mig[wsKey] = legacy; persistAll(mig); return legacy; }
        return { projectKey: "", jql: "" };
      }
      var entry = all[wsKey];
      if (!entry) return { projectKey: "", jql: "" };
      return { projectKey: String(entry.projectKey || ""), jql: String(entry.jql || "") };
    }
    function saveConfigFor(wsKey, config) {
      var all = loadAll();
      if (all === null || isLegacy(all)) all = {};
      all[wsKey] = { projectKey: config.projectKey, jql: config.jql };
      persistAll(all);
    }

    function query(projectKey, jql) {
      return fetch("/jira/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectKey: projectKey, jql: jql })
      }).then(function (r) { return r.json(); });
    }

    // 探测 JIRA 地址/令牌可用性；可选传入未保存的草稿值。
    function testConnection(payload) {
      return fetch("/jira/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload || {})
      }).then(function (r) { return r.json(); });
    }

    function JiraTasksDock(props) {
      var useWorkspaces = props && typeof props.useWorkspaces === "function" ? props.useWorkspaces : null;
      var sessionId = props && props.sessionId;
      var wsState = useWorkspaces ? useWorkspaces(function (s) { return s; }) : null;
      var wsKey = "";
      var wsTitle = "";
      try {
        if (sessionId && wsState && wsState.items && Array.isArray(wsState.items)) {
          var item = wsState.items.find(function (w) { return w.sessionIds && w.sessionIds.indexOf(sessionId) !== -1; });
          if (item) { wsKey = String(item.path || item.workspaceId || ""); wsTitle = String(item.title || ""); }
        }
      } catch (e) {}

      var configState = React.useState(function () { return loadConfigFor(wsKey); });
      var config = configState[0], setConfig = configState[1];
      var phaseState = React.useState("idle");
      var phase = phaseState[0], setPhase = phaseState[1];
      var resultState = React.useState(null);
      var result = resultState[0], setResult = resultState[1];
      var tickState = React.useState(0);
      var tick = tickState[0], setTick = tickState[1];
      var editingState = React.useState(false);
      var editing = editingState[0], setEditing = editingState[1];
      var collapsedState = React.useState(false);
      var collapsed = collapsedState[0], setCollapsed = collapsedState[1];
      var draftKeyState = React.useState("");
      var draftKey = draftKeyState[0], setDraftKey = draftKeyState[1];
      var draftJqlState = React.useState("");
      var draftJql = draftJqlState[0], setDraftJql = draftJqlState[1];

      React.useEffect(function () { setConfig(loadConfigFor(wsKey)); }, [wsKey]);

      React.useEffect(function () {
        var key = (config.projectKey || "").trim();
        if (!key) { setPhase("idle"); setResult(null); return; }
        var cancelled = false;
        setPhase("loading");
        query(key, (config.jql || "").trim())
          .then(function (res) {
            if (cancelled) return;
            setResult(res || null);
            setPhase(res && res.ok ? "ready" : "error");
          })
          .catch(function (err) {
            if (cancelled) return;
            setResult({ ok: false, error: String((err && err.message) || err) });
            setPhase("error");
          });
        return function () { cancelled = true; };
      }, [config, tick]);

      // 面板只注册 conversation.input.dock 一处（见 apply 里的说明）：
      // 该槽位在“新会话”和“活跃会话”下都会渲染，且是整行纵向排布的元素，
      // 因此这里没有“仅空白会话显示”的分支，也不需要去重。
      function openEditor() {
        setDraftKey(config.projectKey);
        setDraftJql(config.jql || defaultJql(config.projectKey));
        setEditing(true);
      }
      function saveEditor() {
        var next = { projectKey: (draftKey || "").trim(), jql: (draftJql || "").trim() };
        saveConfigFor(wsKey, next);
        setConfig(next);
        setEditing(false);
      }

      if (editing) {
        return h("div", { className: "jt-root jt-hero" },
          h("div", { className: "jt-panel" },
            h("div", { className: "jt-header" }, h("span", { className: "jt-title" }, "JIRA 任务设置")),
            h("div", { className: "jt-body" },
              h("div", { className: "jt-hint", style: { marginBottom: "8px" } }, "配置保存到当前工作区：" + (wsTitle || wsKey || "（无工作区）")),
              h("div", { className: "jt-field" },
                h("label", null, "项目 Key"),
                h("input", {
                  className: "jt-input", value: draftKey, placeholder: "例如 ROMS",
                  onChange: function (e) {
                    var nextKey = e.target.value;
                    setDraftKey(nextKey);
                    setDraftJql(function (prev) { return prev === defaultJql(draftKey) ? defaultJql(nextKey) : prev; });
                  },
                  onKeyDown: function (e) { if (e.key === "Enter") saveEditor(); }
                })
              ),
              h("div", { className: "jt-field" },
                h("label", null, "JQL（留空则使用默认查询；{projectKey} 会被替换为项目 Key）"),
                h("textarea", {
                  className: "jt-input jt-textarea", value: draftJql, rows: 4, placeholder: defaultJql(""),
                  onChange: function (e) { setDraftJql(e.target.value); }
                })
              ),
              h("div", { className: "jt-buttons" },
                h("button", { className: "jt-btn", onClick: function () { setEditing(false); } }, "取消"),
                h("button", { className: "jt-btn jt-btn-primary", onClick: saveEditor }, "保存并查询")
              )
            )
          )
        );
      }

      var projectKey = (config.projectKey || "").trim();
      var error = result && !result.ok ? result.error : "";
      var count = result && result.ok && typeof result.total === "number" ? result.total : null;
      var baseUrl = result && result.ok ? result.baseUrl : "";

      var rows = (result && result.ok && Array.isArray(result.issues) ? result.issues : []).map(function (issue) {
        var chipClass = issue.statusCategory === "new" ? "jt-chip jt-chip-new" : (issue.statusCategory === "indeterminate" ? "jt-chip jt-chip-progress" : "jt-chip");
        var meta = [];
        if (issue.status) meta.push(h("span", { className: chipClass }, issue.status));
        if (issue.priority) meta.push(h("span", null, issue.priority));
        if (issue.issueType) meta.push(h("span", null, issue.issueType));
        return h("li", { key: issue.key, className: "jt-item" },
          h("a", {
            className: "jt-row",
            href: baseUrl ? baseUrl + "/browse/" + encodeURIComponent(issue.key) : undefined,
            target: baseUrl ? "_blank" : undefined,
            rel: "noreferrer",
            title: issue.key + " " + issue.summary
          },
            h("span", { className: "jt-key" }, issue.key),
            h("span", { className: "jt-summary" }, issue.summary),
            h("span", { className: "jt-meta" }, meta.length > 0 ? meta : null)
          )
        );
      });

      var body;
      if (phase === "loading") {
        body = h("div", { className: "jt-hint" }, "正在查询 JIRA 任务…");
      } else if (phase === "error") {
        body = h("div", { className: "jt-error" }, "查询失败：" + error);
      } else if (phase === "ready") {
        body = rows.length > 0 ? h("ul", { className: "jt-list" }, rows) : h("div", { className: "jt-empty" }, "该项目暂无未解决的任务");
      } else {
        body = h("div", { className: "jt-hint" }, "未设置 JIRA 项目 Key，", h("button", { className: "jt-linklike", onClick: openEditor }, "点击配置"));
      }

      return h("div", { className: "jt-root jt-hero" },
        h("div", { className: "jt-panel" },
          h("div", { className: "jt-header" },
            h("button", {
              className: "jt-toggle",
              onClick: function () { setCollapsed(!collapsed); },
              title: collapsed ? "展开" : "收起"
            },
              h("span", { className: "jt-chevron" }, collapsed ? "▸" : "▾"),
              h("span", { className: "jt-title" }, "JIRA · " + (projectKey || "未配置")),
              count !== null ? h("span", { className: "jt-badge" }, String(count)) : null
            ),
            h("div", { className: "jt-actions" },
              h("button", { className: "jt-action", title: "刷新", onClick: function () { setTick(tick + 1); } }, "⟳"),
              h("button", { className: "jt-action", title: "设置项目 Key / JQL", onClick: openEditor }, "⚙")
            )
          ),
          collapsed ? null : h("div", { className: "jt-body" }, body)
        )
      );
    }

    // ---- 设置页卡片：设置 → 插件 → JIRA ----
    // 地址存 settings 命名空间（可读）；令牌写 credentials（永不随响应回传）。
    var SETTINGS_NS = "jira-tasks";
    // 令牌写入插件自有引用，而不是直接写 JIRA_API_TOKEN：启动环境里导出的
    // JIRA_API_TOKEN 会让那个引用只读（DSH 拒绝写入会被环境遮蔽的引用），而
    // 插件自有引用不受影响，因此设置页保存的值可以覆盖环境变量——优先级由
    // Host 的解析顺序保证（JIRA_TASKS_TOKEN → JIRA_API_TOKEN → JIRA_TOKEN）。
    var TOKEN_REF = "JIRA_TASKS_TOKEN";
    var ENV_TOKEN_REFS = ["JIRA_API_TOKEN", "JIRA_TOKEN"];
    var TOKEN_REFS = [TOKEN_REF].concat(ENV_TOKEN_REFS);

    // credentials-local 拒绝写入“由启动环境提供”的引用时，原始信息是英文的；这里取出引用名并给出可操作的中文说明。
    function shadowedTokenRef(message) {
      var m = /"([^"]+)" is supplied read-only by the launching environment/.exec(String(message || ""));
      return m ? m[1] : "";
    }
    function tokenReadOnlyHint(ref) {
      var name = ref || TOKEN_REF;
      return "环境变量 " + name + " 由启动 DSH 的终端提供且只读，无法写入该引用。"
        + "请先移除它（Windows：系统属性 → 环境变量，或 PowerShell "
        + "[Environment]::SetEnvironmentVariable('" + name + "', $null, 'User')）并重启 DSH。";
    }

    function useScopeSnapshot(scope) {
      var state = React.useState(function () { return scope.getSnapshot(); });
      var snapshot = state[0], setSnapshot = state[1];
      React.useEffect(function () {
        var update = function () { setSnapshot(scope.getSnapshot()); };
        var off = scope.subscribe(update);
        update();
        return off;
      }, []);
      return snapshot;
    }

    function createJiraSettingsCard(scope, credentials) {
      function readTokenInfo() {
        return credentials.describe(TOKEN_REFS).then(function (res) {
          if (!res || !res.ok || !res.value) return { configured: false, writable: true };
          var value = res.value;
          var override = value[TOKEN_REF];
          var overridden = !!(override && override.configured);
          var fallbackRef = "", fallbackSource = "";
          for (var i = 0; i < ENV_TOKEN_REFS.length; i++) {
            var info = value[ENV_TOKEN_REFS[i]];
            if (info && info.configured) {
              fallbackRef = ENV_TOKEN_REFS[i];
              fallbackSource = info.source || "";
              break;
            }
          }
          return {
            configured: overridden || fallbackRef !== "",
            overridden: overridden,
            // 只有插件自有引用可能被环境遮蔽；JIRA_API_TOKEN 只读不影响这里的写入。
            writable: !override || override.writable !== false,
            // 仅当回退值确实来自启动环境时才称它为“环境变量”（旧版本可能把它存在凭据文件里）。
            envRef: fallbackSource === "env" ? fallbackRef : ""
          };
        }).catch(function () {
          // 状态读取失败不阻断保存，交由写入路径给出真实错误。
          return { configured: false, writable: true };
        });
      }

      // plugins.item 的两个渲染位：列表里的卡片摘要（view="summary"）与点开后的
      // 详情面板（view="page"）。分发组件自身不调用任何 hook，钩子全部留在
      // JiraSettingsPage 里，这样同一个实例的 hook 数量与 view 取值无关——
      // 这是 React 的硬性要求，早期版本把摘要提前 return 写在 hook 之前会踩这条规则。
      function JiraSettingsPage() {
        var snapshot = useScopeSnapshot(scope);
        var tokenInfoState = React.useState(null);
        var tokenInfo = tokenInfoState[0], setTokenInfo = tokenInfoState[1];
        var baseEditState = React.useState(undefined);
        var baseEdit = baseEditState[0], setBaseEdit = baseEditState[1];
        var tokenDraftState = React.useState("");
        var tokenDraft = tokenDraftState[0], setTokenDraft = tokenDraftState[1];
        var busyState = React.useState(false);
        var busy = busyState[0], setBusy = busyState[1];
        var failedState = React.useState("");
        var failed = failedState[0], setFailed = failedState[1];
        var probeState = React.useState({ phase: "idle" });
        var probe = probeState[0], setProbe = probeState[1];
        var probeGen = React.useRef(0);

        React.useEffect(function () {
          var alive = true;
          readTokenInfo().then(function (info) { if (alive) setTokenInfo(info); });
          return function () { alive = false; };
        }, []);

        // 自动测试：命名空间就绪后、以及已保存配置变更（含保存后）时各探测一次。
        React.useEffect(function () {
          if (snapshot.status !== "ready") return;
          runProbe({});
        }, [snapshot.status, snapshot.revision]);

        var storedBase = snapshot.value && typeof snapshot.value.baseUrl === "string" ? snapshot.value.baseUrl : "";
        var baseValue = baseEdit === undefined ? storedBase : baseEdit;
        var baseDirty = baseEdit !== undefined && baseEdit !== storedBase;
        var tokenDraftText = (tokenDraft || "").trim();
        var tokenDirty = tokenDraftText.length > 0;
        var dirty = baseDirty || tokenDirty;
        var writable = snapshot.writable !== false;
        // 插件自有引用通常可写；只有 JIRA_TASKS_TOKEN 本身也被导出到启动环境时才会只读。
        var tokenWritable = !tokenInfo || tokenInfo.writable !== false;
        var tokenOverridden = !!(tokenInfo && tokenInfo.overridden);
        var envTokenRef = tokenInfo && tokenInfo.envRef ? tokenInfo.envRef : "";

        // 命名空间未挂载时不显示，避免留下一张无法操作的卡片。
        if (snapshot.status === "unavailable") return null;

        function save() {
          if (busy || !dirty) return;
          if (tokenDirty && !tokenWritable) {
            setFailed(tokenReadOnlyHint(TOKEN_REF));
            return;
          }
          setBusy(true);
          setFailed("");
          var tasks = [];
          if (baseDirty) {
            // ConfigForm.set/unset 解析为 boolean：false = 宿主拒绝写入或连接处于
            // memory 模式。以前忽略返回值会让面板“看起来保存了”，实际没落盘。
            tasks.push((baseEdit === "" ? scope.unset("baseUrl") : scope.set("baseUrl", baseEdit)).then(function (accepted) {
              if (accepted === false) throw new Error("JIRA 地址保存被宿主拒绝（该命名空间只读，或连接处于 memory 模式）");
            }));
          }
          if (tokenDirty) {
            tasks.push(credentials.set(TOKEN_REF, tokenDraftText).then(function (res) {
              if (res && res.ok === false) {
                var err = res.error;
                throw new Error((err && (err.message || err.code)) || "令牌保存失败");
              }
            }));
          }
          Promise.all(tasks).then(function () {
            return readTokenInfo();
          }).then(function (info) {
            setTokenInfo(info);
            setBaseEdit(undefined);
            setTokenDraft("");
            setBusy(false);
            // baseUrl 变更会经 snapshot.revision 触发自动重测；仅保存令牌时手动补一次。
            if (!baseDirty) runProbe({});
          }).catch(function (err) {
            setBusy(false);
            var shadowed = shadowedTokenRef(err && err.message);
            setFailed(shadowed ? tokenReadOnlyHint(shadowed) : String((err && err.message) || err));
          });
        }

        // 清除设置页保存的令牌，回退到环境变量 / 凭据文件中的旧值。
        function clearOverride() {
          if (busy) return;
          setBusy(true);
          setFailed("");
          credentials.unset(TOKEN_REF).then(function (res) {
            if (res && res.ok === false) {
              var err = res.error;
              throw new Error((err && (err.message || err.code)) || "清除令牌失败");
            }
            return readTokenInfo();
          }).then(function (info) {
            setTokenInfo(info);
            setTokenDraft("");
            setBusy(false);
            runProbe({});
          }).catch(function (err) {
            setBusy(false);
            var shadowed = shadowedTokenRef(err && err.message);
            setFailed(shadowed ? tokenReadOnlyHint(shadowed) : String((err && err.message) || err));
          });
        }

        function discard() {
          setBaseEdit(undefined);
          setTokenDraft("");
          setFailed("");
        }

        // 探测连接：payload 传入即测草稿，传空对象则测已保存/环境配置。
        function runProbe(payload) {
          var gen = ++probeGen.current;
          setProbe({ phase: "testing", message: "正在测试连接…" });
          testConnection(payload).then(function (res) {
            if (gen !== probeGen.current) return;
            if (res && res.ok) setProbe({ phase: "ok", message: "可用" + (res.user ? "：" + res.user : "") });
            else if (res && res.code === "unconfigured") setProbe({ phase: "idle", message: "未配置地址或令牌" });
            else setProbe({ phase: "fail", message: (res && res.error) || "不可用" });
          }).catch(function (err) {
            if (gen !== probeGen.current) return;
            setProbe({ phase: "fail", message: String((err && err.message) || err) });
          });
        }

        var tokenHint = tokenInfo === null
          ? "正在读取令牌状态…"
          : (tokenOverridden
            ? "设置页令牌已保存" + (envTokenRef ? "，优先于环境变量 " + envTokenRef : "") + "；留空并保存可保持不变。"
            : (envTokenRef
              ? "当前使用环境变量 " + envTokenRef + "；在下方填写并保存即可覆盖它。"
              : (tokenInfo.configured ? "令牌已配置；留空并保存可保持不变。" : "令牌未配置。含 “:” 时用 Basic，否则用 Bearer。")));
        var dotClass = probe.phase === "ok" ? "jt-dot jt-dot-ok"
          : probe.phase === "fail" ? "jt-dot jt-dot-fail"
            : probe.phase === "testing" ? "jt-dot jt-dot-testing" : "jt-dot";

        return h("li", { className: "jt-set-card" },
          h("div", { className: "jt-set-head" },
            h("span", { className: "jt-set-title" }, "JIRA"),
            h("span", { className: "jt-set-desc" }, "JIRA 地址与访问令牌。项目 Key / JQL 仍按工作区在会话面板的 ⚙ 中配置。")
          ),
          h("div", { className: "jt-field" },
            h("label", { htmlFor: "jira-tasks-base-url" }, "JIRA 地址"),
            h("input", {
              id: "jira-tasks-base-url",
              className: "jt-input",
              value: baseValue,
              placeholder: "http://jira.example.com/",
              disabled: !writable || busy,
              onChange: function (e) { setBaseEdit(e.target.value); },
              onKeyDown: function (e) { if (e.key === "Enter") save(); }
            })
          ),
          h("div", { className: "jt-field" },
            h("label", { htmlFor: "jira-tasks-token" }, "访问令牌 / PAT"),
            h("input", {
              id: "jira-tasks-token",
              className: "jt-input",
              type: "password",
              value: tokenDraft,
              placeholder: tokenOverridden ? "已保存，留空保持不变" : (envTokenRef ? "填写以覆盖环境变量" : (tokenInfo && tokenInfo.configured ? "已配置，留空保持不变" : "粘贴令牌")),
              autoComplete: "off",
              disabled: busy || !tokenWritable,
              onChange: function (e) { setTokenDraft(e.target.value); },
              onKeyDown: function (e) { if (e.key === "Enter") save(); }
            })
          ),
          h("div", { className: "jt-hint", style: { marginBottom: "8px" } }, tokenHint),
          tokenOverridden && tokenWritable
            ? h("div", { className: "jt-hint", style: { margin: "-4px 0 8px" } },
              h("button", { className: "jt-linklike", disabled: busy, onClick: clearOverride }, "清除设置页令牌（回退到环境变量）"))
            : null,
          h("div", { className: "jt-probe", role: "status" },
            h("span", { className: dotClass, "aria-hidden": "true" }),
            h("span", null, probe.message || "未测试")
          ),
          failed ? h("div", { className: "jt-error", style: { marginBottom: "8px" } }, "保存失败：" + failed) : null,
          h("div", { className: "jt-buttons" },
            h("button", {
              className: "jt-btn",
              style: { marginRight: "auto" },
              disabled: busy || probe.phase === "testing",
              title: "用当前填写的内容测试 JIRA 地址与令牌",
              onClick: function () { runProbe({ baseUrl: baseValue, token: (tokenDraft || "").trim() }); }
            }, probe.phase === "testing" ? "测试中…" : "测试连接"),
            h("button", { className: "jt-btn", disabled: !dirty || busy, onClick: discard }, "放弃"),
            h("button", { className: "jt-btn jt-btn-primary", disabled: !dirty || busy || (baseDirty && !writable) || (tokenDirty && !tokenWritable), onClick: save }, busy ? "保存中…" : "保存")
          )
        );
      }

      // 槽位组件：摘要位只回一行文字，详情位挂载真正的表单。
      return function JiraSettingsCard(props) {
        if (props && props.view === "summary") return "JIRA 地址、令牌与连接状态";
        return h(JiraSettingsPage, null);
      };
    }

    function apply(ctx) {
      // ctx.effect(cb) 会立即执行 cb 并把其返回值作为卸载时的清理函数，
      // 所以样式注入必须放在回调内、返回移除函数，否则标签刚插入就被删除。
      ctx.effect(function () {
        var styleTag = document.createElement("style");
        styleTag.textContent = CSS;
        document.head.appendChild(styleTag);
        return function () { try { styleTag.remove(); } catch (e) {} };
      }, "jira-tasks: styles");
      var slots = ctx.get("slots");
      if (!slots) return;
      // 只注册 conversation.input.dock 一处。
      //
      // 为什么不用 conversation.composer.dock：该槽位在 DSH 0.1.7 里渲染进
      // InputBar 的 .dock 行——一个 justify-content:center 的**横向** flex 行，
      // 与右侧的上下文占用环（ContextMeter）并排。整宽任务面板放进那一行，会和
      // 占用环抢同一条 flex line，面板右侧内容被环压住。
      //
      // conversation.input.dock 属于 composerStack（flex-direction:column），
      // 在新会话与活跃会话下都会渲染（只要有 session + input），是整宽纵向行；
      // 面板自身用 CSS order:99 排到输入卡之后，即“输入框下方”。
      slots.inject("conversation.input.dock", function () {
        return slots.register({ name: "conversation.input.dock", id: "jira-open-tasks", order: 10 }, JiraTasksDock);
      });

      // 设置页卡片。DSH 0.1.5+ ：设置表单的服务是 configForms，命名空间就是本插件
      // 的 profile 条目 id（jira-tasks）；卡片注册到“插件”页的 plugins.item 槽，
      // 并且只在宿主确实提供了该命名空间时才出现（whileServed 的 disposer 交回 effect）。
      var configForms = ctx.get("configForms");
      var remote = ctx.get("remote");
      if (configForms && remote && remote.credentials) {
        var card = createJiraSettingsCard(configForms.get(SETTINGS_NS), remote.credentials);
        ctx.effect(function () {
          return configForms.whileServed([SETTINGS_NS], function () {
            return slots.inject("plugins.item", function () {
              return slots.register({ name: "plugins.item", id: SETTINGS_NS, order: 41, label: "JIRA" }, card);
            });
          });
        }, "jira-tasks: plugins page card");
      }
    }

    exports.inject = ["slots", "configForms", "remote", "remote.credentials"];
    exports.apply = apply;
    return module.exports;
  }
});
