export default function interceptors() {
  return {
    use(resolve, reject) {
      if (typeof resolve === 'function') this.success = resolve;
      if (typeof reject === 'function') this.error = reject;
    },
    success(config) {
      return config
    },
    error(error) {
      return error;
    }
  }
}
