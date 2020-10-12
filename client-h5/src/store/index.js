import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    user(state) {
      if (!state.user) {
        const user = localStorage.getItem('__user__')
        state.user = user ? JSON.parse(user) : null
      }

      return state.user
    }
  },
  mutations: {
    user(state, data) {
      if (data) {
        state.user = data
        localStorage.setItem('__user__', JSON.stringify(data))
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
