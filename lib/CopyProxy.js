// import { newObj } from '../utils/common'
//用以代理abi，生成wx.api的Promise
export default class CopyProxy {
  constructor(stuff) {
    this.stuff = stuff;
  }
  clone() {
    //克隆本体函数
    let obj = typeof this.stuff === 'function' 
    ? this.stuff.bind(this.stuff) : {}

    Object.assign(obj, this.stuff)
    return obj;
  }

  /**
   * obj
   * obj要代理的key
   * 触发的函数(返回代理的key)
   * 通过Proxy自动生成函数
   * ---------------------
   * proxy相对于definProperty是惰性的，触发get有返回key值参数，
   * 而definProperty触发get是没有key返回的。所以一开始就需要循环出所有的key来劫持
   * */
  make(obj = {}, soil,fn) {
    if (typeof Proxy !== 'undefined'){
      return this.defineProperty(obj, soil, fn)
    } else {
      return this.proxy(obj, soil, fn)
    }
  }
  proxy(obj, soil, fn){
    this.stuff[soil] = {};
    obj[soil] = new Proxy(this.stuff[soil], {
      get(target, key, receiver){
        if (!target[key]) target[key] = fn(key)
        // receiver会循环
        return Reflect.get(target, key, receiver);
      }
    })
    return obj
  }
  defineProperty(obj, soil, fn){
    let soilKey = {}
    obj[soil] = {}
    Object.keys(wx).forEach( wxApi => {
      Object.defineProperty(obj[soil], wxApi, {
        get() {
          if (!soilKey[wxApi]) soilKey[wxApi] = fn(wxApi)
          return soilKey[wxApi]
        },
      })
    })
    return obj
  }
}