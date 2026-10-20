# McMoment 餐品部件生图提示词

本版映射：主餐 → 身体骨架；小食 → 四肢；饮料 → 头部；甜品 → 装饰。共 6 + 6 + 5 + 4 = 21 套餐品风格，取消三个履约动作资源。默认堂食，完成动作由程序控制独立图层。

## 使用方法与交付数量

主餐只画胸腹腰胯，不含头和四肢；饮料头部包含脸。每套小食必须逐次生成四张独立部件：arm_left、arm_right、leg_left、leg_right。一张四肢拼图不能直接用于挥手或跳跃。

餐品资源合计 39 张 PNG（6 身体 + 24 四肢 + 5 头 + 4 装饰），再加文末 6 张中性资源，总计 45 张。多份主餐会复用这些资源随机组合成小队，不需要为每个最终角色重新生图。

以下代码块仅包含各资源的专属描述与槽位要求，不重复通用规则。每次生成时，将本节“统一生成规则”和对应代码块一起提交；六套小食四肢和中性四肢均已逐张展开，无需自行替换或拼接，代码块上方标注建议保存路径。

AI 输出不能保证精确挂点。先用中性资源试拼，统一裁切、缩放到以下画布坐标；将通过验收的同一 rig 参考图用于后续生成。画布位置是交付标准，不能只写进提示词就跳过后处理。

### 统一生成规则（每次生成均与单个资源提示词一起提交）

~~~text
Create one standalone modular sprite for McMoment characters in a consistent friendly premium collectible-toy 2.5D style. Strict front-facing orthographic view, soft upper-left studio light, crisp readable silhouette, restrained detail. Output one 1024x1024 transparent PNG, sRGB, clean alpha, at least 32px edge padding. Keep the resource prompt's scale and placement; leave the rest transparent. No background, floor/cast shadow, scenery, text, labels, logos, watermark, contact sheet, multiple views, extra objects, particles, baked-in glow or visible anchor dots. Draw only requested parts.
Negative: assembled character, food photography, beverage cup, weapon, shield, backpack, companion creature, duplicate/merged parts, perspective rotation, cropped edges, mounting labels, opaque background, lettering.
~~~
## 四肢槽位参考（已写入每段提示词）

“左/右”均以角色自身为准，正面角色左侧在画面右侧。四肢各为一张完整刚性部件，手与手臂合一，脚与腿合一；肩或髋为旋转中心。每套四肢必须先保持同一材质、同一色块、同一长度和同一正面姿态，再只做左右镜像；左右手不能变成不同手型，左右腿不能变成不同鞋型或侧面视角。

| 文件名 | 已包含在对应提示词中的槽位说明 |
|---|---|
| arm_left.png | Draw only the character-left arm including its hand, on the image-right side. Shoulder pivot (.66,.42), hand near (.75,.63), envelope x=.64-.81, y=.40-.66. Relaxed downward angle, neutral mitten hand, no upper torso. |
| arm_right.png | Draw only the character-right arm including its hand, on the image-left side. Shoulder pivot (.34,.42), hand near (.25,.63), envelope x=.19-.36, y=.40-.66. Relaxed downward angle, neutral mitten hand, no upper torso. |
| leg_left.png | Draw only the character-left leg including its foot, on the image-right side. Hip pivot (.59,.64), sole near y=.91, envelope x=.53-.68, y=.62-.92. Front-facing stable standing leg, no pelvis. |
| leg_right.png | Draw only the character-right leg including its foot, on the image-left side. Hip pivot (.41,.64), sole near y=.91, envelope x=.32-.47, y=.62-.92. Front-facing stable standing leg, no pelvis. |

连接根部保留 12–20 px 遮挡余量，接口圆滑，禁止画入躯干。最终 PNG 均保持 1024 × 1024；不裁成不同画布尺寸直接叠图。

## 一、主餐：6 个身体骨架

### 1. body_grilled_rider｜板烧身体骨架

~~~text
A compact toasted brown and gold torso shell with subtle parallel grill-line engraving and a light riding-jacket silhouette. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 2. body_bigmac_captain｜巨无霸身体骨架

~~~text
A broad layered gold and cream torso shell with three stacked armor bands, restrained leaf-green seams and a sturdy waist. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 3. body_mcchicken_scout｜麦香鸡身体骨架

