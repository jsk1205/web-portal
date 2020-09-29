import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/views/home/Home"
Vue.use(Router)

export const constantRouterMap = [
  {
    path:'/Home',
    name:Home,
    component:Home
  },
]

export const asyncRouterMap = [
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
