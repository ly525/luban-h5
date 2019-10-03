export default {
  name: 'lbp-video',
  props: {
    src: {
      type: String,
      default: ``
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    src () {
      this.$el.innerHTML = this.src
    }
  },
  mounted () {
    this.$el.innerHTML = this.src
  },

  render (h) {
    const style = this.disabled ? { 'pointer-events': 'none' } : {}
    return (
      <div style={style}></div>
    )
  },
  editorConfig: {
    propsConfig: {
      src: {
        type: 'a-input',
        label: '视频url',
        prop: {
          type: 'textarea'
        },
        defaultPropValue: ''
      }
    },
    components: {
    }
  }
}
