const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MintCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => {
  let isDev = env.development
  const baseConfig = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].[contenthash:8].min.js',
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   use: 'eslint-loader', // eslint 默认可以使用eslint --init来生成配置文件
        //   exclude: /node_modules/,
        //   enforce: 'pre',  // 强制在所有js的loader之前执行
        // },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MintCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2
              }
            }, "postcss-loader", "sass-loader"]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(woff|ttf|svg)$/,
          use: 'file-loader'
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "img/[contentHash].[ext]",
                limit: 1024,
              }
            },
            !isDev && {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
            }
          ].filter(Boolean)
        },

      ]
    },
    plugins: [
      !isDev && new MintCssExtractPlugin({
        filename: 'css/mian.css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        hash: true,
        minify: !isDev && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      new CleanWebpackPlugin()
    ].filter(Boolean)
  }
  return isDev ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig)
}

