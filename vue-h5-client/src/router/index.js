import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: 'home',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      // {
      //   path: '/circle',
      //   name: 'Circle',
      //   component: () => import('@/views/Circle.vue')
      // },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('@/views/Mine.vue')
      }
    ]
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
    path: '/user/profile',
    name: 'UserProfile',
    component: () => import('@/views/user/Profile.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/message/Index.vue')
  },
  {
    path: '/message/send',
    name: 'SendMessage',
    component: () => import('@/views/message/Send.vue')
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

export default router
