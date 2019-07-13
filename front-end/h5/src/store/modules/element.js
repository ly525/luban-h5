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
    commit('setElementPosition', payload)
  },
  setElementShape ({ commit }, payload) {
    commit('setElementShape', payload)
  }
}

// mutations
const mutations = {
  setEditingElement (state, payload) {
    state.editingElement = payload
  },
  setElementCommonStyle (state, commonStyle) {
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...commonStyle
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
