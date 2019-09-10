const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

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
  },
  css: {
    extract: true
  },
  chainWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      // svg
      const svg = config.module.rule('svg')
      svg.uses.clear()
      svg.exclude.add(/node_modules/)
      svg.test(/\.svg$/).use('svg-sprite-loader').loader('svg-sprite-loader').options({
        symbolId: 'ico-[name]'
      })

      // images添加svg
      const image = config.module.rule('images')
      image.exclude.add(path.join(__dirname, './', 'src/assets/svg'))
      image.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

      // 压缩图片
      config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({
        bypassOnDebug: true
      }).end()
    }
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      // 压缩代码
      config.plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
      }))

      // 打包分析
      if(process.env.NPM_CONFIG_REPORT) {
        config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin).end()
        config.plugins.delete('prefetch')
      }
    }
  }
}