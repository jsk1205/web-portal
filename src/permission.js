import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken('Token')) {
    const hasRoles =
      store.getters.permission_routers &&
      store.getters.permission_routers.length > 0
    if (hasRoles) {
      next()
    } else {
      if (getToken('Access') == 'DA') {
        store.dispatch('generateRoutes', pages).then(() => {
          router.addRoutes(store.getters.permission_routers)
          next({ ...to, replace: true })
        })
      } else {
        store.dispatch('generateRoutes', pagess).then(() => {
          router.addRoutes(store.getters.permission_routers)
          next({ ...to, replace: true })
        })
      }
    }
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})

const pages = [
  {
    path: '/share',
    component: 'Layout',
    name: 'share',
    meta: {
      title: '管理配置',
      icon: 'setting'
    },
    children: [
      {
        path: '/data',
        component: 'data/DataManager',
        name: 'datamanager',
        meta: {
          title: '数据实体',
          icon: 'platform'
        }
      },
      {
        path: '/systemdata',
        component: 'systemdata/SystemData',
        name: 'systemdata',
        meta: {
          title: '系统数据',
          icon: 'platform'
        }
      },
      {
        path: '/platformmanager',
        component: 'platform/PlatformManager',
        name: 'platformmanager',
        meta: {
          title: '平台管理',
          icon: 'platform'
        }
      },
      {
        path: '/modelmanager',
        component: 'model/ModelManager',
        name: 'modelmanager',
        meta: {
          title: '模板管理',
          icon: 'model'
        }
      },
      {
        path: '/usermanager',
        component: 'user/UserManager',
        name: 'usermanager',
        meta: {
          title: '用户管理',
          icon: 'user'
        }
      },
      {
        path: '/organ',
        name: 'organ',
        component: 'organ/Organ',
        meta: {
          title: '组织机构',
          icon: 'organ'
        }
      },
      {
        path: '/person',
        name: 'person',
        component: 'person/Person',
        meta: {
          title: '人员管理',
          icon: 'person'
        }
      },
      {
        path: '/post',
        name: 'post',
        component: 'post/Post',
        meta: {
          title: '岗位管理',
          icon: 'post'
        }
      }
    ]
  },
  {
    path: '/report',
    component: 'Layout',
    name: 'report',
    meta: {
      title: '报表管理',
      icon: 'setting'
    },
    children: [
      {
        path: '/people',
        component: 'report/PeopleCounting',
        name: 'people',
        meta: {
          title: '公证/申请人数统计',
          icon: 'platform'
        }
      },
      {
        path: '/lending',
        component: 'report/LendingStatistics',
        name: 'lending',
        meta: {
          title: '放贷额度统计',
          icon: 'platform'
        }
      },
      {
        path: '/custom',
        component: 'report/CustomerStatistics',
        name: 'custom',
        meta: {
          title: '客户统计',
          icon: 'platform'
        }
      },
    ]
  },
  {
    path: '/reconcile',
    component: 'Layout',
    name: 'reconcile',
    meta: {
      title: '对账管理',
      icon: 'setting'
    },
    children: [
      {
        path: '/ratesetting',
        component: 'reconcile/RateSetting',
        name: 'ratesetting',
        meta: {
          title: '费率设置',
          icon: 'platform'
        }
      },
      {
        path: '/reconcileserver',
        component: 'reconcile/ReconcileServer',
        name: 'reconcileserver',
        meta: {
          title: '对账服务',
          icon: 'platform'
        }
      },
    ]
  }
]

const pagess = [
  {
    path: '/share',
    component: 'Layout',
    name: 'share',
    meta: {
      title: '管理配置',
      icon: 'setting'
    },
    children: [
      {
        path: '/platforminfo',
        component: 'platform/PlatformInfo',
        name: 'platforminfo',
        meta: {
          title: '平台管理',
          icon: 'platform'
        }
      },
      {
        path: '/modelmanager',
        component: 'model/ModelManager',
        name: 'modelmanager',
        meta: {
          title: '模板管理',
          icon: 'model'
        }
      },
      {
        path: '/usermanager',
        component: 'user/UserManager',
        name: 'usermanager',
        meta: {
          title: '用户管理',
          icon: 'user'
        }
      },
      {
        path: '/organ',
        name: 'organ',
        component: 'organ/Organ',
        meta: {
          title: '组织机构',
          icon: 'user'
        }
      },
      {
        path: '/person',
        name: 'person',
        component: 'person/Person',
        meta: {
          title: '人员管理',
          icon: 'user'
        }
      },
      {
        path: '/post',
        name: 'post',
        component: 'post/Post',
        meta: {
          title: '岗位管理',
          icon: 'user'
        }
      }
    ]
  }
]
