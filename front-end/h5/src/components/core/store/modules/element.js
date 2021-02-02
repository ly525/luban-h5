import Element from 'core/models/element'
import { swapZindex, getVM } from '@/utils/element'

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
  },
  pesaListElementChangeAttr ({ commit }, payload) {
    commit('pesaListElementChangeAttr', payload)
  },
  pesaListElementChangeAttrPpti ({ commit }, payload) {
    commit('pesaListElementChangeAttrPpti', payload)
  },
  pesaListElementRowDragDrog ({ commit }, payload) {
    commit('pesaListElementRowDragDrog', payload)
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
    const pesaList = editingPage.slidePresentation.pesaList
    const pesaListLength = pesaList.length
    const len = elements.length

    switch (type) {
      case 'add':
        const vm = getVM(value.name)
        vm.$options.shortcutProps = value.shortcutProps
        // 用于拖拽结束，确定最终放置的位置
        vm.$options.dragStyle = value.dragStyle // {left: Number, top: Number}
        const element = new Element(vm.$options)
        elements.push(element)
        let pluginPropsText = element['pluginProps']['text']
        if (pluginPropsText) {
          pluginPropsText = pluginPropsText.replace(/<[^>]*>|/g, '')
          if (pluginPropsText.length > 10) {
            pluginPropsText = pluginPropsText.substring(0, 8) + '...'
          }
        } else {
          pluginPropsText = ''
        }
        let pesaListOf1 = {}
        pesaListOf1.ptn = element['name'].replace('lbp-', '')
        pesaListOf1.uuid = element['pluginProps']['uuid']
        pesaListOf1.ci = 0 // count integer (index)
        pesaListOf1.ppti = pluginPropsText
        pesaListOf1.csosn = 0
        pesaListOf1.csosne = 0
        pesaListOf1.pse = 1
        pesaListOf1.ste = 0
        pesaListOf1.de = 0
        pesaList.push(pesaListOf1)
        break
      case 'copy':
        let editingElementClone = state.editingElement.clone({ zindex: len + 1 })
        let pluginPropsTextClone = editingElementClone['pluginProps']['text']
        if (pluginPropsTextClone) {
          pluginPropsTextClone = pluginPropsTextClone.replace(/<[^>]*>|/g, '')
          if (pluginPropsTextClone.length > 10) {
            pluginPropsTextClone = pluginPropsTextClone.substring(0, 8) + '...'
          }
        } else {
          pluginPropsTextClone = ''
        }
        let pesaListOf2 = {}
        pesaListOf2.ptn = editingElementClone['name'].replace('lbp-', '')
        pesaListOf2.uuid = editingElementClone['pluginProps']['uuid']
        pesaListOf2.ci = 0
        pesaListOf2.ppti = pluginPropsTextClone
        pesaListOf2.csosn = 0
        pesaListOf2.csosne = 0
        pesaListOf2.pse = 1
        pesaListOf2.ste = 0
        pesaListOf2.de = 0
        pesaList.push(pesaListOf2)
        elements.push(editingElementClone)
        break
      case 'delete':
        {
          const index = elements.findIndex(e => e.uuid === editingElement.uuid)
          const indexPesaList = pesaList.findIndex(e => e.uuid === editingElement.uuid)
          if (index !== -1) {
            state.editingPage.elements.splice(index, 1)
            let deleteCsosn = state.editingPage.slidePresentation.pesaList[indexPesaList]['csosn']
            if (deleteCsosn > 0) {
              for (let i = 0; i < pesaListLength; i++) {
                let csosn = state.editingPage.slidePresentation.pesaList[i]['csosn']
                if (csosn > deleteCsosn) {
                  state.editingPage.slidePresentation.pesaList[i].csosn = csosn - 1
                }
              }
            }
            state.editingPage.slidePresentation.pesaList.splice(indexPesaList, 1)
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

  },
  pesaListElementChangeAttr (state, payload) { // wmhz add  pesa List Element Change attribute
    const { editingPage } = state // editingElement
    const pesaList = editingPage.slidePresentation.pesaList
    const pesaListLength = pesaList.length
    const indexPesaList = pesaList.findIndex(e => e.uuid === payload.elementUuid)
    switch (payload.elementAttrName) {
      case 'csosne':
        let beforeCsosn = state.editingPage.slidePresentation.pesaList[indexPesaList].csosn
        state.editingPage.slidePresentation.pesaList[indexPesaList].csosne = payload.elementAttrValue === 1 ? 0 : 1
        if (payload.elementAttrValue === 1) {
          state.editingPage.slidePresentation.pesaList[indexPesaList].csosn = 0
          for (let i = 0; i < pesaListLength; i++) {
            let csosn = pesaList[i]['csosn']
            if (csosn > 0 && csosn > beforeCsosn) {
              state.editingPage.slidePresentation.pesaList[i].csosn = csosn - 1
            }
          }
        } else {
          let csosn1Length = 0
          for (let item in pesaList) {
            if (pesaList[item].csosn > 0) {
              csosn1Length++
            }
          }
          state.editingPage.slidePresentation.pesaList[indexPesaList].csosn = csosn1Length + 1
          state.editingPage.slidePresentation.pesaList[indexPesaList].pse = 1
        }
        break
      case 'pse':
        let beforeCsosne = state.editingPage.slidePresentation.pesaList[indexPesaList].csosne
        if (beforeCsosne === 0) {
          state.editingPage.slidePresentation.pesaList[indexPesaList].pse = payload.elementAttrValue === 1 ? 0 : 1
        }
        if (beforeCsosne === 1 && payload.elementAttrValue === 0) {
          state.editingPage.slidePresentation.pesaList[indexPesaList].pse = 1
        }
        break
      case 'ste':
        state.editingPage.slidePresentation.pesaList[indexPesaList].ste = payload.elementAttrValue === 1 ? 0 : 1
        break
      case 'de':
        state.editingPage.slidePresentation.pesaList[indexPesaList].de = payload.elementAttrValue === 1 ? 0 : 1
        break
    }
  },
  pesaListElementChangeAttrPpti (state, payload) {
    const { editingPage } = state
    const pesaList = editingPage.slidePresentation.pesaList
    const indexPesaList = pesaList.findIndex(e => e.uuid === payload.recordValue.uuid)
    let pptiValueNew = payload.pptiValue.length < 50 ? payload.pptiValue : payload.pptiValue.substring(0, 50) + '...'
    state.editingPage.slidePresentation.pesaList[indexPesaList].ppti = pptiValueNew
  },
  pesaListElementRowDragDrog (state, rowDragDrogPayload) {
    const { editingPage } = state
    const pesaList = editingPage.slidePresentation.pesaList
    const pesaListLength = pesaList.length
    const indexSourceRow = pesaList.findIndex(e => e.uuid + '' === rowDragDrogPayload.sourceRowUuid + '')
    const indexTargetRow = pesaList.findIndex(e => e.uuid + '' === rowDragDrogPayload.targetRowUuid + '')
    let sourceRowCsosn = rowDragDrogPayload.sourceRowCsosn
    let targetRowCsosn = rowDragDrogPayload.targetRowCsosn
    for (let i = 0; i < pesaListLength; i++) {
      let csosn = pesaList[i]['csosn']
      if (csosn > 0) {
        if (sourceRowCsosn > targetRowCsosn) {
          if (csosn > (targetRowCsosn - 1) && csosn < sourceRowCsosn) {
            state.editingPage.slidePresentation.pesaList[i].csosn = csosn + 1
          }
        }
        if (sourceRowCsosn < targetRowCsosn) {
          if (csosn > sourceRowCsosn && csosn < targetRowCsosn + 1) {
            state.editingPage.slidePresentation.pesaList[i].csosn = csosn - 1
          }
        }
     }
    }
    state.editingPage.slidePresentation.pesaList[indexSourceRow].csosn = targetRowCsosn
  }
}
