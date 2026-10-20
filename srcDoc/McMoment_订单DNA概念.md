# McMoment 订单 DNA 概念

## 1. 核心想法

McMoment 在完成真实点餐后，不直接以普通订单成功页面结束，而是根据本次订单的餐品内容、履约方式、下单时间和现实情境，生成一个只属于这笔订单的“订单形象”。

这个形象并不是预先制作完成并存放在工程资源中的完整角色，而是由多个独立美术部件在订单创建成功后动态组合产生。

```text
真实订单
    ↓
提取订单 DNA
    ↓
将餐品和情境映射为不同部件
    ↓
根据订单种子选择部件变体和组合方式
    ↓
组装本单专属形象
    ↓
延伸出动画、分享卡片和互动内容
```

因此，用户即使查看完整 Git 工程，也只能看到身体、装备、特效、背景等独立元素，无法直接在资源文件中找到自己的最终订单形象。

订单不同，最终组合出来的形象也不同。

---

## 2. 产品价值

订单 DNA 不是在点餐流程中强行加入游戏关卡，而是在用户完成真实订单后，为这次消费生成一份具有惊喜感和纪念感的创意反馈。

它具有以下价值：

1. **与真实订单强关联**：形象的每一个主要部件都来自用户实际点选的餐品；
2. **具有盲盒感**：用户知道自己点了什么，但不知道这一单最终会组合成什么形象；
3. **适合开源工程**：Git 中只有部件和组合规则，没有完整角色图鉴；
4. **生成稳定可控**：主要通过程序化组合完成，不依赖不稳定的实时 AI 生图；
5. **美术风格统一**：所有身体、装备和特效均由项目预先定义风格规范；
6. **可持续拓展**：订单形象可以继续用于订单状态、动画、分享和轻量互动。

订单 DNA 的核心表达是：

> **订单即 DNA，餐品即部件，此刻即世界。**

---

## 3. 订单 DNA 的组成

订单 DNA 可以由五类信息组成。

### 3.1 餐品基因

餐品基因决定订单形象的主要外观。

| 订单内容 | 形象作用 |
|---|---|
| 主餐 | 决定主体、身体骨架和基本职业形态 |
| 小食 | 决定武器、盾牌、背包和其他装备 |
| 饮料 | 决定动力核心、能量颜色和粒子效果 |
| 甜品 | 决定跟随物、装饰或特殊道具 |
| 多份主餐 | 可以生成小队、多主体或融合形象 |

例如：

```text
板烧鸡腿堡 → 骑手型主体
玉米杯     → 玉米圆盾
零度可乐   → 黑银气泡推进器
```

最终可能组合为一个“板烧骑手”形象。

### 3.2 订单基因

订单基因决定角色的行为方式和局部细节。

| 订单信息 | 形象作用 |
|---|---|
| 麦乐送 | 骑行、冲刺、飞行或外卖背包 |
| 到店取餐 | 步行、手提纸袋、等待动作 |
| 堂食 | 托盘、座位和营地式动作 |
| 外带 | 背包客或城市旅行者形象 |
| 得来速 | 赛车手、载具或驾驶动作 |
| 套餐替换 | 替换对应动力、装备或配色 |
| 餐品特制 | 改变局部纹理、粒子或装饰 |
| 使用优惠券 | 增加幸运票券、星光或特殊贴纸 |

### 3.3 情境基因

情境基因决定角色出现的世界和氛围。

| 情境信息 | 形象作用 |
|---|---|
| 早餐、午餐、夜宵 | 决定光照、色彩和角色状态 |
| 晴天、下雨、寒冷 | 决定背景、天气粒子和服饰 |
| 会议前 | 决定倒计时、冲刺和高效型表达 |
| 健身后 | 决定恢复、训练和稳定型表达 |
| 加班 | 决定夜间、陪伴和办公场景 |
| 周末活动 | 决定轻松、旅行或派对场景 |

### 3.4 用户基因

