import Vue from 'vue'
import Vuex from 'vuex'
import undoRedoPlugin from './plugins/undo-redo/index'
import editor from './modules/editor'
import user from './modules/user'
import visible from './modules/visible'
import loading from './modules/loading'

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
    visible,
    loading
  },
  plugins: [undoRedoPlugin]
})
