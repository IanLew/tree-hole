import Vue from 'vue'
import Router from 'vue-router'
import Title from 'vue-wechat-title'

Vue.use(Router)
Vue.use(Title)

export default new Router({
  mode: 'history',
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
        title: '回声'
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
      path: '/centre',
      name: 'centre',
      meta: {
        title: '我的'
      },
      component: () => import(/* webpackChunkName: "centre" */ './views/Centre.vue')
    },
    // {
    //   path: '/create',
    //   name: 'create',
    //   meta: {
    //     title: '创建'
    //   },
    //   component: () => import(/* webpackChunkName: "create" */ './views/Create.vue')
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   meta: {
    //     title: '我的'
    //   },
    //   component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    // },
    {
      path: '/mood',
      name: 'mood',
      meta: {
        title: '种树苗'
      },
      component: () => import(/* webpackChunkName: "mood" */ './views/Mood.vue')
    },
    {
      path: '/letter',
      name: 'letter',
      meta: {
        title: '纸飞机'
      },
      component: () => import(/* webpackChunkName: "letter" */ './views/Letter.vue')
    },
    {
      path: '/glass',
      name: 'glass',
      meta: {
        title: '时间囊'
      },
      component: () => import(/* webpackChunkName: "glass" */ './views/Glass.vue')
    },
  ]
})
