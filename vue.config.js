const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭EsLint 语法检查
  devServer: {
    host: 'localhost',
    port: 9999,
    proxy: {
      '/api': {
        target: 'http://localhost:9991',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
})
