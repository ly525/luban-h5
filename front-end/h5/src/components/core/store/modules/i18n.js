import { loadLanguageAsync } from '@/locales'

const i18n = {
  namespaced: true,
  state: {
    lang: 'zh-CN'
  },
  mutations: {
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },
  actions: {
    // 设置界面语言
    SetLang ({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default i18n
