window.DS = {}
const state = {
  storage: {}
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  updateStorage (state, payload) {
    state.storage = {
      ...state.storage,
      ...payload
    }
    window.DS = state.storage
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
