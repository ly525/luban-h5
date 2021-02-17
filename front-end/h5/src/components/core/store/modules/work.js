import Element from 'core/models/element'
import strapi from '@/utils/strapi'
import Page from 'core/models/page'
import Work from 'core/models/work'
import { AxiosWrapper } from '@/utils/http.js'
// import router from '@/router.js'
import { takeScreenshot } from '@/utils/canvas-helper.js'

function setLoading (commit, loadingName, isLoading) {
  commit('loading/update', { type: loadingName, payload: isLoading }, { root: true })
}

export const actions = {
  previewWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  deployWork ({ commit }, payload = {}) {
    commit('previewWork', payload)
  },
  updateWork ({ commit, state }, payload = {}) {
    // update work with strapi
    const work = {
      ...state.work,
      ...payload
    }
    commit('setWork', work)
  },
  /**
   * isSaveCover {Boolean} 保存作品时，是否保存封面图
   * loadingName {String} saveWork_loading, previewWork_loading
   * 预览作品之前需要先保存，但希望 用户点击保存按钮 和 点击预览按钮 loading_name 能够不同（虽然都调用了 saveWork）
   * 因为 loading 效果要放在不同的按钮上
   */
  saveWork ({ commit, dispatch, state }, { isSaveCover = false, loadingName = 'saveWork_loading', successMsg = '保存作品成功' } = {}) {
    const fn = (callback) => {
      new AxiosWrapper({
        dispatch,
        commit,
        loading_name: loadingName,
        successMsg,
        customRequest: strapi.updateEntry.bind(strapi)
      }).put('works', state.work.id, state.work).then(callback)
    }
    return new Promise((resolve, reject) => {
      if (isSaveCover) {
        setLoading(commit, 'uploadWorkCover_loading', true)
        takeScreenshot().then(file => {
          dispatch('uploadCover', { file }).then(() => {
            setLoading(commit, 'uploadWorkCover_loading', false)
            fn(resolve)
          }) // uploadCover
        }) // takeScreenshot
      } else {
        fn(resolve)
      }
    })
  },
  fetchWork ({ commit, state }, workId) {
    return strapi.getEntry('works', workId).then(entry => {
      commit('setWork', entry)
      commit('setEditingPage')
    })
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
  uploadCover ({ commit, state, dispatch }, { file } = {}) {
    const formData = new FormData()
    formData.append('files', file, `${+new Date()}.png`)
    formData.append('workId', state.work.id)
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setWorkCover',
      loading_name: 'uploadWorkCover_loading',
      successMsg: '上传封面图成功!'
    // }).post(`/works/uploadCover/${state.work.id}`, formData)
    }).post(`/upload/`, formData)
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
