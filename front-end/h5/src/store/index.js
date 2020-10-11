import Vue from 'vue'
import Vuex from 'vuex'
import editor from './modules/editor'
import user from './modules/user'
import loading from './modules/loading'
import i18n from './modules/i18n'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    editor,
    user,
    loading,
    i18n
  }
})
