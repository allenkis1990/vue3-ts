const path = require('path');
let argv = require('yargs').argv

function resolve(dir) {
  return path.join(__dirname, dir)
}

const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/dist/webpack.js')
const Components = require('unplugin-vue-components/dist/webpack.js')
// const elementPlugin = require('unplugin-element-plus/dist/webpack.js')
const {ElementPlusResolver} = require('unplugin-vue-components/dist/resolvers.js')

//design需要用到elementui src暂时用不到
let elementUiPlugins = []
if(argv.design){
  elementUiPlugins = [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ]
}
module.exports = {
  lintOnSave: 'warning',
  //里面是真正的webpack配置
  configureWebpack: {
    resolveLoader: {
      mainFields: ['main'],
      modules: [path.resolve(__dirname, "loaders")]
    },
    module: {
      rules: [
        {
          test: /\.(md)$/,
          use: {
            loader: 'strLoader'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        isDev: true
      }),
        ...elementUiPlugins
    ]
  },
  chainWebpack: (config) => {
    if (argv.design) {
      config.entry('app').clear().add('./design/main.js')
      config.devServer.set('port', '8088');
    }
    config.resolve.alias
        .set('@src', path.resolve('./src'))
  },
}