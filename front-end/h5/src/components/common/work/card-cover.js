export default {
  props: {
    qrCode: String,
    coverImageUrl: String
  },
  render (h) {
    if (this.qrcode) {
      return <img src={this.qrcodeUrl} />
    }
    if (this.coverImageUrl) {
      return <img src={this.coverImageUrl} style="width:100%;height: 100%;" />
    }

    return <span>Luban H5</span>
  }
}
