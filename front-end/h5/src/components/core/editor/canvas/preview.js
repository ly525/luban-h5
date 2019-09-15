import animationMixin from '@/mixins/animation.js'
/**
 * TODO extract page preview card used for page list
 */
export default {
  props: ['elements'],
  components: {
    nodeWrapper: {
      mixins: [animationMixin],
      props: ['element'],
      mounted () {
        this.runAnimations()
      },
      render (h) {
        return (
          <div style={this.element.getStyle({ position: 'absolute' })}>{this.$slots.default}</div>
        )
      }
    }
  },
  methods: {
    renderPreview (h, elements) {
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              console.log(element.getStyle())
              /**
               * TODO 是否可以将 renderElement 进行抽象成 renderBaseElement？
               * renderBaseElement
               * -> renderBaseElementWithEvent()
               * -> renderBaseElementWithCustomStyle()
               */
              return <node-wrapper element={element}>{h(element.name, element.getPreviewData({ position: 'static' }))}</node-wrapper>
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
