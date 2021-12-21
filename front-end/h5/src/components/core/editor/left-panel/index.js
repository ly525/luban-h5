import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import RenderPageTree from './page-tree/index'
import RenderPagePreferences from './preferences/index'
import RenderDataSourcePanel from 'core/editor/data-source/index.js'

export default {
  name: 'EditorLeftPanel',
  render (h) {
    return (
      <a-layout-sider width="300" theme='light' style={{ background: '#fff', padding: '12px', paddingLeft: 0 }}>
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
          tabPosition="left"
        >
          <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
            <RenderShortcutsPanel />
          </a-tab-pane>
          <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager />
          </a-tab-pane>
          <a-tab-pane key='preferences' tab={this.$t('editor.sidebar.preferences')}>
            <RenderPagePreferences />
          </a-tab-pane>
          <a-tab-pane key='page-tree' tab={this.$t('editor.sidebar.tree')}>
            <RenderPageTree />
          </a-tab-pane>
          <a-tab-pane key='data-source' tab="数据源">
            <RenderDataSourcePanel />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    )
  }
}
