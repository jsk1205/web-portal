import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Home from '@/layout/home/home'
import CompanyRegister from '@/views/register/CompanyRegister'
import PersonRegister from '@/views/register/PersonRegister'
import PlatformRegister from '@/views/register/PlatformRegister'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/PersonRegister',
    name: 'peronRegister',
    component: PersonRegister,
  },
  {
    path: '/CompanyRegister',
    name: 'companyRegister',
    component: CompanyRegister,
  },
  {
    path: '/PlatformRegister',
    name: 'platformRegister',
    component: PlatformRegister,
  },
  {
    path: '/index',
    name: 'index',
    component: Home,
    children: [
      {
        path: '/Index',
        component: () => import('@/views/home/Index'),
        name: 'Index',
        meta: {
          title: '系统首页',
          icon: 'home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/notary',
    component: Home,
    children: [
      {
        path: '/Notary',
        component: () => import('@/views/notary/Notarization'),
        name: 'Notary',
        meta: {
          title: '公证申请',
          icon: 'platform',
        }
      }
    ]
  },
  {
    path: '/execute',
    component: Home,
    children: [
      {
        path: '/ExcuteApply',
        component: () => import('@/views/notary/ExecuteApply'),
        name: 'ExcuteApply',
        meta: {
          title: '执行申请',
          icon: 'model',
        }
      }
    ]
  },
  {
    path: '/address',
    component: Home,
    children: [
      {
        path: '/AddressManager',
        component: () => import('@/views/address/AddressManager'),
        name: 'AddressManager',
        meta: {
          title: '地址管理',
          icon: 'model',
        }
      }
    ]
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
