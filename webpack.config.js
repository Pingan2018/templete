const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MintCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const AddCdnPlugin = require('add-asset-html-cdn-webpack-plugin')
const DLLReferencePlugin = require('webpack').DllReferencePlugin
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smw = new SpeedMeasureWebpackPlugin()

module.exports = env => {
    let isDev = env.development
    const config = {
        mode: isDev ? 'development' : 'development',
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            filename: 'bundle.js',
            chunkFilename: '[name].[contenthash:8].min.js',
            path: path.resolve(__dirname, './dist/build')
        },
        optimization: {
            usedExports: isDev,
            // splitChunks: {
            //   chunks: 'async',
            //   minSize: 30000,
            //   maxSize: 0,
            //   minChunks: 1,
            //   maxAsyncRequests: 5,
            //   maxInitialRequests: 3,
            //   automaticNameDelimiter: '~',
            //   automaticNameMaxLength: 30,
            //   cacheGroups: {
            //     react:{
            //       test:/[\\/]node_modules[\\/](react)|(react-dom)/,
            //       priority: 1
            //     },
            //     vendors: {
            //       test: /[\\/]node_modules[\\/]/,
            //       priority: -10
            //     },
            //     common: {
            //       minChunks: 2,
            //       priority: -20,
            //       reuseExistingChunk: true
            //     }
            //   }
            // },
            minimizer: [
                !isDev && new OptimizeCSSAssetsPlugin(),
                !isDev && new TerserWebpackPlugin()
            ].filter(Boolean)
        },
        // externals:{
        //   "jquery":'$'
        // },
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
                    use: 'babel-loader', // @babel/core 
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
                }
            ]
        },
        plugins: [
            !isDev && new MintCssExtractPlugin({
                filename: 'css/mian.css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'index.html',
                hash: true,
                // minify: !isDev && {
                //     removeComments: true,
                //     collapseWhitespace: true,
                //     removeRedundantAttributes: true,
                //     useShortDoctype: true,
                //     removeEmptyAttributes: true,
                //     removeStyleLinkTypeAttributes: true,
                //     keepClosingSlash: true,
                //     minifyJS: true,
                //     minifyCSS: true,
                //     minifyURLs: true,
                // }
            }),
            new PurgeCSSWebpackPlugin({
                paths: glob.sync("./src/**/*", { nodir: true })
            }),
            // new AddCdnPlugin(true,{
            //   "jquery":"cdnpath"
            // })
            // new DLLReferencePlugin({
            //     manifest: path.resolve(__dirname, './dist/dll/manifest.json')
            // }),
            // new AddAssetHtmlPlugin({
            //     filepath: path.resolve(__dirname, './dist/dll/react.dll.js')
            // }),
            // isSpeed && new BundleAnalyzerPlugin(),
            // !isDev && new CleanWebpackPlugin(),
        ].filter(Boolean)
    }
    return smw.wrap(config)
}