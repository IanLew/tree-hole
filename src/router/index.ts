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
          name: store.getters.menus[0].name
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
        component: () => import('../views/System.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/Role.vue')
      },
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