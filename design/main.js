import {createApp} from 'vue'
import App from './App.vue'
import VueMapper from './vueMapper.js'
import setRem from '@src/assets/js/rem'
setRem()
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'element-plus/es/components/button/style/css'
// import 'element-plus/es/components/tree/style/css'
let getUrlParam = (key) => {
  let reg = new RegExp('[?|&]' + key + '=([^&]+)')
  let match = location.search.match(reg)
  return match && match[1]
}
let page = getUrlParam('page')
let router = VueMapper[page] || App
let app = createApp(router)
// app.use(ElementPlus)
app.mount('#app')




