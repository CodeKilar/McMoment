# McMoment 餐品部件生图提示词

本版映射：主食 → 身体+四肢；小食 → 头部；饮料 → 搭配装饰（如眼镜、帽子）；甜品 → 高级装饰（如翅膀、光环）。共 6 + 6 + 5 + 4 = 21 套餐品风格。默认堂食，完成动作由程序控制独立图层。

## 使用方法与交付数量

每套主食生成一张完整的无头身体（躯干、双臂、双手、双腿、双脚一体绘制），小食生成带表情的独立头部；饮料与甜品均生成独立可叠加装饰，其中饮料为日常搭配款，甜品为更醒目的幻想/庆典款。

餐品资源合计 21 张 PNG（6 身体+四肢 + 6 头部 + 5 饮料搭配装饰 + 4 甜品高级装饰），再加 2 张中性资源（中性无头身体、中性头部），总计 23 张。多份主食会复用这些资源随机组合成小队，不需要为每个最终角色重新生图。

每个代码块都是可直接复制的完整提示词，已包含统一生成规则和该资源的专属描述；一次复制一个代码块即可生成一张 PNG。

设计策略不是让每个部件都直接贴标识：部分部件以餐品轮廓、材质和幻想设定为主要创意，部分部件再融入麦当劳红、金黄、双拱曲线、包装分区或经典餐品配色等锚点。锚点应成为结构、缝线、镶边或色块的一部分，不生成悬浮 Logo、文字广告或完整包装。所有资源首先必须是可独立叠加的透明部件，其次才是单张展示图的视觉效果。

AI 输出不能保证精确挂点。先用中性资源试拼，统一裁切、缩放到以下画布坐标；将通过验收的同一 rig 参考图用于后续生成。画布位置是交付标准，不能只写进提示词就跳过后处理。

### 统一生成规则（每次生成均与单个资源提示词一起提交）

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.
~~~
## 部件槽位参考（已写入提示词）

角色均正面朝向。主食身体是一张完整的无头刚性角色部件，双臂、双手、双腿、双脚与躯干连为一体；头部独立覆盖颈部接口。身体轮廓范围 x=.19-.81、y=.34-.92，颈部接口中心约 (.50,.34)，脚底约 y=.91。小食头部范围 x=.32-.68、y=.12-.37，颈部连接端位于 (.50,.35)。饮料装饰挂于头部/脸部侧边或头顶，不得遮挡眼睛；甜品高级装饰可挂于头顶或背部，背部件位于角色后层。最终 PNG 均保持 1024 × 1024，不裁成不同画布尺寸直接叠图。

## 一、主食：6 个身体+四肢整体

### 1. body_grilled_rider｜板烧身体+四肢

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, friendly compact proportions, crisp silhouette, molded vinyl and satin resin materials, soft upper-left studio light, gentle lower-right form shading, and clean anti-aliased edges.

Design a creative grilled-chicken rider body using toasted chestnut brown, caramel gold, warm cream, and restrained McDonald's red accents. Shape the torso like a compact riding jacket fused with protective toy armor: a slightly raised collar around the empty neck socket, curved lapel-like chest panels, a central golden twin-arch-inspired seam, and fine parallel grill-line engravings pressed into the chest and forearms. Add subtle toasted edge variation and a few darker char-line details, but keep the finish premium and stylized rather than realistic food. Use red piping at the cuffs and waist as the McDonald's anchor. Hands are simple ivory toy mitts; boots are sturdy dark-brown rounded riding boots with golden sole trim.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. Arms hang naturally with a slight heroic outward angle; legs form a balanced stable stance. No head, eyes, face, hair, helmet, loose food, sandwich, motorcycle, weapon, shield, cape, separate limb, or floating ornament. Envelope x=.19-.81, y=.34-.92; centered neck opening ends at (.50,.35); soles end at y=.91. Keep the neck and limb silhouette compatible with any independent head layer.

Deliver exactly one 1024x1024 sRGB RGBA PNG. Only the body pixels may have nonzero alpha. Everything outside the silhouette and every open gap between arms, torso, and legs must be alpha=0, including all four corners and at least 32px outer padding. Do not add a visible background, floor, shadow, scenery, text, logo, watermark, frame, duplicate view, crop, or perspective rotation. Transparency must be real PNG alpha data, not visual artwork.
~~~

### 2. body_bigmac_captain｜巨无霸身体+四肢

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, broad friendly proportions, crisp silhouette, layered molded-resin surfaces, soft upper-left studio light, restrained contact shading on the body itself, and clean anti-aliased edges.

Design a confident Big Mac captain body built from three integrated horizontal armor bands. Use toasted sesame-bun gold on the upper and lower bands, a warm cream center band, thin lettuce-green recessed seams, a narrow cheese-yellow diagonal accent, and a small McDonald's-red waist panel. Suggest the famous layered burger structure through abstract armor construction rather than drawing an actual burger. Add tiny sesame-like embossed dots only on the upper shoulder plates, a sturdy double-breasted captain silhouette, rounded epaulet forms molded into the shoulders, and a subtle twin-arch-shaped gold buckle at the center waist. Keep the body substantial and commanding but cute, with ivory mitten hands and dark warm-brown boots trimmed in gold.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. Arms rest slightly away from the torso so the transparent gaps remain readable; legs are symmetrical and stable. No head, face, hat, literal hamburger, loose ingredients, tray, flag, weapon, shield, cape, text, separate limb, or floating piece. Envelope x=.19-.81, y=.34-.92; centered neck opening ends at (.50,.35); soles end at y=.91.

