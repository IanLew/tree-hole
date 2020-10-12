import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      authed: true
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      authed: true
    },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/error',
    name: 'Error',
    meta: {
      authed: true
    },
    component: () => import('@/views/Error.vue')
  },
  {
    path: '/:error(.*)*',
    name: 'NotFound',
    meta: {
      authed: true
    },
    component: () => import('@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authed || store.getters.token) {
    next()
  } else {
    next({
      name: 'Login',
      query: {
        back: to.name
      },
      replace: true
    })
  }
})

export default router
