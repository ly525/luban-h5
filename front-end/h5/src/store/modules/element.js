// initial state
const state = {
  editingElement: null
}

// getters
const getters = {

}

// actions
const actions = {
  setEditingElement ({ commit }, payload) {
    commit('setEditingElement', payload)
  }
}

// mutations
const mutations = {
  setEditingElement (state, payload) {
    state.editingElement = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
