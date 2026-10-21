// Positions use the final character canvas, independently of each PNG's padding.
const spriteCache = new Map();
const ALPHA_THRESHOLD = 24;

export function findVisibleBounds(data, width, height) {
  let left = width, top = height, right = -1, bottom = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * 4 + 3] <= ALPHA_THRESHOLD) continue;
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
  }
  if (right < left) throw new Error('部件没有可见像素');
  return { x: left, y: top, width: right - left + 1, height: bottom - top + 1 };
}

// Use the neck silhouette, rather than the center of an asymmetric head/body.
export function findNeckCenter(data, imageWidth, bounds, edge) {
  const rows = Math.max(1, Math.ceil(bounds.height * 0.025));
  const start = edge === 'top' ? bounds.y : bounds.y + bounds.height - rows;
  let left = bounds.x + bounds.width, right = bounds.x - 1;
  for (let y = start; y < start + rows; y += 1) {
    for (let x = bounds.x; x < bounds.x + bounds.width; x += 1) {
      if (data[(y * imageWidth + x) * 4 + 3] <= ALPHA_THRESHOLD) continue;
      left = Math.min(left, x); right = Math.max(right, x);
    }
  }
  return ((left + right + 1) / 2 - bounds.x) / bounds.width;
}

function fit(sprite, maxWidth, maxHeight, x, y, anchorX, anchorY) {
  const scale = Math.min(maxWidth / sprite.bounds.width, maxHeight / sprite.bounds.height);
  const width = sprite.bounds.width * scale, height = sprite.bounds.height * scale;
  return { x: x - width * anchorX, y: y - height * anchorY, width, height };
}

// Anchors are relative to visible bounds, so transparent padding and resolution do not matter.
const HEAD_PROFILES = {
  'defaults_head_neutral.png': { eyes: [0.5, 0.505], chin: 0.845, glassesWidth: 0.85, hatY: 0.25 },
  'head_apple.png': { eyes: [0.5, 0.59], chin: 0.895, glassesWidth: 0.87, hatY: 0.30 },
  'head_corn.png': { eyes: [0.5, 0.61], chin: 0.895, glassesWidth: 0.81, hatY: 0.30 },
  'head_fries.png': { eyes: [0.5, 0.599], chin: 0.895, glassesWidth: 0.78, hatY: 0.34 },
  'head_nugget.png': { eyes: [0.5, 0.59], chin: 0.91, glassesWidth: 0.70, hatY: 0.32 },
  'head_salad.png': { eyes: [0.5, 0.60], chin: 0.895, glassesWidth: 0.70, hatY: 0.34 },
  'head_spicy_wing.png': { eyes: [0.5, 0.62], chin: 0.89, glassesWidth: 0.78, hatY: 0.34 }
};
const DEFAULT_HEAD_PROFILE = { eyes: [0.5, 0.52], chin: 0.86, glassesWidth: 0.88, hatY: 0.25 };

const BODY_PROFILES = {
  'body_bigmac_captain.png': { rimY: 0.022, depth: 0.035, radius: 0.105, seat: 0.029 },
  'body_breakfast_sunrise.png': { rimY: 0.021, depth: 0.035, radius: 0.115, seat: 0.027 },
  'body_grilled_rider.png': { rimY: 0.031, depth: 0.052, radius: 0.135, seat: 0.035 },
  'body_mcchicken_scout.png': { rimY: 0.024, depth: 0.045, radius: 0.155, seat: 0.032 },
  'body_nugget_swarm.png': { rimY: 0.017, depth: 0.029, radius: 0.12, seat: 0.023 },
  'body_spicy_flare.png': { rimY: 0.020, depth: 0.028, radius: 0.115, seat: 0.026 },
  'defaults_body_neutral.png': { rimY: 0.020, depth: 0.035, radius: 0.105, seat: 0.023 }
};
const DEFAULT_BODY_PROFILE = { rimY: 0.025, depth: 0.04, radius: 0.12, seat: 0.028 };
const HAT_PROFILES = {
  'deco_coffee_beret.png': { width: 1.06, brim: 0.89 },
  'deco_cola_cap.png': { width: 1.00, brim: 0.88 },
  'hdeco_pie_cap.png': { width: 1.06, brim: 0.79 }
};
const isHat = sprite => sprite && /cap|beret|hat/i.test(sprite.file) && !/cape/i.test(sprite.file);

