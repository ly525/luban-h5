import Vue from 'vue'

export function getEditorConfigForEditingElement (elementName) {
  const Ctor = Vue.component(elementName)
  // TODO 为何直接 return new Ctor() 并将其赋值给 vuex 的 state 会报错：Cannot convert a Symbol value to a string
  return new Ctor().$options.editorConfig
}

const styleKey = 'commonStyle'
export function swapZindex (x, y) {
  const tmp = y[styleKey].zindex
  y[styleKey].zindex = x[styleKey].zindex
  x[styleKey].zindex = tmp
}
