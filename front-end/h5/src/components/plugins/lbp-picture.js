import ImageGallery from '@/components/core/support/image-gallery/gallery.js'
import placeholderImg from './lbp-picture-placeholder.png' // issue #34
export default {
  name: 'lbp-picture',
  render () {
    return <img src={this.imgSrc || placeholderImg} alt="" srcset="" width="100%" />
  },
  props: {
    imgSrc: {
      type: String,
      default: placeholderImg
    }
  },
  data: () => ({
    placeholderImg
  }),
  editorConfig: {
    propsConfig: {
      imgSrc: {
        type: 'image-gallery',
        label: '图片url',
        prop: {
          type: 'textarea'
        },
        defaultPropValue: ''
      }
    },
    components: {
      'image-gallery': ImageGallery
    }
  }
}
