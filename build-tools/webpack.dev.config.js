const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
const webpackBaseConfig = require('./webpack.base.config')
const utils = require('./utils')

const pkg = utils.getPackageInfo()
const entry = [utils.rootPathTo('./index')]
const baseStyleLoader = utils.getBaseStyleLoader()

const webpackDevConfig = webpackMerge(webpackBaseConfig, {
  entry: {},
  output: {
    publicPath: '/'
  },
  resolve: {
    alias: {
      [pkg.name]: utils.rootPathTo('./index'),
      site: utils.rootPathTo('./site'),
      'antd/lib': 'antd/es',
      'react-router': 'react-router/umd/ReactRouter'
    }
  },
  externals: {
    'react-router-dom': 'ReactRouterDOM'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader'].concat(baseStyleLoader)
      },
      {
        test: /\.less$/,
        use: ['style-loader'].concat(baseStyleLoader, [
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ])
      },
      {
        test: /\.scss$/,
        use: ['style-loader'].concat(baseStyleLoader, [
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ])
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    quiet: true,
    overlay: { warnings: false, errors: true }
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new CSSSplitWebpackPlugin({ size: 4000 })
  ]
})

module.exports = webpackDevConfig
