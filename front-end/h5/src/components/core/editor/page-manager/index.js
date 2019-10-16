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
  methods: {
  },
  render (h) {
    const addPageText = this.$t('editor.pageManager.action.add')
    const copyPageText = this.$t('editor.pageManager.action.add')
    const deletePageText = this.$t('editor.pageManager.action.add')
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
            >
              {/* #!en: Page<Index> */}
              {/* #!zh: 第<Index>页面 */}
              <span>{this.$t('editor.pageManager.title', { index })}</span>
              <a-dropdown trigger={['hover']} placement='bottomCenter'>
                <a class="ant-dropdown-link" href="#"><a-icon type="down" /></a>
                <a-menu slot="overlay" onClick={({ key }) => { this.$emit('selectMenuItem', key) }}>
                  <a-menu-item key="add"><a-icon type="user" />{addPageText}</a-menu-item>
                  <a-menu-item key="copy"><a-icon type="user" />{copyPageText}</a-menu-item>
                  <a-menu-item key="delete"><a-icon type="user" />{deletePageText}</a-menu-item>
                </a-menu>
              </a-dropdown>
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
