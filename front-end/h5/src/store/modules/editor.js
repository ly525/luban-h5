// initial state
import strapi from '../../utils/strapi'
import Work from '../../components/core/models/work'
import { actions as pageActions, mutations as pageMutations } from './page'
import { actions as elementActions, mutations as elementMutations } from './element'
import { actions as workActions, mutations as workMutations } from './work'

const state = {
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null,
  editingElementEditorConfig: null
}

// getters
const getters = {}

// actions
const actions = {
  ...elementActions,
  ...pageActions,
  ...workActions
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
