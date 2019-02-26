export default function once(obj, val, key = 'once') {
  Object.defineProperty(obj, key, {
    get() {
      let v = val
      val = undefined;
      return v
    },
    set(newVal) {
      val = newVal
    }
  })
}