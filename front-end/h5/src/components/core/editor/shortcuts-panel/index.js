import ShortcutButton from './shortcut-button'
export default {
  props: {
    groups: {
      required: false,
      type: Array,
      default: () => []
    },
    handleClickShortcut: {
      type: Function
    }
  },
  methods: {
    onClickShortcut (item) {
      if (this.handleClickShortcut) {
        this.handleClickShortcut(item)
      }
    },
    /**
     * #!zh 渲染多个插件的快捷方式
     * #!en render shortcuts for multi plugins
     * @param {Object} group: {children, title, icon}
     */
    renderMultiShortcuts (group) {
      const plugins = group.children
      return <a-popover
        placement="bottom"
        class="shortcust-button"
        trigger="hover">
        <a-row slot="content" gutter={20} style={{ width: '400px' }}>
          {
            plugins.sort().map(item => (
              <a-col span={6}>
                <ShortcutButton
                  clickFn={this.onClickShortcut.bind(this, item)}
                  title={item.title}
                  faIcon={item.icon}
                />
              </a-col>
            ))
          }
        </a-row>
        <ShortcutButton
          title={group.title}
          faIcon={group.icon}
        />
      </a-popover>
    },
    /**
     * #!zh: 渲染单个插件的快捷方式
     * #!en: render shortcut for single plugin
     * @param {Object} group: {children, title, icon}
     */
    renderSingleShortcut ({ children }) {
      const [plugin] = children
      return <ShortcutButton
        clickFn={this.onClickShortcut.bind(this, plugin)}
        title={plugin.title}
        faIcon={plugin.icon}
      />
    },
    /**
     * #!zh: 在左侧或顶部导航上显示可用的组件快捷方式，用户点击之后，即可将其添加到中间画布上
     * #!en: render shortcust at the sidebar or the header. if user click the shortcut, the related plugin will be added to the canvas
     * @param {Object} group: {children, title, icon}
     */
    renderShortCutsPanel (groups) {
      return (
        <a-row gutter={20}>
          {
            groups.sort().map(group => (
              <a-col span={12} style={{ marginTop: '10px' }}>
                {
                  group.children.length === 1
                    ? this.renderSingleShortcut(group)
                    : this.renderMultiShortcuts(group)
                }
              </a-col>
            ))
          }
        </a-row>
      )
    }
  },
  render (h) {
    return this.renderShortCutsPanel(this.groups)
  }
}
