import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
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
    component: () => import('../views/Login.vue'),
    meta: {
      isAuth: true
    }
  },
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
      name: 'login'
    })
  }
})

export default router