Deliver exactly one 1024x1024 sRGB RGBA PNG. Only the body silhouette may have nonzero alpha. The complete exterior, the four corners, the padding, and all intentional gaps between limbs and torso must be alpha=0. Preserve at least 32px transparent padding. No visible backdrop, floor, cast shadow, scenery, border, watermark, duplicate view, crop, or perspective. Transparency must be encoded in the PNG alpha channel.
~~~

### 3. body_mcchicken_scout｜麦香鸡身体+四肢

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use strict front-facing orthographic staging, light agile proportions, smooth molded forms, fine controlled surface detail, soft upper-left studio light, and a clean readable silhouette.

Design a McChicken scout body with pale crispy gold, warm ivory, fresh leaf green, and a few small McDonald's-red navigation accents. The torso should feel lightweight and exploratory: a fitted scout-jacket shell with curved chest pockets embossed into the surface, slim shoulder guards, a leaf-green waist seam, and a small golden twin-arch-shaped chest clasp. Introduce delicate crisp-breading texture only on selected pale-gold panels; keep the abdomen, joints, gloves, and boots smoother so the design does not become noisy. Add cream collar trim suggesting sauce and a green layer peeking through the waist seam, but never draw actual lettuce or a sandwich. Use ivory mitten hands and compact golden-brown scout boots with red heel tabs.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. The arms hang in a ready but relaxed pose and do not hold equipment. No head, face, hat, backpack, binoculars, weapon, literal chicken sandwich, loose crumbs, food prop, separate limb, or floating decoration. Envelope x=.19-.81, y=.34-.92; neck opening ends at (.50,.35); soles at y=.91.

Output exactly one 1024x1024 sRGB RGBA PNG with real alpha transparency. Only the requested body may be visible. All pixels outside it, all four corners, and all gaps between the arms, torso, and legs must have alpha=0. Keep at least 32px transparent padding. No background, floor, cast shadow, scenery, text, watermark, crop, duplicate view, or perspective rotation.
~~~

### 4. body_spicy_flare｜麦辣身体+四肢

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, energetic athletic proportions, crisp rounded silhouette, satin molded resin, soft upper-left studio light, and controlled highlights.

Design a spicy McCrispy flare body using deep McDonald's red, chili orange, toasted gold, charcoal accents, and small warm-cream joint panels. Build a streamlined torso with layered flame-shaped side panels flowing upward toward the shoulders, subtle heat-wave engravings across the chest, and a compact dark-red waist. Integrate a bright golden twin-arch curve into the central chest seam as a brand anchor without placing a floating logo. Let the forearm and shin guards carry restrained crispy texture and ember-like golden speckles; keep them embedded in the material, never airborne particles. Use ivory mitten hands with red cuffs and sturdy charcoal boots with orange-gold toe caps.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. Pose it in a stable front-facing stance with arms slightly separated from the torso. No head, face, horns, literal flames, fire effects, smoke, chicken wing, sandwich, weapon, loose food, separate limb, or extra ornament. Envelope x=.19-.81, y=.34-.92; neck opening ends at (.50,.35); soles at y=.91.

Output exactly one 1024x1024 sRGB RGBA PNG. Keep only the body visible. Every exterior pixel, corner, padding area, and intentional open gap between limbs and torso must have alpha=0. Preserve at least 32px transparent padding. No visible background, floor, shadow, glow field, scenery, text, watermark, duplicate view, crop, or perspective.
~~~

### 5. body_nugget_swarm｜麦乐鸡身体+四肢

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use strict front-facing orthographic staging, playful sturdy proportions, smooth resin construction, soft upper-left studio light, crisp silhouette, and clean anti-aliased edges.

Design a McNuggets swarm-inspired body as one unified character shell made from several interlocking rounded armor lobes. Use toasted nugget gold, honey-mustard yellow, warm cream, and small McDonald's-red connector seams. The chest should read as a single coherent torso, not a pile of separate objects: three or four softly irregular raised panels lock together around a central golden twin-arch-shaped groove. Add fine crisp-breading texture on the raised panels, smoother red recessed channels between them, rounded cream joint covers, ivory mitten hands, and compact golden boots. The creative “swarm” idea appears only through the clustered panel rhythm and repeated rounded forms; there are no miniature characters or floating nuggets.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. Keep a friendly stable stance and clear transparent gaps around the limbs. No head, face, literal nugget pieces, sauce cup, box, multiple bodies, companion characters, detached panel, separate limb, or floating object. Envelope x=.19-.81, y=.34-.92; neck opening ends at (.50,.35); soles at y=.91.

Output exactly one 1024x1024 sRGB RGBA PNG with a real alpha channel. Only this unified body may have nonzero alpha. All four corners, outer padding, and spaces between arms, torso, and legs must be alpha=0. Keep at least 32px transparent padding. No background, floor, cast shadow, text, watermark, crop, duplicate view, or perspective.
~~~

### 6. body_breakfast_sunrise｜早餐身体+四肢

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, cheerful rounded proportions, smooth molded vinyl and resin, soft upper-left morning-like studio light, gentle form shading, and a clean silhouette.

