import Vue from 'vue'
import Router from 'vue-router'
import Title from 'vue-wechat-title'

Vue.use(Router)
Vue.use(Title)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '森林'
      },
      component: () => import('./views/Home.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      meta: {
        title: '树洞'
      },
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue')
    },
    {
      path: '/mail',
      name: 'mail',
      meta: {
        title: '信箱'
      },
      component: () => import(/* webpackChunkName: "mail" */ './views/Mail.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: {
        title: '创建'
      },
      component: () => import(/* webpackChunkName: "create" */ './views/Create.vue')
    },
    {
      path: '/centre',
      name: 'centre',
      meta: {
        title: '我的'
      },
      component: () => import(/* webpackChunkName: "centre" */ './views/Centre.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '我的'
      },
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    }
  ]
})
