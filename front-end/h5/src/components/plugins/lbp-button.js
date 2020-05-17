// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'

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

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none'
    }
    return (
      <button
        style={style}
      >{text}</button>)
  },
  name: 'lbp-button',
  props: {
    text: PropTypes.string(),
    vertical: PropTypes.boolean(),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(255, 255, 255, 0.2)' }),
    color: PropTypes.color(),
    fontSize: PropTypes.number({ label: '字号(px)' }),
    lineHeight: PropTypes.number({ label: '行高(px)', defaultValue: 1 }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', defaultValue: 4 }),
    borderColor: PropTypes.color({ label: '边框颜色', defaultValue: '#ced4da' }),
    textAlign: PropTypes.textAlign()
  }
}
