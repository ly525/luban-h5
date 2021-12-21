const state = {
  viewScript_dialog: false,
  editScript_dialog: false,
  createScript_dialog: false,
  allScriptList_dialog: false,
  editDataSource: false,
  createDataSource: false
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  updateDialog (state, { type, value }) {
    state[type] = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
