// MCP nutrition rows provide names, so infer one food category per item.
// Keep these rules shared by meal recommendations and character selection.
const FOOD_CATEGORIES = [
  ['dessert', /新地|麦旋风|冰淇淋|圣代|派|甜筒|甜品|蛋糕|阿芙佳朵|拉明顿|奶冻/],
  ['main', /堡|巨无霸|麦香鱼|麦香鸡|麦满分|板烧|营养卷|叠叠卷|粥/],
  ['side', /薯条|薯饼|玉米杯|麦乐鸡|鸡块|鸡翅|双翅|V翅|鸡球|苹果片|沙拉|脆汁鸡|鸡排|油条|香肠|笋卷/i],
  ['drink', /可乐|雪碧|怡泉|汽水|咖啡|茶|牛奶|豆浆|果汁|苹果汁|橙汁|饮料|柠檬|美式|拿铁|奶铁|燕麦奶|玛奇朵|卡布奇诺|黑巧|朱古力|雪冰|纯悦|麦旋酷|美汁源/]
];

export function classifyFood(productName) {
  const name = String(productName || '');
  return FOOD_CATEGORIES.find(([, pattern]) => pattern.test(name))?.[0] ?? null;
}
