/**
 * TODO extract page preview card used for page list
 */
export default {
  props: ['elements'],
  methods: {
    renderPreview (h, elements) {
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              /**
               * TODO 是否可以将 renderElement 进行抽象成 renderBaseElement？
               * renderBaseElement
               * -> renderBaseElementWithEvent()
               * -> renderBaseElementWithCustomStyle()
               */
              const style = element.getStyle({ position: 'absolute' })
              const data = {
                style,
                props: element.getProps({ mode: 'preview' })
              }
              return h(element.name, data)
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
