import Vue from 'vue'
import strapi from '@/utils/strapi'
import Page from 'core/models/page'
import Element from 'core/models/element'
import Datasource from 'core/models/data-source'
import { AxiosWrapper } from '@/utils/http.js'

export const LuBanDC = Vue.observable({ DC: {} })

export const actions = {
  async dataSourceManager ({ commit, dispatch, state }, { type, value }) {
    const dataSourceOrigin = value

    function collectRelatedDataSource () {
      (dataSourceOrigin.dependencies || []).forEach(dependency => {
        const ds = state.work.datasources.find(ds => ds.name === dependency)
        if (ds) {
          if (ds.relatedDsList.indexOf(dataSourceOrigin.name)) return
          ds.relatedDsList.push(dataSourceOrigin.name)
        }
      })
    }

    function updateDs(ds) {
      const targetDsIdx = state.work.datasources.findIndex(item => item.id === ds.id)
      state.work.datasources.splice(targetDsIdx, 1, new Datasource(ds))
    }

    switch (type) {
      case 'editTitle':
        const { pageIndexForEditingTitle, newTitle } = value
        state.work.datasources[pageIndexForEditingTitle].title = newTitle
        break
      case 'edit':
        {
          collectRelatedDataSource()
          const dsWithId = await strapi.updateEntry('datasources', dataSourceOrigin.id, dataSourceOrigin)
          updateDs(dsWithId)
          break
        }
      case 'add':
        collectRelatedDataSource()
        const dsWithId = await strapi.createEntry('datasources', dataSourceOrigin)
        state.work.datasources.push(new Datasource(dsWithId))
        break
      case 'copy':
        state.work.datasources.push(state.editingPage.clone())
        break
      case 'delete':
        let index = state.work.datasources.findIndex(ds => ds.name === dataSourceOrigin.name)
        if (index !== -1) {
          state.work.datasources.splice(index, 1)
        }
        break
      default:
    }
  },
  saveDatasource ({ commit, dispatch, state }, { isSaveCover = false, loadingName = 'saveDatasource_loading', successMsg = '保存数据源' } = {}) {
      return new AxiosWrapper({
        dispatch,
        commit,
        loading_name: loadingName,
        successMsg,
        customRequest: strapi.updateEntry.bind(strapi)
      }).put('datasources', state.dataSource.id, state.dataSource)
  },
  createDatasource ({ commit, dispatch, state }, payload) {
      return new AxiosWrapper({
        dispatch,
        commit,
        successMsg: '创建成功',
        customRequest: strapi.createEntry('datasources')
      }).post('datasources', payload)
  },
  fetchDatasources ({ commit, dispatch, state }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setDatasources',
      loading_name: 'fetchDatasources_loading',
      successMsg: '获取数据源成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('datasources', { is_template: false })
  }
}

// mutations
export const mutations = {
  /**
   * updateDataCenter 更新数据中心
   * @param {*} state
   * @param {*} payload
   */
  updateDC (state, payload) {
    LuBanDC.DC = {
      ...LuBanDC.DC,
      ...payload
    }
  },
  setDatasource (state, dataSource) {
    window.__work = dataSource
    dataSource.pages = dataSource.pages.map(page => {
      page.elements = page.elements.map(element => new Element(element))
      return new Page(page)
    })
    state.dataSource = new Datasource(dataSource)
  },

}
