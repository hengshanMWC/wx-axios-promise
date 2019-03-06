import interceptors from './interceptors.js';
export default function parameter(api){
  api.defaults = {
    url: '',
    method: 'get',
    dataType: 'json',
    responseType: 'text',
    header: {
      'content-type': "application/json"
    }
  }
  api.interceptors = {
    response: interceptors(),
    request: interceptors(),
  }
}
