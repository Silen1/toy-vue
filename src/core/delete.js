import { isValidArrayIndex, hasOwn } from '../shared/util'

export default function del (obj, key) {
  if (Array.isArray(obj) && isValidArrayIndex(key)) {
    obj.splice(key, 1)
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key]
  // TODO 删除完属性之后触发依赖
}