export default {
  props: ['elements'],
  methods: {
    renderPreview (h, elements) {
      return (
        <div style={{ height: '100%' }}>
          {elements.map((element, index) => {
            return (() => {
              const data = {
                style: element.getStyle(),
                props: element.pluginProps, // #6 #3
                nativeOn: {}
              }
              return h(element.name, data)
            })()
          })}
        </div>
      )
    }
  },
  render (h) {
    return this.renderPreview(h, this.elements)
  }
}
