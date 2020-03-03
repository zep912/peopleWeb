import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    authorityList: [],
    token: ''
  },
  mutations: {
    userInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    authorityList: (state, authorityList) => {
      state.authorityList = authorityList
    },
    token: (state, token) => {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  },
  getters
})
