import NodeWrapper from '@/components/preview/node-wrapper.js'
/**
 * TODO extract page preview card used for page list
 */
export default {
  props: ['elements'],
  components: {
    NodeWrapper
  },
  methods: {
    renderPreview (h, elements) {
      return (
        <div style={{ height: '100%', position: 'relative' }}>
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
