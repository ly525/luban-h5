<script>
// LuBanPlugin -> Lbp
const LbpButton = {
  render () {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text
    } = this
    return (
      <button
        style={{
          color,
          textAlign,
          backgroundColor,
          fontSize: fontSize + 'px',
          lineHeight: lineHeight + 'em',
          borderColor,
          borderRadius: borderRadius + 'px',
          borderWidth: borderWidth + 'px',
          textDecoration: 'none'
        }}
      >{text}</button>)
  },
  name: 'lbp-button',
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请填写提示文字'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    color: {
      type: String,
      default: 'black'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    lineHeight: {
      type: Number,
      default: 1
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    borderRadius: {
      type: Number,
      default: 0
    },
    borderColor: {
      type: String,
      default: '#ced4da'
    },
    textAlign: {
      type: String,
      default: 'center'
    }
  },
  editorConfig: {
    propsConfig: {
      text: {
        type: 'el-input',
        label: '按钮文字',
        require: true,
        defaultPropValue: '按钮'
      },
      fontSize: {
        type: 'el-input-number',
        label: '字号(px)',
        require: true,
        prop: {
          step: 1,
          min: 12,
          max: 144
        },
        defaultPropValue: 14
      },
      color: {
        type: 'el-input',
        label: '文字颜色',
        // !#zh 为编辑组件指定 prop
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: 'black'
      },
      backgroundColor: {
        type: 'el-input', // lbs-color-picker
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#ffffff' // TODO why logogram for color does't work?
      },
      borderColor: {
        type: 'el-input', // lbs-color-picker
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#eeeeee'
      },
      borderWidth: {
        type: 'el-input-number',
        label: '边框宽度(px)',
        require: true,
        prop: {
          step: 1,
          min: 1,
          max: 10
        },
        defaultPropValue: 1
      },
      borderRadius: {
        type: 'el-input-number',
        label: '圆角(px)',
        require: true,
        prop: {
          step: 0.1,
          min: 0,
          max: 10
        },
        defaultPropValue: 0
      },
      lineHeight: {
        type: 'el-input-number',
        label: '行高',
        require: true,
        prop: {
          step: 0.1,
          min: 0.1,
          max: 10
        },
        defaultPropValue: 1
      },
      textAlign: {
        type: 'lbs-text-align',
        label: '文字对齐',
        require: true,
        defaultPropValue: 'center'
      }
    },
    components: {
      'lbs-text-align': {
        template: `
          <div class="wrap">
            <el-radio-group v-model="value_" size="small">
              <el-tooltip effect="dark" :content="item.label" placement="top" :key="index" v-for="(item, index) in textAlignTabs">
                <el-radio-button :label="item.value">
                  <!-- issue #8 -->
                  <i :class="['fa', 'fa-align-'+item.value]" aria-hidden="true"></i>
                </el-radio-button>
              </el-tooltip>
            </el-radio-group>
          </div>`,
        props: {
          value: {
            type: [String, Number]
          }
        },
        data: () => ({
          textAlignTabs: [{
            label: '左对齐',
            value: 'left'
          },
          {
            label: '居中对齐',
            value: 'center'
          },
          {
            label: '右对齐',
            value: 'right'
          }]
        }),
        computed: {
          value_: {
            // TODO 关于箭头函数中的this：这里不能写成箭头函数，否则 this 为 undefined，为何？
            // http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/
            // https://tangxiaolang101.github.io/2016/08/01/%E6%B7%B1%E5%85%A5%E6%8E%A2%E8%AE%A8JavaScript%E7%9A%84%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83%E5%92%8C%E6%A0%88%EF%BC%88What%20is%20the%20Execution%20Context%20&%20Stack%20in%20JavaScript%EF%BC%89/
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        }
      },
      'lbs-select-input-type': {
        props: ['value'],
        computed: {
          value_: {
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        },
        template: `
          <el-select v-model="value_" placeholder="类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        `,
        data: () => ({
          options: [
            {
              label: '文字',
              value: 'text'
            },
            {
              label: '密码',
              value: 'password'
            },
            {
              label: '日期',
              value: 'date'
            },
            {
              label: '邮箱',
              value: 'email'
            },
            {
              label: '手机号',
              value: 'tel'
            }
          ]
        })
      }
    }
  }
}

const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: 'lbp-button'
  }
]

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
    this.init()
  }

  init () {
    // init common props
    Object.keys(defaultProps).forEach(key => {
      this[key] = defaultProps[key]
    })

    // init prop of plugin
    this.pluginProps = {}
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

const Editor = {
  name: 'Editor',
  components: {
  },
  data: () => ({
    pages: [],
    elements: [],
    editingElement: null
  }),
  methods: {
    getEditorConfig (pluginName) {
      return this.$options.components[pluginName].editorConfig
    },
    /**
     * !#zh 点击插件，copy 其基础数据到组件树（中间画布）
     * pluginInfo {Object}: 插件列表中的基础数据, {name}=pluginInfo
     */
    clone ({ name }) {
      const zindex = this.elements.length + 1
      // const defaultPropsValue = this.getPropsDefaultValue(name)
      const editorConfig = this.getEditorConfig(name)
      this.elements.push(new Element({ name, zindex, editorConfig }))
    },
    mixinPluginCustomComponents2Editor () {
      const { components } = this.editingElement.editorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    },
    setCurrentEditingElement (element) {
      this.editingElement = element
      this.mixinPluginCustomComponents2Editor()
    },
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
          {elements.map((element, index) => {
            return (() => {
              const data = {
                style: element.getStyle(),
                props: element.pluginProps, // #6 #3
                nativeOn: {
                  click: this.setCurrentEditingElement.bind(this, element)
                }
              }
              return h(element.name, data)
            })()
          })}
        </div>
      )
    },
    renderPluginListPanel () {
      return (
        <el-tabs tab-position="left" class="lb-tabs">
          <el-tab-pane label='组件列表'>
            <div class="full-height">
              {this.visiblePluginList.sort().map(item => {
                return (
                  <el-button
                    class='plugin-item ma-0 no-border-radius'
                    onClick={this.clone.bind(this, item)}
                  >
                    <i
                      class={['fa', `fa-${item.icon}`]}
                      aria-hidden='true'
                      style='display: block;font-size: 16px;margin-bottom: 10px;'
                    />
                    <span>{ item.title }</span>
                  </el-button>
                )
              })}
            </div>
          </el-tab-pane>
          <el-tab-pane label='页面管理'>
            <span>页面管理</span>
          </el-tab-pane>
        </el-tabs>
      )
    },
    renderPropsEditorPanel (h) {
      if (!this.editingElement) return (<span>请先选择一个元素</span>)
      const editingElement = this.editingElement
      const propsConfig = editingElement.editorConfig.propsConfig
      return (
        <el-form ref="form" label-width="100px" size="mini">
          {
            Object.keys(propsConfig).map(propKey => {
              const item = propsConfig[propKey]
              // https://vuejs.org/v2/guide/render-function.html
              const data = {
                props: {
                  ...item.prop,
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  ...{ value: editingElement[propKey] || item.defaultPropValue }
                },
                on: {
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  input (value) {
                    editingElement[propKey] = value
                  }
                }
              }
              return (
                <el-form-item label={item.label}>
                  { h(item.type, data) }
                </el-form-item>
              )
            })
          }
        </el-form>
      )
    }
  },
  render (h) {
    return (
      <div id='designer-page'>
        <div class='el-col-5'>
          { this.renderPluginListPanel() }
        </div>
        <div class='el-col-13'>
          <div class='canvas-wrapper'>
            { this.renderCanvas(h, this.elements) }
          </div>
        </div>
        <div class='el-col-6' style="border-left: 1px solid #eee;">
          { this.renderPropsEditorPanel(h) }
        </div>
      </div>
    )
  }
}

