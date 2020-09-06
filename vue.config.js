module.exports = {
  // options...
  devServer: {
      disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/scss/variables.scss";'
      }
    }
  }
}