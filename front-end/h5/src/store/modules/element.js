import Element from '../../components/core/models/element'

// actions
export const actions = {
  setEditingElement ({ commit }, payload) {
    commit('setEditingElement', payload)
  },
  setElementPosition ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  setElementShape ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  recordElementRect ({ commit }, payload = {}) {
    commit('recordRect', payload)
  },
  elementManager ({ commit }, payload) {
    commit('elementManager', payload)
  }
}

// mutations
export const mutations = {
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
        state.editingPage.elements.push(element)
        break
      case 'copy':
        state.editingPage.elements.push(state.editingElement.clone())
        break
      case 'delete':
        const { editingPage, editingElement } = state
        let index = editingPage.elements.findIndex(e => e.uuid === editingElement.uuid)
        if (index !== -1) {
          let newElements = editingPage.elements.slice()
          newElements.splice(index, 1)
          state.editingPage.elements = newElements
        }
        break
      default:
    }
  },
  recordRect (state, { type, value }) {

  }
}