export default {
  extends: Editor,
  computed: {
    // !#zh 显示在侧边栏或顶部的 可用组件列表
    visiblePluginList () {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    mixinPlugins2Editor () {
      PluginList.forEach(plugin => {
        this.$options.components[plugin.name] = plugin.component
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
</script>
<style lang="scss">
$cellSize: 35.6px;
$designerWidth: 320px;
$designerHeight: 568px;
$designerWidthHalf: $designerWidth / 2;

#designer-page {
  display: flex;
  // https://stackoverflow.com/questions/17904088/disable-less-css-overwriting-calc
  // less: min-height: ~'calc(100% - 40px)';
  min-height: calc(100% - 40px);

}

.plugin-item {
  border: 1px solid #f1efef;
  width: 49%;
  padding: 12px 12px;

  &:nth-child(even) {
    margin: 4px 0 4px 2% !important;
  }
}

.canvas-wrapper {
  position: relative;
  top: 5%;
  width: $designerWidth;
  height: $designerHeight;
  border: 1px #ebeaea solid;
  margin: 0 auto;
}

.lb-tabs {
  box-shadow: none;
  padding: 4px 8px 4px 0;
  border: 1px solid #EBEEF5;
  height: 100%;
}

.full-height {
  height: 100% !important;
}
</style>
