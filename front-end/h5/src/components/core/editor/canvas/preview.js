import NodeWrapper from 'core/preview/node-wrapper.js'
/**
 * 预览模块
 * preview h5 work module
 */
export default {
  props: ['elements', 'height'],
  components: {
    NodeWrapper
  },
  methods: {
    renderPreview (h, elements) {
      const pageWrapperStyle = { height: this.height || '100%', position: 'relative' }
      // 与 edit 组件保持样式一致
      const data = {
        style: {
          width: '100%',
          height: '100%'
        }
      }
      return (
        <div style={pageWrapperStyle}>
          {
            elements.map((element, index) => {
              return <node-wrapper element={element}>
                {h(element.name, data)}
              </node-wrapper>
            })
          }
        </div>
      )
    }
  },
  render (h) {
    return this.renderPreview(h, this.elements)
  }
}
