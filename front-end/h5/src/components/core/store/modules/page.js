/*
 * @Author: ly525
 * @Date: 2019-12-08 17:05:09
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:34:28
 * @FilePath: /luban-h5/front-end/h5/src/store/modules/page.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: page module
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import { message } from 'ant-design-vue'

import Page from 'core/models/page'

// actions
export const actions = {
  setEditingPage ({ commit }, pageIndex = 0) {
    commit('setEditingPage', pageIndex)
  },
  pageManager ({ commit }, payload) {
    commit('pageManager', payload)
  }
}

// mutations
export const mutations = {
  setEditingPage (state, pageIndex = 0) {
    state.editingPage = state.work.pages[pageIndex]
  },
  pageManager (state, { type, value }) {
    switch (type) {
      case 'editTitle':
        const { pageIndexForEditingTitle, newTitle } = value
        state.work.pages[pageIndexForEditingTitle].title = newTitle
        break
      case 'add':
        const page = new Page(value)
        state.work.pages.push(page)
        break
      case 'copy':
        state.work.pages.push(state.editingPage.clone())
        break
      case 'delete':
        if (state.work.pages.length === 1) {
          // #!zh: 作品中至少需要保留一个页面
          // #!en: At least one page needs to be kept in the work
          message.info(`作品中至少需要保留一个页面`)
          return
        }

        const { work, editingPage } = state
        let index = work.pages.findIndex(page => page.uuid === editingPage.uuid)
        if (index !== -1) {
          let newPages = work.pages.slice()
          newPages.splice(index, 1)
          state.work.pages = newPages
        }
        break
      default:
    }
  }
}
