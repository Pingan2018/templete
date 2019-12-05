const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  optimization: {
    useExports:true,
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

  ]
}