Design a breakfast sunrise body using warm English-muffin brown, egg-white ivory, yolk gold, McDonald's red, and a tiny fresh green accent. Shape the torso as a rounded morning-uniform shell: an ivory central chest panel surrounded by toasted trim, a shallow golden sunrise engraving with radiating molded grooves, red side panels inspired by classic breakfast packaging, and a subtle twin-arch curve integrated into the waist seam. Add lightly porous toasted texture only on the outer brown panels, smooth cream forearms and gloves, and rounded brown boots with golden soles. The design should evoke a warm breakfast mood through color and geometry without depicting a literal egg, muffin, hash brown, package, or food photograph.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. Use a welcoming stable stance with arms relaxed and separated enough to preserve readable gaps. No head, face, chef hat, breakfast tray, cup, clock, sun object, loose food, separate limb, or extra decoration. Envelope x=.19-.81, y=.34-.92; neck opening ends at (.50,.35); soles at y=.91.

Output exactly one 1024x1024 sRGB RGBA PNG. Only the body silhouette may contain visible pixels. Everything else, including four corners, outer padding, neck opening area, and gaps between limbs and torso, must have alpha=0. Preserve at least 32px transparent padding. No background, floor, cast shadow, scenery, text, watermark, border, duplicate view, crop, or perspective.
~~~

## 二、小食：6 个头部

### 7. head_fries｜薯条头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, friendly rounded proportions, molded vinyl/resin surfaces, crisp silhouette, clean anti-aliased edges, soft upper-left studio light, and gentle lower-right form shading.

Design a cheerful fries-inspired head using rich golden yellow, toasted amber tips, warm cream facial panels, and a restrained McDonald's-red lower rim. Build the head as one compact sculpted object: five to seven rounded fry-like crown ridges rise from the top silhouette with varied but balanced heights, while a curved red shell around the lower cheeks subtly recalls classic fries packaging. Integrate a shallow twin-arch curve into the red front rim as molded geometry rather than a printed or floating logo. Add tiny salt-like embossed highlights sparingly and keep all surfaces premium, clean, and toy-like rather than photorealistic food.

Give the head two large friendly dark-brown eyes with small warm highlights, softly raised golden brows, rounded cheeks, and a small confident smile. Include one short centered neck connector. Keep the eye zone unobstructed so glasses can be layered over it later; leave clear visual space above the crown for optional head-top decoration. No torso, shoulders, limbs, hat, glasses, loose fries, carton, text, separate pieces, duplicate face, or extra character. Head envelope x=.32-.68, y=.12-.37; neck connector ends at (.50,.35).

Deliver exactly one 1024x1024 sRGB RGBA PNG with real alpha transparency. Only the complete head and neck connector may have nonzero alpha. Every exterior pixel, all four corners, outer padding, and open notches between crown ridges must have alpha=0. Preserve at least 32px transparent padding. No background, floor, cast shadow, scenery, frame, watermark, crop, alternate view, or perspective rotation.
~~~

### 8. head_corn｜玉米头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use a strict front-facing orthographic view, soft rounded proportions, clean molded materials, crisp readable edges, soft upper-left studio light, and subtle form shading.

Design a sweet-corn-inspired head using butter yellow, warm cream, fresh husk green, and a very small McDonald's-red accent at the neck ring. Shape it as a plump rounded oval with softly segmented kernel geometry embossed across the side and upper surfaces; keep the central face panel smoother for clarity. Form two small symmetrical husk-like green sweeps into the upper silhouette, framing the forehead without becoming hair or a hat. Add a delicate golden twin-arch-shaped groove beneath the forehead as an abstract brand anchor, understated enough to remain part of the sculpt.

Give it large friendly chocolate-brown eyes, tiny cream catchlights, softly raised brows, subtle rosy-gold cheeks, and a gentle small smile. Include one short centered neck connector. Keep the face upright and unobstructed for later glasses overlays, with no element crossing the eyes. No torso, shoulders, limbs, bowl, cup, spoon, loose corn kernels, literal corn cob, hat, glasses, text, separate object, or duplicate head. Head envelope x=.32-.68, y=.12-.37; connector ends at (.50,.35).

Output exactly one 1024x1024 sRGB RGBA PNG. Only the head and connector may contain visible pixels; everything outside them, including all corners and padding, must have alpha=0. Preserve at least 32px transparent padding. No background, floor, shadow, scenery, frame, watermark, crop, extra view, or perspective rotation. Transparency must be actual PNG alpha data.
~~~

### 9. head_spicy_wing｜麦辣鸡翅头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, energetic rounded silhouette, molded resin finish, controlled crispy micro-texture, soft upper-left studio lighting, and clean anti-aliased edges.

Design a spicy-wing-inspired head using deep McDonald's red, chili orange, toasted amber, cream, and small charcoal details. Build one rounded asymmetric-but-balanced shell with layered crisp armor forms around the cheeks and temples. A compact three-point flame-like crest is integrated into the top silhouette, made of solid molded orange-red material rather than real fire. Add restrained toasted flecks on the side panels, smooth cream around the mouth, and a shallow golden twin-arch curve embedded above the brow. The result should suggest spicy crispy chicken energy while remaining an original toy character head, never a literal detached wing.

