
const path = require('path');
let argv = require('yargs').argv

function resolve(dir) {
  return path.join(__dirname, dir)
}

const webpack = require('webpack');

module.exports = {
  lintOnSave:'warning',
  //里面是真正的webpack配置
  configureWebpack: {
    resolveLoader:{
      mainFields:['main'],
      modules: [path.resolve(__dirname,"loaders")]
    },
    module:{
      rules:[
        {
          test:/\.(md)$/,
          use:{
            loader:'strLoader'
          }
        }
      ]
    },
    plugins:[
      new webpack.DefinePlugin({
        isDev:true
      })
    ]
  },
  chainWebpack: (config) => {
    if(argv.design){
      config.entry('app').clear().add('./design/main.js')
      config.devServer.set('port', '8088');
    }
    config.resolve.alias
        .set('@src', path.resolve('./src'))
  },
}