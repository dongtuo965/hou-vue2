module.exports = {
  lintOnSave: false,
  devServer: {
    // development server port 8848
    port: 8848,
    proxy: {
      '/api': {
        target: 'http://www.xtypgh.com:8081',
        // target: 'http://192.168.0.129:8082',
        // target: 'http://192.168.0.198:8082',
        pathRewrite: { '^/api': '' },
        ws: false,
        changeOrigin: true
      }
    }
  },

}
