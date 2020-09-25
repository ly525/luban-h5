// import _ from
import Element from '../../components/core/models/element'
import { swapZindex, getVM } from '../../utils/element'

/**
 *
 * @param {ArrayTree} array
 * @param {*} uuid
 */
function pruneFn (key) {
  return function prune (array, value) {
    for (var i = 0; i < array.length; ++i) {
      var obj = array[i]
      if (obj[key] === value) {
        // splice out 1 element starting at position i
        array.splice(i, 1)
        return
      }
      prune(obj.children, value)
    }
  }
}

const prune = pruneFn('uuid')

// const search = (tree, target) => {
//   if (tree.uuid === target) {
//     return tree
//   }

//   for (const child of tree.child) {
//     const res = search(child, target)
//     if (res) return res
//   }
// }
// actions
export const actions = {
  setEditingElement ({ commit }, payload) {
    commit('setEditingElement', payload)
    payload && window.getEditorApp.$emit('setEditingElement', payload)
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
        const vm = getVM(value.name)
        vm.$options.shortcutProps = value.shortcutProps
        // 用于拖拽结束，确定最终放置的位置
        vm.$options.dragStyle = value.dragStyle // {left: Number, top: Number}
        const element = new Element(vm.$options)
        if (value.isChild) {
          // editingElement = search(this.editingPage.elements, editingElement.uuid)
          editingElement.children.push(element)
        } else {
          elements.push(element)
        }
        break
      case 'copy':
        elements.push(state.editingElement.clone({ zindex: len + 1 }))
        break
      case 'delete':
        {
          const editingUUID = state.editingElement.uuid
          prune(state.editingPage.elements, editingUUID)
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
