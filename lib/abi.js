import interceptors from './interceptors.js';
import CopyProxy from './CopyProxy'
import getFinally from '../utils/finally'
import { isProtocol } from '../utils/common'
getFinally();
/**
 * options：Object,默认Object，设置默认的request参数
 * proxt：Boolean，默认为true，是否将wx的所有api都封装成Promise
 */
function Abi(options = {}, proxy = true){
  //默认为get
  function abi(url, data) {
    // console.log(this.defaults)
    return this.method({ url, data, method: abi.defaults.method })
  }
  //所有request支持method
  const config = [
    'get',
    'post',
    'put',
    'delete',
    'options',
    'head',
    'trace',
    'connect'
  ]
  config.forEach(val => {
    abi[val] = (url, data) => abi.method({ url, data, method: val })
  })
  //包装成Promise返回
  abi.method = function ({ url, data, method, api = 'request' }) {
    //为了方便用户传值
    try {
      //拦截发起请求
      return new Promise((resolve, reject) => {
        //拦截 HTTPS 
        let fnData = this.unite({ url, data, method, resolve, reject });
        fnData = this.interceptors.request.success(fnData)
        wx[api](fnData)
      });
    } catch (e) {
      return this.interceptors.request.error(e)
    }
  }
  //拦截 HTTPS ，返回参数
  abi.unite = function ({ url, data, method, resolve, reject }) {
    let fnData = {
      success: res => {
        let data = this.interceptors.response.success(res)
        resolve(data)
      },
      fail: res => {
        let data = this.interceptors.response.error(res)
        reject(data)
      }
    }
    fnData.method = method;
    this.dataMerging(fnData, url, data)
    return fnData
  }
  //处理默认值
  abi.dataMerging = function (fnData, url, data) {
    if (typeof url === 'string') {
      fnData.url = this.pathMerge(url)
      fnData.data = data;
      this.fnDefaults(fnData)
    } else if (typeof url === 'object') {
      url.url = this.pathMerge(url.url)
      Object.assign(fnData, url)
      this.fnDefaults(fnData)
    }
  }
  //判断是否需要添加默认值url
  abi.pathMerge = function (url) {
    return isProtocol(url) ? url : this.defaults.url + url
  }
  abi.fnDefaults = function (fnData) {
    ['dataType', 'responseType', 'header'].forEach(val => fnData[val] = fnData[val] ? fnData[val] : this.defaults[val])
  }
  abi.defaults = {
    url: '',
    method: 'get',
    dataType: 'json',
    responseType: 'text',
    header: {
      'content-type': "application/json"
    }
  }
  abi.interceptors = {
    response: interceptors(),
    request: interceptors(),
  }
  /**
  *options 设置defaults
  */
  abi.build = function (options, proxy) {
    let cp = new CopyProxy(this);
    let obj = cp.clone()
    if (proxy)
      cp.make(obj, 'wx', key => (url, data) => this.method({ url, data, api: key }));
    obj.options(options)
    obj.create = Abi;
    return obj
  }
  abi.options = function (options) {
    Object.keys(options).forEach(val => this.defaults[val] = options[val])
  }
  return abi.build(options, proxy)
}
export default Abi