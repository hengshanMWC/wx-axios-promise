/**
 * 深度克隆
 * arr 克隆材料[Object/Array]
 * b 权重（覆盖），true为arr的前权重大，
 * whole 是否全部克隆array和object还头funciton融合
 * def 传递给函数的初始值
 */
function depthAssign(arr, b, whole = true, def = {}) {
  let fn = b ? 'reduceRight' : 'reduce'
  return arr[fn]((obj, newObj) => {
    if (newObj instanceof Object && Object.keys(newObj).length != 0) handleObject(obj, newObj, whole)
    return obj
  }, def)
}
//统一object和array的接口
function handleObject(obj, newObj, whole) {
  newObj instanceof Array
    ? exhaustion(obj, newObj, newObj, whole)
    : exhaustion(obj, newObj, Object.keys(newObj), whole)
}
//获得key/下标
function exhaustion(obj, newObj, arr, whole) {
  arr.forEach((val, i) => {
    if (whole || newObj instanceof Array) {
      usable(obj, newObj, i, whole)
    }
    if (whole || typeof newObj === 'object' || typeof newObj === 'function') {
      usable(obj, newObj, val, whole)
    }
  })
}
//递归或者赋值
function usable(obj, newObj, key, whole) {
  let nk = newObj[key]
  if (nk instanceof Object && Object.keys(nk).length != 0) {
    if (obj[key] === undefined) obj[key] = nk instanceof Array ? [] : {}
    handleObject(obj[key], nk, whole)
  } else if (nk !== undefined) {
    obj[key] = nk
  }
}
export default depthAssign