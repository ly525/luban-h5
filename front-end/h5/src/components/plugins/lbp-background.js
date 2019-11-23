export default {
  name: 'lbp-background',
  render () {
    let style = {
      width: '100%',
      height: '100%'
    }

    if (this.imgSrc) {
      style = {
        ...style,
        'background-size': 'cover',
        'background-position': '50% 50%',
        'background-origin': 'content-box',
        'background-image': `url(${this.imgSrc})`
      }
    } else {
      style = {
        ...style,
        backgroundColor: this.backgroundColor
      }
    }

    return (
      <div style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: -1; opacity: 1;">
        <div style={style}></div>
      </div>
    )
  },
  props: {
    imgSrc: {
      type: String,
      default: '',
      editor: {
        type: 'lbs-image-gallery',
        label: '图片url',
        prop: {
          type: 'textarea'
        }
      }
    },
    backgroundColor: {
      type: String,
      // Q: 为什么 transparent 无效？
      // A: 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
      // The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.

      default: '#ffffff',
      editor: {
        type: 'a-input', // lbs-color-picker
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true
      }
    }
  }
}
