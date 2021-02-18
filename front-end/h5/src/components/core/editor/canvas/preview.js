/**
 * 预览模块
 * preview h5 work module
 */

import NodeWrapper from 'core/preview/node-wrapper.js'

export default {
  props: ['elements', 'height', 'work'],
  components: {
    NodeWrapper
  },
  computed: {
    releaseUrl () {
      return `${window.location.origin}/works/preview/${this.work.id}`
    }
  },
  methods: {
    genEventHandlers (element) {
      const Ctor = this.$options.components[element.uuid]
      return element.getEventHandlers(Ctor)
    },
    renderPreview () {
      const elements = this.elements || []
      const pageWrapperStyle = { height: this.height || '100%', position: 'relative' }
      return (
        <div style={pageWrapperStyle}>
          {
            elements.map((element, index) => {
              return <node-wrapper element={element}>
                {
                  this.$createElement(element.uuid, {
                    ...element.getPreviewData({ isNodeWrapper: false }),
                    nativeOn: this.genEventHandlers(element)
                  })
                }
              </node-wrapper>
            })
          }
        </div>
      )
    }
  },
  render (h) {
    // return <iframe
    //   id="iframe-for-preview-1"
    //   src={this.releaseUrl}
    //   frameborder="0"
    //   style="height: 100%;width: 100%;"
    // ></iframe>
    return this.renderPreview()
  }
}
