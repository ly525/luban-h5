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
      name
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
      >{name}</button>)
  },
  name: 'lbp-button',
  props: {
    name: {
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
    propConfig: {
      name: {
        type: 'el-input',
        label: '按钮文字',
        require: true,
        widgetProps: {
          value: '按钮'
        }
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
        widgetProps: {
          value: 14

        }
      },
      color: {
        type: 'el-input',
        label: '文字颜色',
        // !#zh 为编辑组件指定 prop
        prop: {
          type: 'color'
        },
        require: true,
        widgetProps: {
          value: ''
        }
      },
      backgroundColor: {
        type: 'el-input', // lbs-color-picker
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        widgetProps: {
          value: ''
        }
      },
      borderColor: {
        type: 'el-input', // lbs-color-picker
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        widgetProps: {
          value: '#ced4da'
        }
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
        widgetProps: {
          value: 1
        }
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
        widgetProps: {
          value: 0

        }
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
        widgetProps: {
          value: 1

        }
      },
      textAlign: {
        type: 'lbs-text-align',
        label: '文字对齐',
        require: true,
        widgetProps: {
          value: 'center'

        }
      }
    },
    components: {
      'lbs-text-align': {
        template: `
          <div class="wrap">
            <el-radio-group v-model="value_" size="small">
              <el-tooltip effect="dark" :content="item.label" placement="top" :key="index" v-for="(item, index) in textAlignTabs">
                <el-radio-button :label="item.value">
                  <i :class="['fa', 'fa-align-\${item.value}']" aria-hidden="true"></i>
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
            get: () => this.value,
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

class Element {
  constructor (ele) {
    const { defaultPropsValue = {} } = ele
    this.type = ele.name
    this.name = ele.name
    this.zindex = ele.zindex || defaultPropsValue.zindex || 1
    this.style = {
      top: ele.top || defaultPropsValue.top || 100,
      left: ele.left || defaultPropsValue.left || 100,
      ...defaultPropsValue
    }
  }

  getStyle () {

  }

  getClass () {

  }

  getData () {

  }
}

const Editor = {
  name: 'Editor',
  components: {
    EditorPanel: {
      template: '<div>Editor Panel</div>'
    }
  },
  data: () => ({
    pages: [],
    elements: []
  }),
  methods: {
    /**
     * !#zh 点击插件，copy 其基础数据到组件树（中间画布）
     * pluginInfo {Object}: 插件列表中的基础数据, {name}=pluginInfo
     */
    clone ({ name }) {
      const zindex = this.elements.length + 1
      const defaultPropsValue = this.getPropsDefaultValue(name)
      this.elements.push(new Element({ name, zindex, defaultPropsValue }))
      // return new Element({ name, zindex })
    },
    setCurrentEditingElement (element) {

    },
    /**
     * #!zh: renderCanvas 将拖拽过来的组件渲染到中间画布 上
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
                style: {
                  top: '100px',
                  fontSize: '16px',
                  textAlign: 'center',
                  color: 'orange',
                  width: '100px',
                  height: '30px',
                  position: 'absolute'
                },
                on: {
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
    renderPropsEditorPanel () {
      return (<EditorPanel />)
    }
  },
  render (h) {
    return (
      <div style='height: 100vh;'>
        <div id='designer-page'>
          <div class='el-col-5'>
            { this.renderPluginListPanel() }
          </div>
          <div class='el-col-13'>
            <div class='canvas-wrapper'>
              { this.renderCanvas(h, this.elements) }
              { this.hasEleEditing && <Shape elementStyle={this.editingElement.style || {}} /> }
            </div>
          </div>
          <div class='el-col-6'>
            { this.renderPropsEditorPanel() }
          </div>
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
    getPropsDefaultValue (pluginName) {
      const defaultPropsValue = {}
      const component = this.$options.components[pluginName]
      const propConfig = component.editorConfig.propConfig
      Object.keys(propConfig).forEach(key => { defaultPropsValue[key] = propConfig[key].widgetProps.value })
      return defaultPropsValue
    },
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
