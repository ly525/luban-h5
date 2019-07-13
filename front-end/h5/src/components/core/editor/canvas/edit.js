import { mapState, mapActions } from 'vuex'
import Shape from '../../support/shape'

export default {
  props: ['elements', 'handleClickElementProp', 'handleClickCanvasProp'],
  data: () => ({
    vLines: [],
    hLines: [],
    contextmenuPos: []
  }),
  computed: {
    ...mapState('element', {
      editingElement: state => state.editingElement
    })
  },
  methods: {
    ...mapActions('element', [
      'setEditingElement', // -> this.foo()
      'setElementPosition', // -> this.foo()
      'setElementShape' // -> this.foo()
    ]),
    // TODO #!zh: 优化代码
    // generate vertical line
    drawVLine (newLeft) {
      // this.editingElement.commonStyle.left = newLeft
      this.setElementPosition({ left: newLeft })
      this.vLines = [{ left: newLeft }]
    },
    // generate horizontal line
    drawHLine (newTop) {
      // this.editingElement.commonStyle.top = newTop
      this.setElementPosition({ top: newTop })
      this.hLines = [{ top: newTop }]
    },
    calcX (newLeft) {
      const uuid = this.editingElement.uuid
      let xCoords = []
      this.elements.filter(e => e.uuid !== uuid).forEach(e => {
        const width = e.commonStyle.width
        const left = e.commonStyle.left
        xCoords = [
          ...xCoords,
          left,
          left + (width / 2),
          left + width
        ]
      })

      xCoords.some(x => {
        if (Math.abs(newLeft - x) <= 5) {
          this.drawVLine(x)
          return true
        } else {
          this.vLines = []
        }
      })
    },
    calcY (newTop) {
      const uuid = this.editingElement.uuid
      let yCoords = []
      this.elements.filter(e => e.uuid !== uuid).forEach(e => {
        const height = e.commonStyle.height
        const top = e.commonStyle.top
        yCoords = [
          ...yCoords,
          top,
          top + (height / 2),
          top + height
        ]
      })

      yCoords.some(y => {
        if (Math.abs(newTop - y) <= 5) {
          this.drawHLine(y)
          return true
        } else {
          this.hLines = []
        }
      })
    },
    /**
     * #!zh: 在元素移动过程中，计算和生成辅助线
     */
    handleElementMove ({ top, left }) {
      this.calcX(left)
      this.calcY(top)
    },
    bindContextMenu (e) {
      e.preventDefault() // 不显示默认的右击菜单
      if (
        e.target.classList.contains('element-on-edit-canvas') ||
        e.target.parentElement.classList.contains('element-on-edit-canvas')
      ) {
        const { x, y } = this.$el.getBoundingClientRect()
        this.contextmenuPos = [e.clientX - x, e.clientY - y]
      } else {
        this.hideContextMenu()
      }
    },
    hideContextMenu () {
      this.contextmenuPos = []
    },
    handleClickCanvas (e) {
      if (!e.target.classList.contains('element-on-edit-canvas')) {
        this.setEditingElement()
      }
    },
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
          onClick={(e) => {
            this.hideContextMenu()
            this.handleClickCanvas(e)
          }}
          onContextmenu={e => {
            this.bindContextMenu(e)
          }}
        >
          {
            elements.map((element, index) => {
              const style = element.getStyle()
              const data = {
                style,
                // 添加 class 的原因：与 handleClickCanvasProp 配合,
                // 当点击编辑画布上的其它区域（clickEvent.target.classList 不包含下面的 className）的时候，设置 editingElement=null
                class: 'element-on-edit-canvas',
                props: element.pluginProps, // #6 #3
                on: {
                  // 高亮当前点击的元素
                  // click: () => this.setEditingElement(element)
                  input: ({ value, pluginName }) => {
                    if (pluginName === 'lbp-text') {
                      element.pluginProps.text = value
                    }
                  }
                }
              }
              return (
                <Shape
                  element={element}
                  active={this.editingElement === element}
                  handleMousedownProp={() => {
                    // 在 shape 上面添加 mousedown，而非 plugin 本身添加 onClick 的原因：
                    // 在 mousedown 的时候，即可激活 editingElement(当前选中元素)
                    // 这样，就不用等到鼠标抬起的时候，也就是 plugin 的 onClick 生效的时候，才给选中的元素添加边框等选中效果
                    this.setEditingElement(element)
                  }}
                  handleElementMoveProp={this.handleElementMove}
                >
                  {h(element.name, data)}
                </Shape>
              )
            })
          }
          {
            this.vLines.map(line => (
              <div class="v-line" style={{ left: `${line.left}px` }}></div>
            ))
          }
          {
            this.hLines.map(line => (
              <div class="h-line" style={{ top: `${line.top}px` }}></div>
            ))
          }
          {
            this.contextmenuPos.length
              ? <a-menu
                style={{
                  left: this.contextmenuPos[0] + 'px',
                  top: this.contextmenuPos[1] + 'px',
                  userSelect: 'none',
                  position: 'absolute',
                  zIndex: 999
                }}
              >
                <a-menu-item data-command='copyEditingElement'>复制</a-menu-item>
                <a-menu-item data-command="deleteEditingElement">删除</a-menu-item>
                <a-menu-item data-command="bringLayer2Front">置顶</a-menu-item>
                <a-menu-item data-command="bringLayer2End">置底</a-menu-item>
                <a-menu-item data-command="addLayerZindex">上移</a-menu-item>
                <a-menu-item data-command="subtractLayerZindex">下移</a-menu-item>
              </a-menu>
              : null
          }
        </div>
      )
    }
  },
  render (h) {
    return this.renderCanvas(h, this.elements)
  }
}
