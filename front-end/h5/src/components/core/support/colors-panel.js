export default {
  name: 'colors-panel',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  render () {
    return <div>
      {
        this.value.map((colorString, index) => {
          return <el-color-picker
            size="small"
            value={colorString}
            onChange={newColorString => {
              const colors = this.value.slice(0)
              colors[index] = newColorString
              this.$emit('change', colors)
            }}
          />
        })
      }
    </div>
  }
}
