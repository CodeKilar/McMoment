import test from 'node:test';
import assert from 'node:assert/strict';
import { findVisibleBounds, findNeckCenter, layoutCharacter } from '../web/character-renderer.js';

function pixels(width, height, boxes) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (const [left, top, right, bottom, alpha = 255] of boxes) {
    for (let y = top; y < bottom; y++) for (let x = left; x < right; x++) data[(y * width + x) * 4 + 3] = alpha;
  }
  return data;
}
const sprite = (width, height, neckCenter = 0.5, file = '') => ({ bounds: { width, height }, neckCenter, file });
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);

test('transparent padding and faint stray pixels do not determine the part size', () => {
  const data = pixels(120, 100, [[30, 20, 80, 90], [0, 0, 1, 1, 12]]);
  assert.deepEqual(findVisibleBounds(data, 120, 100), { x: 30, y: 20, width: 50, height: 70 });
  assert.throws(() => findVisibleBounds(new Uint8ClampedArray(16), 2, 2), /没有可见像素/);
});

test('neck uses the connector rather than the center of an asymmetric silhouette', () => {
  const data = pixels(100, 100, [[10, 10, 90, 70], [55, 70, 65, 90]]);
  const bounds = findVisibleBounds(data, 100, 100);
  near(findNeckCenter(data, 100, bounds, 'bottom'), 0.625);
});

test('different source resolutions and padding produce the same assembly', () => {
  const small = layoutCharacter({ body: sprite(400, 600), head: sprite(200, 220) });
  const large = layoutCharacter({ body: sprite(800, 1200), head: sprite(400, 440) });
  assert.deepEqual(small.map(layer => layer.rect), large.map(layer => layer.rect));
});

test('current PNG proportions place the head on the collar and keep the whole body visible', () => {
  for (const bodySize of [[822, 1030], [831, 980]]) {
    const layers = layoutCharacter({ body: sprite(...bodySize), head: sprite(688, 717, 0.53) });
    const body = layers.find(layer => layer.type === 'body');
    const head = layers.find(layer => layer.type === 'head');
    const collar = layers.find(layer => layer.type === 'collar');
    near(head.rect.x + head.rect.width * 0.53, 0.5);
    near(collar.rect.x, body.rect.x);
    near(collar.rect.width, body.rect.width);
    assert.ok(head.rect.y > 0 && head.rect.y + head.rect.height < body.rect.y + body.rect.height * 0.15);
    assert.ok(body.rect.y + body.rect.height <= 0.95 + 1e-10);
    near(head.rect.width / head.rect.height, 688 / 717);
  }
});

test('back decorations stay behind the body and hats stay above the eyes', () => {
  const layers = layoutCharacter({ body: sprite(822, 1030), head: sprite(688, 717), deco: sprite(882, 412, 0.5, 'deco_mcflurry_wings.png'), hdeco: sprite(400, 200, 0.5, 'hdeco_pie_hat.png') });
  assert.equal(layers.map(layer => layer.type).slice(0, 4).join(','), 'body,head,collar,back');
  const head = layers.find(layer => layer.type === 'head').rect, hat = layers.find(layer => layer.type === 'hdeco').rect;
  assert.ok(hat.y >= 0);
  assert.ok(hat.y + hat.height < head.y + head.height * 0.2);
});
