import { subsets, arrToPromiseKey, isSubset } from './util/index'

export interface Trunk {
  [key: string]: Promise<any>
}

export interface TrunkResolve {
  [key: string]: Function
}

export interface PromiseStatus {
  [key: string]: string
}

let trunk: Trunk = {}
let trunkPromise: TrunkResolve = {}
let trunkPromiseStatus: PromiseStatus = {}
export default class AsyncScheme {
  constructor() {

  }

  // 延迟改变 promise 状态
  _pendingPromise(key: string) {
    return new Promise((resolve, reject) => {
      trunkPromiseStatus[key] = 'pending'
      trunkPromise[key] = resolve
    })
  }

  /**
   * 添加要监听的 key 值
   * @param {String | Array} key 
   */
  addKey = function (key: string | Array<string>,
    // @ts-ignore
    ...args) {
    if (key === '') return
    // 做兼容处理
    if (!Array.isArray(key)) {
      key = [key, ...args]
    } else {
      key = key.concat(args)
    }
    for (let i = 0; i <= key.length; i++) {
      if (trunk.hasOwnProperty(key[i])) {
        throw new Error(`【addKey】：该 key: ${key[i]} 已经被注册了，请添加其他的 key 值`)
      }
    }

    let signArr = subsets(key).filter(item => item.length == 1),
      complexArr = subsets(key).filter(item => item.length > 1)

    for (let i = 0; i < signArr.length; i++) {
      let trunkKey = arrToPromiseKey(signArr[i])
      // @ts-ignore
      trunk[trunkKey] = this._pendingPromise(trunkKey)
    }
    
    for (let i = 0; i < complexArr.length; i++) {
      let trunkKey = arrToPromiseKey(complexArr[i].sort())
      let promiseArr = complexArr[i].map((item: string) => {
        return trunk[item]
      })
      trunk[trunkKey] = Promise.all(promiseArr)
    }
  }

  /**
   * 设置指定 key 的 value
   * @param key 
   * @param value 
   * @returns 
   */
  setKeyValue(key: string, value: any) {
    if (!trunkPromise.hasOwnProperty(key)) {
      console.error(`【setKeyValue】：该 key: ${key} 没有注册，请检查 key 值`)
      return
    }
    if (trunkPromise[key]) {
      if (trunkPromiseStatus[key] == 'pending') {
        trunkPromise[key](value)
      } else {
        delete trunk[key]
        trunk[key] = this._pendingPromise(key)
        trunkPromise[key](value)
      }
      trunkPromiseStatus[key] = 'fulfilled'
    }
  }

  /**
   * 当监听的 key 值发生变化时，执行回调函数
   * @param key 
   * @param cb 
   */
  execAsyncFn(key: string | Array<string>, cb: Function) {
    if (Array.isArray(key)) {
      let noExistKey = isSubset(key, Object.keys(trunk))
      if (noExistKey) {
        throw new Error(`【execAsyncFn】：该 key: ${noExistKey} 没有注册，请检查 key 值`)
      }
      key = arrToPromiseKey(key.sort())
      trunk[key].then((res) => {
        // @ts-ignore
        cb.call(this, res)
      })
    } else {
      if (!trunk.hasOwnProperty(key)) {
        throw new Error(`【execAsyncFn】：该 key: ${key} 没有注册，请检查 key 值`)
      }
      trunk[key].then((res) => {
        // @ts-ignore
        cb.call(this, res)
      })
    }
  }

}