用户基因可以基于用户在本次点餐中的目标和历史偏好，影响角色的性格、动作和文案。

例如：

- 经常控制预算：形象偏向精打细算的“金币守卫”；
- 喜欢尝试新品：形象偏向探索者；
- 偏好固定餐品：形象偏向稳定、熟悉和陪伴；
- 本次赶时间：形象偏向迅捷、任务执行型。

用户基因只影响创意表现，不影响订单价格和真实交易结果。

### 3.5 随机基因

相同餐品组合不应该永远生成完全相同的形象。

系统可以根据订单 ID、创建时间和服务端秘密值生成随机种子：

```text
seed = hash(order_id + created_at + server_secret)
```

随机种子可以决定：

- 身体变体；
- 表情；
- 左右朝向；
- 配件所在槽位；
- 配件大小和角度；
- 背景构图；
- 粒子密度；
- 名称组合；
- 一句话故事；
- 隐藏视觉彩蛋。

这样即使两个用户点了相同餐品，也可能生成不同的细节和表现。

---

## 4. 示例

假设用户的订单为：

- 主餐：板烧鸡腿堡；
- 小食：玉米杯；
- 饮料：零度可乐；
- 履约方式：麦乐送；
- 时间：午餐；
- 天气：下雨；
- 当前情境：会议前；
- 使用了一张优惠券。

系统可以解析出：

```yaml
bodyGene:
  source: 板烧鸡腿堡
  type: rider

equipmentGene:
  source: 玉米杯
  type: corn_shield

energyGene:
  source: 零度可乐
  type: zero_bubble_engine

movementGene:
  source: 麦乐送
  type: delivery_dash

environmentGene:
  time: lunch
  weather: rain

personalityGene:
  context: before_meeting
  type: efficient_calm

luckGene:
  couponUsed: true
  effect: golden_ticket
```

最终组装结果可能是：

## 雨幕板烧骑手

- 主体：板烧能量驱动的城市骑手；
- 装备：玉米圆盾；
- 动力：零度气泡推进器；
- 场景：午间雨幕中的办公区；
- 状态：会议倒计时；
- 彩蛋：优惠券幸运票；
- 台词：在倒计时结束前，把温热的能量送到正确的地方。

这个完整角色不会以静态资源的形式存在于 Git 工程中，而是在订单创建成功后由系统现场组装出来。

---

## 5. 美术资源组织方式

资源不按照完整角色存储，而是按照部件类型存储。

```text
assets/
├── bodies/          # 主餐对应的主体和身体变体
├── equipment/       # 小食对应的武器、盾牌和背包
├── energy/          # 饮料对应的动力核心和粒子
├── companions/      # 甜品和额外餐品对应的跟随物
├── expressions/     # 表情
├── movement/        # 配送、取餐、堂食等动作
├── weather/         # 雨、阳光、雪和风等环境效果
├── effects/         # 优惠券、积分和特殊彩蛋
└── backgrounds/     # 不同时间与情境背景
```

每个身体资源需要配置统一挂点，例如：

- 头部；
- 左手；
- 右手；
- 背部；
- 脚部；
- 跟随物位置。

装备资源根据挂点动态安装到身体上，并通过兼容性规则避免遮挡和冲突。

---

## 6. 订单形象的创意拓展

订单形象不应只用于生成一张静态卡片，它可以成为整个订单后续体验中的核心对象。

### 6.1 订单状态动画

订单状态变化时，订单形象同步变化：

| 订单状态 | 形象表现 |
|---|---|
| 订单已创建 | 整理装备、准备出发 |
| 商家制作中 | 在补给站充能 |
| 配送中 | 骑行、飞行或冲刺 |
| 等待取餐 | 举着号码牌等待 |
| 订单完成 | 完整形象揭晓并生成卡片 |

### 6.2 分享卡片

订单完成后，可以基于订单形象生成分享卡片，包含：

- 本单专属形象；
- 形象名称；
- 一句话故事；
- 餐品构成；
- 时间和天气；
- McMoment 视觉元素。

