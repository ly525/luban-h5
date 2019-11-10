import playIcon from './play.svg'
import './styles/video.scss'
// 这里有个动画演示，可以用来学习 CSS：《CSS制作播放、暂停按钮》https://codepen.io/chriscoyier/full/lotjh

export default {
  name: 'lbp-video',
  props: {
    src: {
      type: String,
      default: ``,
      editor: {
        type: 'a-input',
        label: '视频url',
        prop: {
          type: 'textarea'
        },
        extra: (h) => {
          return <a href='https://github.com/ly525/luban-h5/issues/85' target='_blank'>教程(Tutorial)</a>
        },
        defaultPropValue: ''
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    src () {
      this.appendIframe()
    }
  },
  mounted () {
    this.appendIframe()
  },
  methods: {
    appendIframe () {
      if (this.src) {
        this.$el.innerHTML = this.src
      }
    }
  },
  render (h) {
    const style = this.disabled ? { 'pointer-events': 'none' } : { }
    return (
      <div class="lbc-video" style={style}>
        {
          this.disabled
            ? <video playsinline="true" webkit-playsinline="" width="100%" height="100%" poster={playIcon}><source type="video/mp4" /></video>
            : <div></div>
        }
      </div>
    )
  },
  editorConfig: {
    components: {
    }
  }
}
