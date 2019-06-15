const defaultPngPath = 'http://jietu-10024907.file.myqcloud.com/kblthjeuhituluuaalpiuyvfwrldpkrj.jpg'

export default {
  name: 'lbp-picture',
  render () {
    return <img src={this.imgSrc || defaultPngPath} alt="" srcset="" width="100%" />
  },
  props: {
    imgSrc: {
      type: String,
      default: defaultPngPath
    }
  },
  data: () => ({
    defaultPngPath
  }),
  editorConfig: {
    propsConfig: {
      imgSrc: {
        // type: 'picture-picker',
        type: 'el-input',
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
