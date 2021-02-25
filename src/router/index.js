import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'Login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to表示将要访问的路径
  // from表示从哪个路径跳转
  // next是一个函数，表示放行
  if (to.path === '/login') {
    return next()
  }
  // 获取token，如果没有登录，则不存在token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  // 存在token直接放行
  next()
})
export default router
