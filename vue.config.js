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
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule.test(/\.svg$/).use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    }).end()

    // images添加svg
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(path.join(__dirname, 'src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/).end()

    if(process.env.NODE_ENV === 'production') {
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