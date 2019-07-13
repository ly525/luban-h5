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
  },
  setElementPosition ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  setElementShape ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  }
}

// mutations
const mutations = {
  setEditingElement (state, payload) {
    state.editingElement = payload
  },
  setElementCommonStyle (state, payload) {
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...payload
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
