export default {
  props: {
    qrcodeUrl: String,
    coverImageUrl: String
  },
  render (h) {
    const img = this.qrcodeUrl || this.coverImageUrl
    if (img) {
      const style = {
        'background-image': `url(${img})`,
        'background-size': this.qrcodeUrl ? 'contain' : 'cover'
      }
      return <div style={style} class="work-cover-img"></div>
    }

    return <span>Luban H5</span>
  }
}