~~~text
A lightweight pale-gold torso shell with soft crispy-surface detailing and one leaf-green waist seam. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 4. body_spicy_flare｜麦辣身体骨架

~~~text
A streamlined red-orange torso shell with restrained heat-wave engraving and a compact waist. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 5. body_nugget_swarm｜麦乐鸡身体骨架

~~~text
One torso shell made of connected rounded toasted-gold armor panels. A single torso, never separate creatures or floating pieces. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 6. body_breakfast_sunrise｜早餐身体骨架

~~~text
A rounded cream-and-gold torso shell with a subtle sunrise engraving and warm toasted trim. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

## 二、小食：6 套四肢，24 段独立提示词

### 7. limb_fries｜薯条四肢

#### limb_fries/arm_left.png｜左臂

~~~text
Golden longitudinal ridges, red joint cuffs, smooth toy-like geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_fries/arm_right.png｜右臂

~~~text
Golden longitudinal ridges, red joint cuffs, smooth toy-like geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_fries/leg_left.png｜左腿

~~~text
Golden longitudinal ridges, red joint cuffs, smooth toy-like geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match paired leg in material, color, length, thickness and shoe; mirror only its side contour.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_fries/leg_right.png｜右腿

~~~text
Golden longitudinal ridges, red joint cuffs, smooth toy-like geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match paired leg in material, color, length, thickness and shoe; mirror only its side contour.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 8. limb_corn｜玉米四肢

#### limb_corn/arm_left.png｜左臂

~~~text
Cream-yellow rounded armor, a few integrated corn-kernel surface motifs, soft green cuffs. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_corn/arm_right.png｜右臂

~~~text
Cream-yellow rounded armor, a few integrated corn-kernel surface motifs, soft green cuffs. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_corn/leg_left.png｜左腿

~~~text
Cream-yellow rounded armor, a few integrated corn-kernel surface motifs, soft green cuffs. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_corn/leg_right.png｜右腿

~~~text
Cream-yellow rounded armor, a few integrated corn-kernel surface motifs, soft green cuffs. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 9. limb_spicy_wing｜麦辣鸡翅四肢

#### limb_spicy_wing/arm_left.png｜左臂

~~~text
Red-orange angular armor, restrained toasted accents, a standard humanoid limb silhouette, never an actual wing. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_spicy_wing/arm_right.png｜右臂

~~~text
Red-orange angular armor, restrained toasted accents, a standard humanoid limb silhouette, never an actual wing. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_spicy_wing/leg_left.png｜左腿

~~~text
Red-orange angular armor, restrained toasted accents, a standard humanoid limb silhouette, never an actual wing. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_spicy_wing/leg_right.png｜右腿

~~~text
Red-orange angular armor, restrained toasted accents, a standard humanoid limb silhouette, never an actual wing. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 10. limb_nugget｜麦乐鸡四肢

#### limb_nugget/arm_left.png｜左臂

~~~text
Toasted-gold rounded block armor, cream joints, soft chunky geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_nugget/arm_right.png｜右臂

~~~text
Toasted-gold rounded block armor, cream joints, soft chunky geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_nugget/leg_left.png｜左腿

~~~text
Toasted-gold rounded block armor, cream joints, soft chunky geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_nugget/leg_right.png｜右腿

~~~text
Toasted-gold rounded block armor, cream joints, soft chunky geometry. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 11. limb_apple｜苹果片四肢

#### limb_apple/arm_left.png｜左臂

~~~text
Pale-green curved armor, thin apple-red edge trim, clean smooth surfaces. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_apple/arm_right.png｜右臂

~~~text
Pale-green curved armor, thin apple-red edge trim, clean smooth surfaces. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_apple/leg_left.png｜左腿

~~~text
Pale-green curved armor, thin apple-red edge trim, clean smooth surfaces. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_apple/leg_right.png｜右腿

~~~text
Pale-green curved armor, thin apple-red edge trim, clean smooth surfaces. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 12. limb_salad｜沙拉四肢

#### limb_salad/arm_left.png｜左臂

~~~text
Leaf-green layered armor plates, pale-green joints, subtle leaf-vein engraving. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_salad/arm_right.png｜右臂

