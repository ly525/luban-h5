import Work from '../../components/core/models/work'

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  saveWork ({ commit, state }, payload = {}) {
    // save work with api
  }
}

// mutations
export const mutations = {
  createWork (state) {
    state.work = new Work()
  },
  previewWork (state, { type, value }) {},
  deployWork (state, { type, value }) {}
}
