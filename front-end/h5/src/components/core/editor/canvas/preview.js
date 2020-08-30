import NodeWrapper from '@/components/preview/node-wrapper.js'
/**
 * TODO extract page preview card used for page list
 */
export default {
  props: ['elements', 'height'],
  components: {
    NodeWrapper
  },
  methods: {
    renderPreview (h, elements) {
      const pageWrapperStyle = { height: this.height || '100%', position: 'relative' }
      return (
        <div style={pageWrapperStyle}>
          {
            elements.map((element, index) => {
              return <node-wrapper element={element}>
                {h(element.name, element.getPreviewData({ position: 'static' }))}
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
