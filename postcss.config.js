module.exports = {
  plugins: {
    'postcss-px-to-viewport-lcy': {
      viewportWidth: 375,
			viewportHeight: 667,
			unitPrecision: 3,
			viewportUnit: 'vw',
			selectorBlackList: ['.ignore', '.hairlines'],
			minPixelValue: 1,
      mediaQuery: false
    },
    'postcss-preset-env': {
      stage: 4
    },
  }
}