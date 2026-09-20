# JIRA 开启任务面板（DeepSeek Harness 插件）

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**中文** · [English](README.en.md)

在 DSH 会话**输入框下方**展示当前 JIRA 项目**指派给当前用户**的「开启 / 重新开启」任务列表。JIRA 地址与令牌在**设置 → 插件 → JIRA** 中配置（`JIRA_BASE_URL` / `JIRA_API_TOKEN` 作为回退）；项目 Key 与 JQL **按工作区配置**并持久化。

## 功能

- 📋 新会话与活跃会话的输入框下方均展示任务面板（新会话时与输入框等宽）

<img width="1898" height="886" alt="image" src="https://github.com/user-attachments/assets/d14d0bd4-4f9f-4aa8-9af8-b8a02a2b7296" />
<img width="1972" height="746" alt="image" src="https://github.com/user-attachments/assets/9f543e04-a5ad-4b86-85c8-baa2de26f44e" />

- 👤 默认仅显示当前用户（`assignee = currentUser()`）的「开启 / 重新开启」任务
- ⚙️ **设置 → 插件 → JIRA** 配置 JIRA 地址与访问令牌（令牌写入凭据存储，不回传前端）
- 🟢 设置卡片自动探测连接并显示状态灯：绿=可用、红=不可用、灰=未配置；点「测试连接」可用**未保存的草稿值**即时验证

<img width="1590" height="1574" alt="image" src="https://github.com/user-attachments/assets/af5f11c6-aa9a-4c3b-84ca-cff6c0017b22" />

- ⚙️ 项目 Key 与 JQL 按工作区保存；未配置的工作区显示"未配置"
- 🔄 打开新会话自动查询，面板内支持一键刷新（⟳）
- 🧭 点击标题可**收起 / 展开**面板；标题徽标显示查询命中的任务总数（列表最多展示 50 条，按更新时间倒序）
- 🏷️ 每条任务附状态徽章（按状态分类着色：新建 / 进行中 / 其他）、优先级与类型标签
- 🔗 任务可点击，在新标签页打开 JIRA 详情
- 🎨 颜色使用 DSH 主题令牌，浅色 / 深色主题自适应

## 安装

包已发布到公共 npm（`dsh-jira-tasks`）；仓库的发布工作流同时把同一版本发布到 GitHub Packages（作用域包名 `@liu3734/dsh-jira-tasks`）。从 npm 安装（推荐）：

```bash
dsh plugin --profile web add dsh-jira-tasks
```

或直接从 GitHub 安装（仓库根即包目录，`lib/` 为预构建产物）：

```bash
dsh plugin --profile web add github:liu3734/jira-tasks-dsh-plugin
```

**重启 DSH** 后生效。

> 若改用 GitHub Packages 源：先在 profile 的 `.npmrc` 配置 `@liu3734:registry=https://npm.pkg.github.com/` 及读取令牌，再执行 `dsh plugin --profile web add @liu3734/dsh-jira-tasks`。

<details>
<summary>手动安装（不使用 npm）</summary>

1. 将本仓库（仓库根目录即包目录）复制为 `~/.dsh/profiles/web/packages/dsh-jira-tasks/`（可忽略 `.git/`）
2. 编辑 `~/.dsh/profiles/web/package.json`：
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

打开 **设置 → 插件 → 插件配置 → JIRA**，填写：

- **JIRA 地址**：如 `http://jira.example.com/`（存入用户设置文档，可在界面回读）
- **访问令牌 / PAT**：写入凭据存储（`$DSH_HOME/.credentials.yaml`，引用名是插件自有的 `JIRA_TASKS_TOKEN`），前端只显示"已配置"，不回传令牌本身

留空并保存会保持已有令牌不变；地址留空并保存则清除设置项，回退到环境变量。认证自动识别：令牌含 `:` 用 Basic，否则用 Bearer（JIRA PAT）。

> **设置页令牌优先于环境变量**：启动 DSH 的环境里已有 `JIRA_API_TOKEN`（Windows 用户级环境变量也算）时，卡片照常可以输入并保存——保存的是插件自有引用 `JIRA_TASKS_TOKEN`，DSH 不会拒绝（它只拒绝写入会被环境遮蔽的同名引用），Host 解析时也把它排在环境变量之前：
>
> ```
> JIRA_TASKS_TOKEN（设置页） > JIRA_API_TOKEN > JIRA_TOKEN
> ```
>
> 想改回用环境变量，点卡片里的「清除设置页令牌」即可。

#### 连接测试

卡片底部有连接状态灯与 **测试连接** 按钮：

- 打开卡片时会**自动探测**一次（请求 JIRA `/rest/api/2/myself`），保存后也会自动重测
- **绿** = 地址与令牌可用（并显示当前登录用户）；**红** = 不可用（显示 JIRA 返回的原因，如 401 认证失败）；**灰** = 地址或令牌未配置
- 点 **测试连接** 会用**当前输入框里的内容**（未保存也可）立即测试，方便改完再存

以下环境变量 / 凭据仍作为**回退**（设置页未配置时生效，兼容旧部署），热加载无需重启：

```yaml
JIRA_BASE_URL: "http://jira.example.com/"
JIRA_API_TOKEN: "<PAT 或 user:token>"
```