~~~text
Leaf-green layered armor plates, pale-green joints, subtle leaf-vein engraving. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_salad/leg_left.png｜左腿

~~~text
Leaf-green layered armor plates, pale-green joints, subtle leaf-vein engraving. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

#### limb_salad/leg_right.png｜右腿

~~~text
Leaf-green layered armor plates, pale-green joints, subtle leaf-vein engraving. Draw only one limb specified below, including its joint connector, never the other three limbs. No head, torso or ornament. Keep a 12-20px overlap tab at its attachment root. Match the opposite limb in material, colors, length, thickness, cuff and hand/foot shape; only mirror its lateral contour. No different glove, pose, shoe, side view or perspective.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

## 三、饮料：5 个头部

### 13. head_zero_bubble｜零度可乐头部

~~~text
A rounded black-and-silver toy head with embossed bubble motifs, friendly eyes and a small smiling mouth. One complete head with eyes, mouth and short neck connector; no torso, limbs or decorations. Head envelope x=.35-.65, y=.14-.35; neck connector ends at (.50,.34); top decoration reference is (.50,.13). Keep the face upright and readable.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 14. head_cola_spark｜可口可乐头部

~~~text
A red-brown rounded toy head with amber highlights, subtle bubble engravings, friendly eyes and a small smiling mouth. One complete head with eyes, mouth and short neck connector; no torso, limbs or decorations. Head envelope x=.35-.65, y=.14-.35; neck connector ends at (.50,.34); top decoration reference is (.50,.13). Keep the face upright and readable.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 15. head_sprite_mist｜雪碧头部

~~~text
A mint-and-cyan toy head with translucent-looking surface panels, friendly eyes and a small smiling mouth. Keep its interior visually solid enough to read clearly. One complete head with eyes, mouth and short neck connector; no torso, limbs or decorations. Head envelope x=.35-.65, y=.14-.35; neck connector ends at (.50,.34); top decoration reference is (.50,.13). Keep the face upright and readable.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 16. head_orange_sun｜橙汁头部

~~~text
An orange-gold round toy head with restrained sun-ray engraving, friendly eyes and a small smiling mouth. One complete head with eyes, mouth and short neck connector; no torso, limbs or decorations. Head envelope x=.35-.65, y=.14-.35; neck connector ends at (.50,.34); top decoration reference is (.50,.13). Keep the face upright and readable.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 17. head_coffee_clock｜咖啡头部

~~~text
A coffee-brown and cream toy head with a subtle clock-dial-inspired face frame, friendly eyes and a small smiling mouth. No hands, numerals or letters on the dial. One complete head with eyes, mouth and short neck connector; no torso, limbs or decorations. Head envelope x=.35-.65, y=.14-.35; neck connector ends at (.50,.34); top decoration reference is (.50,.13). Keep the face upright and readable.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

## 四、甜品：4 个装饰

### 18. deco_mcflurry_wings｜麦旋风翅膀

~~~text
One connected pair of small cream-swirl ornamental wings, joined by a narrow rear mounting bridge. Smooth opaque sculpted surfaces, subtle chocolate flecks. A decorative wearable, no character, no face. Back-slot pivot (.50,.43), envelope x=.18-.82, y=.29-.77. This layer sits behind the torso and limbs. Show only the decoration; leave any imagined wearer fully transparent.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 19. deco_pie_cap｜派帽子

~~~text
One small golden pastry-textured cap with a subtle lattice top and a clean empty underside mounting rim. No face, head or real pastry prop. Head-top-slot pivot (.50,.13), envelope x=.32-.68, y=.05-.18. This layer sits above the head without covering the eyes. Show only the decoration; leave any imagined wearer fully transparent.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 20. deco_sundae_halo｜圣代光环

~~~text
One cream-and-caramel ornamental oval halo, solid sculpted rim, open transparent center. No outer glow, support stand, face or head. Head-top-slot pivot (.50,.13), envelope x=.32-.68, y=.05-.18. This layer sits above the head without covering the eyes. Show only the decoration; leave any imagined wearer fully transparent.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### 21. deco_icecream_cape｜冰淇淋披风

