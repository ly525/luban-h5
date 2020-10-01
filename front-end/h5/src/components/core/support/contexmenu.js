
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

import { mapState } from 'vuex'
import './contexmenu.scss'

function isRegExp (value) {
  return value instanceof RegExp
}

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
  },
  /**
   * contextMenu 白名单，只有匹配白名单列表里的元素，才会显示该选项
   * 支持正则、数组
   * 数组：[ElementName]
   * 正则：RegExp
   */
  {
    i18nLabel: 'editor.centerPanel.contextMenu.showOnlyButton',
    label: 'showOnlyButton',
    value: 'showOnlyButton',
    elementWhiteList: ['lbp-button']
  },
  /**
   * contextMenu 黑名单，在黑名单列表里的元素，不会显示该选项
   * 支持正则、数组
   * 数组：[ElementName]
   * 正则：RegExp
   */
  {
    i18nLabel: 'editor.centerPanel.contextMenu.showExcludePicture',
    label: 'showExcludePicture',
    value: 'showExcludePicture',
    elementBlackList: /^lbp-picture/
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
  computed: {
    ...mapState('editor', ['editingElement', 'work']),
    /**
     * 做一下扩展，提供：黑白名单，来针对某些特定组件，展示特定右键菜单
     * TODO：后期提供如下方式，来扩展右键菜单
        window.GlobalLuban.contextmenu.registerMenu({
          label: '复制',
          value: 'copy',
          elementWhiteList: Array || RegExp
          elementBlackList: Array || RegExp
        })
     */
    filteredOptions () {
      const elementName = this.editingElement.name
      const filteredOptions = contextmenuOptions.filter(option => {
        const wl = option.elementWhiteList
        const bl = option.elementBlackList
        if (wl) {
          if (Array.isArray(wl)) return wl.includes(elementName)
          if (isRegExp(wl)) return wl.test(elementName)
        }
        if (bl) {
          if (Array.isArray(bl)) return !bl.includes(elementName)
          debugger
          if (isRegExp(bl)) return !bl.test(elementName)
        }
        return true
      })
      return filteredOptions
    }
  },
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
          {
            this.filteredOptions.map(option => (
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
