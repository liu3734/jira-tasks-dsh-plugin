# dsh-jira-tasks

JIRA 开启任务面板 —— DeepSeek Harness（DSH）持久化插件（profile bundle）。

在 DSH 会话**输入框下方**展示当前 JIRA 项目**指派给当前用户**的「开启 / 重新开启」任务列表。项目 Key 与 JQL **按工作区配置**并持久化，重启 DSH 不丢失。

## 安装

```bash
dsh plugin --profile desktop add dsh-jira-tasks
# 或手动安装：见仓库 README「注册方式二：正式安装」
```

重启 DSH 后生效。

## 配置

1. **JIRA 地址与令牌**：写入 `$DSH_HOME/.credentials.yaml`（或导出环境变量）：

   ```yaml
   JIRA_BASE_URL: "http://jira.example.com/"
   JIRA_API_TOKEN: "<PAT 或 user:token>"
   ```

2. **项目 Key / JQL**：点击面板 ⚙ 按工作区配置；JQL 留空使用默认查询：

   ```jql
   project = "{projectKey}" AND status in ("开启", "重新开启") AND assignee = currentUser() ORDER BY updated DESC
   ```

## 架构

- **Host**：`webServer` 路由 `POST /jira/api/search`，凭据走 `credentials` 服务，查询经 `subprocess` + curl（认证头经 stdin `--config -` 传入）。
- **Client**：`window.__ModuleLoader__.load({ id, factory })` web bundle，注册 `conversation.composer.dock`（活跃会话）与 `conversation.input.dock`（新会话，`order:99` 置于输入框下方、等宽）。

## 卸载

```bash
dsh plugin --profile desktop remove dsh-jira-tasks
```

## License

MIT
