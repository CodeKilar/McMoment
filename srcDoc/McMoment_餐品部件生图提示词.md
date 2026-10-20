# McMoment 订单 DNA：24 个 MVP 部件生图提示词

本清单对应 24 个独立资源：6 个身体、6 个装备、5 个动力核心、4 个伙伴、3 个动作。每条提示词单独生成一张素材，不生成拼图。目标是让部件可拆分、可叠加、可自由组合；标有“品牌锚点”的仅做局部弱提示，建议同时保留无品牌版本。

## 通用风格前缀

将此前缀与每条具体提示词拼接使用：

```text
Create one standalone modular asset for McMoment order-DNA character composition. Unified polished 2.5D game-art style, friendly premium collectible design, clean readable silhouette, restrained material detail, soft studio lighting, crisp edges. Draw only the specified single asset, front or slight three-quarter view, centered with generous transparent padding for cropping and anchor adjustment. Output one 1024x1024 transparent PNG with clean alpha. No ground shadow, scene, background, frame, text, labels, watermark, contact sheet, or extra objects. Keep attachment edges and mounting area clear so the asset can be freely layered with unrelated bodies, equipment, energy cores, companions, and motion poses. Include a McDonald's visual anchor only when explicitly requested in the asset prompt; make it a small non-text accent, never the sole identifying feature.
```

通用负面约束：

```text
photorealism, busy background, full character poster, multiple views, multiple assets, readable text, numbers, fake logos, incorrect lettering, excessive tiny details, hard cast shadow, strong lens flare, cropped silhouette, fused edges, unclear mounting area, baked-in body parts, baked-in unrelated equipment
```

## 身体部件（6）

### 1. `body_grilled_rider`｜板烧鸡腿堡骑手

```text
A compact agile rider body inspired by a grilled chicken burger: toasted deep-golden shoulder armor with subtle grill marks, simple chest armor, lightweight legs, slightly forward-leaning courier stance. Do not draw a burger, helmet, handheld items, cape, or background. Optional McDonald's anchor: a tiny abstract golden-arches emboss on the chest, no letters and no complete logo. Keep head, both hands, back, feet, chest-core, and companion attachment areas clearly open.
```

### 2. `body_bigmac_captain`｜巨无霸队长

```text
A broad, sturdy but friendly captain body inspired by a double-layer burger: layered rounded shoulder armor and stacked chest plates, warm toasted gold and dark brown bands with a restrained lettuce-green accent, balanced confident stance. No burger, cape, weapon, helmet, or background. Optional McDonald's anchor: a tiny red-and-yellow double stripe on one shoulder badge, no lettering. Leave chest-core and all standard body anchors unobstructed.
```

### 3. `body_mcchicken_scout`｜麦香鸡探索者

```text
A light scout body inspired by a crispy chicken sandwich: golden feather-like shoulder shapes, cream-and-gold armor, a small leaf-green accent, nimble legs and a curious side-facing stance. No chicken, food prop, weapon, backpack, helmet, or background. Optional McDonald's anchor: a tiny abstract red-and-gold curved waist buckle, no letters or logo. Keep hands and back attachment points clear.
```

### 4. `body_spicy_flare`｜辣味热焰身体

```text
A streamlined short-dash body inspired by spicy chicken: red-orange armor panels, restrained heat-wave motifs, compact shoulders and springy legs; energetic rather than aggressive. No food, weapon, flame background, particles, or scenery. Optional McDonald's anchor: one small red-and-gold armor panel at the waist, no text or logo. Keep hands, back, and chest-core attachment points distinct.
```

### 5. `body_nugget_swarm`｜麦乐鸡模块化身体

```text
One readable modular character body inspired by golden nuggets: a central torso with a few rounded detachable-looking armor modules, clear gaps between modules, friendly and dependable, in toasted gold and cream with a tiny red accent. It must still read as one body, not a group of characters. No food pieces, drone, weapon, or background. Optional McDonald's anchor: tiny abstract golden-arches emboss on the chest, no text or complete logo. Preserve standard head, hand, back, and foot anchors.
```

### 6. `body_breakfast_sunrise`｜早餐日出身体

```text
A warm breakfast-commuter body with soft rounded armor, cream and pale gold surfaces, a restrained sunrise-orange edge, relaxed upright posture with a hint of morning stretch. No sun background, food, cup, backpack, weapon, or scene. Optional McDonald's anchor: a tiny red-and-gold curved stitch on one shoulder, no lettering. Leave chest-core, hand, and back anchors open.
```

