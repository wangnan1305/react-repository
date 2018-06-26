const path = require('path')
const autoprefixer = require('autoprefixer')

const rootPathTo = function(toPath) {
  const ROOT_PATH = path.resolve(__dirname, '../')
  return path.resolve(ROOT_PATH, toPath)
}

const getPackageInfo = function() {
  return require(rootPathTo('./package.json'))
}

const getBaseStyleLoader = function() {
  return [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          autoprefixer({
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4'
            ]
          })
        ],
        sourceMap: true
      }
    }
  ]
}

module.exports = {
  rootPathTo,
  getPackageInfo,
  getBaseStyleLoader
}
