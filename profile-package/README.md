# JIRA 开启任务面板（DeepSeek Harness 插件）

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**中文** · [English](README.en.md)

在 DSH 会话**输入框下方**展示当前 JIRA 项目**指派给当前用户**的「开启 / 重新开启」任务列表。JIRA 地址与令牌从凭据读取；项目 Key 与 JQL **按工作区配置**并持久化。

## 功能

- 📋 新会话与活跃会话的输入框下方均展示任务面板（新会话时与输入框等宽）

<img width="1898" height="886" alt="image" src="https://github.com/user-attachments/assets/d14d0bd4-4f9f-4aa8-9af8-b8a02a2b7296" />
<img width="1972" height="746" alt="image" src="https://github.com/user-attachments/assets/9f543e04-a5ad-4b86-85c8-baa2de26f44e" />

- 👤 默认仅显示当前用户（`assignee = currentUser()`）的「开启 / 重新开启」任务
- ⚙️ 项目 Key 与 JQL 按工作区保存；未配置的工作区显示"未配置"
- 🔄 打开新会话自动查询，面板内支持一键刷新（⟳）
- 🔗 任务可点击，在新标签页打开 JIRA 详情
- 🎨 颜色使用 DSH 主题令牌，浅色 / 深色主题自适应

## 安装

包已发布到 npm：

```bash
dsh plugin --profile desktop add dsh-jira-tasks
```

**重启 DSH** 后生效。

<details>
<summary>手动安装（不使用 npm）</summary>

1. 将仓库 `profile-package/` 复制为 `~/.dsh/profiles/desktop/packages/dsh-jira-tasks/`
2. 编辑 `~/.dsh/profiles/desktop/package.json`：
   - `dependencies` 增加：`"dsh-jira-tasks": "file:./packages/dsh-jira-tasks"`
   - `dsh.profile.bundles` 追加：`"dsh-jira-tasks"`
3. 在 profile 目录执行 `pnpm install`
4. 重启 DSH

> 注：`pnpm install` 会把包**复制**到 `node_modules/`（非符号链接），改动源码后需同步 `node_modules/dsh-jira-tasks` 或重跑 install。
</details>

<details>
<summary>动态插件方式（临时，重启后消失）</summary>

在 DSH 会话中用 Cordis 工具执行：`cordis_define`（`kind: new`，`idPrefix: "jira"`，源码见仓库 `plugin/host.js` / `plugin/client.js`）→ `cordis_run` 激活。动态插件只存在于进程内存，**重启后消失**，仅适合临时试用。
</details>

## 配置

### 1. JIRA 地址与令牌

写入 `$DSH_HOME/.credentials.yaml`（推荐，热加载无需重启），或启动 DSH 前导出环境变量：

```yaml
JIRA_BASE_URL: "http://jira.example.com/"
JIRA_API_TOKEN: "<PAT 或 user:token>"
```

- 地址别名：`JIRA_BASE_URL` / `JIRA_URL`
- 令牌别名：`JIRA_API_TOKEN` / `JIRA_TOKEN`
- 认证自动识别：令牌含 `:` 用 Basic，否则用 Bearer（JIRA PAT）

### 2. 项目 Key 与 JQL（按工作区）

- 点击面板标题右侧 **⚙** 打开设置（表单顶部提示当前配置归属的工作区）
- **项目 Key**：如 `HCPFYH1`，保存后立即查询，该工作区后续新会话自动加载
- **JQL**：留空使用默认查询；也可填写自定义 JQL，`{projectKey}`（或 `{key}`）会被替换为项目 Key

默认查询：

```jql
project = "{projectKey}" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC
```

> 状态名按中文工作流（"开启"/"重新开启"）配置；若 JIRA 用英文状态（Open/Reopened），在 ⚙ 中填写自定义 JQL 即可。

## 卸载

```bash
dsh plugin --profile desktop remove dsh-jira-tasks
```

## 常见问题

<details>
<summary>面板显示「查询失败」</summary>

| 提示 | 处理 |
|---|---|
| 未配置环境变量 JIRA_BASE_URL | 凭据未写入，见上文「配置 1」 |
| 401 … | 令牌无效或认证方式不对；先 `curl -H "Authorization: Bearer <token>" <base>/rest/api/2/myself` 验证 |
| 无法解析 JIRA 响应 | 网络 / 代理问题，curl 无输出 |
</details>

<details>
<summary>面板不显示</summary>

- 确认已安装并**重启 DSH**；新会话面板位于输入框下方
- 检查 DSH 启动日志中 profile 插件是否加载成功
</details>

## 架构与实现细节

<details>
<summary>点击展开</summary>

```
┌─────────── 浏览器（Client） ───────────┐      ┌──────────── Host ──────────────┐
│ conversation.composer.dock（活跃会话）      │      │ webServer 路由 /jira/api/search │
│ conversation.input.dock（新会话, order:99）│      │   ↓                            │
│   ↓ 挂载时/刷新时 fetch POST               │      │ credentials.resolve(JIRA_*)     │
│ 渲染：任务列表 / 错误 / 未配置               │      │ subprocess.spawn(curl …)        │
│ localStorage 按工作区存取配置                │      │   ↓ stdout JSON                 │
└────────────────────────────────────────────┘      │ 解析 issues → 返回 {ok,issues}  │
                                                    └────────────────────────────────┘
```

- **Host**：注册 `webServer` 路由 `POST /jira/api/search`；凭据经 `credentials` 服务解析（环境变量 / `$DSH_HOME/.credentials.yaml`，热加载）；查询用 `subprocess` 直接 `spawn curl`，认证头经 stdin（`--config -`）传入，令牌不进入命令行参数。
- **Client**：`window.__ModuleLoader__.load({ id, factory })` 标准 web bundle；注册 `conversation.composer.dock`（活跃会话）与 `conversation.input.dock`（新会话，flex `order: 99` 置于输入框下方、与输入框等宽）。
- **为什么不用 `shell` 服务**：`shell` 会套 `sandbox-exec`，部分 macOS 上不可用（`sandbox_apply: Operation not permitted`）；`subprocess` 是原始进程缝，无此问题。
- **新会话显示**：DSH 壳在 hero（空白会话）阶段不渲染 `composer.dock`，故额外注册 `input.dock`，并用「会话是否已有消息」去重，避免双份面板。

**与动态插件版的差异**

| 维度 | 动态插件 | 正式安装（本包） |
|---|---|---|
| 持久性 | 重启丢失 | 重启保留 |
| Client→Host 通信 | `host.call` / `harness.handle` | `webServer` 路由 + `fetch` |
| 客户端 bundle | 会话内注入 | `/plugins/dsh-jira-tasks/client.js` |
| 配置 / 凭据 | 同一 `localStorage` 键、同一 `.credentials.yaml` | 完全相同 |
</details>

## License

MIT
