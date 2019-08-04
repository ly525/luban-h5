import Element from '../../components/core/models/element'
import strapi from '../../utils/strapi'
import Page from '../../components/core/models/page'
import { AxiosWrapper } from '../../utils/http.js'
import router from '@/router.js'

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  createWork ({ commit }, payload) {
    strapi.createEntry('works').then(entry => {
      router.replace({ name: 'editor', params: { workId: entry.id } })
      // window.location = `${window.location.origin}/#/editor/${entry.id}`
    })
    // commit('createWork')
    // commit('pageManager', { type: 'add' })
    // commit('setEditingPage')
  },
  updateWork ({ commit, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }
    commit('setWork', work)
  },
  saveWork ({ commit, dispatch, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }

    new AxiosWrapper({
      dispatch,
      loading_name: 'saveWork_loading',
      successMsg: '保存作品成功',
      customRequest: strapi.updateEntry.bind(strapi)
    }).put('works', state.work.id, work)
  },
  fetchWork ({ commit, state }, workId) {
    strapi.getEntry('works', workId).then(entry => {
      commit('setWork', entry)
      commit('setEditingPage')
    })
  },
  fetchWorks ({ commit, state }, workId) {
    strapi.getEntries('works', {}).then(entries => {
      commit('setWorks', entries)
    })
  }
}

// mutations
export const mutations = {
  setWorks (state, works) {
    state.works = works
  },
  setWork (state, work) {
    work.pages = work.pages.map(page => {
      page.elements = page.elements.map(element => new Element(element))
      return new Page(page)
    })
    state.work = work
  },
  // createWork (state) {
  //   state.work = new Work()
  // },
  previewWork (state, { type, value }) {},
  deployWork (state, { type, value }) {}
}
