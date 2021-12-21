// initial state
import Work from 'core/models/work'
import { actions as workActions, mutations as workMutations } from './work'

const state = {
  works: [],
  work: new Work(),
  formDetailOfWork: {
    uuidMap2Name: {},
    formRecords: []
  },
  workTemplates: [],
  total: {
    works: 0,
    templates: 0
  }
}

// getters
const getters = {}

// actions
const actions = {
  ...workActions
}

// mutations
const mutations = {
  ...workMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
