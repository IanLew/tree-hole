import { createStore } from 'vuex'

const user = {
  key: 'TREEHOLE-USER',
  set(data: any) {
    if (data) {
      // 存储个人信息
      localStorage.setItem(this.key, JSON.stringify(data))
    } else {
      // 移除个人信息
      localStorage.removeItem(this.key)
    }
  },
  get(state: any) {
    if (!state.user) {
      // 获取本地个人信息
      let _user = localStorage.getItem(this.key)
      state.user = _user ? JSON.parse(_user) : {}
    }
    return state.user
  }
}

export default createStore({
  state: {
    user: null
  },
  getters: {
    // 个人信息
    userinfo(state) {
      return user.get(state).userinfo || {}
    },
    // token
    token(state) {
      return user.get(state).token
    }
  },
  mutations: {
    // 用户相关信息
    user(state, data) {
      user.set(data)
      state.user = data
    }
  },
  actions: {},
  modules: {}
})