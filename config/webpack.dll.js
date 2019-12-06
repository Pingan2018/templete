const path = require('path')
const {DllPlugin} = require('webpack')
module.exports = {
    mode:'development',
    entry:['react','react-dom'],
    output:{
        library:'react',
        filename:'react.dll.js',
        path:path.resolve(__dirname,'../dll')
    },
    plugins:[
        new DllPlugin({
            name:'react',
            path:path.resolve(__dirname,'../dll/manifest.json')
        })
    ]
} 