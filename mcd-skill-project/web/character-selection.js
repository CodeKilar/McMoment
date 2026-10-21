import { classifyFood } from './food-categories.js';

export const CHARACTER_DEFAULTS = {
  body: 'defaults_body_neutral.png',
  head: 'defaults_head_neutral.png'
};

// Body PNGs include the limbs. Food names never determine a particular sprite.
const CATEGORY_PARTS = { main: 'body', side: 'head', drink: 'deco', dessert: 'hdeco' };

export function selectCharacterAssets(assets, products, random = Math.random) {
  const selected = { ...CHARACTER_DEFAULTS, deco: null, hdeco: null };
  // Only split the meal separator; the plus in a drink such as 怡泉+C is part of its name.
  const items = Array.isArray(products) ? products : String(products || '').split(/\s+\+\s+/);
  const parts = new Set(items.map(name => CATEGORY_PARTS[classifyFood(name)]).filter(Boolean));
  for (const part of parts) {
    const candidates = assets.filter(name =>
      name.toLowerCase().startsWith(part + '_') && /\.png$/i.test(name) && !/_alpha\.png$/i.test(name)
    );
    if (candidates.length) selected[part] = candidates[Math.floor(random() * candidates.length)];
  }
  return selected;
}
