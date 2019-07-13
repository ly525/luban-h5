// initial state
import Element from '../../components/core/models/element'

const state = {
  editingElement: null,
  elementsOfCurrentPage: []
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
  },
  elementManager ({ commit }, payload) {
    commit('elementManager', payload)
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
  },
  elementManager (state, { type, value }) {
    switch (type) {
      case 'add':
        const element = new Element(value)
        state.elementsOfCurrentPage.push(element)
        break
      case 'copy':
        state.elementsOfCurrentPage.push(state.editingElement.clone())
        break
      default:
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
