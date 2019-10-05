import ImageGallery from '@/components/core/support/image-gallery/gallery.js'

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
      default: ''
    },
    backgroundColor: {
      type: String,
      // TODO 为什么 transparent 无效？
      default: '#ffffff'
    }
  },
  editorConfig: {
    propsConfig: {
      imgSrc: {
        type: 'image-gallery',
        // type: 'a-input',
        label: '图片url',
        prop: {
          type: 'textarea'
        },
        defaultPropValue: ''
      },
      backgroundColor: {
        type: 'a-input', // lbs-color-picker
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#ffffff' // TODO why logogram for color does't work?
      }
    },
    components: {
      'image-gallery': ImageGallery
    }
  }
}
