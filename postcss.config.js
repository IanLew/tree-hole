module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      uft8: false
    },
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines', 'van'],
      minPixelValue: 1,
      mediaQuery: false
    },
    "postcss-viewport-units": {
      "silence": true
    },
    "cssnano": {
      preset: 'advanced',
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
}
