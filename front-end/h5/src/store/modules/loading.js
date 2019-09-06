// initial state
const state = {
  saveWork_loading: false,
  fetchWorks_loading: false,
  setWorkAsTemplate_loading: false,
  fetchWorkTemplates_loading: false,
  useTemplate_loading: false,
  uploadWorkCover_loading: false
}

// getters
const getters = {

}

// actions
const actions = {
  update ({ commit }, payload) {
    commit('update', payload)
  }
}

// mutations
const mutations = {
  update (state, { type, payload }) {
    state[type] = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