~~~text
One cream-colored wearable cape with softly scalloped melting-inspired edges and a narrow upper mounting bridge. A smooth sculpted fabric-like ornament, not liquid, no head or clasp drawn on a body. Back-slot pivot (.50,.43), envelope x=.18-.82, y=.29-.77. This layer sits behind the torso and limbs. Show only the decoration; leave any imagined wearer fully transparent.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

## 五、中性基础部件：额外 6 张

缺少对应餐品时只使用无餐品特征的中性图。只有小食/饮料的订单使用中性身体占位。它们不增加餐品风格数量，也不表示用户点了额外餐品。

### defaults/body_neutral.png

~~~text
A simple warm-gray and ivory toy torso shell with smooth unmarked panels, no food motifs. Draw only a headless and limbless chest-abdomen-pelvis frame. No face, neck above the socket, arms, hands, legs, feet or decorations. Body envelope x=.32-.68, y=.34-.66. Neck socket at (.50,.34), character-left shoulder at (.66,.42), character-right shoulder at (.34,.42), character-left hip at (.59,.64), character-right hip at (.41,.64). Small joint-cover lips may overlap connections; do not extend them into limbs. Match all front-v1 sockets.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### defaults/head_neutral.png

~~~text
A simple warm-gray and ivory rounded toy head, friendly eyes and a small smiling mouth, no food or beverage motifs. One complete head with eyes, mouth and short neck connector; no torso, limbs or decorations. Head envelope x=.35-.65, y=.14-.35; neck connector ends at (.50,.34); top decoration reference is (.50,.13). Keep the face upright and readable.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### defaults/arm_left.png｜中性左臂

~~~text
A simple warm-gray and ivory toy limb with smooth unmarked panels, no food motifs. Only the specified limb with hand/foot and smooth joint connector; no other parts. Keep a 12-20px root overlap.

Character-left arm (image-right): shoulder pivot (.66,.42), hand (.75,.63), envelope x=.64-.81, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### defaults/arm_right.png｜中性右臂

~~~text
A simple warm-gray and ivory toy limb with smooth unmarked panels, no food motifs. Only the specified limb with hand/foot and smooth joint connector; no other parts. Keep a 12-20px root overlap.

Character-right arm (image-left): shoulder pivot (.34,.42), hand (.25,.63), envelope x=.19-.36, y=.40-.66; relaxed downward angle, neutral mitten. No torso.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### defaults/leg_left.png｜中性左腿

~~~text
A simple warm-gray and ivory toy limb with smooth unmarked panels, no food motifs. Only the specified limb with hand/foot and smooth joint connector; no other parts. Keep a 12-20px root overlap.

Character-left leg (image-right): hip pivot (.59,.64), sole y=.91, envelope x=.53-.68, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

### defaults/leg_right.png｜中性右腿

~~~text
A simple warm-gray and ivory toy limb with smooth unmarked panels, no food motifs. Only the specified limb with hand/foot and smooth joint connector; no other parts. Keep a 12-20px root overlap.

Character-right leg (image-left): hip pivot (.41,.64), sole y=.91, envelope x=.32-.47, y=.62-.92; front-facing stable stance. No pelvis.

Negative: full figure, photo, cup, weapon, shield, backpack, creature, duplicates, merged parts, perspective, crop, labels, background, shadow, text.
~~~

## 拼接与动画验收

先验证 6 张中性图可以在同一画布直接叠加，再替换餐品部件。叠图顺序：背部装饰 → 双腿 → 双臂 → 身体 → 头部 → 头顶装饰 → 程序特效。具体挂点与小队分配以《McMoment_订单DNA概念.md》为准。

检查透明边缘、接口遮挡余量、手脚比例与头部大小；随机试拼至少三组跨风格组合，确认帽子不遮脸、翅膀不盖住身体。所有图片保持相同光照与正面视角，不单独翻转某个部件来凑左右。

按钮下方的角色在点击后生成，跟随 5 秒进度移动；完成时程序让整个人物轻跳、一侧手臂向外挥动、装饰轻摆。图片里不预画运动轨迹、庆祝星光、托盘或举杯。四肢是一段刚性图层，不要求肘膝弯曲。

本文件提供制作提示词，尚未产出实际 PNG；导入资源与运行时组装需在图片生成验收后接入。
