export default {
  render () {
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
  }
}
