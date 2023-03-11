import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setRem from '@src/assets/js/rem'
setRem()
//应用中所有音频存放的容器
window.audiosContainer = []

createApp(App).use(store).use(router).mount('#app')
