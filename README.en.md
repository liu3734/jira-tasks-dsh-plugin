# JIRA Open Tasks Panel (DeepSeek Harness Plugin)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[中文](README.md) · **English**

Shows the current JIRA project's **open / reopened** issues **assigned to the current user** below the DSH composer input. The JIRA base URL and token are configured in **Settings → JIRA 配置** (the settings dialog's left navigation) (`JIRA_BASE_URL` / `JIRA_API_TOKEN` act as fallback); the project key and JQL are **configured per workspace** and persisted.

> **DSH version targeted: 0.1.7 (verified on `0.1.7-rc.2`).** The client slots `conversation.input.dock` / `plugins.item` / `settings.section`, the settings service `ctx.configForms` (namespace = profile entry id `jira-tasks`), and the `ctx.effect` / `configForms.whileServed` disposal contracts all follow the 0.1.7 interfaces; the 0.1.6-era `settingsScope` / `settings.register` / `settings.plugin.item` APIs are gone and no longer used.

## Features

- 📋 Panel shown below the composer in both new and active sessions (aligned with the input width in new sessions)
- 👤 Defaults to the current user (`assignee = currentUser()`) with status `开启 / 重新开启` (Open / Reopened)
- ⚙️ **Settings → JIRA 配置** (left navigation, below Agent presets) edits the base URL and access token (the token is written to the credential store and never sent back to the browser); the same JIRA card stays available in the Plugins panel
- 🟢 The card auto-probes the connection and shows a status light: green = usable, red = unusable, grey = unconfigured; **Test connection** verifies unsaved drafts immediately
- ⚙️ Project key and JQL are saved per workspace; unconfigured workspaces show "unconfigured"
- 🔄 Auto-query on every new session, with a one-click refresh (⟳)
- 🔗 Click an issue to open its JIRA detail in a new tab
- 🎨 Uses DSH theme tokens; adapts to light / dark themes

## Install

Published to npm:

```bash
dsh plugin --profile web add dsh-jira-tasks
```

Or straight from GitHub (the repository root is the package directory; `lib/` is prebuilt):

```bash
dsh plugin --profile web add github:liu3734/jira-tasks-dsh-plugin
```

**Restart DSH** to activate.

> **Nothing shows up? Check `dsh.profile.bundles` first.** DSH mounts this package as a profile layer only when `"dsh-jira-tasks"` is listed in `dsh.profile.bundles` of `~/.dsh/profiles/web/package.json`; being in `dependencies` alone is not enough — the startup log then prints `patch: entry "jira-tasks" not found` and the plugin silently never loads. `dsh plugin --profile web add` normally appends that row, but it will not re-append when the package is already a dependency; add `"dsh-jira-tasks"` to `dsh.profile.bundles` by hand.

> Using GitHub Packages instead: configure `@liu3734:registry=https://npm.pkg.github.com/` plus a read token in the profile's `.npmrc`, then run `dsh plugin --profile web add @liu3734/dsh-jira-tasks`.

<details>
<summary>Manual install (without npm)</summary>

1. Copy this repository (its root is the package directory) to `~/.dsh/profiles/web/packages/dsh-jira-tasks/` (skip `.git/`)
2. Edit `~/.dsh/profiles/web/package.json`:
   - Add to `dependencies`: `"dsh-jira-tasks": "file:./packages/dsh-jira-tasks"`
   - Append to `dsh.profile.bundles`: `"dsh-jira-tasks"`
3. Run `pnpm install` in the profile directory
4. Restart DSH

> Note: `pnpm install` **copies** the package into `node_modules/` (not a symlink) — after editing sources, sync `node_modules/dsh-jira-tasks` or re-run install.
</details>

<details>
<summary>Dynamic plugin (temporary, lost on restart)</summary>

In a DSH session, use the Cordis tools: `cordis_define` (`kind: new`, `idPrefix: "jira"`, sources in `plugin/host.js` / `plugin/client.js`) → `cordis_run` to activate. Dynamic plugins live only in process memory and **disappear on restart** — for trial use only.
</details>

## Configuration

### 1. JIRA base URL and token

Open **Settings → JIRA 配置** (the last item in the left navigation, below Agent presets; the JIRA card in the Plugins panel is the same form) and fill in:

- **JIRA base URL**: e.g. `http://jira.example.com/` (written to this plugin entry's `Config.baseUrl` — the `jira-tasks` row in the profile's `cordis.patch.yml` — and read back by the form; a host-refused write now surfaces as an error instead of failing silently)
- **Access token / PAT**: written to the credential store (`$DSH_HOME/.credentials.yaml`) under the plugin-owned ref `JIRA_TASKS_TOKEN`; the browser only ever sees "configured", never the token itself

