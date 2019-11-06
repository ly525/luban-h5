export default {
  props: {
    pages: {
      required: false,
      type: Array,
      default: () => []
    },
    editingPage: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    hoverIndex: -1, // 显示编辑按钮
    editingTitle: '' // 临时缓存当前编辑的 title，点击 Yes 再真正用其更新 page title
  }),
  methods: {
    getTitle (page, index) {
      return page.title || this.$t('editor.pageManager.title', { index })
    },
    _renderEditTitle (page, index) {
      return (
        <a-popconfirm
          placement="bottom"
          onConfirm={() => {
            this.$emit('editTitle', { newTitle: this.editingTitle, pageIndexForEditingTitle: index })
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
            this.editingTitle = this.getTitle(page, index)
          }}/>
        </a-popconfirm>
      )
    },
    _renderTitleMenu (page, index) {
      const addPageText = this.$t('editor.pageManager.action.add')
      const copyPageText = this.$t('editor.pageManager.action.copy')
      const deletePageText = this.$t('editor.pageManager.action.delete')
      return (
        <a-dropdown trigger={['hover']} placement='bottomCenter'>
          <a class="ant-dropdown-link" href="#" class="ml-2"><a-icon type="down" /></a>
          <a-menu slot="overlay" onClick={({ key }) => this.$emit('selectMenuItem', key)}>
            <a-menu-item key="add"><a-icon type="plus" />{addPageText}</a-menu-item>
            <a-menu-item key="copy"><a-icon type="copy" />{copyPageText}</a-menu-item>
            <a-menu-item key="delete"><a-icon type="delete" />{deletePageText}</a-menu-item>
          </a-menu>
        </a-dropdown>
      )
    },
    onLeave () {
      this.hoverIndex = -1
    }
  },
  render (h) {
    const addPageText = this.$t('editor.pageManager.action.add')
    return (
      <div class="page-manager-panel">
        {
          this.pages.map((page, index) => (
            <span
              class={[
                'cursor-pointer',
                'page-manager-panel__item',
                page.uuid === this.editingPage.uuid && 'active'
              ]}
              onClick={() => { this.$emit('selectPage', index) }}
              // https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VHover/VHover.ts
              onMouseenter={() => { this.hoverIndex = index }}
            >
              {/* #!en: Page<Index> */}
              {/* #!zh: 第<Index>页面 */}
              <span>
                <a-badge
                  count={index + 1}
                  numberStyle={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                />
                <span class="ml-3">{this.getTitle(page, index)}</span>
              </span>
              <span>
                {this.hoverIndex === index && this._renderEditTitle(page, index)}
                {this._renderTitleMenu(page, index)}
              </span>
            </span>
          ))
        }
        <a-button
          icon="plus"
          type="dashed"
          class="footer-actions"
          onClick={() => { this.$emit('selectMenuItem', 'add') }}
        >{addPageText}</a-button>
      </div>
    )
  }
}
