
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
    return {
      top: `${this.top}px`,
      left: `${this.left}px`,
      width: `${this.width}px`,
      height: `${this.height}px`,
      fontSize: `${this.fontSize}px`,
      color: this.color,
      backgroundColor: this.backgroundColor,
      textAlign: this.textAlign
    }
  }

  getClass () {

  }

  getData () {

  }
}

export default Element
