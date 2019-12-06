const path = require('path')
const DLLPlugin = require('webpack').DllPlugin
module.exports = {
    mode:'development',
    entry:['react','react-dom'],
    output:{
        library:'react',
        filename:'react.dll.js',
        path:path.resolve(__dirname,'./dist/dll')
    },
    plugins:[
        new DLLPlugin({
            name:'react',
            path:path.resolve(__dirname,'./dist/dll/manifest.json')
        })
    ]
} 