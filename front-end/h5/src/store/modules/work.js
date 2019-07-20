import Work from '../../components/core/models/work'
import strapi from '../../utils/strapi'

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  saveWork ({ commit, state }, payload = {}) {
    // save work with strapi
    strapi.createEntry('works', state.work)
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