## 小食装备（6）

### 7. `equip_fries_blade`｜薯条光刃

```text
One compact right-hand weapon: several straight golden fries aligned into a clean short energy blade, with a simple separate grip and a restrained warm-gold edge glow. No hand, body, fries carton, flying crumbs, or background. Optional McDonald's anchor: a tiny red paper sleeve with a narrow gold trim around the grip, no text or logo. Keep the silhouette clear and compact for free mixing with a shield or backpack.
```

### 8. `equip_corn_shield`｜玉米圆盾

```text
One left-hand shield with a rounded silhouette, a neat corn-kernel pattern in a pale-gold rim, subtly translucent protective face, and a clearly visible rear grip. No hand, body, corn cup, particles, or background. Optional McDonald's anchor: a tiny red curved inlay on the rim, no lettering. Keep the outline separate from the hand mount and compatible with a back item.
```

### 9. `equip_spicy_wing_boomerang`｜麦辣鸡翅回旋镖

```text
One right-hand boomerang shaped with an abstract paired-wing curve, warm red-orange body, restrained golden heat etching, rounded safe edges and an obvious grip point. No realistic meat, hand, character, trail, flame scene, or text. Optional McDonald's anchor: a tiny gold rivet with a small red accent at the center, no logo. Transparent clearance around the full silhouette.
```

### 10. `equip_nugget_drone_pack`｜麦乐鸡无人机背包

```text
One compact back-mounted scout pack in rounded golden modules, with two small foldable rotors and a simple side scanning lens; helpful supply drone, not a weapon. No character, hands, food, flight trail, background, or text. Optional McDonald's anchor: one tiny red-and-yellow geometric patch, no letters or logo. Flat back mounting surface, compact shoulder-width silhouette, clear edges.
```

### 11. `equip_apple_compass`｜苹果罗盘

```text
One lightweight left-hand fantasy compass: translucent apple-green circular face, clean gold needle, tiny leaf finial, crisp readable center. No hand, character, packaging, map, text, trail, or background. No brand anchor; keep the natural green palette so it mixes well with red and gold assets. Complete outer contour and a clear hand grip.
```

### 12. `equip_salad_field_pack`｜沙拉野外补给包

```text
One lightweight back-mounted field pack built from a few large leaf-shaped armor panels and rounded pockets, fresh green, cream and small gold buckles; clean broad shapes, not busy. No character, hand, food bowl, utensils, text, or background. Optional McDonald's anchor: one tiny abstract red-and-gold round patch with no lettering or complete logo. Flat rear mount, moderate width, clear outline.
```

## 饮料动力核心（5）

### 13. `energy_zero_bubble_core`｜零度可乐气泡核心

```text
One chest-sized circular propulsion core in black and silver, with a clear cool-white energy pearl, a few crisp bubbles and concentric pulse etching. Not a bottle or can. No body, particle trail, background, text, or label. Optional McDonald's anchor: tiny red arc accents among silver geometric facets, no Coke lettering or complete logo. Front-facing, clean outer clearance, usable on chest-core or back.
```

### 14. `energy_cola_spark_core`｜可口可乐星火核心

```text
One compact circular red-and-black energy turbine, bright red center, dark metallic outer ring and restrained white highlights, stable and readable as a chest core. No bottle, can, liquid splash, character, background, text, or label. Optional McDonald's anchor: a small white ribbon-like curve inset on the red shell, not forming a recognizable logo and containing no words. Match the scale and material quality of the other cores.
```

### 15. `energy_sprite_mist_core`｜雪碧清雾核心

```text
One chest-sized aqua-green and clear-white teardrop turbine, bright center and a compact curling mist ring, with only a few attached water-drop insets. No bottle, character, background, text, label, or extended particle effect. Optional McDonald's anchor: tiny red and gold line accents on the rim, subtle against the green, no logo. Clean front-facing silhouette, independently layerable.
```

### 16. `energy_orange_sun_core`｜橙汁太阳核心

```text
One rounded orange-gold sun reactor with a bright amber center, short orderly radial fins and translucent warm material; reads as a friendly power source, not fruit or a drink. No background halo, character, cup, text, or label. Optional McDonald's anchor: a small red-and-gold double ring at the base, abstract with no logo. Soft edges, clearly separated inner and outer layers.
```

### 17. `energy_coffee_clock_core`｜咖啡时钟核心

