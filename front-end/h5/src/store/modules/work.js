import Element from '../../components/core/models/element'
import strapi from '../../utils/strapi'
import Page from '../../components/core/models/page'
import Work from '../../components/core/models/work'
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
    strapi.createEntry('works', new Work()).then(entry => {
      commit('setWork', entry)
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

    return new AxiosWrapper({
      dispatch,
      commit,
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
  fetchWorks ({ commit, dispatch, state }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorks',
      loading_name: 'fetchWorks_loading',
      successMsg: '获取作品列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works', { is_template: false })
  },
  fetchWorkTemplates ({ commit, dispatch, state }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorkTemplates',
      loading_name: 'fetchWorkTemplates_loading',
      successMsg: '获取模板列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works', { is_template: true })
  },
  /**
   *
   * @param {*} workId
   * response demo:
   {
    "uuidMap2Name": {
        "1565596393441": "姓名",
        "1565596397671": "学校"
    },
    "formDetails": [
        {
            "id": 3,
            "form": {
                "1565369322603": "abc"
            },
            "work": 8,
            "created_at": "2019-08-09T16:52:28.826Z",
            "updated_at": "2019-08-09T16:52:28.832Z"
        },
        {
            "id": 4,
            "form": {
                "1565595388440": "ddd"
            },
            "work": 8,
            "created_at": "2019-08-11T07:36:54.521Z",
            "updated_at": "2019-08-11T07:36:54.526Z"
        },
        {
            "id": 5,
            "form": {
                "1565595388440": "acd"
            },
            "work": 8,
            "created_at": "2019-08-11T07:45:22.000Z",
            "updated_at": "2019-08-11T07:45:22.005Z"
        },
        {
            "id": 6,
            "form": {
                "1565596393441": "b",
                "1565596397671": "a"
            },
            "work": 8,
            "created_at": "2019-08-11T07:59:00.938Z",
            "updated_at": "2019-08-11T07:59:00.943Z"
        },
        {
            "id": 7,
            "form": {
                "1565596393441": "b",
                "1565596397671": "a"
            },
            "work": 8,
            "created_at": "2019-08-11T07:59:37.065Z",
            "updated_at": "2019-08-11T07:59:37.070Z"
        }
      ]
    }
   */
  fetchFormsOfWork ({ commit, state, dispatch }, workId) {
    // TODO 考虑 return Promise
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/formDetailOfWork',
      loading_name: 'queryFormsOfWork_loading',
      successMsg: '表单查询完毕'
    }).get(`/works/form/query/${workId}`)
  },
  setWorkAsTemplate ({ commit, state, dispatch }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      // name: 'editor/formDetailOfWork',
      loading_name: 'setWorkAsTemplate_loading',
      successMsg: '设置为模板成功'
    }).post(`/works/set-as-template/${workId || state.work.id}`)
  },
  useTemplate ({ commit, state, dispatch }, workId) {
    return new AxiosWrapper({
      dispatch,
      commit,
      // name: 'editor/formDetailOfWork',
      loading_name: 'useTemplate_loading',
      successMsg: '使用模板成功'
    }).post(`/works/use-template/${workId}`)
  }
}

// mutations
export const mutations = {
  /**
   * payload: {
   *  type:   @params {String} "editor/setWorks",
   *  value:  @params {Array}  work list
   * }
   */
  setWorks (state, { type, value }) {
    value.sort((a, b) => b.id - a.id)
    state.works = value
  },
  /**
   * payload: {
   *  type:   @params {String} "editor/setWorks",
   *  value:  @params {Array}  work list
   * }
   */
  setWorkTemplates (state, { type, value }) {
    value.sort((a, b) => b.id - a.id)
    state.workTemplates = value
  },
  setWork (state, work) {
    window.__work = work
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
  deployWork (state, { type, value }) {},
  formDetailOfWork (state, { type, value }) {
    state.formDetailOfWork = value
  }
}
