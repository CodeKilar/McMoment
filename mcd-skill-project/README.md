# 麦当劳 MCP Skill 项目

这是一个可提交至麦当劳程序员节创意开发大赛的 Skill 项目骨架。你可以在 `src/` 中加入实际业务逻辑，并在 `MCP_INTEGRATION.md` 中记录真实使用的 MCP Tool、调用流程和业务价值。

## 目标用户

需要通过麦当劳 MCP 获取餐品、门店或优惠信息，并希望将这些能力组合成日常助手的用户。

## 安装与配置

需要 Node.js 18 或更高版本。

```bash
npm install
copy .env.example .env
```

然后在 `.env` 中填写本地 MCP Token：

```env
MCD_MCP_TOKEN=你的真实Token
```

`.env` 已被 `.gitignore` 排除，严禁把真实 Token 提交到 GitHub。

## 运行

```bash
npm start
```

启动程序会连接 MCP、读取可用工具并启动本机网页服务，默认地址为 `http://127.0.0.1:3000`（可通过 `PORT` 修改）。点击“生成随心订单”会按输入场景调用只读 MCP 工具并展示真实返回；到店菜单查询需要城市、履约方式和门店编码，麦乐送需要先选择地址和可配送门店。营养、优惠意图可直接查询。此功能不会创建订单。

每次 JSON-RPC 请求和响应会追加到 `logs/mcp-requests.jsonl`，时间戳使用 `+08:00`。日志会脱敏 token、authorization、secret、password 和 cookie 字段；请求参数和 MCP 返回内容会保留用于排查，请注意日志文件可能包含业务输入信息。

## WorkBuddy 配置

在 WorkBuddy 的“专家·技能·连接器”中选择“连接器”→“自定义连接器”→“配置MCP”，填入：

```json
{
  "mcpServers": {
    "mcd-mcp": {
      "type": "streamablehttp",
      "url": "https://mcp.mcd.cn",
      "headers": {
        "Authorization": "Bearer YOUR_MCP_TOKEN"
      }
    }
  }
}
```

将 `YOUR_MCP_TOKEN` 替换为控制台申请到的 Token，保存后启用 `mcd-mcp`。

## 文件说明

- `CONTEST_DECLARATION.md`：官方要求的参赛声明，内容不可修改。
- `MCP_INTEGRATION.md`：记录 MCP Server、Tool、调用流程和业务价值。
- `src/index.js`：项目主体代码入口。
