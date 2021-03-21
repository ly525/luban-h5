import strapi from '@/utils/strapi'
import { AxiosWrapper } from '../../../../utils/http.js'

export const actions = {
  fetchScripts ({ commit, dispatch, state }, payload = { _limit: 100 }) {
    return new AxiosWrapper({
      dispatch,
      commit,
      name: 'editor/setScripts',
      loading_name: 'fetchScripts_loading',
      successMsg: '获取装备(脚本)列表成功',
      customRequest: strapi.getEntries.bind(strapi)
    }).get('scripts', payload)
  }
}

// mutations
export const mutations = {
  /**
   * payload: {
   *  type:   @params {String} "editor/setScripts",
   *  value:  @params {Array}  work list
   * }
   */
  setScripts (state, { type, value }) {
    // value.sort((a, b) => b.id - a.id)
    state.scripts = value
  }
}
