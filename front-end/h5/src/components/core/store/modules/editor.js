// initial state
import Work from 'core/models/work'
import { actions as canvasActions, mutations as canvasMutations } from './canvas'
import { actions as pageActions, mutations as pageMutations } from './page'
import { actions as elementActions, mutations as elementMutations } from './element'
import { actions as workActions, mutations as workMutations } from './work'
import { actions as dataSourceActions, mutations as dataSourceMutations } from './data-source'
import { actions as scriptActions, mutations as scriptMutations } from './script'

const state = {
  works: [],
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null,
  formDetailOfWork: {
    uuidMap2Name: {},
    formRecords: []
  },
  workTemplates: [],
  scaleRate: 1,
  scripts: []
}

// getters
const getters = {}

// actions
const actions = {
  ...elementActions,
  ...pageActions,
  ...workActions,
  ...canvasActions,
  ...scriptActions,
  ...dataSourceActions
}

// mutations
const mutations = {
  ...elementMutations,
  ...pageMutations,
  ...workMutations,
  ...canvasMutations,
  ...scriptMutations,
  ...dataSourceMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
