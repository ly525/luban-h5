export default {
  render () {
    return (
      <div class="plugin-usage-tip ">
        <a-icon type="info-circle" />
        {/* 使用提示: 点击或拖拽 组件即可 */}
        {/* Tip: just click/drag component */}
        <i18n path="editor.tip.componentUsage" tag="span" class="ml-1">
          <strong>{ this.$t('editor.tip.click') }</strong>{ this.$t('editor.tip.click') }
        </i18n>
      </div>
    )
  }
}
