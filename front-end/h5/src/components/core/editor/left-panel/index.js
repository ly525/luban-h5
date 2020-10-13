import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import RenderPageTree from './page-tree/index'

export default {
  name: 'EditorLeftPanel',
  render (h) {
    return (
      <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '12px' }}>
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
        >
          <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
            <RenderShortcutsPanel />
          </a-tab-pane>
          <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager />
          </a-tab-pane>
          <a-tab-pane key='page-tree' tab={this.$t('editor.sidebar.tree')}>
            <RenderPageTree />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    )
  }
}
