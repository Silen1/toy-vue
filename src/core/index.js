const data = {
  player: 'James Harden',
  team: 'Houston Rockets'
}
let target = null
function walk(data) {
  for (let key in data) {
    const dep = []
    let value = data[key]
    if (Object.prototype.toString.call(value) === '[object Object]') {
      walk(value)
    }
    Object.defineProperty(data, key, {
      set (newVal) {
        if (newVal === value) return
        value = newVal
        dep.forEach(f => {
          f()
        })
      },
      get () {
        dep.push(target)
        return value
      }
    })
  }
}
walk(data)
function myWatch(exp, fn) {
  target = fn
  if (typeof exp === 'function') {
    exp()
    return
  }
  let pathArr,
      obj = data
  if (/\./.test(exp)) {
    pathArr = exp.split('.')
    pathArr.forEach(p => {
      target = fn
      obj = obj[p]
    })
    return
  }
  data[exp]
}

function render() {
  document.body.innerText = `The last season's MVP is ${data.player}, he's from ${data.team}`
}

myWatch(render, render)
