import Vue from 'vue';
import App from './App.vue'
import VueMapper from './vueMapper.js'
let getUrlParam = (key) => {
  let reg = new RegExp('[?|&]' + key + '=([^&]+)')
  let match = location.search.match(reg)
  return match && match[1]
}
let page = getUrlParam('page')
let router = VueMapper[page] || App

import '@/assets/theme-orange/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);



var vm = new Vue({
  render: h => h(router),
}).$mount('#app')
