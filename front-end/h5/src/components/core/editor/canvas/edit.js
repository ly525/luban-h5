import Shape from '../../support/shape'
export default {
  props: ['elements', 'editingElement', 'handleClickElementProp', 'handleClickCanvasProp'],
  methods: {
    /**
     * #!zh: renderCanvas 渲染中间画布
     * elements
     * @param {*} h
     * @param {*} elements
     * @returns
     */
    renderCanvas (h, elements) {
      return (
        <div
          style={{ height: '100%', position: 'relative' }}
          class="canvas-editor-wrapper"
          onClick={this.handleClickCanvasProp}
        >
          {
            elements.map((element, index) => {
              const style = element.getStyle()
              const data = {
                style,
                class: 'element-on-edit-canvas', // TODO 添加为何添加 class 的原因：与 handleClickCanvas 配合
                props: element.pluginProps, // #6 #3
                nativeOn: {
                  // 高亮当前点击的元素
                  // click: () => this.handleClickElementProp(element)
                }
              }
              return (
                <Shape
                  element={element}
                  editingElement={this.editingElement}
                  active={this.editingElement === element}
                  handleMousedownProp={() => {
                    // 在 shape 上面添加 mousedown，而非 plugin 本身添加 onClick 的原因：
                    // 在 mousedown 的时候，即可激活 editingElement(当前选中元素)
                    // 这样，就不用等到鼠标抬起的时候，也就是 plugin 的 onClick 生效的时候，才给选中的元素添加边框等选中效果
                    this.handleClickElementProp(element)
                  }}
                >
                  {h(element.name, data)}
                </Shape>
              )
            })
          }
        </div>
      )
    }
  },
  render (h) {
    return this.renderCanvas(h, this.elements)
  }
}
