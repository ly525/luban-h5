export default {
  name: 'lbs-prop-text-enum-editor',
  render () {
    return <div>
      {
        this.innerItems.map((item, index) => (
          <div>
            <a-input value={item.value} onChange={e => { item.value = e.target.value }}></a-input>
            <a-button type="dashed" shape="circle" icon="plus" onClick={this.add} />
            <a-button type="dashed" shape="circle" icon="minus" onClick={(item, index) => this.minus(item, index)} />
          </div>
        ))
      }
    </div>
  },
  props: {
    value: {
      type: Array,
      default: () => [{
        value: 'default',
        label: 'default'
      }]
    }
  },
  computed: {
    innerItems: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    add () {
      this.$emit('change', [
        ...this.innerItems,
        {
          value: `选项${this.innerItems.length + 1}`,
          label: `选项${this.innerItems.length + 1}-label`
        }
      ])
    },
    minus (item, index) {
      const items = this.innerItems.slice(0)
      items.splice(index, 1)
      this.$emit('change', items)
    }
  }
}
