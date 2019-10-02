// issue 34
import placeholderImg from './lbp-picture-placeholder.png'
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
        // type: 'picture-picker',
        type: 'a-input',
        label: '图片url',
        prop: {
          type: 'textarea'
        },
        defaultPropValue: ''
      }
    },
    components: {
    //   'picture-picker': PicturePicker,
    }
  }
}
