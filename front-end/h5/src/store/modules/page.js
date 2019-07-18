// initial state
import Page from '../../components/core/models/page'

const state = {
  editingPage: { pages: [] },
  pagesOfCurrentWork: []
}

// getters
const getters = {

}

// actions
const actions = {
  setEditing ({ commit }, payload) {
    commit('setEditing', payload)
  },
  manager ({ commit }, payload) {
    commit('manager', payload)
  }
}

// mutations
const mutations = {
  setEditing (state, payload) {
    state.editing = payload
  },
  manager (state, { type, value }) {
    switch (type) {
      case 'add':
        const page = new Page(value)
        state.pagesOfCurrentWork.push(page)
        break
      case 'copy':
        state.pagesOfCurrentWork.push(state.editing.clone())
        break
      case 'delete':
        const { pagesOfCurrentWork, editing } = state
        let index = pagesOfCurrentWork.findIndex(e => e.uuid === editing.uuid)
        if (index !== -1) {
          let newPages = pagesOfCurrentWork.slice()
          newPages.splice(index, 1)
          state.pagesOfCurrentWork = newPages
        }
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
