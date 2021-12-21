export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: Number,
      default: 240
    }
  },
  render (h) {
    return (
      <a-card
        hoverable
      >
        <video
          controls
          slot="cover"
          src={this.item.url || this.item.url}
          style={{
            height: `${this.height}px`
          }}>
        </video>
      </a-card>
    )
  }
}
