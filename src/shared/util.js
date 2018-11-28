// 判断是否为纯对象
export function isPlainObj (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isUndef (value) {
  return value === undefined || value === null
}

// 是否为原始值
export function isPrimitive (value) {
  return ['string', 'number', 'boolean', 'symbol'].indexOf(typeof value) !== -1
}

// 是否为有效的数组索引 >=0 有限值 整数
export function isValidArrayIndex (value) {
  return value >= 0 && isFinite(value) && Math.floor(value) == value
}

// 判断是否为对象自身属性
export function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}