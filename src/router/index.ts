import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/Notice.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/My.vue')
  },
  {
    path: '/message/detail',
    name: 'messageDetail',
    component: () => import('../views/message/Detail.vue')
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('../views/user/Profile.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router