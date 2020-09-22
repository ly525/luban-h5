export default {
  name: 'lbp-slot-container',
  extra: {
    defaultStyle: {
      width: 320,
      height: 150
    }
  },
  render () {
    return <div class="slot-container" style="border: 1px dashed red;">{this.$slots.default}</div>
  },
  props: {
    children: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
  })
}
