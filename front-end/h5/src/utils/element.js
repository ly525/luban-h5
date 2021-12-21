import Vue from 'vue'

const DESIGN_DRAFT_WIDTH = 320
const styleKey = 'commonStyle'

/**
 *

 * 获取组件中的 「componentsForPropsEditor」对象
 * @param {String} elementName
 *
 * 可以查看下面的组件 Demo
 {
  name: 'lbp-button',
  props: {
    color: {
      default: 'red',
      editor: {
        type: 'custom-color-editor'
      }
    }
  },
  componentsForPropsEditor: {
    'custom-color-editor': {
      render() {
        return <input type="color" />
      }
    }
  }
 }
 */
export function getComponentsForPropsEditor (elementName) {
  const Ctor = Vue.component(elementName)
  // TODO 为何直接 return new Ctor() 并将其赋值给 vuex 的 state 会报错：Cannot convert a Symbol value to a string
  return new Ctor().$options.componentsForPropsEditor
}

export function getVM (pluginName) {
  const Ctor = Vue.component(pluginName)
  return new Ctor()
}

export function swapZindex (x, y) {
  const tmp = y[styleKey].zindex
  y[styleKey].zindex = x[styleKey].zindex
  x[styleKey].zindex = tmp
}

/**
 * !#zh 将 px 转换为 rem
 * @param {Number} px
 */
function px2Rem (px) {
  const number = Math.pow(10, 6)
  const val = (px / (DESIGN_DRAFT_WIDTH / 10)) * number
  const rem = Math.round(val) / number + 'rem'
  return rem
}

/**
 *
 * @param {Number} px 元素的某个属性的像素值，比如 height
 * @param {Boolean} isToRem 是否将 px 转换为 rem
 */
export function parsePx (px, isRem = false) {
  if (isRem) return px2Rem(px)
  return `${px}px`
}

export const genUUID = () => {
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Generate four random hex digits.
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
export function guid () {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
