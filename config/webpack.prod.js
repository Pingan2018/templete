const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const glob = require('glob')
const smw = new SpeedMeasureWebpackPlugin()

module.exports = smw.wrap({
  mode: 'production',
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react)|(react-dom)/,
          priority: 1
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd)/,
          priority: 2
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // },
        // common: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all'
        },
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new PurgeCSSWebpackPlugin({
      paths: glob.sync("./src/**/*", { nodir: true })
    }),
    new ProgressBarPlugin(),
    new FirendlyErrorePlugin(),
    new WebpackDeepScopeAnalysisPlugin(),
    new AntdDayjsWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ]
})