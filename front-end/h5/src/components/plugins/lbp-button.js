export default {
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
