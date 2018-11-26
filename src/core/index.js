import { isPlainObj } from '../shared/util'

const data = {
  name: 'James Harden',
  team: 'Houston Rockets',
  teammate: {
    name: 'paul',
    team: {
      now: 'rockets',
      before: 'clippers'
    }
  }
}

function walk(obj) {
  Object.keys(obj).forEach((key) => {
    // 递归 以对data深度观测
    const value = obj[key]
    if (Object.prototype.toString.call(value) === '[object Object]') {
      walk(value)
    }
    console.log(1, key)
  })
}

walk(data)

function myWatch() {

}

function render() {
  document.body.innerText = `The last season's MVP is ${data.name}, he's from ${data.team}, he has a teammate ${data.teammate.name}`
}

render()