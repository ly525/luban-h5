export default {
  name: 'lbp-form-input',
  render (h) {
    const style = {
      color: this.color,
      textAlign: this.textAlign,
      backgroundColor: this.backgroundColor,
      fontSize: this.fontSize + 'px',
      lineHeight: this.lineHeight + 'em',
      borderColor: this.borderColor,
      borderRadius: this.borderRadius + 'px',
      borderWidth: this.borderWidth + 'px',
      padding: '0 5px'
    }
    return <input
      disabled={this.disabled}
      type={this.type}
      style={style}
      name={this.name}
      placeholder={this.placeholder}
      autocomplete="off"
      data-type="lbp-form-input" // 点击[表单提交]按钮的时候,找到data-type为:lbp-form-input 的输入框，并将其值添加到formData,提交到后台
    />
  },
  props: {
    name: {
      type: String,
      default () {
        return 'name'
      }
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
      default: 'left'
    }
  },
  editorConfig: {
    propsConfig: {
      type: {
        type: 'lbs-select-input-type',
        label: '类型',
        defaultPropValue: 'text'
      },
      placeholder: {
        type: 'a-input',
        label: '提示文字',
        require: true,
        defaultPropValue: '请填写提示文字'
      },
      fontSize: {
        type: 'a-input-number',
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
        type: 'a-input',
        label: '文字颜色',
        // !#zh 为编辑组件指定 prop
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: 'black'
      },
      backgroundColor: {
        type: 'a-input', // lbs-color-picker
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#ffffff' // TODO why logogram for color does't work?
      },
      borderColor: {
        type: 'a-input', // lbs-color-picker
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#eeeeee'
      },
      borderWidth: {
        type: 'a-input-number',
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
        type: 'a-input-number',
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
        type: 'a-input-number',
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
        defaultPropValue: 'left'
      }
    },
    components: {
      'lbs-text-align': {
        render (h) {
          return (
            <div class="wrap">
              <a-radio-group value={this.value} onChange={value => {
                this.$emit('change', value)
                this.$emit('input', value)
              }} size="small">
                {
                  this.textAlignTabs.map(item => (
                    // <a-radio-button value={item.value} key={item.value}><i class={['fa', 'fa-align-' + item.value]} aria-hidden="true"></i></a-radio-button>
                    <a-tooltip effect="dark" placement="top" key={item.value} title={item.label}>
                      <a-radio-button value={item.value}>
                        <i class={['fa', 'fa-align-' + item.value]} aria-hidden="true"></i>
                      </a-radio-button>
                    </a-tooltip>
                  ))
                }
              </a-radio-group>
            </div>
          )
        },
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
        })
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
        render (h) {
          return (
            <a-select
              placeholder="类型"
              value={this.value}
              onChange={(value) => {
                this.$emit('input', value)
                this.$emit('change', value)
              }}
            >
              {
                this.options.map(option => (
                  <a-select-option
                    key={option.value}
                    value={option.value}
                  >{option.label}</a-select-option>
                ))
              }
            </a-select>
          )
        },
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

// .lb-plugin__input {
//   display: block;
//   margin: 0;
//   padding: 0 5px;
//   box-sizing: border-box;
//   overflow: visible;
//   border: 1px solid #ced4da;
//   &:focus {
//     outline: none;
//   }
// }
