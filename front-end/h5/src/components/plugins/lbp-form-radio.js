import './styles/radio.scss'
// https://github.com/luban-h5-components/plugin-common-props
import commonProps from '@luban-h5/plugin-common-props'
import { genUUID } from '../../utils/element.js'

export default {
  name: 'lbp-form-radio',
  props: {
    ...commonProps,
    value: {
      type: [String, Number],
      default: '选项值'
    },
    aliasName: {
      type: String,
      default: '标题演示'
    },
    checked: {
      type: Boolean,
      default: false
    },
    onFocus: {
      type: Function,
      default: () => {}
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    onBlur: {
      type: Function,
      default: () => {}
    },
    doChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleChange (e) {
      if (this.disabled) return
      this.$emit('change', e.target.value)
    }
  },
  render () {
    const {
      aliasName,
      type,
      disabled,
      checked,
      value
    } = this

    const uuid = +new Date() + genUUID()
    return (
      <div class={['lbp-' + this.type + '-wrapper', 'lbp-rc-wrapper']}>
        <span class="tag">{value}</span>
        <input
          class={['lbp-' + this.type, 'lbp-rc-input']}
          name={aliasName}
          id={uuid}
          type={type}
          ref="input"
          value={value}
          disabled={disabled}
          checked={!!checked}
          onChange={this.handleChange}
          // readOnly={readOnly}
          // tabIndex={tabIndex}
          // className={`${prefixCls}-input`}
          // onClick={this.onClick}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
          // onInput={this.onInput}
          // autoFocus={autoFocus}
          // data-type="lbp-form-input"
        />
        <label for={uuid}></label>
      </div>
    )
  }
}