Leaving the token blank on save keeps the existing one; clearing the address on save removes the override and falls back to the credential store / environment. Auth is auto-detected: tokens containing `:` use Basic, otherwise Bearer (JIRA PAT).

> **The settings-page token takes precedence over the environment.** When the environment that launched DSH already defines `JIRA_API_TOKEN` (a Windows *user-level* variable counts), the card is still editable: it stores the token in its own ref `JIRA_TASKS_TOKEN`, which DSH accepts (it only refuses to write a ref the launching environment shadows), and the Host resolves tokens in this order:
>
> ```
> JIRA_TASKS_TOKEN (settings card) > JIRA_API_TOKEN > JIRA_TOKEN
> ```
>
> Click **Clear settings token** in the card to fall back to the environment variable again.

#### Connection test

The card's footer carries a status light and a **Test connection** button:

- Opening the card **auto-probes** once (against JIRA `/rest/api/2/myself`), and saving re-probes
- **Green** = address and token work (the current user is shown); **red** = unusable (JIRA's reason, e.g. 401, is shown); **grey** = address or token not configured
- **Test connection** probes what is currently in the fields, saved or not, so you can check before saving

Environment variables / credentials still work as a **fallback** (used when the settings card leaves `baseUrl` empty), hot-reloaded without a restart. Address precedence is `Config.baseUrl` > `JIRA_BASE_URL` > `JIRA_URL`, and `JIRA_BASE_URL` may live in the launching environment or in `.credentials.yaml` — note that a stale record (e.g. an old domain left in the credential file) becomes effective again as soon as the settings page clears the address:

```yaml
JIRA_BASE_URL: "http://jira.example.com/"
JIRA_API_TOKEN: "<PAT or user:token>"
```

- Base URL aliases: `JIRA_BASE_URL` / `JIRA_URL`
- Token resolution order: `JIRA_TASKS_TOKEN` (written by the settings card) → `JIRA_API_TOKEN` → `JIRA_TOKEN`; the first match wins

### 2. Project key and JQL (per workspace)

- Click **⚙** on the panel header to open settings (the form shows the target workspace)
- **Project key**: e.g. `HCPFYH1` — saved and queried immediately; auto-loaded for new sessions in that workspace
- **JQL**: leave empty for the default, or write a custom JQL where `{projectKey}` (or `{key}`) is replaced by the project key

Default query:

```jql
project = "{projectKey}" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC
```

> The status names follow the Chinese workflow (`开启`/`重新开启`). For English statuses (Open/Reopened), set a custom JQL in ⚙.

## Uninstall

```bash
dsh plugin --profile web remove dsh-jira-tasks
```

## Troubleshooting

<details>
<summary>Panel shows "query failed"</summary>

| Message | Fix |
|---|---|
| JIRA base URL not configured | Address missing — see "Configuration 1" above |
| JIRA token not configured | Token missing — see "Configuration 1" above |
| 401 … | Invalid token or wrong auth scheme; verify with `curl -H "Authorization: Bearer <token>" <base>/rest/api/2/myself` |
| Cannot parse JIRA response | Network / proxy issue, curl produced no output |
</details>

<details>
<summary>Can the settings card override the token from the environment?</summary>

**Yes.** The card stores the token under the plugin-owned ref `JIRA_TASKS_TOKEN` instead of writing the environment's `JIRA_API_TOKEN`. DSH only refuses to write a ref the launching environment *shadows*, so its own ref is always writable: even with `JIRA_API_TOKEN` exported by the shell or the OS, the field accepts input, the save succeeds, and the Host prefers it:

```
JIRA_TASKS_TOKEN (settings card) > JIRA_API_TOKEN > JIRA_TOKEN
```

- The card names the effective source: with a saved token it says "overrides environment variable JIRA_API_TOKEN"; without one it says "currently using environment variable JIRA_API_TOKEN — fill in and save to override"
- Saving re-probes the connection; **Clear settings token (fall back to environment)** removes the override
- The one remaining case that reports `is supplied read-only by the launching environment` is someone exporting `JIRA_TASKS_TOKEN` itself — that ref really is read-only then; remove it (Windows: System Properties → Environment Variables, or PowerShell `[Environment]::SetEnvironmentVariable('JIRA_TASKS_TOKEN', $null, 'User')`) and restart DSH
</details>

<details>
<summary>Panel does not appear</summary>

- Make sure it is installed and DSH was **restarted**; in new sessions the panel sits below the input
- Check that `dsh.profile.bundles` in `~/.dsh/profiles/web/package.json` lists `"dsh-jira-tasks"` (the most common cause of a silent no-show — see the Install note)
- Check the DSH startup log: `patch: entry "jira-tasks" not found` means the profile layer was never composed; `webserver: duplicate exact route` means a route was registered twice (the plugin releases its routes through `ctx.effect`, so this points at a second copy)
- A browser console error `client-modules: could not load "dsh-jira-tasks"` means `/plugins/dsh-jira-tasks/client.js` was not served — confirm `exports["./client"]` resolves to the built `lib/client.js`
</details>

## Architecture & Implementation Details

<details>
<summary>Expand</summary>

```
┌────────────── Browser (Client) ──────────────┐      ┌─────────────── Host ───────────────┐
│ conversation.input.dock (both states)        │      │ webServer route /jira/api/search   │
│ CSS order:99 -> below the input, full width  │      │ entry Config.baseUrl (volatile)    │
│ on mount/refresh: fetch POST                 │      │ credentials.resolve(TOKEN_REFS)    │
│ render: list / error / unconfigured          │      │ subprocess.spawn(curl ...)         │
│ localStorage: per-workspace key/JQL          │      │ parse stdout JSON                  │
│ plugins.item (Plugins panel card)            │      │ return {ok, issues}                │
│ settings.section (Settings nav page)         │      │                                    │
└──────────────────────────────────────────────┘      └────────────────────────────────────┘

- **Host**: declares the entry's own `Config` (`baseUrl`, `volatile` — since DSH 0.1.5 a settings page is built from it; `settings.configure({ auto: false }, ctx.fiber)` turns the auto-generated page off and hands its disposer back to `ctx.effect`) plus `webServer` routes `POST /jira/api/search` and `POST /jira/api/test`, each wrapped in its own `ctx.effect` (a reload otherwise hits "duplicate route" and fails activation; non-POST requests get 405); the token comes from the `credentials` service resolved in the order `JIRA_TASKS_TOKEN` (written by the Settings card) → `JIRA_API_TOKEN` → `JIRA_TOKEN` (`$DSH_HOME/.credentials.yaml` / environment, hot-reloaded), so a saved card token overrides the environment; queries run through `subprocess` spawning `curl` directly, with the auth header passed via stdin (`--config -`) so the token never appears in argv.
- **Client**: a standard `window.__ModuleLoader__.load({ id, factory })` web bundle requiring only `"react"`; registers **only `conversation.input.dock`** (`order: 10`) — that seat renders in both new and active sessions and is a full-width row of `composerStack` (`flex-direction: column`), where the panel's own CSS `order: 99` places it below the input card at the card's width. `conversation.composer.dock` is deliberately NOT used: in 0.1.7 it renders into InputBar's `.dock` **row**, side by side with the context meter, so a full-width panel there gets its right-hand content covered by the meter. The address/token form comes from `ctx.configForms.get("jira-tasks")` and the token is written through `remote.credentials` to `JIRA_TASKS_TOKEN`; `configForms.whileServed` keeps it hidden when the host serves no such namespace. It is registered in **two places**: the Plugins-panel card `plugins.item` (`id: "jira-tasks"`, `order: 41`) and a Settings-navigation section `settings.section` (`id: "jira-tasks"`, `order: 30` — above Agent presets' 20, so it sits below it; `label: "JIRA 配置"`; ids outside the shell's `navIcon` allow-list fall back to the default gear icon). Both share one `JiraSettingsPage`, whose outer container is chosen by the external `variant: "page"` prop (`li.jt-set-card` card vs `div.jt-set-page` page) while the field block is the same array. The card's `summary` view is rendered by a dispatcher that calls **no hooks**, while the form lives in a separate `JiraSettingsPage`, so flipping `view` on one mounted instance never changes its hook count.
- **Why not the `shell` service**: `shell` wraps commands with `sandbox-exec`, which is broken on some macOS versions (`sandbox_apply: Operation not permitted`); `subprocess` is the raw process seam without this issue.
- **One registration covers both states**: `conversation.input.dock` renders whenever a session and its input exist, so new and active sessions need no separate registrations (the older `composer.dock` + blank-session de-duplication was both unnecessary under 0.1.7 and the cause of the meter-row collision).

**Differences from the dynamic version**

| Aspect | Dynamic plugin | Persistent install (this package) |
|---|---|---|
| Persistence | Lost on restart | Survives restart |
| Client→Host | `host.call` / `harness.handle` | `webServer` route + `fetch` |
| Client bundle | Injected per session | `/plugins/dsh-jira-tasks/client.js` |
| Config / credentials | Env / `.credentials.yaml` only (no Settings card) | Settings nav page + Plugins-panel card + same `.credentials.yaml` fallback |
</details>

## License

MIT
