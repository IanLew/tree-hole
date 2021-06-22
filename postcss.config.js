module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
			minPixelValue: 2,
			unitPrecision: 2,
			replace: true,
			mediaQuery: false,
			propList: ['*']
    }
  }
}