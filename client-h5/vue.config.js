module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
    			@import '~@/styles/mixin.scss';
    			@import '~@/styles/variable.scss';
    		`
      }
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
	configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
	}
}