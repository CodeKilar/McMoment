import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyFood } from '../web/food-categories.js';
import { CHARACTER_DEFAULTS, selectCharacterAssets } from '../web/character-selection.js';

const assets = [
  ...Object.values(CHARACTER_DEFAULTS),
  'body_bigmac_captain.png', 'body_grilled_rider.png', 'body_spicy_flare.png',
  'head_fries.png', 'head_nugget.png', 'head_corn.png',
  'deco_cola_cap.png', 'deco_sprite_glasses.png', 'deco_sprite_glasses_alpha.png',
  'hdeco_pie_cap.png', 'hdeco_sundae_halo.png'
];

test('menu names resolve to one shared food category, including previous misses', () => {
  const examples = {
    main: ['巨无霸', '麦香鱼', '麦香鸡', '培根安格斯厚牛堡', '猪柳麦满分', '鲜蔬蛋沙拉叠叠卷', '皮蛋鸡肉粥'],
    side: ['麦乐鸡5块', '苹果片', '麦辣鸡翅-2块', '麦麦脆汁鸡-琵琶腿', '薄皮焦香V翅', '绝代双翅', '那么大鸡排', '酥酥多笋卷'],
    drink: ['雪碧中杯', '中杯怡泉+C', '纯牛奶（盒装）', '100%苹果汁', '热奶铁中杯', '冰焦糖玛奇朵', '纯悦', '麦旋酷阳光橙'],
    dessert: ['香芋派', '朱古力新地', '咖啡阿芙佳朵', '柠檬拉明顿', '圆筒冰淇淋']
  };
  for (const [category, names] of Object.entries(examples)) {
    for (const name of names) assert.equal(classifyFood(name), category, name);
  }
  assert.equal(classifyFood('未知餐品'), null);
  assert.equal(classifyFood(null), null);
});

test('every hamburger can draw every body sprite regardless of the food name', () => {
  const bodies = assets.filter(name => name.startsWith('body_'));
  for (const name of ['巨无霸', '麦香鱼', '麦香鸡', '板烧鸡腿堡', '培根安格斯厚牛堡']) {
    for (let i = 0; i < bodies.length; i++) {
      const selected = selectCharacterAssets(assets, [name], () => (i + 0.5) / bodies.length);
      assert.equal(selected.body, bodies[i], name);
      assert.equal(selected.head, CHARACTER_DEFAULTS.head);
    }
  }
});

test('complete meals select body, head and drink parts without neutral candidates', () => {
  for (const meal of [
    '巨无霸 + 薯条 + 可口可乐',
    '麦辣鸡腿堡 + 麦乐鸡 + 雪碧',
    '麦香鱼 + 玉米杯 + 美式咖啡',
    '板烧鸡腿堡 + 薯条 + 柠檬茶',
    '猪柳麦满分 + 薯饼 + 拿铁',
    '安格斯厚牛堡 + 鸡翅 + 无糖可乐',
    '培根安格斯厚牛堡 + 苹果片 + 中杯怡泉+C'
  ]) {
    const selected = selectCharacterAssets(assets, meal, () => 0.999);
    assert.equal(selected.body, 'body_spicy_flare.png', meal);
    assert.equal(selected.head, 'head_corn.png', meal);
    assert.equal(selected.deco, 'deco_sprite_glasses.png', meal);
    assert.equal(selected.hdeco, null);
  }
});

test('side chicken selects only the head and dessert selects only its decoration', () => {
  const selected = selectCharacterAssets(assets, ['麦辣鸡翅', '咖啡阿芙佳朵'], () => 0);
  assert.deepEqual(selected, {
    body: CHARACTER_DEFAULTS.body, head: 'head_fries.png',
    deco: null, hdeco: 'hdeco_pie_cap.png'
  });
});

test('each category is drawn once even if a meal contains several items of that type', () => {
  let calls = 0;
  selectCharacterAssets(assets, ['巨无霸', '麦香鱼', '薯条', '苹果片', '雪碧', '香芋派'], () => { calls++; return 0; });
  assert.equal(calls, 4);
});

test('neutral parts are fallbacks only and alpha copies never enter the random pool', () => {
  assert.deepEqual(selectCharacterAssets([], ['巨无霸', '薯条', '雪碧']), {
    ...CHARACTER_DEFAULTS, deco: null, hdeco: null
  });
  assert.deepEqual(selectCharacterAssets(Object.values(CHARACTER_DEFAULTS), ['巨无霸', '薯条']), {
    ...CHARACTER_DEFAULTS, deco: null, hdeco: null
  });
  assert.equal(selectCharacterAssets(['deco_sprite_glasses_alpha.png'], ['雪碧']).deco, null);
  assert.deepEqual(selectCharacterAssets(assets, ['未知餐品']), {
    ...CHARACTER_DEFAULTS, deco: null, hdeco: null
  });
});
