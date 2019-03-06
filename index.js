import method from './src/lib/method.js';
import parameter from './src/lib/parameter.js';
import mixin from './src/lib/mixin.js';
import intercept from './src/lib/intercept.js';
import CopyProxy from './src/CopyProxy'
import getFinally from './utils/finally'
getFinally();
/**
 * options：Object,默认Object，设置默认的request参数
 * proxt：Boolean，默认为true，是否将wx的所有api都封装成Promise
 */
export default function Api(options = {}, proxy = true) {
  //默认为get
  function api(url, data) {
    return this.method({ url, data, method: api.defaults.method })
  }
  //导入method方法
  method(api)
  //设置默认参数
  parameter(api)
  //混入默认配置
  mixin(api)
  //导入拦截方法
  intercept(api)
  /**
  *options 设置defaults
  */
  api.build = function (options, proxy) {
    let cp = new CopyProxy(this);
    let obj = cp.clone()
    if (proxy)
      cp.make(obj, 'wx', key => (url, data) => this.method({ url, data, api: key }));
    obj.options(options)
    obj.create = api;
    return obj
  }
  api.options = function (options) {
    Object.keys(options).forEach(val => this.defaults[val] = options[val])
  }
  return api.build(options, proxy)
}