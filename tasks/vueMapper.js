/**
 * Created by Allen Liu on 2021/6/5.
 */
let fs = require('fs')
let path = require('path')
function resolvePath(p){
  let result = path.resolve(__dirname,p)
  return result
}
let dirs = fs.readdirSync(resolvePath('../design/views'))
let result = ''
let vueRouterNameStrs = ''
dirs.forEach((dir)=>{
  let subDirStr = resolvePath(`../design/views/${dir}`)
  let data = fs.statSync(subDirStr)
  let isDirectory = data.isDirectory()
  if(isDirectory){
    let subDirs = fs.readdirSync(subDirStr)
    subDirs = subDirs.map((item)=>{
      //去除xx.vue
      let i = item.split('.')[0]
      return i
    })
    subDirs.forEach((subDir,index)=>{
      let vueRouterName = `${dir}_${subDir}`
      let resultItem = `import ${vueRouterName} from './views/${dir}/${subDir}.vue';\r\n`
      result += resultItem
      vueRouterNameStrs += vueRouterName + `,`
    })
  }
  // console.log(data.isDirectory());
})
result += `export default {${vueRouterNameStrs} }`
fs.writeFile(resolvePath('../design/vueMapper.js'),result,function(){
  console.log('生成vueMapper成功！！！');
})

