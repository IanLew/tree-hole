import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { clearCancelToken } from '../apis/axios'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    redirect: () => {
      if (store.getters.menus.length > 0) {
        return {
          path: store.getters.menus[0].url
        }
      }
      return {
        name: 'error',
        query: {
          code: 401,
          message: '暂无任何权限'
        }
      }
    },
    children: [
      {
        path: '/system',
        name: 'system',
        component: () => import('../views/System.vue'),
        meta: {
          title: '系统设置'
        }
      },
      {
        path: '/system/detail',
        name: 'systemDetail',
        component: () => import('../views/system/Detail.vue'),
        meta: {
          title: '系统详情'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/Role.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/role/detail',
        name: 'roleDetail',
        component: () => import('../views/role/Detail.vue'),
        meta: {
          title: '角色详情'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/user/detail',
        name: 'userDetail',
        component: () => import('../views/user/Detail.vue'),
        meta: {
          title: '用户详情'
        }
      },
      {
        path: '/letter',
        name: 'letter',
        component: () => import('../views/Letter.vue'),
        meta: {
          title: '信笺管理'
        }
      },
      {
        path: '/letter/detail',
        name: 'letterDetail',
        component: () => import('../views/letter/Detail.vue'),
        meta: {
          title: '信笺详情'
        }
      },
      {
        path: '/letter/logging',
        name: 'letterLogging',
        component: () => import('../views/letter/Logging.vue'),
        meta: {
          title: '信笺数据'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/Error.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  clearCancelToken()
  if (to.meta.isAuth || store.getters.token) {
    next()
  } else {
    router.push({
      name: 'login',
      query: {
        back: 1
      }
    })
  }
})

export default router