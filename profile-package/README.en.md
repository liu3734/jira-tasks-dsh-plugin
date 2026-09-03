# JIRA Open Tasks Panel (DeepSeek Harness Plugin)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[中文](README.md) · **English**

Shows the current JIRA project's **open / reopened** issues **assigned to the current user** below the DSH composer input. The JIRA base URL and token are read from credentials; the project key and JQL are **configured per workspace** and persisted.

## Features

- 📋 Panel shown below the composer in both new and active sessions (aligned with the input width in new sessions)
- 👤 Defaults to the current user (`assignee = currentUser()`) with status `开启 / 重新开启` (Open / Reopened)
- ⚙️ Project key and JQL are saved per workspace; unconfigured workspaces show "unconfigured"
- 🔄 Auto-query on every new session, with a one-click refresh (⟳)
- 🔗 Click an issue to open its JIRA detail in a new tab
- 🎨 Uses DSH theme tokens; adapts to light / dark themes

## Install

Published to npm:

```bash
dsh plugin --profile web add dsh-jira-tasks
```

**Restart DSH** to activate.

<details>
<summary>Manual install (without npm)</summary>

1. Copy the repo's `profile-package/` to `~/.dsh/profiles/web/packages/dsh-jira-tasks/`
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

Write to `$DSH_HOME/.credentials.yaml` (recommended, hot-reloaded), or export environment variables before launching DSH:

```yaml
JIRA_BASE_URL: "http://jira.example.com/"
JIRA_API_TOKEN: "<PAT or user:token>"
```

- Base URL aliases: `JIRA_BASE_URL` / `JIRA_URL`
- Token aliases: `JIRA_API_TOKEN` / `JIRA_TOKEN`
- Auth is auto-detected: tokens containing `:` use Basic, otherwise Bearer (JIRA PAT)

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
| JIRA_BASE_URL not configured | Credentials missing — see "Configuration 1" above |
| 401 … | Invalid token or wrong auth scheme; verify with `curl -H "Authorization: Bearer <token>" <base>/rest/api/2/myself` |
| Cannot parse JIRA response | Network / proxy issue, curl produced no output |
</details>

<details>
<summary>Panel does not appear</summary>

- Make sure it is installed and DSH was **restarted**; in new sessions the panel sits below the input
- Check the DSH startup log for profile plugin load errors
</details>

## Architecture & Implementation Details

<details>
<summary>Expand</summary>

```
┌─────────── Browser (Client) ───────────┐      ┌──────────── Host ──────────────┐
│ conversation.composer.dock (active)        │      │ webServer route /jira/api/search │
│ conversation.input.dock (new, order:99)    │      │   ↓                            │
│   ↓ on mount/refresh fetch POST            │      │ credentials.resolve(JIRA_*)     │
│ render: list / error / unconfigured        │      │ subprocess.spawn(curl …)        │
│ localStorage per-workspace config          │      │   ↓ stdout JSON                 │
└────────────────────────────────────────────┘      │ parse issues → {ok,issues}      │
                                                    └────────────────────────────────┘
```

- **Host**: registers a `webServer` route `POST /jira/api/search`; credentials resolved via the `credentials` service (env / `$DSH_HOME/.credentials.yaml`, hot-reloaded); queries run through `subprocess` spawning `curl` directly, with the auth header passed via stdin (`--config -`) so the token never appears in argv.
- **Client**: a standard `window.__ModuleLoader__.load({ id, factory })` web bundle; registers `conversation.composer.dock` (active sessions) and `conversation.input.dock` (new sessions, flex `order: 99` below the input, aligned width).
- **Why not the `shell` service**: `shell` wraps commands with `sandbox-exec`, which is broken on some macOS versions (`sandbox_apply: Operation not permitted`); `subprocess` is the raw process seam without this issue.
- **New-session display**: the DSH shell does not render `composer.dock` during the hero (blank session) phase, so the plugin also registers `input.dock` and de-duplicates by "session has messages".

**Differences from the dynamic version**

| Aspect | Dynamic plugin | Persistent install (this package) |
|---|---|---|
| Persistence | Lost on restart | Survives restart |
| Client→Host | `host.call` / `harness.handle` | `webServer` route + `fetch` |
| Client bundle | Injected per session | `/plugins/dsh-jira-tasks/client.js` |
| Config / credentials | Same `localStorage` key, same `.credentials.yaml` | Identical |
</details>

## License

MIT
