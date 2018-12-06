import { pushTarget } from './dep'

export default class Watcher {
  getter
  cb

  constructor (expOrFn, depFn) {
    this.cb = depFn
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = () => {
        if (/\./.test(expOrFn)) {
          let helpData = data
          expOrFn.split('.').forEach((path) => {
            helpData = helpData[path]
          })
          return helpData
        }
        return data[expOrFn]
      }
    }
  }

  get () {
    pushTarget(this)
    this.getter()
  }

  addDep (dep) {
    dep.addSub(this)
  }

  update () {
    this.getter()
    this.cb && this.cb()
  }
}
