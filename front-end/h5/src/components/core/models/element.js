
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
    this.uuid = +new Date()
    this.editorConfig = ele.editorConfig || {}
    this.pluginProps = {}
    this.commonStyle = {}
    this.init()
  }

  init () {
    const commonStyle = this.commonStyle
    // init common props
    Object.keys(defaultProps).forEach(key => {
      commonStyle[key] = defaultProps[key]
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
    const commonStyle = this.commonStyle
    let style = {
      top: `${pluginProps.top || commonStyle.top}px`,
      left: `${pluginProps.left || commonStyle.left}px`,
      width: `${pluginProps.width || commonStyle.width}px`,
      height: `${pluginProps.height || commonStyle.height}px`,
      fontSize: `${pluginProps.fontSize || commonStyle.fontSize}px`,
      color: pluginProps.color || commonStyle.color,
      backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      textAlign: pluginProps.textAlign || commonStyle.textAlign
    }
    return style
  }

  getClass () {

  }

  getData () {

  }
}

export default Element
