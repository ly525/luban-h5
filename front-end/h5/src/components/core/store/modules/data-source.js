import strapi from '@/utils/strapi'
import Page from 'core/models/page'
import Element from 'core/models/element'
import Datasource from 'core/models/data-source'
import { AxiosWrapper } from '@/utils/http.js'

export const actions = {
  dataSourceManager ({ commit }, payload) {
    commit('dataSourceManager', payload)
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
  setDatasource (state, dataSource) {
    window.__work = dataSource
    dataSource.pages = dataSource.pages.map(page => {
      page.elements = page.elements.map(element => new Element(element))
      return new Page(page)
    })
    state.dataSource = new Datasource(dataSource)
  },
  dataSourceManager (state, { type, value }) {
    const dataSource = value

    function collectRelatedDataSource () {
      (dataSource.dependencies || []).forEach(dependency => {
        const ds = state.dataSource.datasources.find(ds => ds.name === dependency)
        if (ds) {
          ds.relatedDsList.push(dataSource.name)
        }
      })
    }

    switch (type) {
      case 'editTitle':
        const { pageIndexForEditingTitle, newTitle } = value
        state.dataSource.datasources[pageIndexForEditingTitle].title = newTitle
        break
      case 'add':
        collectRelatedDataSource()
        state.dataSource.datasources.push({
          ...dataSource
        })
        break
      case 'copy':
        state.dataSource.datasources.push(state.editingPage.clone())
        break
      case 'delete':
        let index = dataSource.datasources.findIndex(ds => ds.name === dataSource.name)
        if (index !== -1) {
          dataSource.datasources.splice(index, 1)
        }
        break
      default:
    }
  }
}
