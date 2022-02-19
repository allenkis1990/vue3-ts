import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const Home = () =>
    import(/* webpackChunkName: "home" */ "@/views/home/index.vue");
import home from './home'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    redirect: "/home/index",
    children: [
      ...home
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
