import LbpTextAlign from '@luban-h5/lbs-text-align'
import commonProps from './common/props.js'

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
    text: {
      type: String,
      default: '按钮',
      editor: {
        type: 'a-input',
        label: '按钮文字',
        require: true
      }
    },
    vertical: commonProps.vertical,
    backgroundColor: commonProps.backgroundColor,
    color: commonProps.color,
    fontSize: commonProps.fontSize,
    lineHeight: commonProps.lineHeight,
    borderWidth: commonProps.borderWidth,
    borderRadius: commonProps.borderRadius,
    borderColor: commonProps.borderColor,
    textAlign: commonProps.textAlign

  },
  editorConfig: {
    components: {
      'lbs-text-align': LbpTextAlign
    }
  }
}
