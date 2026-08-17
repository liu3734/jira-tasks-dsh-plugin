# JIRA 开启任务面板（DeepSeek Harness 插件）

在 DSH 会话的**输入框下方**展示当前 JIRA 项目**指派给当前用户**的"开启 / 重新开启"任务列表。JIRA 地址与令牌从凭据/环境变量读取，项目 Key 与 JQL **按工作区配置**并持久化；每个新会话自动查询。

> 适用于 DSH（DeepSeek Harness）桌面端。提供两种注册方式：**动态插件**（临时、随进程消失）与 **profile 正式安装**（持久化、重启保留）。无需改动 DSH 本体代码。

---

## 功能特性

- 📋 新会话与活跃会话的输入框下方均展示 JIRA 任务面板（新会话时左右与输入框等宽）
- 👤 默认只显示**当前用户**（`assignee = currentUser()`）的**开启/重新开启**（`status in ("开启","重新开启")`）任务
- ⚙️ 项目 Key 与 JQL **按工作区保存**：每个工作区独立配置，未配置的工作区显示"未配置"，互不影响
- 🔄 打开新会话自动查询；面板内可一键刷新（⟳）
- 🔗 每条任务可点击，在新标签页打开 JIRA 详情（`{baseUrl}/browse/<KEY>`）
- 🎨 颜色全部使用 DSH 主题令牌，浅色/深色主题自动适配
- 🔐 令牌只读自凭据存储，经 stdin 传给 curl，不进入命令行参数

### 面板效果

**新会话（空白阶段，输入框下方、等宽）**

