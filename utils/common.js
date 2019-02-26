/**
 * 克隆一个全新对象，但不能对dom对象和function
 * */
export let newObj = obj => JSON.parse(JSON.stringify(obj))
//判断开头是否http://或者https://的
export let isProtocol = str => {
  let b = new RegExp('^http[s]?://')
  return b.test(str)
}