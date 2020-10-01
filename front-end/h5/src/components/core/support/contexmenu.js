
/**
 * 右键菜单
 *
 * 效果：
 * - 复制
 * - 删除
 * - 置顶、置底、上移、下移
 *
 * jsx 相关参考链接：
 * onMouseleave: https://github.com/vueComponent/ant-design-vue/blob/master/components/vc-trigger/Trigger.jsx#L205
 *
 */

import './contexmenu.scss'

// 垂直菜单
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

// 水平菜单
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
    return (
      <a-card
        bodyStyle={{ padding: '4px' }}
        class="contextmenu"
      >
        <a-menu
          inlineIndent={4}
          mode="inline"
          onSelect={this.handleSelectMenu}
          class="contextmenu__vertical-menus"
        >
          { contextmenuOptions.map(option => (
            <a-menu-item
              key={option.value}
              data-command={option.value}
              class="contextmenu__vertical-menus__item"
            >{this.$t(option.i18nLabel)}</a-menu-item>
          ))
          }
        </a-menu>
        <a-menu
          mode="horizontal"
          onSelect={this.handleSelectMenu}
          class="contextmenu__horizontal-menus"
        >
          { zindexContextMenu.map(option => (
            <a-menu-item
              key={option.value}
              data-command={option.value}
              class="contextmenu__horizontal-menus__item"
            >{this.$t(option.i18nLabel)}</a-menu-item>
          ))
          }
        </a-menu>
      </a-card>
    )
  }
}