分享内容必须隐藏用户地址、手机号、支付链接和完整订单号。

### 6.3 动态小票

普通订单小票可以转化为订单 DNA 小票：

```text
McMoment #A28F

本单化身：雨幕板烧骑手
主体基因：板烧鸡腿堡
装备基因：玉米杯
动力基因：零度可乐
环境基因：午间小雨
移动方式：麦乐送
```

### 6.4 轻量互动

用户可以点击订单形象上的部件，查看其来源：

```text
玉米圆盾

来源：本单玉米杯
作用：在午间小雨中保持稳定。
```

还可以加入：

- 点击触发表情；
- 气泡粒子互动；
- 配件晃动；
- 根据订单状态改变动作；
- 20～30 秒的等餐微型互动。

### 6.5 多人订单小队

多人订单可以生成一支订单小队：

- 每份主餐对应一个主体成员；
- 公共小食成为队伍共享装备；
- 饮料决定不同成员的动力属性；
- 团体优惠成为小队光环；
- 最终生成本次聚餐的小队合影。

### 6.6 可选 AI 二次创作

基础订单形象通过程序化部件组合完成，保证速度和稳定性。

用户可以进一步选择：

> 将我的订单形象绘制成完整插画。

此时可以把订单 DNA 和程序化组合图交给图片生成模型，生成海报版、漫画版或玩具版形象。

AI 生图属于可选增强功能，不影响核心流程。

---

## 7. 推荐实现方式

前端可以使用：

```text
React / Vue
+
Canvas / PixiJS
+
SVG 或透明 PNG 部件
```

后端主要负责：

1. 接收麦当劳 MCP 返回的真实订单；
2. 将商品编码标准化；
3. 查询餐品与美术基因的映射关系；
4. 根据订单生成随机种子；
5. 选择兼容的身体和部件；
6. 生成订单 DNA JSON；
7. 生成角色名称和一句话故事。

前端主要负责：

1. 播放订单孵化动画；
2. 根据订单 DNA 组装形象；
3. 播放角色和粒子动画；
4. 展示订单状态；
5. 导出分享卡片。

---

## 8. 比赛 MVP

首个可演示版本建议只实现：

1. 一个主餐主体槽；
2. 两个小食装备槽；
3. 一个饮料动力槽；
4. 时间和天气背景；
5. 外送、到店和堂食三种动作；
6. 订单级随机种子；
7. 订单创建成功后的孵化动画；
8. 本单形象组装；
9. 动态名称和一句话故事；
10. 分享卡片导出。

首版不需要实现：

- 固定图鉴；
- 等级系统；
- 排行榜；
- 完整小游戏；
- 大量固定角色；
- 复杂战斗系统；
- 付费抽取或刷新。

---

## 9. 总结

订单 DNA 的核心不是在点餐助手中额外增加一个游戏系统，而是将用户的真实订单转化为一套可视化、可组合、可互动的创意表达。

麦当劳 MCP 负责创建真实订单，McMoment 负责将订单解析成 DNA：

```text
主餐决定身体
小食决定装备
饮料决定动力
履约方式决定动作
时间和天气决定世界
用户情境决定性格
订单种子决定最终变体
```

最终，Git 工程中只存在独立部件和组合规则；完整的订单形象只有在真实订单产生之后，才能由该订单的 DNA 动态组装出来。

> **同样的餐品可以拥有不同的时刻，不同的订单会孵化出不同的形象。**

---

## 10. 餐品部件设计规范

本节把“餐品基因”落成可独立绘制、可重复组合的部件。每个资源都必须是透明背景 PNG 或 SVG，画布统一为 `1024 × 1024`，角色基准高度约占画布 `82%`。部件不携带完整背景，不在资源内写死订单文案。

### 10.1 主餐：身体槽（body）

主餐决定角色的轮廓、职业气质和核心姿态。每种主餐至少制作 3 个变体：标准、轻微夸张、稀有彩蛋。变体只改变轮廓和局部纹理，不改变挂点。

