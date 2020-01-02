const path = require('path')
const {DllReferencePlugin} = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports={
  mode:'development',
  devServer:{
    port:3000,
    compress:true,//gzip
    contentBase:path.resolve(__dirname,'../dist'),
    open:true,
    hot:true,
    overlay:true // 弹出提示层 
  },
  stats: 'errors-only',
  plugins: [
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/manifest.json')
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/react.dll.js')
    })
  ]
}