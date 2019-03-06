export default function intercept(api){
  //包装成Promise返回
  api.method = function ({ url, data, method, api = 'request' }) {
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
  api.unite = function ({ url, data, method, resolve, reject }) {
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
}
