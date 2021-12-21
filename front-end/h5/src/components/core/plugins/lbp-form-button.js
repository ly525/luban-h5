// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'
import Toast from 'vant/lib/toast'
import 'vant/lib/toast/style'

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
      text,
      disabled
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none',
      disabled
    }
    return (
      <button
        style={style}
        onClick={this.handleClick}
      >{text}</button>)
  },
  name: 'lbp-form-button',
  props: {
    text: PropTypes.string({ defaultValue: '提交' }),
    vertical: PropTypes.boolean(),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(255, 255, 255, 0.2)' }),
    color: PropTypes.color(),
    fontSize: PropTypes.number({ label: '字号(px)', defaultValue: 14 }),
    lineHeight: PropTypes.number({ label: '行高(px)', defaultValue: 1 }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', defaultValue: 4 }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    textAlign: PropTypes.textAlign(),
    disabled: PropTypes.boolean()
  },
  methods: {
    handleClick () {
      if (this.disabled) return

      // #!zh: data-type=lbp-form-input 在 lbp-form-input 组件中定义
      let inputs = document.querySelectorAll("[data-type^='lbp-form-input']")
      if (!inputs.length) return
      let formData = new FormData()
      inputs.forEach(input => formData.append(input.dataset.uuid, input.value))
      const req = new XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          const message = req.status === 200 ? '提交成功' : '提交失败'
          Toast(message)
        }
      }

      // #!zh: vuex.module.editor.setWork 中定义
      const workId = window.__work.id
      // TODO #!zh: 可以动态配置表单提交地址
      req.open('post', `/works/form/submit/${workId}`, true)
      req.send(formData)
    }
  }
}
