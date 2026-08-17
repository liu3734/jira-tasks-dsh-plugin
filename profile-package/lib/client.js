window.__ModuleLoader__.load({
  id: "dsh-jira-tasks",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var React = require("react");
    var h = React.createElement;

    var CSS = ".jt-root{box-sizing:border-box;width:100%;padding:2px 8px 6px;flex:none;display:flex;flex-direction:column}"
      + ".jt-hero{order:99;padding:0 var(--dsh-composer-side-clearance, 16px)}"
      + ".jt-hero .jt-panel{width:100%;max-width:var(--dsh-composer-card-max-width, 780px);margin:0 auto;box-sizing:border-box}"
      + ".jt-panel{border:1px solid var(--dsw-alias-border-l1, rgba(127,127,127,.28));background:var(--dsw-alias-bg-layer-1, rgba(127,127,127,.07));border-radius:10px;overflow:hidden}"
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
      + ".jt-linklike{background:none;border:none;padding:0;cursor:pointer;color:var(--dsw-alias-brand-primary, #2f6fed);font-size:12px;text-decoration:underline}";

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

    function hasMessages(session) {
      if (!session || !session.chat) return false;
      if (session.chat.timeline && session.chat.timeline.length > 0) return true;
      if (session.chat.legacy && session.chat.legacy.nodes && session.chat.legacy.nodes.length > 0) return true;
      return false;
    }

    function query(projectKey, jql) {
      return fetch("/jira/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectKey: projectKey, jql: jql })
      }).then(function (r) { return r.json(); });
    }

    function JiraTasksDock(props) {
      var blankOnly = !!(props && props.blankOnly === true);
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

      if (blankOnly && hasMessages(props.session)) return null;

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

      var heroLayout = blankOnly;

      if (editing) {
        return h("div", { className: heroLayout ? "jt-root jt-hero" : "jt-root" },
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

      return h("div", { className: heroLayout ? "jt-root jt-hero" : "jt-root" },
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

    function apply(ctx) {
      // ctx.effect(cb) 会立即执行 cb 并把其返回值作为卸载时的清理函数，
      // 所以样式注入必须放在回调内、返回移除函数，否则标签刚插入就被删除。
      if (ctx && typeof ctx.effect === "function") {
        ctx.effect(function () {
          var styleTag = document.createElement("style");
          styleTag.textContent = CSS;
          document.head.appendChild(styleTag);
          return function () { try { styleTag.remove(); } catch (e) {} };
        });
      } else {
        var styleTag = document.createElement("style");
        styleTag.textContent = CSS;
        document.head.appendChild(styleTag);
      }
      var slots = ctx.get("slots");
      if (!slots) return;
      slots.inject("conversation.composer.dock", function () {
        return slots.register({ name: "conversation.composer.dock", id: "jira-open-tasks", order: 5 }, JiraTasksDock);
      });
      slots.inject("conversation.input.dock", function () {
        return slots.register({ name: "conversation.input.dock", id: "jira-open-tasks-hero", order: 10 }, function (props) {
          return h(JiraTasksDock, Object.assign({}, props, { blankOnly: true }));
        });
      });
    }

    exports.inject = ["slots"];
    exports.apply = apply;
    return module.exports;
  }
});