```text
One brown-and-gold mechanical clock core with a round dial, simple marks but no numerals or text, a slow central hand and an amber energy window; stable long-duration power. No coffee cup, bean pile, character, background, or readable marks. Optional McDonald's anchor: a tiny red fastener and gold arc on the outer ring, no logo. Front-facing and the same visual scale as the other energy cores.
```

## 甜品伙伴（4）

### 18. `companion_mcflurry_orbit`｜麦旋风环绕伙伴

```text
One small floating soft-serve swirl sprite: friendly cream-white spiral, a few restrained chocolate or colorful inclusions, simple kind face, and one separate elliptical orbit ring. No cup, spoon, character, background, or text. Optional McDonald's anchor: a tiny red-and-gold rim accent beneath the sprite, no packaging text or logo. Keep sprite and ring distinct for orbit animation.
```

### 19. `companion_pie_comet`｜派彗星伙伴

```text
One small rounded golden-brown pie transformed into a friendly comet sprite, crisp simple lattice top and a short warm tail attached to the silhouette. No plate, character, background, text, or extra pies. Optional McDonald's anchor: a tiny red-and-gold abstract baked-seal detail, no letters or logo. Centered with clear padding for a companion anchor.
```

### 20. `companion_sundae_lantern`｜圣代灯笼伙伴

```text
One floating sundae-inspired lantern sprite: abstract rounded cup body, cream swirl top, soft amber light contained within the body, and a small top loop. No table, scene, character, background, or text. Optional McDonald's anchor: a tiny red curve and gold clasp at the lower rim, no writing or complete logo. Crisp complete silhouette, suitable for back or companion mounting.
```

### 21. `companion_icecream_sprite`｜冰淇淋漂浮精灵

```text
One small floating ice-cream sprite with cream-white swirl, tiny pale-pink and mint accents, rounded body and a simple friendly expression; charming game companion, not overly childish. No cone packaging, character, background, text, or duplicate sprites. Optional McDonald's anchor: tiny abstract golden double-arc emboss on one side, not a complete logo and no words. Clear contour for bobbing animation.
```

## 履约动作（3）

### 22. `motion_delivery_dash`｜麦乐送冲刺

```text
One reusable neutral character pose asset: compact forward-leaning delivery dash skeleton, arms in a natural riding grip, legs in a clear alternating stride, a few short detached speed marks behind the feet. Do not define a specific food-themed body, vehicle, equipment, or background. Optional McDonald's anchor: a tiny red-and-gold reflective stripe on a generic backpack silhouette, no text or logo. Transparent background, stable pose anchor, leave chest-core visible.
```

### 23. `motion_pickup_walk`｜到店取餐步行

```text
One reusable neutral character walking pose: upright light stride, one foot forward, one foot pushing back, relaxed anticipatory posture, one hand lifted and available for attaching a snack item. No specific food body, paper bag, equipment, storefront, or background. No brand anchor on the pose itself; leave an optional waist location for a separate red-and-gold accent. Transparent background, clear head, hand, back and foot anchors.
```

### 24. `motion_dine_tray`｜堂食托盘

```text
One reusable neutral dine-in pose: relaxed balanced standing or slight seated stance, both arms holding a level empty tray; tray must remain empty so order items can be composited freely. No specific body, food, chair, table, restaurant, or background. Optional McDonald's anchor: an extremely thin red-and-gold rim accent on the tray only, no arches, text, or complete logo. Transparent background, clean separation between tray, hands, and torso.
```

## 自由组合与验收

- 每条提示词单独生成；将通用风格前缀和负面约束拼接到提示词前后，不要一次生成 24 格拼图。
- 身体、装备、动力、伙伴和动作分别保存为独立图层，不把其他部件、挂点标记或投影烘焙进图像。
- 提示词中的“品牌锚点”均为可选。建议为标注项同时生成无锚点版本；至少一半资源保持无品牌细节，避免品牌元素妨碍混搭。
- 若生成器不支持透明背景，可先生成纯色底，再执行抠图并检查 alpha 边缘；不要把纯色底当作最终资产。
- 检查单件轮廓、透明边缘、安装区域和实际叠图效果；随机抽取不同身体与装备互换，确认颜色、比例和轮廓不会黏连或冲突。
- 文档第 10.5 节动作映射列有 4 种履约动作，但第 14 节 MVP 交付清单限定 3 个动作。本提示词按交付清单采用麦乐送、到店取餐、堂食；得来速可作为后续扩展资源。