Give it lively dark eyes with warm highlights, confident angled brows that remain friendly, softly rounded cheek plates, and a small adventurous smile. Include one centered neck connector with a red-and-gold ring. Keep the eye zone clear for glasses and leave the top contour compatible with optional hats. No torso, shoulders, limbs, real flame, smoke, crumbs, chicken wing prop, sauce, package, hat, glasses, text, duplicate face, or extra object. Head envelope x=.32-.68, y=.12-.37; connector ends at (.50,.35).

Deliver exactly one 1024x1024 sRGB RGBA PNG with real alpha. Only the head and neck connector may have nonzero alpha. Every exterior area, all corners, padding, and open silhouette notches must be alpha=0. Keep at least 32px transparent padding. No background, floor, cast shadow, glow field, scenery, watermark, frame, crop, alternate view, or perspective.
~~~

### 10. head_nugget｜麦乐鸡头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use a strict front-facing orthographic view, charming compact proportions, rounded molded-resin construction, fine controlled texture, soft upper-left studio light, and clean silhouette edges.

Design one nugget-inspired head as a single coherent softly irregular pebble shape. Use toasted honey gold, lighter crisp highlights, warm cream facial insets, and a narrow McDonald's-red neck ring. Sculpt four broad rounded lobes into the outer contour to create an appealing handmade nugget rhythm while maintaining bilateral balance around the face. Add subtle crisp-breading pores and shallow dimples on the outer shell, but keep the center face area smooth. Integrate a tiny debossed twin-arch curve into the upper forehead panel as a tasteful molded detail.

Give it kind dark-brown oval eyes, soft brows, small rounded cheeks, and a warm closed smile. Include one short centered neck connector. Keep the eyes fully visible and the top area free of protrusions so drink and dessert accessories can layer cleanly. No torso, shoulders, limbs, multiple nuggets, sauce cup, box, crumbs, literal food prop, hat, glasses, decoration, text, duplicate face, or companion character. Head envelope x=.32-.68, y=.12-.37; connector ends at (.50,.35).

Output exactly one 1024x1024 sRGB RGBA PNG with actual alpha transparency. Only the single head and connector may be visible. All exterior pixels, corners, padding, and contour recesses must be alpha=0. Preserve at least 32px transparent padding. No background, floor, cast shadow, scenery, border, watermark, crop, extra view, or perspective.
~~~

### 11. head_apple｜苹果片头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, fresh rounded proportions, smooth translucent-looking resin with opaque construction, crisp edges, soft upper-left studio light, and restrained highlights.

Design an apple-slice-inspired head using pale fresh green, ivory flesh tones, fine apple-red edge piping, a small leaf-green accent, and a tiny golden-yellow McDonald's anchor. Shape the head as a rounded apple cross-section without making it flat: softly convex cheeks, a shallow top cleft, and a thin red rim wrapping the outer contour. Integrate one small sculpted leaf into the top silhouette and a subtle twin-arch-shaped golden groove near the lower forehead. Add two tiny seed-shaped embossed marks far from the eyes; they are surface details, not loose objects. Keep the design clean, lively, and premium rather than realistic fruit.

Give it bright friendly dark-green-brown eyes, cream catchlights, gently curved brows, fresh rounded cheeks, and a small open smile. Include one short centered neck connector with a pale-green ring. Keep the face clear for glasses overlays and do not let the leaf occupy the head-top accessory slot. No torso, shoulders, limbs, sliced fruit prop, loose seeds, basket, hat, glasses, text, duplicate head, or additional decoration. Head envelope x=.32-.68, y=.12-.37; connector ends at (.50,.35).

Deliver exactly one 1024x1024 sRGB RGBA PNG. Only the head and connector may have nonzero alpha. Every pixel outside their silhouette, all four corners, and all outer padding must be alpha=0. Preserve at least 32px transparent padding. No background, floor, cast shadow, scenery, border, watermark, crop, alternate view, or perspective rotation.
~~~

### 12. head_salad｜沙拉头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use strict front-facing orthographic staging, a buoyant rounded silhouette, layered molded-resin surfaces, soft upper-left studio light, gentle form shading, and precise anti-aliased edges.

Design a salad-inspired head with layered leaf geometry in fresh lettuce green, darker herb green, warm cream, cherry-red accents, and a small golden-yellow McDonald's anchor. Build the outer contour from five or six broad overlapping leaf-like lobes fused into one solid head shell. Use restrained vein engravings and subtle matte-to-satin material variation. Keep a smooth cream-green central face panel, add two tiny red circular cheek insets suggesting tomato color without becoming loose vegetables, and integrate a shallow golden twin-arch curve into the upper face border. The silhouette should feel lush and creative while remaining compact enough for hats and glasses.

Give it large friendly dark eyes, gentle brows, small red-tinted cheeks, and a cheerful closed smile. Include one short centered neck connector. Keep the eye area unobstructed and the top center low enough for a separate decoration layer. No torso, shoulders, limbs, bowl, fork, loose leaves, tomato pieces, food pile, hat, glasses, text, separate piece, duplicate head, or extra character. Head envelope x=.32-.68, y=.12-.37; connector ends at (.50,.35).

Output exactly one 1024x1024 sRGB RGBA PNG with true alpha transparency. Only the fused head and neck connector may have nonzero alpha. All exterior space, four corners, padding, and small openings between outer leaf lobes must have alpha=0. Preserve at least 32px transparent padding. No visible background, floor, cast shadow, scenery, frame, watermark, crop, alternate view, or perspective.
~~~

