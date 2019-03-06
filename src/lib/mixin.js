import { isProtocol } from '../../utils/common'
export default function mixin(api){
  api.dataMerging = function (fnData, url, data) {
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
  api.pathMerge = function (url) {
    return isProtocol(url) ? url : this.defaults.url + url
  }
  api.fnDefaults = function (fnData) {
    ['dataType', 'responseType', 'header'].forEach(val => fnData[val] = fnData[val] ? fnData[val] : this.defaults[val])
  }
}