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

Windows 用户可以直接双击项目目录中的 `start-mcmoment.bat`，或双击仓库根目录中的 `启动 McMoment.bat`。启动器会打开一个 MCP 服务窗口，等待本地 API 就绪后自动打开网页。使用完毕后关闭 MCP 服务窗口即可停止服务。

```bash
npm start
```

启动程序会连接 MCP、读取可用工具并启动本机 API，默认地址为 `http://127.0.0.1:3000`（可通过 `PORT` 修改）。点击“生成随心订单”会调用只读营养工具，将主食、小食和饮品组合成套餐，按人数与热量筛选，并从符合条件的套餐中随机展示一套。MCP 该接口不提供价格，因此预算暂时不能核验。确认按钮仅执行 5 秒模拟下单进度，不会创建真实订单。

不要直接双击 `web/index.html` 作为正常启动方式：浏览器打开本地文件时不会启动 MCP 服务。若需要手动启动，请先在项目目录运行 `npm start`，再访问 `http://127.0.0.1:3000/`。这样做是为了不把 MCP Token 放进浏览器文件。

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

## 角色部件拼接

订单成功弹窗从仓库根目录的 `png/` 读取角色图片。当前身体是包含四肢的整体 PNG，头部单独拼装。图片会按 alpha 通道检测可见轮廓，忽略透明留白后等比例缩放，再将头部短颈对齐身体领口；图片无需依赖相同的原始尺寸或主体位置。身体会拆成完整身体和衣领前缘两个图层，衣领只遮住连接处，避免空领口覆盖头部或出现明显插接感。翅膀、披风等背饰位于身体后方，头部和头顶装饰分别定位。缺失的头部或身体会单独回退到对应的中性部件，缺失装饰会跳过。

新增资源仍需使用透明 PNG，保持正面视角，身体颈口朝上、头部连接端朝下；偏置颈部接口按轮廓顶部或底部的中心估计。目前不支持从任意姿势自动识别关节。现有 `deco_zero_glasses.png` 的棋盘格底已由 `scripts/prepare-character-assets.py` 生成透明副本，原图保留。

运行 `npm test` 可检查透明边界、不同图片尺寸下的拼接比例、颈部对齐和装饰位置。

## 文件说明

- `CONTEST_DECLARATION.md`：官方要求的参赛声明，内容不可修改。
- `MCP_INTEGRATION.md`：记录 MCP Server、Tool、调用流程和业务价值。
- `src/index.js`：项目主体代码入口。
