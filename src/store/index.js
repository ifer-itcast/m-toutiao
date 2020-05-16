import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储用户登录信息（包含 token）
    user: JSON.parse(localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
