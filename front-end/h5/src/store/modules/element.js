import Element from '../../components/core/models/element'
import { getEditorConfigForEditingElement, swapZindex, getVM } from '../../utils/element'

// actions
export const actions = {
  setEditingElement ({ commit }, payload) {
    commit('setEditingElement', payload)

    const vm = (payload && payload.name) ? getEditorConfigForEditingElement(payload.name) : null
    commit('setEditingElementEditorConfig', vm)
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

// mutations
export const mutations = {
  setEditingElement (state, payload) {
    state.editingElement = payload
  },
  setEditingElementEditorConfig (state, payload) {
    state.editingElementEditorConfig = payload
  },
  setElementCommonStyle (state, payload) {
    state.editingElement.commonStyle = {
      ...state.editingElement.commonStyle,
      ...payload
    }
  },
  elementManager (state, { type, value }) {
    const { editingPage, editingElement } = state
    const elements = editingPage.elements
    const len = elements.length

    switch (type) {
      case 'add':
        // value.name => pluginName
        const { name } = value
        const vm = getVM(value.name)
        const props = vm.$options.props
        value = {
          ...value,
          zindex: len + 1
        }
        const element = new Element({ name, editorConfig: props })
        elements.push(element)
        break
      case 'copy':
        elements.push(state.editingElement.clone({ zindex: len + 1 }))
        break
      case 'delete':
        {
          const index = elements.findIndex(e => e.uuid === editingElement.uuid)
          if (index !== -1) {
            // let newElements = elements.slice()
            // newElements.splice(index, 1)
            // state.editingPage.elements = newElements
            state.editingPage.elements.splice(index, 1)
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
