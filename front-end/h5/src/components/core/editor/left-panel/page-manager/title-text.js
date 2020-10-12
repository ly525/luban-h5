export default {
  props: ['page', 'pageIndex'],
  methods: {
    getTitle () {
      return this.page.title || this.$t('editor.pageManager.title', { index: this.pageIndex })
    }
  },
  render (h) {
    // #!en: Page<Index>
    // #!zh: 第<Index>页面
    return (
      <span>
        <a-badge
          count={this.pageIndex + 1}
          numberStyle={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
        />
        <span class="ml-3">{this.getTitle()}</span>
      </span>
    )
  }
}
