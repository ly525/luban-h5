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
        type: 'picture-picker',
        label: '',
        require: true,
        widgetProps: {
          value: '',
          template: '%i',
        },
      },
    },
    components: {
    //   'picture-picker': PicturePicker,
    }
  }
}
