import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: 1,
    footerMenuIndex: 0,
    footerMenuSpacing: false,
    newroomSwitch: false
  },
  mutations: {
    activeFooterMenu(state, data) {
      state.footerMenuIndex = data
    },
    fixFooterMenu(state, data) {
      state.footerMenuSpacing = data
    },
    newsroom(state, data) {
      state.newroomSwitch = data
    }
  },
  actions: {

  }
})
