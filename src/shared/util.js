/**
 * 判断是否为纯对象
 */
export function isPlainObj(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}