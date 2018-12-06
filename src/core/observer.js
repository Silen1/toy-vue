import { isPlainObj } from '../shared/util'
import Dep from './dep'

class Observer {
  constructor (value) {
    if (Array.isArray(value)) { // 数组
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else { // 对象
      this.walk(value)
    }
  }

  walk (obj) { // 逐一观察对象中的属性
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      defineReactive(obj, key)
    })
  }

  observeArray (arr) { // 深度观测数组
    arr.forEach(item => {
      observe(item)
    })
  }
}

// 将某一属性定义为响应式属性
export function defineReactive (obj, key, val) {
  const deps = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && !property.configurable) { // 如果指定的属性不在该对象上 会返回undefined
    return
  }

  const getter = property && property.get // 缓存原来的getter和setter
  const setter = property && property.set

  let value = obj[key]
  if (arguments.length === 3) {
    value = val
  }
  observe(value) // 实现深度观测

  Object.defineProperty(obj, key, {
    get () {
      if (getter) {
        value = getter.call(obj)
      }
      deps.depend()
      return value
    },
    set (newVal) {
      if (getter) {
        value = getter.call(obj)
      }
      if (newVal === value || (newVal !== newVal && value !== value)) { // 新旧值相等的话什么也不做
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        value = newVal
      }
      observe(newVal) // 新值可能是对象 继续观察新值
      deps.notify()
    }
  })
}

// 观察某一对象 将它转为响应式的
export function observe (target) {
  if (Array.isArray(target) || isPlainObj(target)) {
    return new Observer(target)
  }
}

// 要代理的变异方法集合
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    arrayProto[method].apply(this, args)
    console.log(`我捕获了数组的${method}方法`)
  }
})
