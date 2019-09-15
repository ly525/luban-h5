import { parsePx } from '../../../utils/element.js'

// #! 编辑状态，不可以点击的按钮，因为点击按钮会触发一些默认行为，比如表单提交等
const disabledPluginsForEditMode = ['lbp-form-input', 'lbp-form-button']
const clone = (value) => JSON.parse(JSON.stringify(value))

const defaultStyle = {
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
    this.uuid = ele.uuid || +new Date()
    /**
     * #!zh:
     * 之前版本代码：https://github.com/ly525/luban-h5/blob/a7875cbc73c0d18bc2459985ca3ce1d4dc44f141/front-end/h5/src/components/core/models/element.js#L21
     * 1.之前的版本为：this.pluginProps = {}, 改为下面的版本
     * 是因为要支持[复制画布上的元素]，所以需要先使用 ele.pluginProps 进行初始化（也就是拷贝之前的元素的值）
     *
     * 2. 移除 this.init() 原因是：如果是 复制元素，则 init 会把 copy 的值重新覆盖为初始值，copy 无效
     *
     * 3. 为何需要 clone，因为会有 element.clone() 以及 page.clone()，
     *    element.pluginProps 和 elementcommonStyle 是引用类型，如果不做 deep_clone 可能会出现意外错误
     */
    this.pluginProps = (typeof ele.pluginProps === 'object' && clone(ele.pluginProps)) || this.getDefaultPluginProps(ele.editorConfig || {})
    this.commonStyle = (typeof ele.commonStyle === 'object' && clone(ele.commonStyle)) || { ...defaultStyle }
    this.events = []
    this.animations = []
  }

  getDefaultPluginProps (editorConfig) {
    // init prop of plugin
    const propConf = editorConfig.propsConfig
    const pluginProps = {}
    Object.keys(propConf).forEach(key => {
      // #6
      if (key === 'name') {
        console.warn('Please do not use {name} as plugin prop')
        return
      }
      pluginProps[key] = propConf[key].defaultPropValue
    })
    return pluginProps
  }

  getStyle ({ position = 'static', isRem = false } = {}) {
    const pluginProps = this.pluginProps
    const commonStyle = this.commonStyle
    let style = {
      top: parsePx(pluginProps.top || commonStyle.top, isRem),
      left: parsePx(pluginProps.left || commonStyle.left, isRem),
      width: parsePx(pluginProps.width || commonStyle.width, isRem),
      height: parsePx(pluginProps.height || commonStyle.height, isRem),
      fontSize: parsePx(pluginProps.fontSize || commonStyle.fontSize, isRem),
      color: pluginProps.color || commonStyle.color,
      // backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      textAlign: pluginProps.textAlign || commonStyle.textAlign,
      'z-index': commonStyle.zindex,
      position
    }
    return style
  }

  getProps ({ mode = 'edit' } = {}) {
    return {
      ...this.pluginProps,
      disabled: disabledPluginsForEditMode.includes(this.name) && mode === 'edit'
    }
  }

  getClass () {

  }

  getData () {

  }

  getAttrs () {
    return {
      'data-uuid': this.uuid
    }
  }

  getPreviewData ({ position = 'static', isRem = false } = {}) {
    const style = this.getStyle({ position })
    const data = {
      style,
      props: this.getProps({ mode: 'preview' }),
      attrs: this.getAttrs()
    }
    return data
  }

  clone ({ zindex }) {
    return new Element({
      zindex,
      name: this.name,
      pluginProps: this.pluginProps,
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20
      }
    })
  }
}

export default Element
