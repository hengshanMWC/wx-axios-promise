## wx-axios-promise
### 特征
* 提供和axios相似体验，支持默认参数配置，拦截功能，和create创建新的对象
* 默认将小程序的api封装成Promise，通过降级，兼容低版本手机系统
### 使用方法
wx-axios-promise>index.js(入口文件)
```
/**
 * options：Object,默认Object，设置默认的request参数
 * proxt：Boolean，默认为true，是否将wx的所有api都封装成Promise
 */
export default function (ptions, proxy) {
  return Abi(ptions, proxy)
}
```
引入文件即可使用
```
import Abi from 'wx-axios-promise/index.js'
let api = Abi()
```
传递相关配置来创建请求(以下参数为默认)
```
//详情可参考wx.request
let api = Abi({
    url: '',//默认的接口后缀
    method: 'get',//默认的接口方式
    dataType: 'json',//默认的返回类型
    responseType: 'text',
    header: {
      'content-type': "application/json"
    }
  })
```
除上面的创造方法外，我们还可以用实例上的create的方法创建新实例。
```
let api = Abi()
let newApi = api.create()
```
请求操作
```
/**
*默认是get
*如果你设置了默认的url。会自动配置 默认url + url
*如果你的url是http://或者https://开头，那么不会添加默认url
*/
api(url, data)
/**
*上下等价
*可以通过修改api.default.method或者创建时候传{method: 'post'}来改变默认方式
*/
api.get(url,data)
//get请求可以直接拼在链接上
api(url + '?name=mwc&height=179')
//但如果你想设置之外的参数
api({
    url: '',
    method: 'get',
    dataType: 'json',
    responseType: 'text',
    header: {
      'content-type': "application/json"
    }
})
api.post(url, data)
支持
'get',
'post',
'put',
'delete',
'options',
'head',
'trace',
'connect'
```
可以架起请求、响应、成功、失败的拦截
```
api.interceptors.response.use(function (config){
  //接口||wx.接口
  return config.data || config
}, function(error){
    Promise.reject(error)
})
api.interceptors.request.use(function (config){
  //返回的是request的参数
  console.log(config)
  wx.showLoading({
    title: '加载内容'
  })
}, function(error){
    Promise.reject(error)
})
```
