import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { Dialog } from 'vant'
import { clearCancelToken } from '../apis/axios'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/retrieve',
    name: 'retrieve',
    component: () => import('../views/Retrieve.vue')
  },
  {
    path: '/letter/detail',
    name: 'letterDetail',
    component: () => import('../views/letter/Detail.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue')
  },
  {
    path: '/my/notice',
    name: 'myNotice',
    component: () => import('../views/my/Notice.vue'),
    meta: {
      needAuth: true
    }
  },
  {
    path: '/my/profile',
    name: 'myProfile',
    component: () => import('../views/my/Profile.vue'),
    meta: {
      needAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  clearCancelToken()
  if (!to.meta.needAuth || store.getters.token) {
    next()
  } else {
    Dialog.confirm({
      message: '登录失效，请重新登录',
      cancelButtonText: '暂不登录',
      confirmButtonText: '立即登录'
    }).then(() => {
      next({
        name: 'login',
        query: {
          back: 1
        }
      })
    }).catch(() => {
      next(false)
    })
  }
})

export default router