## 三、饮料：5 个搭配装饰

饮料部件是轻巧的日常穿搭配件，作为前景层挂在头部/脸部侧边或头顶；眼镜类镜框应围绕眼睛但保持眼睛可见，帽子不得压住眉眼。它们不是头部，也不绘制角色。

### 13. deco_zero_glasses｜零度可乐银黑眼镜

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular face accessory for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, compact symmetrical construction, molded resin and brushed-metal materials, soft upper-left studio light, crisp edges, and enough visual weight to remain readable over many different head colors.

Design one connected pair of zero-sugar-cola-inspired glasses using satin black, graphite, cool silver, and tiny McDonald's-red hinge accents. Use friendly rounded-rectangular rims with a slightly upswept outer edge, a slim silver bridge, and compact temple stubs visible from the front. Add small embossed carbonation bubbles along the outer temples and a subtle double-curve motif in the bridge that recalls twin arches without displaying a literal floating logo. The design should feel modern, clever, and wearable, not like a beverage cup.

The two lens openings must be genuinely open and transparent so the underlying character eyes remain completely visible. Draw no glass tint, reflected eyes, face, nose, head, ears, hair, or wearer. Keep all frame pieces connected as one accessory. Face-side pivot (.50,.24); envelope x=.30-.70, y=.16-.31. Maintain a clear central eye zone and balanced symmetry.

Deliver exactly one 1024x1024 sRGB RGBA PNG. Only the glasses frame may have nonzero alpha. Both lens interiors, bridge openings, all surrounding canvas, all four corners, and at least 32px edge padding must have alpha=0. No background, floor, cast shadow, glow, text, watermark, package, straw, cup, duplicate glasses, crop, alternate view, or perspective rotation. Transparency must be encoded in the PNG alpha channel.
~~~

### 14. deco_cola_cap｜可乐红棕棒球帽

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head-top accessory for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view with only a very slight top-surface reveal, smooth molded fabric-resin construction, soft upper-left studio light, crisp silhouette, and clean anti-aliased edges.

Design a classic-cola-inspired collectible baseball cap using deep McDonald's red, cola red-brown, amber highlights, warm cream stitching, and a small golden-yellow accent. Form a rounded six-panel crown with shallow stitched seams, a compact curved brim, tiny embossed carbonation bubbles near the side panels, and a raised golden twin-arch-shaped seam centered on the front panel. The arch is integrated tone-on-tone sculpting rather than readable branding or printed text. Add a narrow amber underside edge to the brim and a small cream top button. Keep the design playful and premium, never a cup or bottle.

Draw only the cap. The underside must remain empty and transparent so an independently generated head can appear beneath it. Do not generate a head, face, eyes, hair, ears, neck, torso, straw, beverage, package, text, or floating emblem. Head-top pivot (.50,.13); envelope x=.30-.70, y=.04-.19. Keep the brim high enough that it will not cover the future wearer's eyes.

Output exactly one 1024x1024 sRGB RGBA PNG with real alpha. Only cap material may have nonzero alpha. The empty underside, mounting cavity, all exterior canvas, corners, and at least 32px padding must have alpha=0. No background, floor, cast shadow, scenery, frame, watermark, duplicate cap, crop, alternate view, or perspective rotation.
~~~

### 15. deco_sprite_glasses｜雪碧薄荷眼镜

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular face accessory for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, lightweight symmetrical construction, glossy molded resin with small metallic details, soft upper-left studio light, and crisp anti-aliased edges.

Design one connected pair of lemon-lime-inspired fashion glasses using fresh mint green, clear cyan, lime-yellow highlights, silver hinge pins, and one restrained McDonald's-red micro-accent at each outer corner. Shape the rims as slim energetic rounded polygons with gently rising outer corners. Add two or three tiny embossed citrus-bubble facets along each temple and form the bridge from two mirrored golden-lime curves that subtly echo twin arches. Keep the style airy, youthful, and creative while remaining compatible with all head designs.

Both lens openings must be entirely empty and transparent; do not tint, frost, or fill them. Draw no eyes, eyelashes, face, nose, head, ears, hair, or wearer. Keep the complete frame connected as one piece. Face-side pivot (.50,.24); envelope x=.30-.70, y=.16-.31. Do not obstruct the future eye positions.

Deliver exactly one 1024x1024 sRGB RGBA PNG. Only the physical frame and hinge details may have nonzero alpha. Both lens interiors, all openings, the surrounding canvas, corners, and at least 32px padding must have alpha=0. No background, floor, cast shadow, glow field, text, watermark, citrus slice, cup, straw, duplicate accessory, crop, alternate view, or perspective.
~~~

### 16. deco_orange_sunglasses｜橙汁太阳眼镜

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular face accessory for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view, cheerful symmetrical shape, glossy molded resin, small satin-metal accents, soft upper-left studio lighting, and precise clean edges.

Design one connected pair of orange-juice-inspired sun glasses using juicy orange, tangerine, golden yellow, warm cream, and tiny McDonald's-red hinge details. Form broad rounded lenses surrounded by slim orange rims. Across the upper brow, integrate a low row of short molded sun-ray ridges that stay outside the eye openings; shape the central bridge as a compact golden double arch. Add subtle citrus-segment engravings on the outer corners, but no literal orange slices. The accessory should feel optimistic and bold without becoming oversized or covering the face.

