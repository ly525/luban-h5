
/**
 * jsx 相关参考链接：
 * onMouseleave: https://github.com/vueComponent/ant-design-vue/blob/master/components/vc-trigger/Trigger.jsx#L205
 *
 */
const contextmenuOptions = [
  {
    i18nLabel: 'editor.centerPanel.contextMenu.copy',
    label: '复制',
    value: 'copy'
  },
  {
    i18nLabel: 'editor.centerPanel.contextMenu.delete',
    label: '删除',
    value: 'delete'
  }
]

const zindexContextMenu = [
  {
    i18nLabel: 'editor.centerPanel.contextMenu.moveToTop',
    label: '置顶',
    value: 'move2Top'
  },
  {
    i18nLabel: 'editor.centerPanel.contextMenu.moveToBottom',
    label: '置底',
    value: 'move2Bottom'
  },
  {
    i18nLabel: 'editor.centerPanel.contextMenu.moveUp',
    label: '上移',
    value: 'addZindex'
  },
  {
    i18nLabel: 'editor.centerPanel.contextMenu.moveDown',
    label: '下移',
    value: 'minusZindex'
  }
]

const horizontalMenuStyle = {
  height: '35px',
  lineHeight: '35px',
  border: 'none',
  borderTop: '1px solid #eee'
}

export default {
  props: {
    position: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelectMenu ({ item, key, selectedKeys }) {
      this.$emit('select', { item, key, selectedKeys }) // elementManager({ type: key })
    }
  },
  render (h) {
    const contextStyle = {
      left: this.position[0] + 'px',
      top: this.position[1] + 'px',
      userSelect: 'none',
      position: 'absolute',
      zIndex: 999
    }
    return (
      <a-card
        bodyStyle={{ padding: '4px' }}
        ref="contextmenu"
        style={contextStyle}
      >
        <a-menu
          inlineIndent={4}
          mode="inline"
          onSelect={this.handleSelectMenu}
          style={{ border: 'none' }}
        >
          { contextmenuOptions.map(option => (
            <a-menu-item
              key={option.value}
              data-command={option.value}
              style={{ height: '30px', lineHeight: '30px', margin: 0 }}
            >{this.$t(option.i18nLabel)}</a-menu-item>
          ))
          }
        </a-menu>
        <a-menu
          mode="horizontal"
          ref="contextmenu"
          onSelect={this.handleSelectMenu}
          style={horizontalMenuStyle}
        >
          { zindexContextMenu.map(option => (
            <a-menu-item
              key={option.value}
              data-command={option.value}
              style={{ height: '35px', lineHeight: '35px', padding: '0 4px 4px' }}
            >{this.$t(option.i18nLabel)}</a-menu-item>
          ))
          }
        </a-menu>
      </a-card>
    )
  }
}
