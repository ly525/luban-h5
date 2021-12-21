import Vue from 'vue'
import { parsePx, guid } from '@/utils/element.js'
import { bindData } from '@/utils/data-binding.js'

// #! 编辑状态，不可以点击的按钮，因为点击按钮会触发一些默认动作，比如表单提交等
const disabledPluginsForEditMode = ['lbp-form-input', 'lbp-form-button', 'lbp-video']
const cloneObj = (value) => JSON.parse(JSON.stringify(value))

const defaultStyle = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: 14,
  margin: {
    top: {
      value: 0,
      unit: 'px'
    },
    right: {
      value: 0,
      unit: 'px'
    },
    bottom: {
      value: 0,
      unit: 'px'
    },
    left: {
      value: 0,
      unit: 'px'
    }
  },
  padding: {
    top: {
      value: 0,
      unit: 'px'
    },
    right: {
      value: 0,
      unit: 'px'
    },
    bottom: {
      value: 0,
      unit: 'px'
    },
    left: {
      value: 0,
      unit: 'px'
    }
  },
  border: {
    top: {
      value: 0,
      unit: 'px'
    },
    right: {
      value: 0,
      unit: 'px'
    },
    bottom: {
      value: 0,
      unit: 'px'
    },
    left: {
      value: 0,
      unit: 'px'
    },
    color: {
      value: '#000'
    },
    style: {
      value: 'solid'
    }
  },
  'border-style': 'solid',
  boxModelPart: '' // 可选值 margin、padding、border
}

const numberReg = /^\d+$/
export default class Element {
  constructor (ele) {
    this.name = ele.name
    this.pluginType = ele.name
    this.uuid = this.getUUID(ele)
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
    this.pluginProps = this.getPluginProps(ele)
    this.commonStyle = this.getCommonStyle(ele)
    this.events = []
    this.methodList = ele.methodList || []
    /**
      script item<{
        id,
        label,
        value
      }>
     */
    this.scripts = ele.scripts || []
    this.animations = ele.animations || []

    this.registerGlobalComponent()
  }

  /**
   * 如果uuid 是number 类型(老uuid通过时间戳生成)，则会报错：[Vue warn]: Invalid component name: "1598504639230". Component names should conform to valid custom element name in html5 specification.
   *
   * 如果uuid不存在/全为Number，则采用新规则生成uuid，否则采用老uuid
   *
   * @param {*} ele
   */
  getUUID (ele) {
    return (!ele.uuid || numberReg.test(ele.uuid) || !ele.uuid.includes('_')) ? `${ele.name}_${guid()}` : ele.uuid
  }

  getCommonStyle (ele) {
    if (typeof ele.commonStyle === 'object') {
      return cloneObj({ ...defaultStyle, ...ele.commonStyle })
    }
    return {
      ...defaultStyle,
      zindex: ele.zindex,
      ...(ele.extra && ele.extra.defaultStyle),
      ...ele.dragStyle // 拖拽结束落点的top、left
    }
  }

  getPluginProps (ele) {
    if (typeof ele.pluginProps === 'object') {
      return cloneObj({ ...ele.pluginProps, uuid: this.uuid })
    }
    return this.getDefaultPluginProps(ele)
  }

