import { createStore } from 'vuex'

const user = {
  key: 'TREEHOLE-USER',
  set(data: any) {
    if (data) {
      localStorage.setItem(this.key, JSON.stringify(data))
    } else {
      localStorage.removeItem(this.key)
    }
  },
  get(state: any) {
    if (!state.user) {
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
    userinfo(state) {
      return user.get(state).userinfo || {}
    },
    token(state) {
      return user.get(state).token
    }
  },
  mutations: {
    user(state, data) {
      user.set(data)
      state.user = data
    }
  },
  actions: {},
  modules: {}
})