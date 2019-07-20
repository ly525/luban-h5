// initial state
import Work from '../../components/core/models/work'
import { actions as pageActions, mutations as pageMutations } from './page'
import { actions as elementActions, mutations as elementMutations } from './element'
import { actions as workActions, mutations as workMutations } from './work'

const state = {
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null
}

// getters
const getters = {}

// actions
const actions = {
  ...elementActions,
  ...pageActions,
  ...workActions,
  createWork ({ commit }, payload) {
    commit('createWork')
    commit('pageManager', { type: 'add' })
    commit('setEditingPage')
  }
}

// mutations
const mutations = {
  ...elementMutations,
  ...pageMutations,
  ...workMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
