const path = require('path')
module.exports={
  mode:'development',
  devServer:{
    port:3000,
    compress:true,//gzip
    contentBase:path.resolve(__dirname,'../dist'),
    open:true,
    hot:true,
    // overlay:true // 弹出提示层 
  }
}