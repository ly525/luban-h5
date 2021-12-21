export default {
  props: {
    elementProps: {
      type: Object,
      default: () => ({
        items: [],
        activeIndex: 0
      })
    }
  },
  computed: {
    innerItems () {
      return this.elementProps.items
    }
  },
  data: () => ({
    current: 1
  }),
  methods: {
    itemRender (current, type, originalElement) {
      if (type === 'prev') {
        return <a-button style={{ marginRight: '8px' }} size="small" icon="minus" onClick={() => this.minus(current)} disabled={this.innerItems.length === 1}></a-button>
      } else if (type === 'next') {
        return <a-button style={{ marginLeft: '8px' }} size="small" icon="plus" onClick={this.add}></a-button>
      }
      return originalElement
    },
    add () {
      // this.$emit('change', {
      //   activeIndex: this.innerItems.length,
      //   items: [
      //     ...this.innerItems,
      //     {
      //       image: '',
      //       value: `选项${this.innerItems.length + 1}-value`,
      //       label: `选项${this.innerItems.length + 1}-label`
      //     }
      //   ]
      // })
      this.elementProps.items.push({
        image: '',
        value: `选项${this.innerItems.length + 1}-value`,
        label: `选项${this.innerItems.length + 1}-label`
      })
    },
    minus (index) {
      if (this.innerItems.length === 1) return
      this.elementProps.items.splice(index, 1)
      // this.elementProps.activeIndex = index > 0 ? index - 1 : 0
      this.elementProps.activeIndex = Math.max(index - 1, 0)
      // const items = this.innerItems.slice(0)
      // items.splice(index, 1)
      // this.$emit('change', {
      //   items,
      //   activeIndex: index > 0 ? index - 1 : 0
      // })
    }
  },
  render () {
    const currentItem = this.innerItems[this.current - 1] || {}
    return <div>
      {
        <a-pagination
          current={this.current}
          onChange={(page) => {
            this.current = page

            this.elementProps.activeIndex = page - 1
            // this.$emit('change', {
            //   items: this.innerItems,
            //   activeIndex: page - 1
            // })
          }}
          size="small"
          total={this.innerItems.length}
          defaultPageSize={1}
          itemRender={this.itemRender}
        />
      }
      <lbs-image-gallery
        style={{ margin: '16px 0' }}
        value={currentItem.image}
        onChange={url => {
          currentItem.image = url
        }}
      />
    </div>
  }

}
