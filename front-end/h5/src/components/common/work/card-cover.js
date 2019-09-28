import placeholderImg from '@/assets/lbp-picture-placeholder.png'

function getDefaultStyle (img, isPlaceholder) {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
    height: '100%',
    width: '100%',
    backgroundSize: isPlaceholder ? 'contain' : 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${img})`
  }
}

export default {
  props: {
    qrcodeUrl: String,
    coverImageUrl: String
  },
  methods: {
    getCover (img, isPlaceholder = false) {
      const width = 70
      const style = {
        ...getDefaultStyle(img, isPlaceholder),
        zIndex: 1,
        width: `${width}%`,
        margin: `0 ${50 - width / 2}%`
      }
      return [
        <div style={style}></div>
      ]
    },
    getCoverBg (img) {
      const style = {
        ...getDefaultStyle(img),
        filter: 'blur(10px)'
      }
      return [
        <div style={style}></div>
      ]
    }
  },
  render (h) {
    let covers = [this.getCover(placeholderImg, true/** isPlaceholder */)]
    const coverImg = this.coverImageUrl

    if (this.qrcodeUrl) {
      covers = this.getCover(this.qrcodeUrl)
    } else if (coverImg) {
      covers = [this.getCover(coverImg), this.getCoverBg(coverImg)]
    }

    return <div class="card-cover-wrapper" >
      {covers}
    </div>
  }
}