| 餐品基因 | 身体部件 | 视觉关键词 | 推荐变体 |
|---|---|---|---|
| 板烧鸡腿堡 | `body_grilled_rider` | 深色烘烤纹、城市骑手、肩甲 | 披风 / 护目镜 / 雨衣 |
| 巨无霸 | `body_bigmac_captain` | 双层结构、队长肩章、厚重轮廓 | 队长 / 守门员 / 太空舱 |
| 麦香鸡 | `body_mcchicken_scout` | 金色羽片、轻装探索者、灵活腿部 | 侦察 / 滑翔 / 沙丘 |
| 麦辣鸡翅或辣味主餐 | `body_spicy_flare` | 红色热能纹、短冲刺姿态、火焰边缘 | 火花 / 熔岩 / 警报 |
| 麦乐鸡 | `body_nugget_swarm` | 小队或模块化身体、可拆分轮廓 | 单体 / 双体 / 小队 |
| 早餐主餐 | `body_breakfast_sunrise` | 暖黄色、柔软轮廓、早起状态 | 通勤 / 慢跑 / 叫醒 |

身体资源必须包含以下挂点元数据：`head`、`left_hand`、`right_hand`、`back`、`foot_left`、`foot_right`、`companion_anchor`、`effect_anchor`。挂点采用画布归一化坐标，示例：`right_hand: [0.72, 0.53]`。

### 10.2 小食：装备槽（equipment）

小食优先映射为手持装备、护盾或背包。两份小食可以分别安装左右手，也可以按“主装备 + 肩部挂件”组合。

| 餐品基因 | 装备部件 | 默认挂点 | 视觉动作 |
|---|---|---|---|
| 薯条 | `equip_fries_blade` | `right_hand` | 长条光刃、甩动时掉落金色碎片 |
| 玉米杯 | `equip_corn_shield` | `left_hand` | 圆盾、颗粒护盾、稳定防御 |
| 麦辣鸡翅 | `equip_spicy_wing_boomerang` | `right_hand` | 回旋镖、红橙热迹 |
| 麦乐鸡 | `equip_nugget_drone_pack` | `back` | 小型无人机、跟随扫描 |
| 苹果片 | `equip_apple_compass` | `left_hand` | 半透明罗盘、绿色指针 |
| 沙拉 | `equip_salad_field_pack` | `back` | 叶片护甲、轻量补给包 |

装备必须声明 `occupies` 和 `conflicts`。例如薯条光刃占用 `right_hand`，与任何右手武器冲突；玉米圆盾占用 `left_hand`，但不与背包冲突。

### 10.3 饮料：动力槽（energy）

饮料决定动力核心、粒子颜色和移动尾迹。动力资源分为核心图层和粒子图层，允许在不替换身体的情况下单独换色。

| 饮料基因 | 动力核心 | 主色 | 粒子表现 |
|---|---|---|---|
| 零度可乐 | `energy_zero_bubble_core` | 黑银 | 冷色气泡、环形推进波 |
| 可口可乐 | `energy_cola_spark_core` | 红黑 | 红色星火、短促爆发 |
| 雪碧 | `energy_sprite_mist_core` | 青绿 | 薄雾、清亮水滴 |
| 橙汁 | `energy_orange_sun_core` | 橙黄 | 小太阳、暖色光晕 |
| 咖啡 | `energy_coffee_clock_core` | 棕金 | 时钟刻度、慢速蒸汽 |

动力核心默认挂在 `chest_core`，若身体没有该挂点则回退到 `back`。每种饮料提供 3 档粒子密度：`low`、`normal`、`burst`，由订单时间压力和随机种子共同决定。

### 10.4 甜品：伙伴与装饰槽（companion）

甜品不直接覆盖主体，优先作为跟随物、头顶装饰或完成订单后的庆祝道具。

