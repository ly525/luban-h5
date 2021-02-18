import Vue from 'vue'
export const lubanDS = Vue.observable({ DS: {} })
const state = { $ds: {} }

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  updateStorage (state, payload) {
    state.$ds = {
      ...state.$ds,
      ...payload
    }
    lubanDS.DS = state.$ds
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