Keep both lens openings fully empty and transparent so the character's eyes remain clear. Do not draw lens tint, reflections, eyes, face, nose, head, ears, hair, or wearer. Keep the frame as one connected piece. Face-side pivot (.50,.24); envelope x=.30-.70, y=.16-.31.

Output exactly one 1024x1024 sRGB RGBA PNG with true alpha. Only the frame, brow rays, and hinges may have nonzero alpha. Lens openings and all surrounding areas, including all four corners and at least 32px outer padding, must have alpha=0. No background, floor, cast shadow, glow, text, watermark, fruit, beverage container, duplicate accessory, crop, extra view, or perspective rotation.
~~~

### 17. deco_coffee_beret｜咖啡奶油贝雷帽

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular head-top accessory for the McMoment system in a polished premium collectible-toy 2.5D style. Strict front-facing orthographic view with a slight top-surface reveal, soft molded-fabric resin, precise stitched detail, soft upper-left studio light, and a clean compact silhouette.

Design a coffee-and-cream-inspired beret using espresso brown, latte tan, warm cream, caramel gold, and a restrained McDonald's-red underside accent. Shape a soft asymmetrical beret dome with controlled folds molded into the surface, a cream center button, and a subtle circular dial-like seam suggesting a calm morning ritual without hands or numerals. Integrate a pair of shallow golden curved stitches near the front edge as a tasteful twin-arch anchor. Add a narrow cream band along the lower rim. Keep the item stylish and wearable rather than resembling a coffee cup, foam blob, or pastry.

Draw only the beret, with an empty transparent underside for an independent head layer. No head, face, eyes, hair, ears, torso, cup, saucer, beans, steam, text, printed logo, or floating ornament. Head-top pivot (.50,.13); envelope x=.31-.69, y=.04-.19. The lower edge must sit above the future eye line.

Deliver exactly one 1024x1024 sRGB RGBA PNG with real alpha transparency. Only the beret material may have nonzero alpha. Its underside cavity, all exterior space, four corners, and at least 32px padding must have alpha=0. No backdrop, floor, shadow, scenery, watermark, border, duplicate view, crop, or perspective rotation.
~~~

## 四、甜品：4 个高级装饰

### 18. hdeco_mcflurry_wings｜麦旋风翅膀

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular premium back decoration for the McMoment system in a highly polished fantasy collectible-toy 2.5D style. Strict front-facing orthographic view, symmetrical readable silhouette, sculpted opaque resin, layered depth, soft upper-left studio light, restrained glossy highlights, and clean anti-aliased edges. This is a high-tier dessert accessory intended to sit behind an independently generated body.

Design one connected pair of McFlurry-inspired ornamental wings. Use soft vanilla cream, cool white, chocolate brown flecks, McDonald's red mounting accents, and fine golden-yellow trim. Build each wing from three broad upward-curling swirl feathers: smooth cream ribbons twist outward like frozen soft-serve, with shallow chocolate-chip inlays embedded in the material and thin gold edging along selected ridges. At the center, join both wings with one narrow red-and-gold rear mounting bridge shaped with a subtle twin-arch curve. Keep the wings elegant and magical, but entirely solid and wearable; no liquid drips, real ice cream, cup, spoon, particles, or floating chips.

Draw only the connected wing assembly. Do not draw the wearer, head, face, torso, arms, legs, clothing, harness straps across a body, or additional decoration. Back-slot pivot (.50,.43); envelope x=.18-.82, y=.29-.77. Keep the central mounting area compact so the body layer can cover it, and leave clear open transparent spaces between the major feather curls.

Deliver exactly one 1024x1024 sRGB RGBA PNG with real alpha. Only the wing surfaces and central bridge may have nonzero alpha. Every exterior area, four corners, spaces between feather curls, and at least 32px outer padding must have alpha=0. No background, floor, cast shadow, glow field, clouds, sparkles, text, watermark, duplicate wings, crop, alternate view, or perspective rotation.
~~~

### 19. hdeco_pie_cap｜派帽子

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular premium head-top decoration for the McMoment system in a whimsical fantasy collectible-toy 2.5D style. Strict front-facing orthographic view with a slight top-surface reveal, sculpted molded-resin construction, rich tactile detail, soft upper-left studio light, crisp silhouette, and clean edges.

Design a magical pie-inspired ceremonial cap using baked golden brown, honey amber, warm cream, McDonald's red, and fine golden-yellow trim. Shape it as a low rounded crown with a neat raised lattice pattern across the top, a softly fluted edge, and an empty curved underside mounting rim. Add small red enamel corner tabs and integrate a golden double-arch clasp into the front rim. The lattice should be sculpted decorative geometry, not a literal edible pie crust, and the object must remain clearly wearable. Use subtle toasted gradients and tiny embossed vent marks, but no steam, filling, crumbs, plate, fork, or food photography.

Draw only the cap. Do not generate a head, face, eyes, hair, ears, neck, torso, or wearer. Keep the entire underside and head cavity transparent. Head-top pivot (.50,.13); envelope x=.32-.68, y=.05-.18. The lower rim must remain above the future eye line and be compatible with all head silhouettes.