| 餐品基因 | 伙伴部件 | 默认位置 | 互动 |
|---|---|---|---|
| 麦旋风 | `companion_mcflurry_orbit` | `companion_anchor` | 环绕角色旋转，偶尔撒出星屑 |
| 派 | `companion_pie_comet` | `companion_anchor` | 小彗星轨迹，完成时加速 |
| 圣代 | `companion_sundae_lantern` | `back` | 软光灯笼，照亮雨幕 |
| 冰淇淋 | `companion_icecream_sprite` | `companion_anchor` | 上下漂浮，表情随订单状态变化 |

### 10.5 情境与履约：动作槽（motion）

动作不改变餐品部件，只改变角色的姿态、速度线和承载方式。建议首版制作：`motion_delivery_dash`（麦乐送）、`motion_pickup_walk`（到店取餐）、`motion_dine_tray`（堂食）、`motion_drive_thru`（得来速）。

动作资源通过 `pose_anchor` 与身体对齐，输出 6 帧循环或 1 张静态姿态图。订单状态可以切换动作阶段：准备、制作中、移动中、完成揭晓。

## 11. 自由组合规则

### 11.1 组合层级

统一采用从后到前的 10 层渲染顺序：

```text
background_far
background_mid
weather
motion_trail
body_back
equipment_back
body_front
equipment_hand
energy_and_companion
expression_and_foreground_fx
```

这样可以保证背包在身体后方、手持装备覆盖手部、动力粒子位于主体前后之间。任何资源不得自行改变层级，只能声明推荐层和兼容条件。

### 11.2 槽位与冲突处理

组合器接收 `orderDNA` 后按以下顺序执行：

1. 选择主餐身体；没有主餐时使用 `body_default_runner`；
2. 将小食按份数分配到空闲槽位，优先左右对称；
3. 安装饮料动力核心和粒子；
4. 安装甜品伙伴；
5. 根据履约方式覆盖动作；
6. 根据时间、天气和情境叠加背景与环境效果；
7. 遇到冲突时保留主餐、饮料和第一份小食，第二份小食降级为肩部挂件或粒子徽章；
8. 用订单种子决定变体、朝向、角度、粒子密度和稀有彩蛋。

推荐的资源描述格式：

```yaml
id: equip_corn_shield
gene: snack.corn
slot: left_hand
layer: equipment_hand
occupies: [left_hand]
conflicts: [left_hand_weapon]
anchor_offset: [0.02, -0.01]
variants: [standard, rainy, golden]
```

### 11.3 组合伪代码

```text
compose(orderDNA, catalog, seed):
  body = chooseBody(orderDNA.mainMeal, seed)
  slots = loadAnchors(body)
  equipment = allocateSnacks(orderDNA.snacks, slots, seed)
  energy = chooseEnergy(orderDNA.drinks, body, seed)
  companion = chooseCompanion(orderDNA.desserts, seed)
  motion = chooseMotion(orderDNA.fulfillment, orderDNA.status)
  environment = chooseEnvironment(orderDNA.time, orderDNA.weather, orderDNA.context, seed)
  resolveConflicts(equipment, energy, companion)
  return renderStack(environment, motion, body, equipment, energy, companion)
```

### 11.4 名称与故事组合

名称由四个词槽组成：`天气/时间 + 身体特征 + 移动方式 + 稀有称号`。例如：`雨幕板烧骑手·金券守望者`。文案只读取已确认的 DNA 字段，不暴露地址、手机号、完整订单号或支付信息。

## 12. 背景图设计

背景采用可替换的三层结构，而不是一张写死角色位置的完整插画。每套背景提供 `1536 × 1024` 横版和 `1024 × 1536` 竖版两种构图，中心区域保留约 45% 负空间给订单形象。

