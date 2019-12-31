const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MintCssExtractPlugin = require('mini-css-extract-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpack = require('webpack');

const theme = require('./theme')

module.exports = env => {
  let isDev = env.development
  const baseConfig = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].[contenthash:8].min.js',
      path: path.resolve(__dirname, '../dist')
    },
    bail: !isDev,
    devtool: isDev ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   use: 'eslint-loader', // eslint 默认可以使用eslint --init来生成配置文件
        //   exclude: /node_modules/,
        //   enforce: 'pre', // 强制在所有js的loader之前执行
        // },
        {
          test: /\.tsx?$/,
          use: ['cache-loader', {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "targets": {
                      "chrome": "65"
                    }
                  }
                ],
                "@babel/preset-react",
                "@babel/preset-typescript"
              ],
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    "legacy": true
                  }
                ],
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    "loose": true
                  }
                ],
                [
                  "babel-plugin-import",
                  {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true
                  }
                ],
                "@babel/plugin-transform-runtime"
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMap: false
            }
          }],
          exclude: /node_modules/,
          include: path.resolve(__dirname, '../src')
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, '../src'),
          use: [
            isDev ? "style-loader" : {
              loader: MintCssExtractPlugin.loader,
              options: {
                hmr: true
              }
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2
              }
            }, "postcss-loader", "less-loader"
          ]
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", {
            loader: "less-loader",
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }]
        },
        {
          test: /\.(woff|ttf|svg)$/,
          use: 'file-loader'
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [{
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
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CleanWebpackPlugin()
    ].filter(Boolean)
  }
  return isDev ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig)
}