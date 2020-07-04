/*
 * @Author: ly525
 * @Date: 2020-05-17 17:21:04
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-24 18:09:23
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/drag-mixin.js
 * @Github: https://github.com/ly525/luban-h5
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 * @Description:
 *  组件拖拽至画布功能
 *  其中部分代码参考自：https://github.com/hakubox/haku-form-design，已经征得作者同意，目的是后续考虑做 tab 之类的嵌套容器
 */

let dragDom = null

let dragConfig = {
  isPreDrag: false, // 准备拖拽
  isDrag: false, // 正式拖拽
  origin: {
    clientY: 0, // 鼠标按下时候时候值
    clientX: 0,
    layerX: 0, // 鼠标.x 相对于元素左上角.left 的偏移
    layerY: 0 // 鼠标.y 相对于元素左上角.top  的偏移
  }
}

class Drag {
  constructor (options) {
    this.mousedown = options.mousedown
    this.mousemove = options.mousemove
    this.mouseup = options.mouseup

    this._mousedown = this._mousedown.bind(this)
    this._mousemove = this._mousemove.bind(this)
    this._mouseup = this._mouseup.bind(this)
  }

  start (e) {
    this._mousedown(e)
  }

  _mousedown (e) {
    this.mousedown(e)
    this.toggleListener('add')
  }

  _mousemove (e) {
    console.log('mousemove')
    this.mousemove(e)
  }

  _mouseup (e) {
    console.log('mouseup')
    this.mouseup(e)
    this.toggleListener('remove')
  }

  toggleListener (action) {
    document[`${action}EventListener`]('mousemove', this._mousemove)
    document[`${action}EventListener`]('mouseup', this._mouseup)
  }
}

export default {
  data () {
    return {

    }
  },
  methods: {
    /**
     *
     * @param {*} element
     * @param {*} e
     */
    handleDragStartFromMixin (element, e) {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/event.button
      // 0 为 左键点击.
      if (e.button !== 0) return
      if (dragDom) {
        document.body.removeChild(dragDom)
        dragDom = null
      }
      this.dragElement = element
      dragDom = e.target.cloneNode(true)
      document.body.appendChild(dragDom)

      new Drag({
        mousedown: this.mousedown,
        mousemove: this.mousemove,
        mouseup: this.mouseup
      }).start(e)
    },
    /**
     *
     * @param {*} e
     */
    mousedown (e) {
      // 鼠标.x 相对于元素左上角 的偏移
      const { layerX, layerY } = e
      dragConfig.origin.layerX = layerX
      dragConfig.origin.layerY = layerY
      dragConfig.origin.clientX = e.clientX
      dragConfig.origin.clientY = e.clientY

      dragDom.style.position = 'absolute'
      dragDom.style.left = e.clientX - layerX + 'px'
      dragDom.style.top = e.clientY - layerY + 'px'
      dragDom.classList.add('dragging-dom-ele', 'hidden')

      dragConfig.isPreDrag = true
    },
    /** 组件拖拽中 */
    mousemove (e) {
      dragDom.classList.remove('hidden')
      const { layerX, layerY } = dragConfig.origin
      dragDom.style.left = e.clientX - layerX + 'px'
      dragDom.style.top = e.clientY - layerY + 'px'
    },
    mouseup (e) {
      const { layerX, layerY } = dragConfig.origin
      document.body.removeChild(dragDom)
      dragDom = null

      const canMousedown = this.checkCanMousedown(e, { minOffset: 10 })
      if (!canMousedown) return

      const canvasWrapper = document.querySelector('.canvas-wrapper')
      const position = canvasWrapper.getBoundingClientRect()
      this.dragElement && this.clone({
        ...this.dragElement,
        customStyle: {
          left: e.clientX - layerX - position.left,
          top: e.clientY - layerY - position.top
        }
      })
    },
    checkCanMousedown (e, { minOffsetX, minOffsetY, minOffset }) {
      const offsetX = e.clientX - dragConfig.origin.clientX
      const offsetY = e.clientY - dragConfig.origin.clientY

      return offsetX >= (minOffsetX || minOffset) || offsetY >= (minOffsetY || minOffset)
    }
  },
  updated () {
    console.log('updated')
  }
}
