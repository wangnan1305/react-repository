const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const chalk = require('chalk')
const babelConfig = require('./babel.config')
const utils = require('./utils')

const pkg = utils.getPackageInfo()

module.exports = {
  devtool: 'source-map',

  output: {
    path: utils.rootPathTo('./dist/'),
    filename: '[name].js'
  },

  resolve: {
    modules: ['node_modules', utils.rootPathTo('../node_modules')],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': utils.rootPathTo('./src/')
    }
  },

  node: [
    'child_process',
    'cluster',
    'dgram',
    'dns',
    'fs',
    'module',
    'net',
    'readline',
    'repl',
    'tls'
  ].reduce((acc, name) => Object.assign({}, acc, { [name]: 'empty' }), {}),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: /src/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: false
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        issuer: { not: [/\.jsx?$/] },
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        issuer: { not: [/\.jsx?$/] },
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        issuer: { not: [/\.jsx?$/] },
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/fonts/[name].[ext]'
        }
      },
      // jsx中通过html标签src属性导入的图片等资源在实时使用组件库的项目中无法找到正确路径
      // 因此强制转为base64形式引入
      {
        test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
        issuer: /\.jsx?$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`),
    new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      const stream = process.stderr
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0)
        stream.write(
          `\uD83D\uDCE6  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`
        )
        stream.clearLine(1)
      } else if (percentage === 1) {
        console.log(chalk.green('\nwebpack: bundle build is now finished.'))
      }
    })
  ]
}