  // init prop of plugin
  getDefaultPluginProps (ele) {
    const { props = {}, shortcutProps = {} } = ele

    let pluginProps = {
      uuid: this.uuid
    }
    Object.keys(props).forEach(key => {
      const defaultValue = props[key].default
      pluginProps[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })

    pluginProps = {
      ...pluginProps,
      ...shortcutProps
    }

    return pluginProps
  }
  packPosData (obj, prefix) {
    let init = {}
    Object.keys(obj).forEach(key => {
      init[prefix + '-' + key] = obj[key].value + (obj[key].unit || '')
    })
    return init
  }
  packBorderData () {
    const { top, right, bottom, left, color, style } = this.commonStyle.border
    return {
      /**
       * 使用 border-left border-right 等方式，在 chrome 浏览器中会导致渲染问题
       * 这里就将他拼接成完整的 border-width解决bug，不知道是什么原因
       */
      'border-width': `${top.value}${top.unit} ${right.value}${right.unit} ${bottom.value}${bottom.unit} ${left.value}${left.unit} `,
      'border-style': style.value,
      'border-color': color.value
    }
  }
  getStyle ({ position = 'static', isRem = false, isNodeWrapper = true } = {}) {
    if (this.name === 'lbp-background' || !isNodeWrapper) {
      return {
        width: '100%',
        height: '100%'
      }
    }
    const pluginProps = this.pluginProps
    const commonStyle = this.commonStyle
    const { margin, padding } = commonStyle
    // 由于在 defaultStyle 定义的时候是对象，这里需要将数据重新组装成 margin-top 这种形式
    const boxModel = {
      ...this.packPosData(margin, 'margin'),
      ...this.packPosData(padding, 'padding'),
      ...this.packBorderData()
    }
    let style = {
      top: parsePx(pluginProps.top || commonStyle.top, isRem),
      left: parsePx(pluginProps.left || commonStyle.left, isRem),
      width: parsePx(pluginProps.width || commonStyle.width, isRem),
      height: parsePx(pluginProps.height || commonStyle.height, isRem),
      fontSize: parsePx(pluginProps.fontSize || commonStyle.fontSize, isRem),
      ...boxModel,
      color: pluginProps.color || commonStyle.color,
      // backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
      textAlign: pluginProps.textAlign || commonStyle.textAlign,
      'z-index': commonStyle.zindex,
      position
    }
    return style
  }

  getProps ({ mode = 'edit' } = {}) {
    const pluginProps = mode === 'preview' ? bindData(this.pluginProps, window) : this.pluginProps
    return {
      ...pluginProps,
      disabled: disabledPluginsForEditMode.includes(this.name) && mode === 'edit'
    }
  }

  getClass () {

  }

  getData () {

  }

  getAttrs () {
    const attrs = {
      'data-uuid': this.uuid
    }

    if (this.animations.length > 0) {
      const animation = this.animations[0]
      attrs['data-swiper-animation'] = animation.type // "fadeIn"
      attrs['data-duration'] = `${animation.duration}s` // ".5s"
      attrs['data-delay'] = `${animation.delay}s` // "1s"
    }
    return attrs
  }

  getPreviewData ({ position = 'static', isRem = false, mode = 'preview', isNodeWrapper = true } = {}) {
    const data = {
      // 与 edit 组件保持样式一致
      style: this.getStyle({ position, isNodeWrapper }),
      props: this.getProps({ mode }),
      attrs: this.getAttrs(),
      nativeOn: this.getEventHandlers()
    }
    return data
  }

  clone ({ zindex = this.commonStyle.zindex + 1 } = {}) {
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

  getEventHandlers () {
    const Ctor = Vue.component(this.uuid)
    const vm = new Ctor()
    const handlers = this.methodList.reduce((handlers, method) => {
      // bind is fine too：handlers[method.trigger] = vm[method.name].bind(vm, method.arguments)
      handlers[method.trigger] = () => vm[method.name].apply(vm, method.arguments)
      return handlers
    }, {})
    return handlers
  }

  registerGlobalComponent () {
    const basePlugin = Vue.component(this.name)
    const mixinList = this.scripts.map(script => new Function(script.content.replace('editorMethods', 'methodsConfig'))())
    basePlugin && this._mixinScript(mixinList, basePlugin)
  }

  /**
   *
    interface Script {
      id?: number;
      label?: string;
      value: string; //  `return { created() {} }`
    }
   * @param {Object} script:Script
   */
  mixinScript (script) {
    const basePlugin = Vue.component(this.uuid)
    let mixin = new Function(script.content)() || {}
    // normalize mixin(对 mixin 做规范化处理)
    mixin = {
      ...mixin,
      methodsConfig: mixin.methodsConfig || {}
    }
    this._mixinScript(mixin, basePlugin)
  }

  _mixinScript (mixinList, basePlugin = Vue.component(this.uuid)) {
    // basePlugin 不传入 && 不存在
    if (!basePlugin) return

    if (!Array.isArray(mixinList)) {
      mixinList = [mixinList]
    }

    let pluginWithMixins = mixinList.reduce((mixedPlugin, mixin) => {
      mixin.methodsConfig = mixin.methodsConfig || {} // 处理为 undefined 的情况，更应该在 mixinScript 的时候，从入口处进行约束
      // 这里需要注意：
      // 因为在不同的脚本中，方法的配置信息字段都是：methodsConfig，因此根据 Vue.mixin 的规则，后mixin 的会覆盖前面的同名
      // 因此需要将前面的 methodsConfig 和 新mixin.methodsConfig 进行合并，防止之前的 methodsConfig 消失了
      mixin.methodsConfig = {
        ...mixedPlugin.options.methodsConfig,
        ...mixin.methodsConfig
      }
      return mixedPlugin.extend(mixin)
    }, basePlugin)

    Vue.component(this.uuid, pluginWithMixins)
  }
}
