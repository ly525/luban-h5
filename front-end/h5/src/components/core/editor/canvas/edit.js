export default {
  props: ['elements', 'handleElementClick'],
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
        <div style={{ height: '100%' }}>
          {
            elements.map((element, index) => {
              const data = {
                style: element.getStyle(),
                props: element.pluginProps, // #6 #3
                nativeOn: {
                  click: () => this.handleElementClick(element)
                }
              }
              return h(element.name, data)
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
