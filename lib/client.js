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
      + ".jt-dot-testing{background:var(--dsw-alias-state-warn-primary, #b76e00)}"
      // 设置对话框左侧导航的整页形态（settings.section）：
      + ".jt-set-page{box-sizing:border-box;width:100%;max-width:760px;display:flex;flex-direction:column;gap:12px}"
      + ".jt-page-title{margin:0;font-size:18px;font-weight:600;line-height:26px;color:var(--dsw-alias-label-primary, #222)}"
      + ".jt-page-intro{margin:0;font-size:13px;line-height:20px;color:var(--dsw-alias-label-secondary, #666)}"
      + ".jt-set-form{display:flex;flex-direction:column}";

    // ---- 任务统计页（左侧栏入口）：样式 ----
    // 面板渲染在 root 级 main 槽位（整页），外壳、文字、边框全部走 --dsw-alias-*
    // 主题令牌，亮/暗主题自动跟随；圆角/间距与宿主设置页、插件页保持一致。
    var STATS_CSS = ".jtst-page{box-sizing:border-box;height:100%;overflow-y:auto;background:var(--dsw-alias-bg-base);padding:calc(var(--dsh-frame-top-clearance,0px) + 20px) 28px 48px}"
      + ".jtst-inner{max-width:1160px;margin:0 auto}"
      + ".jtst-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:18px}"
      + ".jtst-headmain{min-width:0}"
      + ".jtst-title{margin:0;font-size:16px;font-weight:600;line-height:1.4;color:var(--dsw-alias-label-primary)}"
      + ".jtst-sub{margin:4px 0 0;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:10px}"
      + ".jtst-label{font-size:12px;color:var(--dsw-alias-label-secondary);white-space:nowrap}"
      + ".jtst-combo{position:relative;flex:none;width:260px;max-width:100%}"
      + ".jtst-combo-input{box-sizing:border-box;width:100%;height:30px;padding:0 28px 0 8px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:12.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;outline:none;text-transform:uppercase}"
      + ".jtst-combo-input::placeholder{text-transform:none;font-family:inherit}"
      + ".jtst-combo-input:focus{border-color:var(--dsw-alias-brand-primary)}"
      + ".jtst-combo-toggle{position:absolute;top:0;right:0;width:26px;height:30px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);font-size:10px;cursor:pointer;border-radius:0 8px 8px 0}"
      + ".jtst-combo-toggle:hover{color:var(--dsw-alias-label-primary)}"
      + ".jtst-combo-list{position:absolute;top:calc(100% + 4px);left:0;right:0;z-index:30;margin:0;padding:4px;list-style:none;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;box-shadow:var(--dsw-shadow-lv2, 0 10px 28px rgba(0,0,0,.22));max-height:260px;overflow-y:auto}"
      + ".jtst-combo-option{display:flex;align-items:baseline;gap:8px;padding:5px 8px;border-radius:6px;cursor:pointer;font-size:12.5px;color:var(--dsw-alias-label-primary)}"
      + ".jtst-combo-option.is-active{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 14%, transparent)}"
      + ".jtst-combo-key{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:600;color:var(--dsw-alias-label-primary);white-space:nowrap}"
      + ".jtst-combo-hint{margin-left:auto;font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
      + ".jtst-combo-empty{padding:8px;font-size:12px;line-height:1.6;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;transition:background .14s ease,border-color .14s ease}"
      + ".jtst-btn:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l2)}"
      + ".jtst-btn:disabled{opacity:.55;cursor:default}"
      + ".jtst-btn-primary{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-bg-base);font-weight:500}"
      + ".jtst-btn-primary:hover{background:var(--dsw-alias-brand-primary);border-color:transparent;color:var(--dsw-alias-bg-base);filter:brightness(.94)}"
      + ".jtst-btn:focus-visible,.jtst-combo-input:focus-visible,.jtst-combo-toggle:focus-visible,.jtst-page-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}"
      + ".jtst-status{margin-left:auto;font-size:12px;color:var(--dsw-alias-label-secondary);white-space:nowrap}"
      + ".jtst-notice{display:flex;align-items:center;gap:8px;margin:0 0 16px;padding:8px 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);font-size:12.5px;line-height:1.6;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-notice-warn{border-color:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 45%, transparent);color:var(--dsw-alias-state-warn-primary)}"
      + ".jtst-error{margin:0 0 16px;padding:10px 12px;border-radius:8px;border:1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 45%, transparent);background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);color:var(--dsw-alias-state-error-primary);font-size:12.5px;line-height:1.6;word-break:break-word}"
      + ".jtst-loading{display:flex;align-items:center;justify-content:center;gap:10px;padding:56px 16px;color:var(--dsw-alias-label-secondary);font-size:13px}"
      + ".jtst-spin-svg{display:block;flex:none;animation:jtst-spin .8s linear infinite;transform-origin:center}"
      + "@keyframes jtst-spin{to{transform:rotate(360deg)}}"
      + "@media (prefers-reduced-motion: reduce){.jtst-spin-svg{animation:none}.jtst-btn{transition:none}}"
      + ".jtst-idle{padding:44px 16px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:2}"
      + ".jtst-empty{padding:36px 16px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px}"
      + ".jtst-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));gap:12px;margin-bottom:16px}"
      + ".jtst-card{min-width:0;padding:12px 14px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:10px}"
      + ".jtst-card-label{margin-bottom:6px;font-size:12px;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-card-value{font-size:24px;line-height:1.15;font-weight:600;color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums}"
      + ".jtst-card-note{margin-top:4px;font-size:11.5px;line-height:1.5;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-section{min-width:0;padding:12px 14px 14px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:10px}"
      + ".jtst-section-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:10px}"
      + ".jtst-section-title{margin:0;font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary)}"
      + ".jtst-section-meta{font-size:11.5px;color:var(--dsw-alias-label-secondary);white-space:nowrap}"
      + ".jtst-bar-track{display:block;height:6px;border-radius:999px;background:color-mix(in srgb, var(--dsw-alias-label-secondary) 16%, transparent);overflow:hidden}"
      + ".jtst-bar-fill{display:block;height:100%;border-radius:999px;background:color-mix(in srgb, var(--dsw-alias-brand-primary) 80%, transparent)}"
      + ".jtst-bar-fill-done{background:var(--dsw-alias-state-success-primary)}"
      + ".jtst-tablewrap{overflow-x:auto}"
      + ".jtst-table{width:100%;min-width:760px;border-collapse:collapse;font-size:12.5px}"
      + ".jtst-table th{text-align:left;padding:6px 8px;border-bottom:1px solid var(--dsw-alias-border-l1);font-size:11.5px;font-weight:500;color:var(--dsw-alias-label-secondary);white-space:nowrap}"
      + ".jtst-table td{padding:7px 8px;border-bottom:1px solid color-mix(in srgb, var(--dsw-alias-border-l1) 60%, transparent);vertical-align:middle;color:var(--dsw-alias-label-primary)}"
      + ".jtst-table tr:last-child td{border-bottom:none}"
      + ".jtst-table .jtst-num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}"
      + ".jtst-pager{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:10px;font-size:11.5px;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-pager-info{font-variant-numeric:tabular-nums}"
      + ".jtst-page-btn{height:24px;padding:0 10px;border-radius:6px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;font-size:11.5px;cursor:pointer}"
      + ".jtst-page-btn:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l2)}"
      + ".jtst-page-btn:disabled{opacity:.5;cursor:default}"
      + ".jtst-vlink{border:none;background:none;padding:0;cursor:pointer;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:600;color:var(--dsw-alias-brand-primary);border-radius:4px}"
      + ".jtst-vlink:hover{text-decoration:underline}"
      + ".jtst-section-title:focus{outline:none}"
      + ".jtst-vlink:focus-visible,.jtst-linkbtn:focus-visible,.jtst-sortbtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:4px}"
      + ".jtst-section-actions{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;justify-content:flex-end}"
      + ".jtst-linkbtn{border:none;background:none;padding:0;cursor:pointer;color:var(--dsw-alias-brand-primary);font:inherit;font-size:11.5px;text-decoration:underline;white-space:nowrap}"
      + ".jtst-sortbtn{display:inline-flex;align-items:center;gap:4px;border:none;background:none;padding:0;margin:0;cursor:pointer;color:inherit;font:inherit;font-size:11.5px;font-weight:500;white-space:nowrap}"
      + ".jtst-sortbtn:hover{color:var(--dsw-alias-label-primary)}"
      + ".jtst-sortbtn.is-active{color:var(--dsw-alias-brand-primary)}"
      + ".jtst-sort-ind{font-size:9px;opacity:.85}"
      + ".jtst-issue-table{min-width:900px}"
      + ".jtst-issue-table td{white-space:nowrap}"
      + ".jtst-issue-summary{max-width:380px;overflow:hidden;text-overflow:ellipsis}"
      + ".jtst-issue-key{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:600;color:var(--dsw-alias-brand-primary);text-decoration:none}"
      + ".jtst-issue-key:hover{text-decoration:underline}"
      + ".jtst-mine{margin-left:6px;padding:0 5px;border-radius:999px;font-size:10px;line-height:16px;background:color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent);color:var(--dsw-alias-brand-primary)}"
      + ".jtst-issue-table tr.is-mine{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 6%, transparent)}"
      + ".jtst-chip{display:inline-flex;align-items:center;height:18px;padding:0 7px;border-radius:999px;font-size:11px;white-space:nowrap;background:color-mix(in srgb, var(--dsw-alias-label-secondary) 12%, transparent);color:var(--dsw-alias-label-secondary)}"
      + ".jtst-chip-unreleased{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);color:var(--dsw-alias-brand-primary)}"
      + ".jtst-chip-released{background:color-mix(in srgb, var(--dsw-alias-state-success-primary) 14%, transparent);color:var(--dsw-alias-state-success-primary)}"
      + ".jtst-chip-archived{background:color-mix(in srgb, var(--dsw-alias-label-secondary) 10%, transparent);color:var(--dsw-alias-label-secondary)}"
      + ".jtst-chip-extra{background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 14%, transparent);color:var(--dsw-alias-state-warn-primary)}"
      + ".jtst-progress{display:flex;align-items:center;gap:8px;min-width:110px}"
      + ".jtst-progress .jtst-bar-track{flex:1}"
      + ".jtst-progress-text{min-width:36px;text-align:right;font-size:11.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}"
      + ".jtst-foot{margin-top:12px;font-size:11.5px;line-height:1.8;color:var(--dsw-alias-label-secondary)}"
      + ".jtst-pager .jtst-page-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}";

    // 统计页是 root 级 main 面板，不属于某个会话；「上次查看的项目编号」和
    // 会话面板按工作区保存的配置分开存（同一个 origin 的 localStorage）。
    var STATS_PANEL_ID = "jira-stats";
    var STATS_STORAGE_KEY = "dsh.jiraTasks.stats.v1";
    /** 版本列表每页条数（按发布日期倒序取“最近”的版本）。 */
    var VERSION_PAGE_SIZE = 10;

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

    // ---- 任务统计页：数据访问与本地存储 ----
    // 统一 POST JSON：空响应（通常来自尚未重载的旧 Host，未知路由返回 405）和非 JSON
    // 响应给出可操作提示，而不是把 "Unexpected end of JSON input" 直接抛给用户。
    function postJson(path, payload) {
      return fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload || {})
      }).then(function (response) {
        return response.text().then(function (text) {
          if (!text) {
            throw new Error("接口 " + path + " 返回空响应（HTTP " + response.status
              + "）——Host 可能仍在运行旧版本，请完全退出应用后重新打开（macOS 用 Cmd+Q）");
          }
          try {
            return JSON.parse(text);
          } catch (e) {
            throw new Error("接口 " + path + " 返回的不是 JSON（HTTP " + response.status + "）");
          }
        });
      });
    }

    function queryStats(projectKey) {
      return postJson("/jira/api/stats", { projectKey: projectKey });
    }

    function queryVersionIssues(projectKey, versionName) {
      return postJson("/jira/api/version-issues", { projectKey: projectKey, versionName: versionName });
    }

    function readStatsProjectKey() {
      try {
        if (typeof window === "undefined" || !window.localStorage) return "";
        var raw = window.localStorage.getItem(STATS_STORAGE_KEY);
        if (!raw) return "";
        var parsed = JSON.parse(raw);
        return parsed && typeof parsed.projectKey === "string" ? parsed.projectKey : "";
      } catch (e) {
        return "";
      }
    }

    function writeStatsProjectKey(projectKey) {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify({ projectKey: projectKey }));
        }
      } catch (e) { /* 存储失败不影响统计 */ }
    }

    // 第一次打开统计页时，默认沿用会话面板里已配置的项目编号（按工作区的第一条），
    // 这样“已有项目编号”不依赖用户重新输入。
    function firstWorkspaceProjectKey() {
      var all = loadAll();
      if (!all || typeof all !== "object" || isLegacy(all)) return "";
      for (var key in all) {
        if (!Object.prototype.hasOwnProperty.call(all, key)) continue;
        var entry = all[key];
        if (entry && typeof entry.projectKey === "string" && entry.projectKey.trim()) return entry.projectKey.trim();
      }
      return "";
    }

    // 工作区在下拉里的提示文案：配置里只存了工作区路径，取路径末段即可。
    function workspaceLabel(wsKey) {
      var text = String(wsKey || "").trim();
      if (!text) return "已配置";
      var parts = text.split(/[\\/]+/).filter(function (part) { return part; });
      return parts.length > 0 ? parts[parts.length - 1] : text;
    }

    // 下拉选项 = DSH 里已配置的项目 Key（各工作区在会话面板 ⚙ 中保存的 projectKey）
    // + 统计页最近查看的 Key。不是 JIRA 的全部项目列表。
    function configuredProjectOptions() {
      var options = [];
      var seen = {};
      function push(projectKey, hint) {
        var key = String(projectKey || "").trim().toUpperCase();
        if (!key || seen[key]) return;
        seen[key] = true;
        options.push({ key: key, hint: hint || "" });
      }
      push(readStatsProjectKey(), "最近查看");
      var all = loadAll();
      if (all && typeof all === "object") {
        if (isLegacy(all)) {
          push(all.projectKey, "已配置");
        } else {
          for (var wsKey in all) {
            if (!Object.prototype.hasOwnProperty.call(all, wsKey)) continue;
            var entry = all[wsKey];
            if (entry && typeof entry.projectKey === "string") push(entry.projectKey, workspaceLabel(wsKey));
          }
        }
      }
      return options;
    }

    function roundPercent(part, whole) {
      if (!whole) return 0;
      return Math.round((part / whole) * 1000) / 10;
    }

    function formatShare(part, whole) {
      if (!whole) return "0%";
      return String(Math.round((part / whole) * 1000) / 10) + "%";
    }

    function formatClock(iso) {
      try {
        var date = new Date(iso);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      } catch (e) {
        return "";
      }
    }

    // 统计结果的会话内缓存：重新进入统计页或切回看过的项目时，先渲染上次结果，
    // 再在后台静默刷新，避免整页 loading 闪烁。按项目 Key 存，最多保留几个。
    var STATS_CACHE_LIMIT = 6;
    var statsCache = {};
    var statsCacheOrder = [];

    function readStatsCache(projectKey) {
      return Object.prototype.hasOwnProperty.call(statsCache, projectKey) ? statsCache[projectKey] : null;
    }

    function writeStatsCache(projectKey, data) {
      statsCache[projectKey] = data;
      var index = statsCacheOrder.indexOf(projectKey);
      if (index !== -1) statsCacheOrder.splice(index, 1);
      statsCacheOrder.push(projectKey);
      while (statsCacheOrder.length > STATS_CACHE_LIMIT) {
        delete statsCache[statsCacheOrder.shift()];
      }
    }

    // 版本行的状态徽章：未发布 / 已发布 / 仅任务 / 已归档。
    function versionBadge(version) {
      if (version && version.extra) return { chip: "仅任务", chipClass: "jtst-chip jtst-chip-extra" };
      if (version && version.archived) return { chip: "已归档", chipClass: "jtst-chip jtst-chip-archived" };
      if (version && version.released) return { chip: "已发布", chipClass: "jtst-chip jtst-chip-released" };
      return { chip: "未发布", chipClass: "jtst-chip jtst-chip-unreleased" };
    }

    // 版本排序：按发布日期倒序（“最近”的排前面），无日期/仅任务版本排最后，再按名称。
    function compareVersionsByRecency(a, b) {
      var dateA = a && a.releaseDate ? String(a.releaseDate) : "";
      var dateB = b && b.releaseDate ? String(b.releaseDate) : "";
      if (dateA !== dateB) {
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA < dateB ? 1 : -1;
      }
      return String((a && a.name) || "").localeCompare(String((b && b.name) || ""));
    }

    // ---- 版本任务列表：排序与格式化 ----
    // 兼容英文默认优先级、常见别名与中文工作流；未知值排最后。
    var PRIORITY_RANK = {
      highest: 0, blocker: 0, "最高": 0, "紧急": 0,
      high: 1, critical: 1, "高": 1,
      medium: 2, normal: 2, "中": 2, "普通": 2,
      low: 3, "低": 3,
      lowest: 4, trivial: 4, "最低": 4
    };
    var STATUS_CATEGORY_RANK = { new: 0, indeterminate: 1, done: 2 };

    function priorityRank(name) {
      var key = String(name || "").toLowerCase();
      return Object.prototype.hasOwnProperty.call(PRIORITY_RANK, key) ? PRIORITY_RANK[key] : 5;
    }

    function statusCategoryRank(category) {
      return Object.prototype.hasOwnProperty.call(STATUS_CATEGORY_RANK, category) ? STATUS_CATEGORY_RANK[category] : 3;
    }

    /** 当前登录用户（宿主返回 me.name = JIRA 账号名）名下的任务。 */
    function isMyIssue(issue, me) {
      return !!(me && me.name && issue && issue.assigneeKey && issue.assigneeKey === me.name);
    }

    // 「HCPFYH1-9」应排在「HCPFYH1-10」前：同前缀时按数字比较，否则按字符串。
    function compareIssueKeys(aKey, bKey) {
      var left = String(aKey || "");
      var right = String(bKey || "");
      var matchLeft = /^(.*?)(\d+)$/.exec(left);
      var matchRight = /^(.*?)(\d+)$/.exec(right);
      if (matchLeft && matchRight && matchLeft[1] === matchRight[1]) {
        return parseInt(matchLeft[2], 10) - parseInt(matchRight[2], 10);
      }
      return left.localeCompare(right);
    }

    function compareIssueValues(a, b, field, dir) {
      var result = 0;
      if (field === "priority") {
        result = priorityRank(a.priority) - priorityRank(b.priority);
      } else if (field === "status") {
        result = statusCategoryRank(a.statusCategory) - statusCategoryRank(b.statusCategory);
        if (result === 0) result = String(a.status || "").localeCompare(String(b.status || ""));
      } else if (field === "updated") {
        var updatedA = String(a.updated || "");
        var updatedB = String(b.updated || "");
        result = updatedA === updatedB ? 0 : (updatedA < updatedB ? -1 : 1);
      } else {
        var valueA = field === "issueType" ? a.issueType
          : (field === "assignee" ? a.assignee : (field === "summary" ? a.summary : a.key));
        var valueB = field === "issueType" ? b.issueType
          : (field === "assignee" ? b.assignee : (field === "summary" ? b.summary : b.key));
        result = field === "key"
          ? compareIssueKeys(a.key, b.key)
          : String(valueA || "").localeCompare(String(valueB || ""));
      }
      // 同值时用编号兜底，保证排序结果稳定（两次点击不会互相换位）。
      if (result === 0 && field !== "key") result = compareIssueKeys(a.key, b.key);
      return dir === "desc" ? -result : result;
    }

    // 默认排序：本人任务在最前，其余按更新时间倒序。
    function compareIssuesDefault(a, b, me) {
      var mineA = isMyIssue(a, me);
      var mineB = isMyIssue(b, me);
      if (mineA !== mineB) return mineA ? -1 : 1;
      var updatedA = String(a.updated || "");
      var updatedB = String(b.updated || "");
      if (updatedA !== updatedB) return updatedA < updatedB ? 1 : -1;
      return compareIssueKeys(a.key, b.key);
    }

    function formatDateTime(iso) {
      try {
        var date = new Date(iso);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleString([], { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
      } catch (e) {
        return "";
      }
    }

    // 转圈：用 SVG 圆环而不是 CSS border 环——小尺寸下边框环会显得方/发虚，
    // SVG 的圆一定是圆的，颜色跟随 currentColor。
    function spinnerIcon(size) {
      var edge = typeof size === "number" ? size : 14;
      return h("svg", {
        className: "jtst-spin-svg",
        width: edge, height: edge, viewBox: "0 0 16 16", fill: "none",
        "aria-hidden": true
      },
        h("circle", { cx: 8, cy: 8, r: 6, stroke: "currentColor", strokeWidth: 2, opacity: 0.22 }),
        h("path", { d: "M8 2a6 6 0 0 1 6 6", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" })
      );
    }

    // 左侧栏图标：柱状图（原始线条，颜色跟随 currentColor，选中态加深填充）。
    function JiraStatsIcon(props) {
      var size = props && typeof props.size === "number" ? props.size : 16;
      var active = !!(props && props.active);
      return h("svg", {
        width: size, height: size, viewBox: "0 0 16 16", fill: "none",
        "aria-hidden": true, style: { display: "block" }
      },
        h("path", { d: "M2.6 13.4h10.8", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.55 }),
        h("rect", { x: "3.2", y: "8.4", width: "2.4", height: "4.2", rx: ".7", fill: "currentColor", fillOpacity: active ? 0.55 : 0.4 }),
        h("rect", { x: "6.8", y: "5.4", width: "2.4", height: "7.2", rx: ".7", fill: "currentColor", fillOpacity: active ? 0.8 : 0.65 }),
        h("rect", { x: "10.4", y: "2.6", width: "2.4", height: "10", rx: ".7", fill: "currentColor", fillOpacity: active ? 1 : 0.85 })
      );
    }

    // ---- 任务统计页组件（root 级 main 面板）----
    // 数据全部来自 Host（/jira/api/stats 已聚合好），这里只负责取数、切换项目、渲染。
    function JiraStatsPanel() {
      // 下拉选项只来自本浏览器里 DSH 已保存的项目 Key（不同工作区各一条），
      // 不向 JIRA 拉全量项目列表。
      var optionsState = React.useState(configuredProjectOptions);
      var options = optionsState[0];
      var setOptions = optionsState[1];
      var menuOpenState = React.useState(false);
      var menuOpen = menuOpenState[0];
      var setMenuOpen = menuOpenState[1];
      var highlightState = React.useState(-1);
      var highlight = highlightState[0];
      var setHighlight = highlightState[1];
      var comboRef = React.useRef(null);
      var draftKeyState = React.useState("");
      var draftKey = draftKeyState[0];
      var setDraftKey = draftKeyState[1];
      var activeKeyState = React.useState("");
      var activeKey = activeKeyState[0];
      var setActiveKey = activeKeyState[1];
      var phaseState = React.useState("idle"); // idle | loading | ready | error
      var phase = phaseState[0];
      var setPhase = phaseState[1];
      var statsState = React.useState(null);
      var stats = statsState[0];
      var setStats = statsState[1];
      var errorState = React.useState("");
      var error = errorState[0];
      var setError = errorState[1];
      // 手动刷新：只让刷新按钮转圈，不切整页 loading；失败时保留旧内容并提示。
      var refreshingState = React.useState(false);
      var refreshing = refreshingState[0];
      var setRefreshing = refreshingState[1];
      var refreshErrorState = React.useState("");
      var refreshError = refreshErrorState[0];
      var setRefreshError = refreshErrorState[1];
      var versionPageState = React.useState(1);
      var versionPage = versionPageState[0];
      var setVersionPage = versionPageState[1];
      // 点版本名进入的「版本任务列表」视图；null 时显示版本统计表。
      var selectedVersionState = React.useState(null);
      var selectedVersion = selectedVersionState[0];
      var setSelectedVersion = selectedVersionState[1];
      var versionPhaseState = React.useState("idle"); // idle | loading | ready | error
      var versionPhase = versionPhaseState[0];
      var setVersionPhase = versionPhaseState[1];
      var versionIssuesState = React.useState(null);
      var versionIssues = versionIssuesState[0];
      var setVersionIssues = versionIssuesState[1];
      var versionErrorState = React.useState("");
      var versionError = versionErrorState[0];
      var setVersionError = versionErrorState[1];
      var sortFieldState = React.useState("");
      var issueSortField = sortFieldState[0];
      var setIssueSortField = sortFieldState[1];
      var sortDirState = React.useState("asc");
      var issueSortDir = sortDirState[0];
      var setIssueSortDir = sortDirState[1];
      var versionRequestRef = React.useRef(0);
      var versionViewRef = React.useRef(null);
      var versionsViewRef = React.useRef(null);
      var versionViewSeenRef = React.useRef(false);
      var requestRef = React.useRef(0);

      // 统计某个项目编号：写回“上次查看”，并用请求序号丢弃过期响应。
      /**
       * 统计某个项目：有缓存就先渲染缓存内容，再在后台静默刷新（不切整页 loading）。
       * options.manual = 用户点「刷新」：只让刷新按钮转圈，失败保留旧内容并提示。
       * 换项目时才重置分页/版本任务视图；同项目刷新保留当前视图。
       */
      function loadStats(rawKey, options) {
        // JIRA 项目编号固定是大写；手输小写时统一转大写，避免无谓的 404/400。
        var key = String(rawKey || "").trim().toUpperCase();
        if (!key) return;
        var manual = !!(options && options.manual);
        var sameProject = key === activeKey;
        // 同一项目在 loading / 刷新中时忽略重复触发（回车、连点刷新）。
        if (sameProject && (phase === "loading" || refreshing)) return;

        var cached = readStatsCache(key);
        var token = ++requestRef.current;
        setDraftKey(key);
        setActiveKey(key);
        writeStatsProjectKey(key);
        if (!sameProject) {
          // 换项目：退出版本任务视图，版本列表回到第一页。
          versionRequestRef.current += 1;
          setVersionPage(1);
          setSelectedVersion(null);
          setVersionIssues(null);
          setVersionPhase("idle");
          setVersionError("");
          setIssueSortField("");
          setIssueSortDir("asc");
        }
        if (manual) setRefreshing(true);
        setRefreshError("");
        if (cached) {
          // 有缓存：立即显示旧内容，后台静默刷新。
          setStats(cached);
          setPhase("ready");
        } else if (!sameProject || phase !== "ready") {
          // 没有缓存可显示（首次打开该页 / 首次切到该项目）：才显示整页 loading。
          setStats(null);
          setError("");
          setPhase("loading");
        }

        queryStats(key).then(function (res) {
          if (token !== requestRef.current) return;
          if (manual) setRefreshing(false);
          if (res && res.ok) {
            setStats(res);
            setPhase("ready");
            writeStatsCache(key, res);
            return;
          }
          var message = (res && res.error) || "统计查询失败";
          if (cached || phase === "ready") {
            setRefreshError("刷新失败：" + message);
          } else {
            setStats(null);
            setError(message);
            setPhase("error");
          }
        }).catch(function (err) {
          if (token !== requestRef.current) return;
          if (manual) setRefreshing(false);
          var message = String((err && err.message) || err);
          if (cached || phase === "ready") {
            setRefreshError("刷新失败：" + message);
          } else {
            setStats(null);
            setError(message);
            setPhase("error");
          }
        });
      }

      React.useEffect(function () {
        var initial = readStatsProjectKey() || firstWorkspaceProjectKey();
        if (initial) loadStats(initial);
        return undefined;
      }, []);

      // 进入/返回版本任务视图时把焦点交给对应标题，避免焦点掉到 body。
      React.useEffect(function () {
        if (selectedVersion) versionViewSeenRef.current = true;
        if (!versionViewSeenRef.current) return;
        var node = selectedVersion ? versionViewRef.current : versionsViewRef.current;
        if (node && typeof node.focus === "function") {
          try { node.focus(); } catch (e) { /* 忽略不可聚焦的宿主环境 */ }
        }
      }, [selectedVersion]);

      // 组合框打开时，点面板外任意处关闭（mousedown 早于选项点击之外的失焦）。
      React.useEffect(function () {
        if (!menuOpen) return undefined;
        function onPointerDown(event) {
          var node = comboRef.current;
          if (node && event.target && node.contains(event.target)) return;
          setMenuOpen(false);
          setHighlight(-1);
        }
        document.addEventListener("mousedown", onPointerDown);
        return function () { document.removeEventListener("mousedown", onPointerDown); };
      }, [menuOpen]);

      function openMenu() {
        setOptions(configuredProjectOptions());
        setMenuOpen(true);
        setHighlight(-1);
      }

      function chooseProject(projectKey) {
        setMenuOpen(false);
        setHighlight(-1);
        loadStats(projectKey);
      }

      // Enter：有高亮选项就选它，否则统计输入框里的自定义 Key。
      // ↑/↓ 在选项间移动；Esc 收起。
      function handleComboKeyDown(event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          if (!menuOpen) openMenu();
          setHighlight(function (prev) {
            if (!filteredOptions.length) return -1;
            return prev < 0 ? 0 : Math.min(prev + 1, filteredOptions.length - 1);
          });
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          var wasClosed = !menuOpen;
          if (wasClosed) openMenu();
          setHighlight(function (prev) {
            if (!filteredOptions.length) return -1;
            if (wasClosed) return filteredOptions.length - 1;
            return prev <= 0 ? 0 : prev - 1;
          });
        } else if (event.key === "Enter") {
          if (menuOpen && highlight >= 0 && filteredOptions[highlight]) {
            event.preventDefault();
            chooseProject(filteredOptions[highlight].key);
          } else {
            setMenuOpen(false);
            setHighlight(-1);
            loadStats(draftKey);
          }
        } else if (event.key === "Escape") {
          setMenuOpen(false);
          setHighlight(-1);
        } else if (event.key === "Tab") {
          setMenuOpen(false);
        }
      }

      function versionRow(version, index) {
        var badge = versionBadge(version);
        var percent = roundPercent(version.done || 0, version.total || 0);
        return h("tr", { key: "v-" + String(version.name) + "-" + String(index) },
          h("td", null, h("button", {
            type: "button",
            className: "jtst-vlink",
            title: "查看该版本的任务列表",
            onClick: function () { openVersion(version); }
          }, String(version.name))),
          h("td", null, h("span", { className: badge.chipClass }, badge.chip)),
          h("td", null, version.releaseDate ? String(version.releaseDate) : "—"),
          h("td", { className: "jtst-num" }, String(version.total || 0)),
          h("td", { className: "jtst-num" }, String(version.todo || 0)),
          h("td", { className: "jtst-num" }, String(version.inProgress || 0)),
          h("td", { className: "jtst-num" }, String(version.done || 0)),
          h("td", null, h("span", { className: "jtst-progress" },
            h("span", { className: "jtst-bar-track" },
              h("span", { className: "jtst-bar-fill jtst-bar-fill-done", style: { width: percent + "%" } })),
            h("span", { className: "jtst-progress-text" }, version.total ? percent + "%" : "—")))
        );
      }

      function renderVersions(s) {
        var versions = (Array.isArray(s.versions) ? s.versions : []).slice().sort(compareVersionsByRecency);
        var totalPages = Math.max(1, Math.ceil(versions.length / VERSION_PAGE_SIZE));
        var page = Math.min(Math.max(versionPage, 1), totalPages);
        var startIndex = (page - 1) * VERSION_PAGE_SIZE;
        var pageVersions = versions.slice(startIndex, startIndex + VERSION_PAGE_SIZE);

        function goPage(nextPage) {
          setVersionPage(Math.min(Math.max(nextPage, 1), totalPages));
        }

        var table = versions.length
          ? h("div", { className: "jtst-tablewrap" },
            h("table", { className: "jtst-table" },
              h("thead", null, h("tr", null,
                h("th", null, "版本"),
                h("th", null, "状态"),
                h("th", null, "发布日期"),
                h("th", { className: "jtst-num" }, "任务"),
                h("th", { className: "jtst-num" }, "待办"),
                h("th", { className: "jtst-num" }, "进行中"),
                h("th", { className: "jtst-num" }, "已完成"),
                h("th", null, "完成率"))),
              h("tbody", null, pageVersions.map(function (version, index) {
                return versionRow(version, index);
              }))))
          : h("div", { className: "jtst-empty" }, "该项目还没有配置版本。");

        var pager = totalPages > 1
          ? h("div", { className: "jtst-pager" },
            h("span", { className: "jtst-pager-info" },
              "第 " + page + " / " + totalPages + " 页 · 共 " + versions.length + " 个版本"),
            h("button", {
              type: "button",
              className: "jtst-page-btn",
              disabled: page <= 1,
              onClick: function () { goPage(page - 1); }
            }, "上一页"),
            h("button", {
              type: "button",
              className: "jtst-page-btn",
              disabled: page >= totalPages,
              onClick: function () { goPage(page + 1); }
            }, "下一页"))
          : null;

        return h("section", { key: "versions", className: "jtst-section" },
          h("div", { className: "jtst-section-head" },
            h("h2", { className: "jtst-section-title", tabIndex: -1, ref: versionsViewRef }, "版本统计"),
            h("span", { className: "jtst-section-meta" },
              versions.length === 0
                ? "暂无版本"
                : (totalPages > 1
                  ? "最近 " + VERSION_PAGE_SIZE + " 个/页 · 共 " + versions.length + " 个版本"
                  : "共 " + versions.length + " 个版本"))),
          table,
          pager,
          h("div", { className: "jtst-foot" },
            "无版本任务 " + String(s.noVersionCount || 0) + " 条",
            h("div", null, "版本统计基于任务的 fixVersion 字段；一个任务可属于多个版本，所以各行任务数之和可能大于任务总数。")));
      }

      // ---- 版本任务列表（点版本名进入）----
      function openVersion(version) {
        var projectKey = String(activeKey || "").trim();
        if (!projectKey || !version || !version.name) return;
        var token = ++versionRequestRef.current;
        setSelectedVersion(version);
        setVersionIssues(null);
        setVersionPhase("loading");
        setVersionError("");
        setIssueSortField("");
        setIssueSortDir("asc");
        queryVersionIssues(projectKey, version.name).then(function (res) {
          if (token !== versionRequestRef.current) return;
          if (res && res.ok) {
            setVersionIssues(res);
            setVersionPhase("ready");
          } else {
            setVersionIssues(null);
            setVersionError((res && res.error) || "版本任务查询失败");
            setVersionPhase("error");
          }
        }).catch(function (err) {
          if (token !== versionRequestRef.current) return;
          setVersionIssues(null);
          setVersionError(String((err && err.message) || err));
          setVersionPhase("error");
        });
      }

      function closeVersion() {
        versionRequestRef.current += 1; // 丢弃未完成的响应
        setSelectedVersion(null);
        setVersionIssues(null);
        setVersionPhase("idle");
        setVersionError("");
      }

      function sortIssues(field) {
        if (issueSortField === field) {
          setIssueSortDir(issueSortDir === "asc" ? "desc" : "asc");
        } else {
          setIssueSortField(field);
          setIssueSortDir("asc");
        }
      }

      function sortedVersionIssueList() {
        var me = (versionIssues && versionIssues.me) || null;
        var list = (versionIssues && Array.isArray(versionIssues.issues) ? versionIssues.issues : []).slice();
        if (issueSortField) {
          list.sort(function (a, b) { return compareIssueValues(a, b, issueSortField, issueSortDir); });
        } else {
          list.sort(function (a, b) { return compareIssuesDefault(a, b, me); });
        }
        return list;
      }

      function renderVersionIssueTable(s) {
        var payload = versionIssues;
        var me = payload.me || null;
        var baseUrl = s.baseUrl || payload.baseUrl || "";
        var list = sortedVersionIssueList();
        var columns = [
          { field: "key", label: "编号" },
          { field: "summary", label: "摘要" },
          { field: "status", label: "状态" },
          { field: "priority", label: "优先级" },
          { field: "issueType", label: "类型" },
          { field: "assignee", label: "负责人" },
          { field: "updated", label: "更新" }
        ];
        var head = h("thead", null, h("tr", null, columns.map(function (column) {
          var active = issueSortField === column.field;
          var ariaSort = active ? (issueSortDir === "asc" ? "ascending" : "descending") : "none";
          return h("th", { key: column.field, "aria-sort": ariaSort },
            h("button", {
              type: "button",
              className: "jtst-sortbtn" + (active ? " is-active" : ""),
              title: "按" + column.label + "排序",
              onClick: function () { sortIssues(column.field); }
            }, column.label,
              h("span", {
                className: "jtst-sort-ind",
                "aria-hidden": "true"
              }, active ? (issueSortDir === "asc" ? "▲" : "▼") : "↕")));
        })));
        var rows = list.map(function (issue) {
          var mine = isMyIssue(issue, me);
          var statusClass = issue.statusCategory === "done"
            ? "jtst-chip jtst-chip-released"
            : (issue.statusCategory === "indeterminate" ? "jtst-chip jtst-chip-unreleased" : "jtst-chip");
          return h("tr", { key: issue.key, className: mine ? "is-mine" : undefined },
            h("td", null, h("a", {
              className: "jtst-issue-key",
              href: baseUrl ? baseUrl + "/browse/" + encodeURIComponent(issue.key) : undefined,
              target: baseUrl ? "_blank" : undefined,
              rel: "noreferrer",
              title: issue.key + " " + issue.summary
            }, issue.key)),
            h("td", { className: "jtst-issue-summary", title: issue.summary }, issue.summary || "—"),
            h("td", null, h("span", { className: statusClass }, issue.status || "—")),
            h("td", null, issue.priority || "—"),
            h("td", null, issue.issueType || "—"),
            h("td", null, issue.assignee || "未分配", mine ? h("span", { className: "jtst-mine" }, "我") : null),
            h("td", { className: "jtst-num" }, formatDateTime(issue.updated) || "—"));
        });
        var table = h("div", { className: "jtst-tablewrap" },
          h("table", { className: "jtst-table jtst-issue-table" },
            head,
            h("tbody", null, rows.length > 0
              ? rows
              : [h("tr", { key: "empty" }, h("td", { colSpan: 7, className: "jtst-empty" }, "该版本下没有任务。"))])));
        return h("div", null,
          payload.truncated
            ? h("div", { className: "jtst-notice jtst-notice-warn", role: "status" },
              "该版本任务较多（共 " + String(payload.total) + " 条），列表只展示已获取的 " + String(payload.fetched) + " 条。")
            : null,
          table,
          h("div", { className: "jtst-foot" },
            "默认排序：本人任务在前，其余按更新时间倒序；点击表头可切换排序字段与方向。",
            h("div", null, "点击任务编号在新标签页打开 JIRA 详情。")));
      }

      function renderVersionIssues(s) {
        var version = selectedVersion;
        var versionName = String((version && version.name) || "");
        var head = h("div", { className: "jtst-section-head" },
          h("h2", { className: "jtst-section-title", tabIndex: -1, ref: versionViewRef }, "版本任务 · " + versionName),
          h("div", { className: "jtst-section-actions" },
            h("span", { className: "jtst-section-meta" },
              versionPhase === "ready" && versionIssues
                ? "共 " + String(versionIssues.total) + " 条"
                : ""),
            issueSortField
              ? h("button", {
                type: "button",
                className: "jtst-linkbtn",
                onClick: function () { setIssueSortField(""); setIssueSortDir("asc"); }
              }, "恢复默认排序")
              : null,
            h("button", { type: "button", className: "jtst-linkbtn", onClick: closeVersion }, "← 返回版本列表")));

        var body;
        if (versionPhase === "loading") {
          body = h("div", { className: "jtst-loading", role: "status" },
            spinnerIcon(14),
            h("span", null, "正在加载 " + versionName + " 的任务…"));
        } else if (versionPhase === "error") {
          body = h("div", { className: "jtst-error", role: "alert" }, "加载失败：" + versionError);
        } else if (versionPhase === "ready" && versionIssues) {
          body = renderVersionIssueTable(s);
        } else {
          body = null;
        }

        return h("section", { key: "version-issues", className: "jtst-section" }, head, body);
      }

      function renderReady(s) {
        var sum = s.summary || { total: 0, done: 0, inProgress: 0, todo: 0 };
        var total = sum.total || 0;
        var completion = roundPercent(sum.done || 0, total);
        var cards = [
          { label: "任务总数", value: String(s.total), note: s.truncated ? "共 " + s.total + " 条；仅统计前 " + s.fetched + " 条" : "项目全部任务" },
          { label: "已完成", value: String(sum.done || 0), note: "占 " + formatShare(sum.done || 0, total) },
          { label: "进行中", value: String(sum.inProgress || 0), note: "占 " + formatShare(sum.inProgress || 0, total) },
          { label: "待办", value: String(sum.todo || 0), note: "占 " + formatShare(sum.todo || 0, total) },
          { label: "完成率", value: completion + "%", note: "已完成 / 已统计任务" }
        ];

        var nodes = [];
        nodes.push(h("div", { key: "cards", className: "jtst-cards" }, cards.map(function (card) {
          return h("div", { key: card.label, className: "jtst-card" },
            h("div", { className: "jtst-card-label" }, card.label),
            h("div", { className: "jtst-card-value" }, card.value),
            h("div", { className: "jtst-card-note" }, card.note));
        })));

        if (s.truncated) {
          nodes.push(h("div", { key: "truncated", className: "jtst-notice jtst-notice-warn", role: "status" },
            "任务总数 " + s.total + " 条，已达到统计上限或时间预算（已统计 " + String(s.fetched) + " 条），以下版本统计只基于这些任务。"));
        }

        if (total === 0) {
          nodes.push(h("div", { key: "empty", className: "jtst-empty" }, "该项目暂无任务。"));
        }

        nodes.push(selectedVersion ? renderVersionIssues(s) : renderVersions(s));
        return h.apply(null, ["div", null].concat(nodes));
      }

      // 可下拉的输入框：既是文本框（可输入自定义项目 Key），也是已配置 Key 的选择器。
      function renderProjectPicker(visibleOptions) {
        var emptyText = options.length === 0
          ? "还没有已配置的项目 Key——先在会话面板的 ⚙ 里配置项目，或直接输入编号后回车。"
          : "没有匹配的项目 Key，回车可直接统计 " + (String(draftKey || "").trim().toUpperCase() || "当前输入") + "。";
        var optionNodes = visibleOptions.map(function (option, index) {
          return h("li", {
            key: option.key,
            id: "jtst-project-option-" + index,
            role: "option",
            "aria-selected": index === highlight ? "true" : "false",
            className: "jtst-combo-option" + (index === highlight ? " is-active" : ""),
            onMouseDown: function (event) { event.preventDefault(); chooseProject(option.key); },
            onMouseEnter: function () { setHighlight(index); }
          },
            h("span", { className: "jtst-combo-key" }, option.key),
            option.hint ? h("span", { className: "jtst-combo-hint" }, option.hint) : null);
        });
        return h("div", { className: "jtst-combo", ref: comboRef },
          h("input", {
            id: "jtst-project-key",
            className: "jtst-combo-input",
            type: "text",
            role: "combobox",
            "aria-label": "项目 Key",
            "aria-expanded": menuOpen ? "true" : "false",
            "aria-controls": "jtst-project-options",
            "aria-autocomplete": "list",
            "aria-activedescendant": menuOpen && highlight >= 0 && visibleOptions[highlight]
              ? "jtst-project-option-" + highlight
              : undefined,
            autoComplete: "off",
            spellCheck: false,
            value: draftKey,
            placeholder: "选择或输入项目 Key",
            onChange: function (event) {
              setDraftKey(event.target.value);
              setOptions(configuredProjectOptions());
              setMenuOpen(true);
              setHighlight(-1);
            },
            onFocus: function () { if (!menuOpen) openMenu(); },
            onClick: function () { if (!menuOpen) openMenu(); },
            onKeyDown: handleComboKeyDown
          }),
          h("button", {
            type: "button",
            className: "jtst-combo-toggle",
            tabIndex: -1,
            "aria-label": menuOpen ? "收起项目列表" : "展开项目列表",
            onMouseDown: function (event) { event.preventDefault(); },
            onClick: function () {
              if (menuOpen) {
                setMenuOpen(false);
                setHighlight(-1);
                return;
              }
              openMenu();
              var input = comboRef.current && comboRef.current.querySelector("input");
              if (input) input.focus();
            }
          }, menuOpen ? "▴" : "▾"),
          menuOpen
            ? h("ul", { id: "jtst-project-options", className: "jtst-combo-list", role: "listbox" },
              optionNodes.length > 0
                ? optionNodes
                : h("li", { className: "jtst-combo-empty", role: "presentation" }, emptyText))
            : null);
      }

      function renderFoot(s) {
        return h("div", { className: "jtst-foot" },
          "统计对象：" + s.projectKey + " · 任务 " + String(s.fetched) + " / " + String(s.total) + " 条 · 更新于 " + formatClock(s.fetchedAt),
          h("div", null, "数据来自 JIRA REST API；JIRA 地址与令牌在「设置 → JIRA 配置」中维护。"));
      }

      var projectTitle = (activeKey || draftKey || "").trim();
      var subtitleParts = [];
      if (projectTitle) subtitleParts.push(projectTitle);
      subtitleParts.push(phase === "ready" && stats
        ? "统计 " + String(stats.fetched) + " / " + String(stats.total) + " 条任务"
        : "选择或输入项目 Key 后统计");

      // 输入即过滤：命中 Key 本身，或命中工作区提示（例如路径末段）。
      // 但输入框显示的正好是当前项目时不按它过滤——否则展开下拉只剩当前这一项，
      // 没法在其中切换到其它已配置的项目。
      var typedKey = String(draftKey || "").trim().toUpperCase();
      var filterText = typedKey && typedKey !== String(activeKey || "").trim().toUpperCase() ? typedKey : "";
      var filteredOptions = options.filter(function (option) {
        if (!filterText) return true;
        return option.key.indexOf(filterText) !== -1
          || String(option.hint || "").toUpperCase().indexOf(filterText) !== -1;
      });

      var toolbar = h("div", { className: "jtst-toolbar" },
        h("label", { className: "jtst-label", htmlFor: "jtst-project-key" }, "项目 Key"),
        renderProjectPicker(filteredOptions),
        h("button", {
          type: "button",
          className: "jtst-btn jtst-btn-primary",
          disabled: phase === "loading" || !(draftKey || "").trim(),
          onClick: function () { loadStats(draftKey); }
        }, phase === "loading" ? "统计中…" : "查询"),
        h("button", {
          type: "button",
          className: "jtst-btn",
          title: refreshing ? "正在刷新…" : "重新统计当前项目（后台刷新，不打断当前内容）",
          disabled: phase === "loading" || refreshing || !activeKey,
          "aria-busy": refreshing ? "true" : "false",
          onClick: function () { loadStats(activeKey, { manual: true }); }
        },
          refreshing
            ? spinnerIcon(13)
            : "⟳",
          h("span", null, refreshing ? "刷新中…" : "刷新")),
        h("span", { className: "jtst-status" }, refreshing
          ? "刷新中…"
          : (phase === "loading"
            ? "正在统计…"
            : (phase === "ready" && stats ? "更新于 " + formatClock(stats.fetchedAt) : ""))));

      var content;
      if (phase === "loading") {
        content = h("div", { className: "jtst-loading", role: "status" },
          spinnerIcon(14),
          h("span", null, "正在统计 " + activeKey + " 的任务…（任务较多的项目需要几秒）"));
      } else if (phase === "error") {
        content = h("div", { className: "jtst-error", role: "alert" }, "统计失败：" + error);
      } else if (phase === "ready" && stats && stats.summary) {
        content = renderReady(stats);
      } else {
        content = h("div", { className: "jtst-idle" },
          h("div", null, "从下拉里选择 DSH 中已配置的项目 Key，或直接输入项目编号后回车。"),
          h("div", null, "统计页会显示该项目的任务概览与版本统计（最近 10 个/页，可翻页）。"));
      }

      return h("div", { className: "jtst-page" },
        h("div", { className: "jtst-inner" },
          h("div", { className: "jtst-head" },
            h("div", { className: "jtst-headmain" },
              h("h1", { className: "jtst-title" }, "JIRA 任务统计"),
              h("p", { className: "jtst-sub" }, subtitleParts.join(" · ")))),
          toolbar,
          refreshError
            ? h("div", { className: "jtst-notice jtst-notice-warn", role: "status" }, refreshError)
            : null,
          content,
          phase === "ready" && stats ? renderFoot(stats) : null));
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
      var collapsedState = React.useState(true);
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

    // 返回两处渲染位的组件：{ card } 给 plugins.item，{ section } 给 settings.section。
    // 两者共用同一个 JiraSettingsPage 与同一份 scope / credentials 句柄。
    function createJiraSettingsSurfaces(scope, credentials) {
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

      // 同一个表单服务两处渲染位：
      // - plugins.item：列表里的卡片摘要（view="summary"）与点开后的详情（其余 view）；
      // - settings.section：设置导航里的整页（variant="page"）。
      // 分发组件自身不调用任何 hook，钩子全部留在 JiraSettingsPage 里，这样同一个实例
      // 的 hook 数量与 view 取值无关——这是 React 的硬性要求，早期版本把摘要提前 return
      // 写在 hook 之前会踩这条规则。
      function JiraSettingsPage(props) {
        // "page" = 设置对话框左侧导航的整页（settings.section）；默认 = 插件面板里的卡片。
        var asPage = !!(props && props.variant === "page");
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

        // 字段区在两种形态下完全一致，只有外层容器不同：插件面板卡片（li.jt-set-card）
        // vs 设置导航整页（div.jt-set-page）。h.apply 用来展开字段数组，保持 ES5 风格。
        var fields = [
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
        ];

        if (asPage) {
          return h("div", { className: "jt-set-page" },
            h("h2", { className: "jt-page-title" }, "JIRA 配置"),
            h("p", { className: "jt-page-intro" }, "JIRA 地址与访问令牌（令牌写入凭据存储，不回传前端）。项目 Key / JQL 仍按工作区在会话面板的 ⚙ 中配置。"),
            h.apply(null, ["div", { className: "jt-set-form" }].concat(fields))
          );
        }

        return h.apply(null, ["li", { className: "jt-set-card" },
          h("div", { className: "jt-set-head" },
            h("span", { className: "jt-set-title" }, "JIRA"),
            h("span", { className: "jt-set-desc" }, "JIRA 地址与访问令牌。项目 Key / JQL 仍按工作区在会话面板的 ⚙ 中配置。")
          )
        ].concat(fields));
      }

      // 槽位组件：摘要位只回一行文字，详情位挂载真正的表单（不调用任何 hook）。
      function JiraSettingsCard(props) {
        if (props && props.view === "summary") return "JIRA 地址、令牌与连接状态";
        return h(JiraSettingsPage, null);
      }

      // 设置对话框左侧导航的一项（settings.section）：整页形态的同一个表单。
      function JiraSettingsSection() {
        return h(JiraSettingsPage, { variant: "page" });
      }

      return { card: JiraSettingsCard, section: JiraSettingsSection };
    }

    function apply(ctx) {
      // ctx.effect(cb) 会立即执行 cb 并把其返回值作为卸载时的清理函数，
      // 所以样式注入必须放在回调内、返回移除函数，否则标签刚插入就被删除。
      ctx.effect(function () {
        var styleTag = document.createElement("style");
        styleTag.textContent = CSS + STATS_CSS;
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

      // 左侧栏入口 + 统计面板（DSH 0.2.0 的全局面板机制）：
      //   sidebar.panellist —— 左侧栏图标行，id 同时是 main 面板的 key；
      //   main（keyed）     —— 点图标后在中央列渲染整页任务统计。
      // 两处都包在 slots.inject 里：侧栏/布局包没就绪时不报错，就绪后自动挂上。
      ctx.effect(function () {
        return slots.inject("sidebar.panellist", function () {
          return slots.register({
            name: "sidebar.panellist",
            id: STATS_PANEL_ID,
            order: 30,
            label: "JIRA 统计"
          }, JiraStatsIcon);
        });
      }, "jira-tasks: stats sidebar entry");
      ctx.effect(function () {
        return slots.inject("main", function () {
          return slots.register({ name: "main", key: STATS_PANEL_ID }, JiraStatsPanel);
        });
      }, "jira-tasks: stats panel");

      // 设置表单的两处注册。DSH 0.1.5+ ：设置表单的服务是 configForms，命名空间就是
      // 本插件的 profile 条目 id（jira-tasks）；两处都只在宿主确实提供了该命名空间
      // 时才出现（whileServed 的 disposer 交回各自的 effect）。
      //
      // 1) 插件面板卡片（plugins.item）：插件自己的配置项，原来就在这里。
      // 2) 设置对话框左侧导航项（settings.section）：id/order/label 是导航身份，
      //    order 大于 Agent 预设（20），所以排在它下面；label 直接给字符串
      //    （槽位用 resolveSlotLabel 读，字符串与 thunk 都接受）。未知 id 由设置
      //    外壳回退到默认齿轮图标，无需注册图标。
      var configForms = ctx.get("configForms");
      var remote = ctx.get("remote");
      if (configForms && remote && remote.credentials) {
        var surfaces = createJiraSettingsSurfaces(configForms.get(SETTINGS_NS), remote.credentials);
        ctx.effect(function () {
          return configForms.whileServed([SETTINGS_NS], function () {
            return slots.inject("plugins.item", function () {
              return slots.register({ name: "plugins.item", id: SETTINGS_NS, order: 41, label: "JIRA" }, surfaces.card);
            });
          });
        }, "jira-tasks: plugins page card");
        ctx.effect(function () {
          return configForms.whileServed([SETTINGS_NS], function () {
            return slots.inject("settings.section", function () {
              return slots.register({ name: "settings.section", id: SETTINGS_NS, order: 30, label: "JIRA 配置" }, surfaces.section);
            });
          });
        }, "jira-tasks: settings section");
      }
    }

    exports.inject = ["slots", "configForms", "remote", "remote.credentials"];
    exports.apply = apply;
    return module.exports;
  }
});
