// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'

const typeOptions = [
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
    type: PropTypes.select({ defaultValue: 'text', label: '类型', options: typeOptions }),
    name: PropTypes.string({ defaultValue: 'name', label: 'name' }),
    disabled: PropTypes.boolean({ label: 'disabled' }),
    fontSize: PropTypes.number({ label: '字号(px)' }),
    placeholder: PropTypes.string({ defaultValue: '提示信息', label: '提示信息' }),
    color: PropTypes.color(),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(255, 255, 255, 0.2)' }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', defaultValue: 0 }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    textAlign: PropTypes.textAlign({ defaultValue: 'left' }),
    vertical: PropTypes.boolean(),
    lineHeight: PropTypes.number({ label: '行高(px)', defaultValue: 1 })
  },
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
