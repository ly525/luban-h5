// actions
export const actions = {
  updateScaleRate ({ commit }, payload) {
    commit('updateScaleRate', payload)
  }
}

// mutations
export const mutations = {
  /**
   *
   * @param {*} state
   * @param {Number} scaleRateDiff 放大: 0.25, 缩小: -0.25
   */
  updateScaleRate (state, scaleRateDiff) {
    state.scaleRate += scaleRateDiff
  }
}
