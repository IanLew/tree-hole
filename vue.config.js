module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: 'https://iface.114family.cn/cdqypt-iface',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ''
        }
      }
    }
  }
}