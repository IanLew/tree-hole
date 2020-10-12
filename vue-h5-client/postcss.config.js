module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    }),
    require('postcss-viewport-units')({
      silence: true
    }),
    require('postcss-cssnext')({
      autoprefixer: {}
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
};