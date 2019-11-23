import placeholderImg from './lbp-picture-placeholder.png' // issue #34
export default {
  name: 'lbp-picture',
  render () {
    return <img src={this.imgSrc || placeholderImg} alt="" srcset="" width="100%" />
  },
  props: {
    imgSrc: {
      type: String,
      default: placeholderImg,
      editor: {
        type: 'lbs-image-gallery',
        label: '图片url',
        prop: {
          type: 'textarea'
        }
      }
    }
  },
  data: () => ({
    placeholderImg
  })
}