Output exactly one 1024x1024 sRGB RGBA PNG. Only the cap shell, lattice, trim, and clasp may have nonzero alpha. The underside cavity, lattice openings where applicable, all exterior canvas, corners, and at least 32px padding must have alpha=0. No background, floor, cast shadow, glow, text, watermark, duplicate cap, crop, alternate view, or perspective.
~~~

### 20. hdeco_sundae_halo｜圣代光环

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular premium head-top decoration for the McMoment system in an elegant fantasy collectible-toy 2.5D style. Strict front-facing orthographic view, perfectly readable oval silhouette, sculpted opaque resin, delicate layered relief, soft upper-left studio light, controlled highlights, and precise anti-aliased edges.

Design a sundae-inspired ornamental halo using vanilla cream, caramel amber, warm chocolate brown, McDonald's red enamel, and refined golden-yellow edging. Form one continuous oval ring with a softly twisting cream-and-caramel ribbon profile. Add three small evenly spaced sculpted dollop motifs along the outer upper rim and a compact red-and-gold twin-arch-shaped jewel at the bottom center. Incorporate subtle chocolate-line inlays into the solid rim. Keep the design regal and playful, but do not add real sauce, liquid drips, cherry fruit, cup, spoon, particles, sparkle effects, or emitted light.

Draw only the physical halo ring. Its large center opening must remain completely empty and transparent. Do not generate a head, face, eyes, hair, neck, body, support stand, visible mounting rod, or wearer. Head-top pivot (.50,.13); envelope x=.32-.68, y=.05-.18. The ring should sit above the head without crossing the future eye zone.

Deliver exactly one 1024x1024 sRGB RGBA PNG with true alpha. Only the solid halo ring and its embedded ornaments may have nonzero alpha. The entire central opening, exterior space, all four corners, and at least 32px padding must have alpha=0. No background, floor, cast shadow, aura, bloom, scenery, text, watermark, duplicate halo, crop, alternate view, or perspective rotation.
~~~

### 21. hdeco_icecream_cape｜冰淇淋披风

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular premium back decoration for the McMoment system in a dramatic fantasy collectible-toy 2.5D style. Strict front-facing orthographic view, broad but controlled silhouette, sculpted fabric-like resin, layered folds, soft upper-left studio light, rich material separation, and clean anti-aliased edges. This accessory sits behind an independently generated body.

Design an ice-cream-inspired royal cape using vanilla cream, strawberry-tinted McDonald's red, caramel gold, chocolate-brown lining accents, and small golden-yellow trim. Shape it as one wearable cape assembly with a narrow upper mounting bridge, broad shoulders, three deep vertical folds, and a softly scalloped lower hem inspired by melting soft-serve while remaining solid fabric-like material. Add a red inner lining visible only along fold edges, golden piping that traces two long mirrored arch curves, and small embossed sprinkle-like studs fixed into the upper border. Keep every detail attached to the cape; no floating sprinkles, liquid drips, real ice cream, cone, cup, or food prop.

Draw only the rear cape assembly. Do not draw a head, face, torso, arms, hands, legs, feet, wearer, front clasp over a body, or separate collar. Back-slot pivot (.50,.43); envelope x=.18-.82, y=.29-.77. Keep the center upper mounting zone narrow enough to hide behind the body and leave transparent side openings around the imagined arms.

Output exactly one 1024x1024 sRGB RGBA PNG with actual alpha transparency. Only the cape and mounting bridge may have nonzero alpha. Every exterior pixel, all four corners, side openings, spaces between separated hem scallops, and at least 32px outer padding must have alpha=0. No background, floor, cast shadow, glow, scenery, text, watermark, duplicate cape, crop, alternate view, or perspective rotation.
~~~

## 五、中性基础部件：额外 2 张

缺少对应餐品时只使用无餐品特征的中性图。没有主食时使用中性无头身体，没有小食时使用中性头部。它们不增加餐品风格数量，也不表示用户点了额外餐品。

### defaults_body_neutral.png｜中性无头身体（含四肢）

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular neutral headless body sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use a strict front-facing orthographic view, friendly balanced proportions, smooth molded vinyl and satin resin, subtle seam detail, crisp readable silhouette, clean anti-aliased edges, soft upper-left studio key light, and gentle lower-right form shading. Render the body itself with high-quality volume and material definition while keeping the surrounding file completely empty.

Design a timeless neutral base body in warm gray, soft ivory, muted graphite, and tiny champagne-gold hardware accents. Build a rounded torso with a smooth ivory central chest panel, warm-gray side shells, understated graphite joint rings, a compact waist, simple cylindrical upper limbs, softly tapered lower limbs, ivory mitten hands, and stable rounded boots. Use shallow structural seams and small recessed fasteners to give it premium manufactured-toy detail. Keep all panels unmarked and universally compatible: no food motif, restaurant reference, brand color blocking, logo, twin arches, costume theme, gender coding, or character-specific symbol.

Draw exactly one connected headless body containing torso, waist, both arms, both hands, both legs, and both feet. Keep both arms relaxed with a slight outward separation from the torso and both legs in a symmetrical stable stance. Hands and feet remain attached to their limbs. Shape a clean centered neck socket that can be covered by any independent head. No head, face, eyes, mouth, hair, hat, glasses, clothing accessory, decoration, prop, separate limb, duplicate part, or alternate pose.

