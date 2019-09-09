import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: 1,
    footerTabbarIndex: 0
  },
  mutations: {
    footerTabbar(state, data) {
      state.footerTabbarIndex = data
    }
  },
  actions: {

  }
})