```
┌────────────────────────────────────┐
│  工作区选择行                         │
│  ┌──────────────────────────────┐  │
│  │ 输入框（hero 形态）             │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ ▾ JIRA · HCPFYH1 (2)   ⟳ ⚙   │  │
│  │ HCPFYH1-969 开启 · 刘颖 …      │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**活跃会话（输入框下方）**：面板与统计信息同区显示；发消息后自动从"新会话位置"切回"输入框下方"，不会出现双份面板。

---

## 注册方式一：动态插件（临时）

> 动态插件只存在于 DSH 进程内存，**重启后消失**；适合临时试用。正式使用请用下方的"注册方式二：正式安装"。

插件源码在本仓库 `plugin/` 目录（动态版，Client 通过 `host.call` 与 Host 通信）：

| 文件 | 说明 |
|---|---|
| `plugin/host.js` | Host 半（JIRA 查询、凭据解析），作为 `code.host` 传入 |
| `plugin/client.js` | Client 半（面板 UI、按工作区存储），作为 `code.client` 传入 |
| `manifest.json` | 插件元数据（插件 ID、默认 JQL、环境变量、槽位等） |

在 DSH 会话中让 AI 助手（或通过 Cordis 工具）执行：

1. **定义**（`cordis_define`）：`kind: new`，`idPrefix: "jira"`，把 `host.js` / `client.js` 内容分别作为 `code.host` / `code.client`。
2. **运行**（`cordis_run`）：`mode: run` 激活；Client 端首次需在界面批准。
3. 之后如需升级，修改源码后用 `cordis_define`（`kind: existing`）追加新 Package，再 `cordis_run`（`mode: update`）。

> 动态版当前版本：`pkg-15`（按工作区配置版）。

---

## 注册方式二：正式安装（持久化，重启不丢）

把插件安装为 DSH profile 的 **bundle**，重启后自动加载（本机已按此方式安装于 `~/.dsh/profiles/desktop/`）。

### 仓库文件

`profile-package/` 是完整的持久化插件包（包名 `dsh-jira-tasks`）：

| 文件 | 说明 |
|---|---|
| `profile-package/package.json` | 包声明：`main`=Host、`exports["./client"]`=Client bundle、`dsh.bundle.patch`、`dsh.client(web)` |
| `profile-package/cordis.patch.yml` | bundle patch：向 profile 组合插入 Host 插件行（等待 subprocess/credentials/sandboxPolicy/webServer 就绪） |
| `profile-package/lib/index.js` | Host：注册 `webServer` 路由 `POST /jira/api/search`（凭据 + curl 查 JIRA） |
| `profile-package/lib/client.js` | Client：`window.__ModuleLoader__.load({ id, factory })` 标准 web bundle（浏览器 `fetch` 调 Host 路由） |

### 安装步骤

包已发布到 **npm**（`dsh-jira-tasks@1.0.0`），一行安装：

```bash
dsh plugin --profile desktop add dsh-jira-tasks
```

> 无 npm 时的手动安装（源码来自 `profile-package/`）：

1. 把 `profile-package/` 复制为 `~/.dsh/profiles/desktop/packages/dsh-jira-tasks/`
2. 编辑 `~/.dsh/profiles/desktop/package.json`：
   - `dependencies` 增加：`"dsh-jira-tasks": "file:./packages/dsh-jira-tasks"`
   - `dsh.profile.bundles` 追加：`"dsh-jira-tasks"`
3. 在 profile 目录执行 `pnpm install`：

   ```bash
   cd ~/.dsh/profiles/desktop
   "/Users/<你的用户名>/Library/Application Support/DSH Desktop/runtime-commands/bin/pnpm" install
   ```

4. **重启 DSH**（profile 插件集与客户端 bundle 在启动时扫描加载）

> 注意：`pnpm install` 会把包**复制**到 `node_modules/`（非符号链接），后续改动 `packages/dsh-jira-tasks/lib/client.js` 后需手动同步 `node_modules/dsh-jira-tasks/lib/client.js`（或重跑 pnpm install）。

### 与动态版的差异

| 维度 | 动态插件 | 正式安装 |
|---|---|---|
| 持久性 | 重启丢失（进程内存） | 重启保留（profile bundle） |
| Client→Host 通信 | `host.call` / `harness.handle` | `webServer` 路由 + 浏览器 `fetch` |
| 客户端 bundle | 会话内注入 | `/plugins/dsh-jira-tasks/client.js`（ModuleLoader 格式） |
| 配置 / 凭据 | 同一 `localStorage` 键、同一 `.credentials.yaml` | 完全相同 |

### 卸载

- 从 profile `package.json` 移除 `dsh-jira-tasks` 依赖与 bundles 条目；删除 `packages/dsh-jira-tasks` 与 `node_modules/dsh-jira-tasks`；执行 `pnpm install`；重启 DSH
- 或使用 `dsh plugin --profile desktop remove dsh-jira-tasks`

---

## 配置

### 1. JIRA 地址与令牌（凭据）

通过 DSH 的凭据服务读取，二选一：

**方式 A：凭据文件 `$DSH_HOME/.credentials.yaml`（推荐，热加载无需重启）**

```yaml
JIRA_BASE_URL: "http://jira.example.com/"
JIRA_API_TOKEN: "<PAT 或 user:token>"
```

**方式 B：环境变量**（启动 DSH 前导出）

```bash
export JIRA_BASE_URL="http://jira.example.com/"
export JIRA_API_TOKEN="<PAT 或 user:token>"
```

支持别名：地址可用 `JIRA_BASE_URL` / `JIRA_URL`；令牌可用 `JIRA_API_TOKEN` / `JIRA_TOKEN`。

**认证方式自动识别**：

| 令牌形式 | 认证头 |
|---|---|
| 含 `:`（如 `user:token`） | `Basic base64(user:token)` |
| 其他（JIRA Personal Access Token） | `Bearer <token>` |

> 实测：JIRA Server 的 PAT 通常直接 `Bearer` 即可（`/rest/api/2/myself` 返回 200）。

### 2. 项目 Key 与 JQL（按工作区）

- 点击面板标题右侧 **⚙** 打开设置，表单顶部会提示当前配置归属的工作区
- **项目 Key**：如 `HCPFYH1`，保存后立即查询；该工作区后续所有新会话自动加载
- **JQL**：留空使用默认查询；也可填写自定义 JQL，`{projectKey}`（或 `{key}`）占位符会被替换为项目 Key

**默认 JQL**

```jql
project = "{projectKey}" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC
```

> 状态名是按你们 JIRA 实例的中文工作流配置的（"开启"/"重新开启"）。如果你们的 JIRA 用英文状态（Open/Reopened），请在工作区设置里填写自定义 JQL，例如：
> `project = "{projectKey}" AND status in (Open, Reopened) AND assignee = currentUser() ORDER BY updated DESC`

### 3. 数据存储

- 配置保存在浏览器 `localStorage` 的 `dsh.jiraTasks.config.v1`：`{ [工作区路径]: { projectKey, jql } }`
- 工作区以**路径**为键（比 workspaceId 稳定，重建工作区不丢配置）
- 旧版全局格式会自动迁移到当前工作区

---

## 架构

```
┌─────────── 浏览器（Client 半） ───────────┐      ┌──────────── Host 半 ────────────┐
│ conversation.composer.dock（活跃会话）      │      │                                │
│ conversation.input.dock（新会话, order:99）│      │ harness.handle('jira/list')     │
│   ↓ 挂载时/刷新时                           │      │   ↓                            │
│ host.call('jira/list', {key, jql}) ────────┼─────►│ credentials.resolve(JIRA_*)     │
│   ↑                                        │      │ subprocess.spawn(curl …)        │
│ 渲染：任务列表 / 错误 / 未配置               │      │   ↓ stdout JSON                 │
│ localStorage 按工作区存取配置                │      │ 解析 issues → 返回 {ok,issues}  │
└────────────────────────────────────────────┘      └────────────────────────────────┘
```

关键设计点：

- **HTTP 请求**：动态插件沙箱无 `fetch`/`process`，网络走 `subprocess` 服务直接 `spawn curl`，显式 `argv` 避免 shell 引号转义问题；认证头经 `--config -`（stdin）传入，令牌不进入 argv。
- **凭据**：`credentials` 服务解析环境变量 / `$DSH_HOME/.credentials.yaml` / 项目 `.env`，热加载。
- **为什么不用 `shell` 服务**：`shell` 在本部署会套 `sandbox-exec`，部分 macOS 上 `sandbox-exec` 不可用（`sandbox_apply: Operation not permitted`）会直接失败；`subprocess` 是原始进程缝，无此问题。
- **新会话显示**：DSH 壳在 hero（空白会话）阶段不渲染 `composer.dock`，因此额外注册到 `conversation.input.dock` 并用 flex `order: 99` 排到输入框之后；组件用"会话是否已有消息"判断是否渲染，避免与活跃会话条目重复。
- **生命周期**：所有注册（handler/工具/样式/槽位）都包在 `ctx.effect(...)` 中，随插件停止自动清理。

---

## 故障排查

| 现象 | 原因 / 处理 |
|---|---|
| `查询失败：未配置环境变量 JIRA_BASE_URL` | 凭据未写入。按上文"配置 1"写入 `.credentials.yaml` 或环境变量 |
| `查询失败：401 …` | 令牌无效或认证方式不对。先 `curl -H "Authorization: Bearer <token>" <base>/rest/api/2/myself` 验证 |
| `查询失败：无法解析 JIRA 响应：空响应` | curl 无输出（网络/代理问题），或响应被截断 |
| `Cannot destructure property 'mode' of 'policy'…` | （旧版本）shell 服务沙箱问题——升级到本版（subprocess 方案）即可 |
| 面板不显示 | 确认插件处于 running（`cordis_inspect_self`）；新会话面板在输入框下方、等宽位置 |
| 面板双份显示 | 一般不会发生（有去重逻辑）；刷新页面即可 |

---

## 开发 / 贡献

```bash
# 本地检查源码格式（文件均为普通 JS，无构建步骤）
node --check plugin/host.js
node --check plugin/client.js
```

提交规范：Conventional Commits，如 `feat: 支持按工作区配置项目 Key`。

## License

内部使用。
