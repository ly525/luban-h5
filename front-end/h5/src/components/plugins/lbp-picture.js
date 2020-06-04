import PropTypes from '@luban-h5/plugin-common-props'

import placeholderImg from './lbp-picture-placeholder.png' // issue #34
export default {
  name: 'lbp-picture',
  render () {
    return <img src={this.imgSrc || placeholderImg} style={{ objectFit: this.fillType }} alt="" srcset="" width="100%" />
  },
  props: {
    imgSrc: PropTypes.image(),
    fillType: {
      type: String,
      default: 'contain',
      editor: {
        type: 'a-select',
        label: '填充方式',
        props: {
          options: [
            { label: 'contain 短边缩放', value: 'contain' },
            { label: 'cover 长边缩放', value: 'cover' },
            { label: 'fill 拉伸', value: 'fill' },
            { label: 'none 原始', value: 'none' },
            { label: 'scale-down 弹性缩放', value: 'scale-down' }
          ]
        }
      }
    }
  },
  data: () => ({
    placeholderImg
  })
}
