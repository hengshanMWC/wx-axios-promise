export default function method(api){
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
    api[val] = (url, data) => api.method({ url, data, method: val })
  })
}
