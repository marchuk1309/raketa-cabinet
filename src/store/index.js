import Vue from 'vue'
import Vuex from 'vuex'
import support from './modules/support'
import user from "./modules/user";
import transactions from "./modules/transactions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteContext: null,
    siteTitle: null,
  },
  mutations: {
    setTitle(state, title) {
      state.siteTitle = title
    },
    setSiteContext(state, string) {
      state.siteContext = string
    }
  },
  actions: {
  },
  modules: {
    support,
    user,
    transactions
  }
})
