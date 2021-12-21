import Element from 'core/models/element'
import { swapZindex, getVM } from '@/utils/element'
import LocalPreferences, { IS_CONFIRM_BEFORE_DELETE_ELEMENT } from 'core/editor/left-panel/preferences/local-preferences.js'
import { Modal } from 'ant-design-vue'
import i18n from '@/locales'

// actions
export const actions = {
  setEditingElement ({ commit }, payload) {
    commit('setEditingElement', payload)
    payload && window.EditorApp.$emit('setEditingElement', payload)
  },
  setElementPosition ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  setElementShape ({ commit }, payload) {
    commit('setElementCommonStyle', payload)
  },
  recordElementRect ({ commit }, payload = {}) {
    commit('recordRect', payload)
  },
  elementManager ({ commit }, payload) {
    commit('elementManager', payload)
  }
}

const confirmDelete = () => new Promise((resolve, reject) => {
  if (LocalPreferences.get(IS_CONFIRM_BEFORE_DELETE_ELEMENT)) {
    Modal.confirm({
      title: i18n.t('workCard.confirmDeleteTip', { tip: `` }),
      onOk: (close) => {
        resolve()
        close()
      }
    })
    return
  }
  resolve()
})

// mutations
export const mutations = {
  setEditingElement (state, payload) {
    state.editingElement = payload
  },
  setElementCommonStyle (state, payload) {
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...payload
    }
  },
  /**
   * 元素管理：增/删/复制/上移/下移
   * @param {*} state
   * @param {*} {
   *  type:  add/copy/delete/move2Top/move2Bottom 增/删/复制/上移/下移
   *  value(elementShortcutConfig) 左侧元素列表中元素对应的配置，主要包含：
   *   - shortcutProps：默认Props，比如一个Chart是饼图、折线图、漏斗图，可以通过此指定
   *   - dragStyle：用于拖拽结束，确定最终放置的位置, // {left: Number, top: Number}
   * }
   */
  elementManager (state, { type, value }) {
    const elementShortcutConfig = value
    const { editingPage, editingElement } = state
    const elements = editingPage.elements
    const len = elements.length

    switch (type) {
      case 'add':
        const vm = getVM(value.name)
        const basicElement = vm.$options
        const element = new Element({
          ...basicElement,
          ...elementShortcutConfig,
          zindex: len + 1
        })
        elements.push(element)
        break
      case 'copy':
        elements.push(state.editingElement.clone({ zindex: len + 1 }))
        break
      case 'delete':
        {
          const index = elements.findIndex(e => e.uuid === editingElement.uuid)
          if (index !== -1) {
            confirmDelete().then(() => {
              state.editingPage.elements.splice(index, 1)
            })
          }
          state.editingElement = null
        }
        break
      case 'move2Top':
      case 'move2Bottom':
        {
          const index = elements.findIndex(e => e.uuid === editingElement.uuid)
          elements.splice(index, 1)
          const newElements = type === 'move2Top' ? [...elements, editingElement] : [editingElement, ...elements]
          newElements.forEach((ele, i, arr) => {
            ele.commonStyle.zindex = i + 1
          })
          state.editingPage.elements = newElements
        }
        break
      case 'addZindex':
      case 'minusZindex':
        const maxZindex = elements.length
        const eleZindex = editingElement.commonStyle.zindex
        if (eleZindex === maxZindex || eleZindex === 1) return

        const flag = type === 'addZindex' ? 1 : -1
        const swapElement = elements.find(ele => ele.commonStyle.zindex === eleZindex + flag * 1)
        swapZindex(editingElement, swapElement)
        break
      default:
    }
  },
  recordRect (state, { type, value }) {

  }
}
