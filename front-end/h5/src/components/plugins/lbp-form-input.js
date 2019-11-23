import commonProps from './common/props.js'

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
      default: 'text',
      editor: {
        type: 'lbs-select-input-type',
        label: '类型'
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // type: commonProps.type,
    placeholder: commonProps.placeholder('姓名'),
    fontSize: commonProps.fontSize,
    color: commonProps.color,
    backgroundColor: commonProps.backgroundColor,
    borderColor: commonProps.borderColor,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    lineHeight: commonProps.lineHeight,
    textAlign: commonProps.textAlign({ defaultValue: 'left' })
  },
  editorConfig: {
    components: {
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
