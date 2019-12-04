const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  console.log(env)
  let isDev = env.development
  const baseConfig = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        hash: true,
        minify: !isDev && {
          removeAttributeQuotes: true,
          collapseWhitespace: true
        }
      })
    ]
  }
  return isDev ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig)
}