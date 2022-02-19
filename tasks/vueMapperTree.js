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
let result = 'let treeData = '
let arr = []
dirs.forEach((dir)=>{
  let subDirStr = resolvePath(`../design/views/${dir}`)
  let data = fs.statSync(subDirStr)
  let isDirectory = data.isDirectory()
  if(isDirectory){
    let dataItem = {label:dir, children:[]}
    let subDirs = fs.readdirSync(subDirStr)
    subDirs = subDirs.map((item)=>{
      //去除xx.vue
      let i = item.split('.')[0]
      return i
    })
    subDirs.forEach((subDir,index)=>{
      let vueRouterName = `${dir}_${subDir}`
      dataItem.children.push({
        label:subDir,
        name:vueRouterName
      })
    })
    arr.push(dataItem)
  }
  // console.log(data.isDirectory());
})
result += JSON.stringify(arr) + `\r\n`
result += `export default treeData`
fs.writeFile(resolvePath('../design/vueMapperTree.js'),result,function(){
  console.log('生成vueMapperTree成功！！！');
})


