import strapi from '@/utils/strapi'
import Element from 'core/models/element'
import Page from 'core/models/page'
import Work from 'core/models/work'
import { AxiosWrapper, handleError } from '@/utils/http.js'
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
      const routeData = router.resolve({ name: 'editor', params: { workId: entry.id } })
      window.open(routeData.href, '_blank')
      // 如果希望不打开新 tab，可以注释上面面两行，启用下面一行的代码即可，不过不推荐。将编辑器单独起一个页面更有利于 vuex 的数据管理
      // router.replace({ name: 'editor', params: { workId: entry.id } })
    }).catch(handleError)
  },
  deleteWork ({ commit, dispatch, state }, workId) {
    return new AxiosWrapper({
      dispatch,
      commit,
      loading_name: 'deleteWork_loading',
      successMsg: '删除作品成功',
      customRequest: strapi.deleteEntry.bind(strapi)
    }).delete('works', workId).catch(handleError)
  },
  updateWork ({ commit, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }
    commit('setWork', work)
  },
  fetchWork ({ commit, state }, workId) {
    return strapi.getEntry('works', workId).then(entry => {
      commit('setWork', entry)
      commit('setEditingPage')
    }).catch(handleError)
  },
  fetchCount ({ commit, dispatch, state }, payload = { is_template: false }) {
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorksTotal',
      actionPayloadExtra: {
        isTemplate: payload.is_template
      },
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works/count', payload).catch(handleError)
  },
  fetchWorks ({ commit, dispatch, state }, payload = { is_template: false, _limit: 10 }) {
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorks',
      loading_name: 'fetchWorks_loading',
      successMsg: '获取作品列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works', payload).catch(handleError)
  },
  fetchWorksWithForms ({ commit, dispatch, state }, workId) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorks',
      loading_name: 'fetchWorks_loading',
      successMsg: '获取作品表单列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works/has-forms', { is_template: false }).catch(handleError)
  },
  fetchWorkTemplates ({ commit, dispatch, state }, payload = { is_template: true, _limit: 10 }) {
    new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorkTemplates',
      loading_name: 'fetchWorkTemplates_loading',
      successMsg: '获取模板列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('works', payload).catch(handleError)
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
    "formRecords": [
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
    // 可以 return Promise
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
   *
   * @param {*} state
   * @param {Object} payload
   *
    value example: [
      {
        "id": 1,
        "name": "1567769149231.png",
        "hash": "1660b11229e7473b90f99a9f9afe7675",
        "sha256": "lKl7f_csUAgOjf0VRYkBZ64EcTjvt4Dt4beNIhELpTU",
        "ext": ".png",
        "mime": "image/png",
        "size": "6.57",
        "url": "/uploads/1660b11229e7473b90f99a9f9afe7675.png",
        "provider": "local",
        "public_id": null,
        "created_at": "2019-09-06T11:25:49.255Z",
        "updated_at": "2019-09-06T11:25:49.261Z",
        "related": []
      }
    ]
   */
  setWorkCover (state, { type, value }) {
    const [cover] = value
    state.work.cover_image_url = cover.url
  },
  setWorksTotal (state, { type, value, ...other }) {
    const { isTemplate } = other
    state.total[isTemplate ? 'templates' : 'works'] = value
  },
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
    state.work = new Work(work)
  },
  previewWork (state, { type, value }) {},
  deployWork (state, { type, value }) {},
  formDetailOfWork (state, { type, value }) {
    state.formDetailOfWork = value
  }
}
