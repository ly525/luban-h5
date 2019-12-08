/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2019-12-08 17:21:48
 * @FilePath: /luban-h5/front-end/h5/src/store/modules/loading.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: loading module
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
// initial state
const state = {
  saveWork_loading: false,
  previewWork_loading: false,
  fetchWorks_loading: false,
  setWorkAsTemplate_loading: false,
  fetchWorkTemplates_loading: false,
  useTemplate_loading: false,
  uploadWorkCover_loading: false
}

// getters
const getters = {

}

// actions
const actions = {
  update ({ commit }, payload) {
    commit('update', payload)
  }
}

// mutations
const mutations = {
  update (state, { type, payload }) {
    state[type] = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
