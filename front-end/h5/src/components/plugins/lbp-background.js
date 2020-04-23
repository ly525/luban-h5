/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-23 23:17:55
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-background.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: luban-h5 background image/color component/plugin
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
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
      // [知识点:CSS] : https://codesandbox.io/s/ziyuansuzindexzaigao-wufafugaifuyuansudexiongdiyuansu-n15rd?file=/index.html
      <div style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: 0; opacity: 1;">
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
        label: '图片',
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

      default: 'rgba(255, 255, 255, 0.2)',
      editor: {
        type: 'el-color-picker',
        label: '背景颜色',
        prop: {
          size: 'mini',
          showAlpha: true
        },
        require: true
      }
    }
  }
}