- 地址别名：`JIRA_BASE_URL` / `JIRA_URL`
- 令牌解析顺序：`JIRA_TASKS_TOKEN`（设置页写入）→ `JIRA_API_TOKEN` → `JIRA_TOKEN`，前者优先

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
dsh plugin --profile web remove dsh-jira-tasks
```

## 常见问题

<details>
<summary>面板显示「查询失败」</summary>

面板中的提示位于「查询失败：」之后，与下列文案对应：

| 提示 | 处理 |
|---|---|
| 未设置项目 Key | 面板未配置项目，点标题右侧 ⚙ 填写项目 Key |
| 未配置 JIRA 地址（设置 → 插件 → JIRA，或环境变量 JIRA_BASE_URL） | 地址未写入，见上文「配置 1」 |
| 未配置 JIRA 令牌（设置 → 插件 → JIRA，或环境变量 JIRA_API_TOKEN） | 令牌未写入，见上文「配置 1」 |
| 401 … | 令牌无效或认证方式不对；先 `curl -H "Authorization: Bearer <token>" <base>/rest/api/2/myself` 验证 |
| 无法解析 JIRA 响应：… | 网络 / 代理问题，curl 无输出 |
</details>

<details>
<summary>环境变量里的令牌，能不能在设置页覆盖？</summary>

**能。** 卡片把令牌保存到插件自有引用 `JIRA_TASKS_TOKEN`，而不是直接写环境变量用的 `JIRA_API_TOKEN`。DSH 只拒绝写入「会被启动环境遮蔽的同名引用」，插件自有引用不受影响，所以哪怕 shell / 系统里已导出 `JIRA_API_TOKEN`，设置页也能正常输入并保存，并且 Host 解析时优先用它：

```
JIRA_TASKS_TOKEN（设置页） > JIRA_API_TOKEN > JIRA_TOKEN
```

- 卡片会显示当前生效来源：已保存设置页令牌时提示「优先于环境变量 JIRA_API_TOKEN」；未保存时提示「当前使用环境变量 JIRA_API_TOKEN，填写并保存即可覆盖」
- 保存后自动重测连接；点「清除设置页令牌（回退到环境变量）」可删除覆盖值
- 唯一仍会报 `is supplied read-only by the launching environment` 的情况：有人把 `JIRA_TASKS_TOKEN` 本身也导出到了启动环境——那种情况下该引用确实只读，需先移除它（Windows：系统属性 → 环境变量，或 PowerShell `[Environment]::SetEnvironmentVariable('JIRA_TASKS_TOKEN', $null, 'User')`）并重启 DSH
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
┌────────────────────────────────────────┐   ┌────────────────────────────────────┐
│ conversation.composer.dock（活跃会话）  │   │ webServer 路由 /jira/api/search     │
│ conversation.input.dock（新会话）       │   │ ↓                                   │
│   面板 hero 布局（flex order:99）       │   │ settings.get("jira-tasks").baseUrl   │
│   ↓ 挂载 / 刷新时 fetch POST            │   │ credentials.resolve(TOKEN_REFS)     │
│ 渲染：任务列表 / 错误 / 未配置          │   │ subprocess.spawn(curl …)            │
│ localStorage 按工作区存取项目 Key/JQL   │   │ ↓ stdout JSON                       │
│ settings.plugin.item（设置页卡片）      │   │ 解析 issues → 返回 {ok,issues}      │
└────────────────────────────────────────┘   └────────────────────────────────────┘
```

- **Host**：注册 `settings` 命名空间 `jira-tasks`（`baseUrl`，可读）与 `webServer` 路由 `POST /jira/api/search`；地址优先读设置文档，令牌经 `credentials` 服务按 `JIRA_TASKS_TOKEN`（设置页写入）→ `JIRA_API_TOKEN` → `JIRA_TOKEN` 的顺序解析（`$DSH_HOME/.credentials.yaml` / 环境变量，热加载），因此设置页保存的令牌能覆盖环境变量；查询用 `subprocess` 直接 `spawn curl`，认证头经 stdin（`--config -`）传入，令牌不进入命令行参数。
- **Client**：`window.__ModuleLoader__.load({ id, factory })` 标准 web bundle；注册 `conversation.composer.dock`（活跃会话，注册 `order: 5`）与 `conversation.input.dock`（新会话，注册 `order: 10`）。新会话面板走 hero 布局：面板元素自身 `flex order: 99` 排在输入框之后下方，并以 `--dsh-composer-side-clearance` / `--dsh-composer-card-max-width` 与输入卡等宽。另注册 `settings.plugin.item`（`key: "jira-tasks"`）作为设置页卡片：地址经 `settingsScope` 写入命名空间，令牌经 `remote.credentials` 写入 `JIRA_TASKS_TOKEN`。
- **为什么不用 `shell` 服务**：`shell` 会套 `sandbox-exec`，部分 macOS 上不可用（`sandbox_apply: Operation not permitted`）；`subprocess` 是原始进程缝，无此问题。
- **新会话显示**：DSH 壳在 hero（空白会话）阶段不渲染 `composer.dock`，故额外注册 `input.dock`，并用「会话是否已有消息」去重（新版 DSH 依据 `SessionSnapshot.blank`），避免双份面板。

**与动态插件版的差异**

| 维度 | 动态插件 | 正式安装（本包） |
|---|---|---|
| 持久性 | 重启丢失 | 重启保留 |
| Client→Host 通信 | `host.call` / `harness.handle` | `webServer` 路由 + `fetch` |
| 客户端 bundle | 会话内注入 | `/plugins/dsh-jira-tasks/client.js` |
| 配置 / 凭据 | 仅环境变量 / `.credentials.yaml`（无设置页卡片） | 设置页卡片 + 同一 `.credentials.yaml` 回退 |
</details>

## License

MIT
