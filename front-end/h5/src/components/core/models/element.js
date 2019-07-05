
const defaultProps = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
  fontSize: 14
}

class Element {
  constructor (ele) {
    this.name = ele.name
    this.editorConfig = ele.editorConfig || {}
    this.pluginProps = {}
    this.init()
  }

  init () {
    // init common props
    Object.keys(defaultProps).forEach(key => {
      this[key] = defaultProps[key]
    })

    // init prop of plugin
    const propConf = this.editorConfig.propsConfig
    Object.keys(propConf).forEach(key => {
      // #6
      if (key === 'name') {
        console.warn('Please do not use {name} as plugin prop')
        return
      }
      this.pluginProps[key] = propConf[key].defaultPropValue
    })
  }

  getStyle () {
    const pluginProps = this.pluginProps
    let style = {
      top: `${pluginProps.top || this.top}px`,
      left: `${pluginProps.left || this.left}px`,
      width: `${pluginProps.width || this.width}px`,
      height: `${pluginProps.height || this.height}px`,
      fontSize: `${pluginProps.fontSize || this.fontSize}px`,
      color: pluginProps.color || this.color,
      backgroundColor: pluginProps.backgroundColor || this.backgroundColor,
      textAlign: pluginProps.textAlign || this.textAlign
    }
    return style
  }

  getClass () {

  }

  getData () {

  }
}

export default Element
