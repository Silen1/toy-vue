export default class Dep {
  subs = []

  constructor () {
  }

  depend () {
    Dep.target.addDep(this)
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

Dep.target = null

export function pushTarget (_target) {
  Dep.target = _target
}