export function layoutCharacter(sprites) {
  const body = fit(sprites.body, 0.62, 0.58, 0.5, 0.4, sprites.body.neckCenter, 0);
  const profile = HEAD_PROFILES[sprites.head.file.toLowerCase()] || DEFAULT_HEAD_PROFILE;
  const collar = BODY_PROFILES[sprites.body.file.toLowerCase()] || DEFAULT_BODY_PROFILE;
  const head = fit(sprites.head, body.width * 0.84, 0.56, 0.5, body.y + body.height * collar.seat, sprites.head.neckCenter, profile.chin);
  const layout = [{ type: 'body', sprite: sprites.body, rect: body }, { type: 'head', sprite: sprites.head, rect: head },
    { type: 'collar', sprite: sprites.body, rect: { ...body }, collar }];
  for (const type of ['deco', 'hdeco']) {
    const sprite = sprites[type];
    if (!sprite) continue;
    // Two full hats cannot share the scalp. The dessert crown takes the hat slot.
    if (type === 'deco' && isHat(sprite) && isHat(sprites.hdeco)) continue;
    const file = sprite.file.toLowerCase();
    let rect, layerType = type;
    if (/cape/.test(file)) {
      rect = fit(sprite, body.width * 1.45, body.height * 0.96, 0.5, body.y - body.height * 0.015, 0.5, 0.035);
      layerType = 'back';
    } else if (/wing|back/.test(file)) {
      rect = fit(sprite, Math.max(body.width * 1.8, head.width * 1.8), body.height * 0.65, 0.5, body.y + body.height * 0.17, 0.5, 0.57);
      layerType = 'back';
    } else if (/halo/.test(file)) {
      // This asset is an upright aureole; its opening surrounds the head.
      rect = fit(sprite, head.width * 1.45, head.height * 1.35, head.x + head.width * 0.5, head.y + head.height * 0.45, 0.5, 0.50);
      layerType = 'back';
    } else if (/glass|goggle|spectacle/.test(file)) {
      const lensY = /orange/.test(file) ? 0.61 : 0.55;
      rect = fit(sprite, head.width * profile.glassesWidth, head.height, head.x + head.width * profile.eyes[0], head.y + head.height * profile.eyes[1], 0.5, lensY);
    } else {
      const hat = HAT_PROFILES[file] || { width: 1.06, brim: 0.88 };
      rect = fit(sprite, head.width * hat.width, head.height, head.x + head.width * 0.5, head.y + head.height * profile.hatY, 0.5, hat.brim);
    }
    layout.push({ type: layerType, sprite, rect });
  }
  // Fit the complete silhouette together, retaining all joints and accessory anchors.
  const left = Math.min(...layout.map(({ rect }) => rect.x));
  const top = Math.min(...layout.map(({ rect }) => rect.y));
  const right = Math.max(...layout.map(({ rect }) => rect.x + rect.width));
  const bottom = Math.max(...layout.map(({ rect }) => rect.y + rect.height));
  const scale = Math.min(1, 0.90 / (right - left), 0.90 / (bottom - top));
  for (const { rect } of layout) {
    rect.x = 0.5 + (rect.x - (left + right) / 2) * scale;
    rect.y = 0.5 + (rect.y - (top + bottom) / 2) * scale;
    rect.width *= scale;
    rect.height *= scale;
  }
  return layout;
}

function loadSprite(file, assetBase) {
  // The supplied glasses have a baked checkerboard; use the prepared transparent copy.
  const sourceFile = /^deco_(zero|sprite)_glasses\.png$/i.test(file) ? file.replace(/\.png$/i, '_alpha.png') : file;
  const url = `${assetBase}${encodeURIComponent(sourceFile)}`;
  if (!spriteCache.has(url)) {
    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        try {
          const source = document.createElement('canvas');
          source.width = image.naturalWidth; source.height = image.naturalHeight;
          const context = source.getContext('2d', { willReadFrequently: true });
          context.drawImage(image, 0, 0);
          const { data } = context.getImageData(0, 0, source.width, source.height);
          const bounds = findVisibleBounds(data, source.width, source.height);
          resolve({ file, image, bounds, neckCenter: findNeckCenter(data, source.width, bounds, /^head_|^defaults_head_/i.test(file) ? 'bottom' : 'top') });
        } catch (error) { reject(error); }
      };
      image.onerror = () => reject(new Error(`部件图片加载失败：${file}`));
      image.src = url;
    }).catch(error => { spriteCache.delete(url); throw error; });
    spriteCache.set(url, promise);
  }
  return spriteCache.get(url);
}

export async function renderCharacter(container, chosen, { assetBase, defaults, isCurrent = () => true }) {
  const omitted = [];
  const entries = await Promise.all(['body', 'head', 'deco', 'hdeco'].map(async type => {
    const file = chosen[type] || defaults[type];
    if (!file) return [type, null];
    try { return [type, await loadSprite(file, assetBase)]; }
    catch (error) {
      if (defaults[type] && defaults[type] !== file) return [type, await loadSprite(defaults[type], assetBase)];
      if (type === 'body' || type === 'head') throw error;
      console.warn(error); omitted.push(file); return [type, null];
    }
  }));
  const layers = layoutCharacter(Object.fromEntries(entries)).map(({ type, sprite, rect, collar }) => {
    const canvas = document.createElement('canvas');
    const { x, y, width, height } = sprite.bounds;
    canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d');
    if (collar) {
      // Only the front lip covers the neck; the empty hole and rear rim stay behind it.
      const center = sprite.neckCenter * width, radius = collar.radius * width;
      const rim = collar.rimY * height, bottom = (collar.rimY + collar.depth) * height;
      context.beginPath();
      context.moveTo(center - radius, rim);
      context.bezierCurveTo(center - radius, bottom, center + radius, bottom, center + radius, rim);
      context.lineTo(center + radius, height);
      context.lineTo(center - radius, height);
      context.closePath();
      context.clip();
    }
    context.drawImage(sprite.image, x, y, width, height, 0, 0, width, height);
    canvas.className = `character-layer character-${type}`;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.dataset.asset = sprite.file;
    Object.assign(canvas.style, {
      left: `${rect.x * 100}%`, top: `${rect.y * 100}%`,
      width: `${rect.width * 100}%`, height: `${rect.height * 100}%`
    });
    return canvas;
  });
  // Commit the complete assembly together; an older request cannot replace a newer order.
  if (isCurrent()) container.replaceChildren(...layers);
  return { omitted };
}
