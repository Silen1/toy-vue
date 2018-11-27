import { isPlainObj } from '../shared/util'

let data = {
  name: 'James Harden',
  team: 'Houston Rockets',
  teammate: {
    name: 'chris paul',
    team: {
      now: 'rockets',
      before: 'clippers'
    }
  },
  stars: ['kobe', 'jordan', 'wade']
}

// 收集依赖的篮子
let basket

function walk(obj) {
  Object.keys(obj).forEach((key) => {
    const deps = []
    // 递归 以对data深度观测
    let value = obj[key]
    if (Object.prototype.toString.call(value) === '[object Object]') {
      walk(value)
    }

    Object.defineProperty(obj, key, {
      get () {
        deps.push(basket)
        return value
      },
      set (newVal) {
        value = newVal
        deps.forEach((fn) => {
          fn()
        })
      }
    })
  })
}

walk(data)

function myWatch(target, depFn) {
  basket = depFn
  if (typeof target === 'function') {
    target()
    return
  }
  if (/\./.test(target)) {
    let helpData = data
    target.split('.').forEach((path) => {
      helpData = helpData[path]
    })
    return
  }
  data[target]
}

function render() {
  document.body.innerText = `The last season's MVP is ${data.name}, he's from ${data.team}, he has a teammate ${data.teammate.name}, ${data.teammate.name} was played for ${data.teammate.team.before}`
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
    console.log('this', this)
    arrayProto[method].apply(this, args)
    console.log(`我捕获了数组的${method}方法`)
  }
})

data.stars.__proto__ = arrayMethods

// myWatch(render, render)
// myWatch('name', () => {
//   console.log('name被修改了', data.name)
// })
// myWatch('name', () => {
//   console.log('name的第二个依赖', data.name)
// })

// myWatch('teammate.team.before', () => {
//   console.log('以前的球队被修改了了了')
// })

// data.name = 'eleven'
// data.team = 'xian'
// data.teammate.name = 'jason'
// data.teammate.team.before = 'lvdian'
// data.stars.push('nash')
// console.log(data.stars)
