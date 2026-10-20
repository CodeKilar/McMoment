# MCP 集成说明

## Server

- 地址：`https://mcp.mcd.cn`
- 传输：`streamablehttp`
- 认证：HTTP `Authorization` 请求头，格式为 `Bearer <MCD_MCP_TOKEN>`

## 请求路由规则

“生成随心订单”是推荐入口，不等于下单。点击后先解析用户原话和页面筛选条件，生成结构化场景，再选择只读查询。禁止用本地模拟数据冒充 MCP 结果。

### 场景分类与首选工具

| 用户场景 | 首选 MCP Tool | 补充规则 |
| --- | --- | --- |
| 泛化的“帮我安排一餐”、按情境推荐 | `query-meal-assistance` | 将用户明确表达的时间、人数、预算、饮食目标等作为意图；仅传该 Tool schema 接受的字段。 |
| 查询菜单/指定餐品 | `query-meals` | 用户要求菜品详情时再调用 `query-meal-detail`。 |
| 热量、营养、控卡搭配 | `list-nutrition-foods` | 先用真实营养数据筛选；用户同时要求可售菜单时，再查 `query-meals`。 |
| 优惠查询 | `available-coupons` 或 `query-promotions` | 个人可用券用 `available-coupons` / `query-my-coupons`；活动和公开促销用 `query-promotions` / `query-store-coupons`。按工具描述区分，不混用。 |
| 到店门店查询 | `query-nearby-stores` | 必须有用户明确提供或宿主提供的位置；不得伪造当前位置。 |
| 外送地址/可配送门店 | `delivery-query-addresses` → `delivery-query-stores` | 先让用户选择已有地址；没有地址或地址未选时不得猜 `addressId`。 |
| 指定门店与餐品的实时价格 | `calculate-price` | 只有门店、餐品及 schema 要求的选项齐全时才计价；缺项先追问或完成前置查询。 |
| 用户明确要求创建订单 | `create-order` 或对应业务的 `mall-create-order` | 不属于“生成推荐”。先完成计价，展示门店、商品、总价和履约信息，再取得本轮明确确认；按 Tool 描述选择业务类型。 |
| 查询订单状态/历史 | `query-order` 或 `order-list` | 只在用户提出订单查询时使用；先按 schema 确认所需订单标识。 |

### 请求决策流程

1. 将原话归类为一个主意图：推荐、菜单、营养、优惠、门店/配送、计价、订单查询或交易操作。多个意图可以串联，但只执行完成当前目标所需的最短只读链路。
2. 合并用户原话与页面明确填写的筛选条件；区分“用户提供”“宿主提供”“未知”。未知的位置、地址、门店、人数、餐品规格等不得自行补造。
3. 从 MCP `tools/list` 的实时描述和 `inputSchema` 校验候选工具及参数。只传 schema 接受的键；必填字段缺失时，停止调用并向用户询问，不根据 Tool 名称猜字段。
4. “生成随心订单”只可调用只读查询。需要门店、配送地址或餐品选择才能继续的，返回待补信息，不下单、不绑券、不取消订单。
5. 只有用户明确发出下单/取消/绑券等指令，并在看到关键交易信息后确认，才允许调用对应有副作用的 Tool。点击“生成推荐”不构成交易确认。
6. 用 MCP 实际返回值展示推荐，并标明未返回或失败的字段；MCP 错误、空结果和未调用必须分别呈现，不回退到静态假数据并称为实时推荐。

### 推荐入口默认规则

没有更具体意图时，“生成随心订单”进入真实菜单查询流程：先要求用户选择履约方式和真实门店，再调用 `query-meals`。到店/得来速先按用户提供的城市调用 `query-nearby-stores` 并由用户选店；麦乐送先调用 `delivery-query-addresses` 并由用户选择地址，再查可配送门店。`query-meal-assistance` 仅按其真实描述用于团餐已选门店场景，不用于泛化推荐。营养意图调用 `list-nutrition-foods`，优惠意图调用 `available-coupons`。预算/人数/热量目前仅作为场景日志和待后续筛选的信息，不保证 MCP 返回结果一定满足约束；结果必须如实展示。

## 调用流程

1. 从本地环境变量读取 `MCD_MCP_TOKEN`。
2. 使用 `Authorization: Bearer ${MCD_MCP_TOKEN}` 连接麦当劳 MCP Server。
3. 使用上面的路由规则和 `tools/list` 实时 schema 决定 Tool 与参数。
4. 记录候选意图、所选 Tool、参数校验和 MCP 返回；对返回结果做必要的格式化，并注明餐品、价格和供应状态以官方实时结果为准。

`npm start` 会启动网页和本地 API。网页按钮调用 `/api/recommend`；API 只调用只读工具，不会创建订单。工具参数按启动时获取的 MCP schema 校验。由于网页本身没有内置位置或账户地址，门店/地址必须由用户从查询结果中选择；当前版本显示原始 MCP 结果，所选门店编码由用户填入后再查询菜单。

## 业务价值

该集成让 Skill 能在对话中调用麦当劳的官方实时能力，组合出套餐推荐、优惠筛选或门店相关的实用场景。
