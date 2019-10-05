export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: Number,
      default: 142
    }
  },
  render (h) {
    if (this.item.loading) {
      return <a-spin>
        <a-card hoverable>
          <div
            slot="cover"
            style={{
              height: `${this.height}px`
            }}>
          </div>
        </a-card>
      </a-spin>
    }
    return (
      <a-card
        hoverable
      >
        <div
          slot="cover"
          style={{
            backgroundImage: `url(${this.item.previewURL})`,
            backgroundSize: 'cover',
            height: `${this.height}px`
          }}>
        </div>
      </a-card>
    )
  }
}
