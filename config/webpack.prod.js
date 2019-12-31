const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin')
const Purify = require('purifycss-webpack');
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
      maxAsyncRequests: 6,
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
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all'
        },
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
          cache: true,
          sourceMap: false
        },
      })
    ]
  },
  plugins: [
    new PurgeCSSWebpackPlugin({
      paths: glob.sync("./src/**/*", {
        nodir: true
      })
    }),
    new ProgressBarPlugin(),
    new FirendlyErrorePlugin(),
    new WebpackDeepScopeAnalysisPlugin(),
    new AntdDayjsWebpackPlugin(),
    new Purify({
      paths: glob.sync(path.join(__dirname, "src/*.html"))
    })
  ],
  node: {
    module: "empty",
    dgram: "empty",
    dns: "mock",
    fs: "empty",
    http2: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  performance: false
})