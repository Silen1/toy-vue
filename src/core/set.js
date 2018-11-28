import { isUndef, isPrimitive, isValidArrayIndex } from '../shared/util'
import { defineReactive } from './observer'

export default function set (target, key, val) {
  if (isUndef(target)) {
    console.error('不能给 undefined 和 null 设置响应式属性！')
    return
  }
  if (isPrimitive(target)) {
    console.error('不能给原始类型的值设置响应式属性！')
    return
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return
  }
  defineReactive(target, key, val)
  return val
}