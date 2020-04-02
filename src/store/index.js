import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {},
    authorityList: [],
    token: '',
    refer: {lawyerId: '', consultType: ''},
    lawyerItem: {},
    breadcrumbList: [{path: '/', name: '首页'}],
    cache: {}
  },
  mutations: {
    // 用户信息
    userInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    authorityList: (state, authorityList) => {
      state.authorityList = authorityList
    },
    // 服务的token
    token: (state, token) => {
      state.token = token
    },
    refer: (state, refer) => {
      state.refer = refer
    },
    // 存储某个律师信息
    lawyerItem: (state, lawyerItem) => {
      state.lawyerItem = lawyerItem
    },
    // 存储面包屑的方法
    breadcrumbList: (state, breadcrumbList) => {
      state.breadcrumbList = breadcrumbList
    },
    // 缓存tab栏切换页面的查询条件及状态
    SET_SEARCH_CACHE: (state, cache) => {
      state.cache[cache.name] = cache.request
    }
  },
  actions: {
    setCache({ commit }, cache) {
      commit('SET_SEARCH_CACHE', cache)
    }
  },
  modules: {
  },
  getters
});

export default store;
