export default {
  props: ['page', 'pageIndex'],
  data: () => ({
    editingTitle: '' // 临时缓存当前编辑的 title，点击 Yes 再真正用其更新 page title
  }),
  methods: {
    getTitle () {
      return this.page.title || this.$t('editor.pageManager.title', { index: this.pageIndex })
    }
  },
  render () {
    return (
      <a-popconfirm
        placement="bottom"
        onConfirm={() => {
          this.$emit('editTitle', { newTitle: this.editingTitle, pageIndex: this.pageIndex })
        }}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <a-input
          slot="title"
          value={this.editingTitle}
          size="small"
          onChange={e => {
            this.editingTitle = e.target.value
          }}
        >
        </a-input>
        <a-icon type="edit" onClick={(e) => {
          e.stopPropagation() // 将 click icon 与 click page item 隔离开。编辑标题的同时不要切换页面
          this.editingTitle = this.getTitle()
        }}/>
      </a-popconfirm>

    )
  }
}
