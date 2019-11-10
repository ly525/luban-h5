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
    ...commonProps,
    text: {
      type: String,
      default: '按钮',
      editor: {
        type: 'a-input',
        label: '按钮文字',
        require: true
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  editorConfig: {
    components: {
      'lbs-text-align': LbpTextAlign
    }
  }
}