Placement on the 1024x1024 canvas: body envelope x=.19-.81 and y=.34-.92; centered neck opening ends at (.50,.35); both soles end at y=.91. Preserve at least 32px of empty transparent padding and keep the complete silhouette uncropped. Use no perspective rotation.

CRITICAL OUTPUT REQUIREMENT: deliver exactly one 1024x1024 sRGB RGBA PNG with a real alpha channel. Only pixels belonging to the body may have nonzero alpha. Every pixel outside the silhouette, all four corner pixels, the neck opening, outer padding, space around the hands and feet, and every open gap between arms, torso, and legs must have alpha=0. Do not flatten or composite the sprite onto anything visible. Add no background, floor, horizon, cast shadow, ambient plate, vignette, border, frame, glow, scenery, text, watermark, labels, or transparency-preview artwork. When placed over any arbitrary solid color, that color must remain perfectly visible everywhere outside and between the body parts.
~~~

### defaults_head_neutral.png｜中性头部

~~~text
Create one standalone modular character-part sprite for the McMoment system. Use a polished premium collectible-toy 2.5D style: strict front-facing orthographic view, friendly rounded proportions, crisp readable silhouette, molded vinyl/resin surfaces, restrained micro-texture, soft upper-left studio key light, gentle lower-right form shading, and clean anti-aliased edges. The part may use imaginative shapes and selective McDonald's visual anchors such as warm McDonald's red, golden-yellow accents, subtle twin-arch curves, packaging-inspired panel geometry, or recognizable menu-item colors and textures. Keep these references tasteful and integrated into the design; do not add readable words, a floating logo, or literal food photography.

OUTPUT FILE REQUIREMENT: exactly one 1024x1024 sRGB RGBA PNG containing only the requested part. Transparency must be stored in the PNG alpha channel. Every pixel outside the requested silhouette, including all four corners, outer padding, mounting openings, and intentional interior gaps, must have alpha=0. Do not flatten the part onto a visible background and do not depict transparency as artwork. Preserve at least 32px of transparent edge padding. No floor, cast shadow, backdrop, scenery, border, frame, text, watermark, labels, anchor markers, extra objects, duplicate parts, contact sheet, alternate view, crop, or perspective rotation.

Create one standalone modular neutral head sprite for the McMoment system in a polished premium collectible-toy 2.5D style. Use a strict front-facing orthographic view, soft rounded proportions, smooth molded vinyl and satin resin, finely controlled highlights, crisp anti-aliased edges, soft upper-left studio key light, and gentle lower-right form shading. Render a high-quality expressive head while keeping all surrounding file pixels empty.

Design a timeless neutral head using warm gray, soft ivory, muted graphite, and tiny champagne-gold connector accents. Shape it as a rounded slightly squared capsule with soft cheeks, a smooth ivory facial inset, warm-gray outer shell, and subtle recessed seam around the face panel. Add two friendly dark graphite eyes with small ivory catchlights, gently curved brows, understated cheek volume, and a small warm closed smile. Use no eyelashes, makeup, facial hair, food texture, restaurant reference, brand color blocking, logo, twin arches, costume motif, or gender coding.

Draw exactly one complete head with its eyes, brows, mouth, facial panel, outer shell, and one short centered neck connector. Keep the face symmetrical, upright, readable at small scale, and unobstructed for later glasses overlays. Keep the top contour low and clean for optional head-top accessories. No torso, shoulders, arms, hands, legs, feet, hair, hat, glasses, jewelry, decoration, prop, duplicate face, separate piece, or alternate expression.

Placement on the 1024x1024 canvas: head envelope x=.35-.65 and y=.14-.35; neck connector ends at (.50,.34); retain (.50,.13) as the top-decoration reference point. Preserve at least 32px of empty transparent padding. Keep the full silhouette uncropped and use no perspective rotation.

CRITICAL OUTPUT REQUIREMENT: deliver exactly one 1024x1024 sRGB RGBA PNG with a real alpha channel. Only the complete head and neck connector may have nonzero alpha. Every pixel outside that silhouette, all four corner pixels, the entire outer padding, and the area below and around the neck connector must have alpha=0. Do not flatten or composite the sprite onto anything visible. Add no background, floor, horizon, cast shadow, ambient plate, vignette, border, frame, glow, scenery, text, watermark, labels, or transparency-preview artwork. When placed over any arbitrary solid color, that color must remain perfectly visible everywhere outside the head.
~~~

## 拼接与动画验收

先验证 2 张中性图可以在同一画布直接叠加，再替换餐品部件。叠图顺序：甜品背部高级装饰 → 主食身体+四肢 → 小食头部 → 饮料搭配装饰 → 甜品头顶高级装饰 → 程序特效。具体挂点与小队分配以《McMoment_订单DNA概念.md》为准。

检查透明边缘、接口遮挡余量、手脚比例与头部大小；随机试拼至少三组跨风格组合，确认饮料眼镜不遮挡五官、帽子不压住眼睛，甜品翅膀不盖住身体。所有图片保持相同光照与正面视角。

按钮下方的角色在点击后生成，跟随 5 秒进度移动；完成时程序让整个人物轻跳、整体身体轻摆、装饰轻摆。图片里不预画运动轨迹、庆祝星光、托盘或举杯。主食身体作为一张刚性图层整体运动。

本文件提供制作提示词，尚未产出实际 PNG；导入资源与运行时组装需在图片生成验收后接入。