| 背景 ID | 适用情境 | 画面构成 | 主色 |
|---|---|---|---|
| `bg_rain_office_noon` | 午餐、会议前、小雨 | 办公区玻璃、雨线、远处红色灯牌、湿地反光 | 青灰 + 红 |
| `bg_sunrise_commute` | 早餐、通勤 | 清晨街道、长阴影、云层开口、轻微速度线 | 蜜橙 + 天蓝 |
| `bg_gym_recovery` | 健身后 | 健身房出口、蒸汽、冷色灯带、地面水迹 | 深蓝 + 荧光绿 |
| `bg_night_shift` | 加班、夜宵 | 夜间办公桌、窗外城市灯、少量星点 | 靛蓝 + 琥珀 |
| `bg_weekend_family` | 周末、亲子 | 明亮门店外立面、树影、彩色路标、开阔天空 | 天蓝 + 麦金 |
| `bg_drive_thru_storm` | 得来速、恶劣天气 | 车道、雨刷视角、霓虹箭头、低矮云层 | 紫蓝 + 橙 |

背景生成提示词模板：

```text
Use case: stylized-concept
Asset type: modular order-DNA background, no character
Primary request: <背景 ID 对应场景>
Style/medium: clean cinematic 2.5D illustration, premium game splash art
Composition/framing: wide 3:2, clear center negative space for a composited character
Lighting/mood: <时间与天气>
Color palette: <主色，不使用大面积渐变>
Constraints: no people, no food close-up, no readable text, no logos, no watermark
Avoid: busy central details, hard horizon across the character area, UI panels
```

天气层单独提供：`weather_rain_light`、`weather_rain_heavy`、`weather_sun_dust`、`weather_snow_soft`、`weather_wind_leaf`。它们应以透明 PNG 输出，方便在背景和角色之间叠加。

## 13. 最终合成示例

### 示例 A：雨幕板烧骑手

```yaml
mainMeal: 板烧鸡腿堡
snacks: [玉米杯]
drinks: [零度可乐]
desserts: []
fulfillment: 麦乐送
time: 午餐
weather: 小雨
context: 会议前
effect: 优惠券
background: bg_rain_office_noon
```

合成：`body_grilled_rider` + `equip_corn_shield` + `energy_zero_bubble_core` + `motion_delivery_dash` + `weather_rain_light`。角色位于画面中心偏下，右侧留出名称和订单摘要空间。

### 示例 B：晨光麦香探索者

```yaml
mainMeal: 麦香鸡
snacks: [薯条]
drinks: [橙汁]
desserts: [派]
fulfillment: 到店取餐
time: 早餐
weather: 晴天
context: 通勤
background: bg_sunrise_commute
```

合成：`body_mcchicken_scout` + `equip_fries_blade` + `energy_orange_sun_core` + `companion_pie_comet` + `motion_pickup_walk`。整体姿态轻快，粒子密度为 `low`，体现“顺路拿走”的效率感。

### 示例 C：夜班咖啡守望者

```yaml
mainMeal: 巨无霸
snacks: [麦乐鸡]
drinks: [咖啡]
desserts: [麦旋风]
fulfillment: 外带
time: 夜宵
weather: 晴天
context: 加班
background: bg_night_shift
```

合成：`body_bigmac_captain` + `equip_nugget_drone_pack` + `energy_coffee_clock_core` + `companion_mcflurry_orbit`。背景使用较低饱和度，咖啡时钟核心和麦旋风伙伴承担主要视觉焦点。

## 14. 资产交付清单

24 个 MVP 部件的逐项生图提示词见 [McMoment_餐品部件生图提示词.md](McMoment_餐品部件生图提示词.md)。

MVP 建议先制作以下 24 个独立资源：6 个身体、6 个装备、5 个动力核心、4 个伙伴、3 个动作，再配 6 套背景和 5 套天气层。每个资源同时提供资源 ID、挂点、占用槽位、冲突列表、变体列表和版权/来源字段。

最终图片只在运行时生成：

```text
orderDNA JSON
  → 资源目录查询
  → 兼容性过滤
  → 随机种子选变体
  → 图层合成
  → 订单状态动画
  → 分享卡片导出
```

因此 Git 中仍然只有可复用部件、背景和组合规则，不会出现任何一张“完整订单角色图”。
