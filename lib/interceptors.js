export default function interceptors(){
  return {
    /**
     * 还原拦截
     * 默认为0
     * 0还原success和error
     * 1还有success
     * 其他则是error
     */
    eject(num = 0) {
      if (num == 0) {
        this.success = function (config) {
          return config
        }
        this.error = function (error) {
          return Promise.reject(error)
        }
      } else if (num == 1) {
        this.success = function (config) {
          return config
        }
      } else {
        this.error = function (error) {
          return Promise.reject(error)
        }
      }
    },
    use(resolve, reject) {
      if (resolve) this.success = resolve;
      if (reject) this.error = reject;
    },
    success(config) {
      return config
    },
    error(error) {
      return Promise.reject(error);
    }
  }
}
