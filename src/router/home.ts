/**
 * Created by Allen Liu on 2020/4/11.
 */
const HomeIndex = () =>
    import(/* webpackChunkName: "home" */ "@src/views/home/home.vue");
const HomePage2 = () =>
    import(/* webpackChunkName: "home" */ "@src/views/home/page2.vue");
const HomeExam = () =>
    import(/* webpackChunkName: "home" */ "@src/views/home/exam.vue");

export default [
  {
    path: "index",
    name: "homeIndex",
    component: HomeIndex,
    meta: {
      title: "首页",
      keepAlive: false
    }
  },
  {
    path: "page2",
    name: "homePage2",
    component: HomePage2,
    meta: {
      title: "page2",
      keepAlive: true
    }
  },
  {
    path: "exam",
    name: "homeExam",
    component: HomeExam,
    meta: {
      title: "exam",
      keepAlive: true
    }
  }
]