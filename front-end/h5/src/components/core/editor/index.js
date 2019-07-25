import { mapState, mapActions } from 'vuex'
import undoRedoHistory from '../../../store/plugins/undo-redo/History'
import { getEditorConfigForEditingElement } from '../../../utils/element'

import '../styles/index.scss'

import RenderEditCanvas from './canvas/edit'
import RenderPreviewCanvas from './canvas/preview'
import RenderPropsEditor from './edit-panel/props'
import RenderScriptEditor from './edit-panel/script'
import RenderActoionEditor from './edit-panel/action'
import RenderShortcutsPanel from './shortcuts-panel/index'

const sidebarMenus = [
  {
    label: '组件列表',
    value: 'pluginList',
    antIcon: 'bars'
  },
  {
    label: '页面管理',
    value: 'pageManagement',
    antIcon: 'snippets'
  },
  {
    label: '免费模板',
    value: 'freeTemplate',
    antIcon: 'appstore'
  }
]
export default {
  name: 'Editor',
  components: {},
  data: () => ({
    activeMenuKey: 'pluginList',
    isPreviewMode: false,
    activeTabKey: '属性'
  }),
  computed: {
    ...mapState('editor', {
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages
    })
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'createWork',
      'fetchWork'
    ]),
    /**
     * !#zh 点击插件，copy 其基础数据到组件树（中间画布）
     * #!en click the plugin shortcut, create new Element with the plugin's meta data
     * pluginInfo {Object}: 插件列表中的基础数据, {name}=pluginInfo
     */
    clone ({ name }) {
      const zindex = this.elements.length + 1
      const editorConfig = getEditorConfigForEditingElement(name)
      this.elementManager({
        type: 'add',
        value: { name, zindex, editorConfig }
      })
    },
    _renderMenuContent () {
      switch (this.activeMenuKey) {
        case sidebarMenus[0].value:
          return <RenderShortcutsPanel pluginsList={this.pluginsList} handleClickShortcut={this.clone} />
        case sidebarMenus[1].value:
          return (
            this.pages.map((page, index) => (
              <span style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span>第{index + 1}页</span>
                <a-dropdown trigger={['hover']} placement='bottomCenter'>
                  <a class="ant-dropdown-link" href="#">
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay" onClick={({ key }) => { this.pageManager({ type: key }) }}>
                    <a-menu-item key="add"><a-icon type="user" />新增页面</a-menu-item>
                    <a-menu-item key="copy"><a-icon type="user" />复制页面</a-menu-item>
                    <a-menu-item key="delete"><a-icon type="user" />删除页面</a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            ))
          )
        default:
          return null
      }
    }
  },
  render (h) {
    return (
      <a-layout id="luban-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <div class="logo">鲁班 H5</div>
          {/* TODO we can show the plugins shortcuts here */}
          <a-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', background: 'transparent' }}
          >
            <a-menu-item key="4" class="transparent-bg">
              <a-button-group>
                <a-button class="transparent-bg" style={{ color: 'white' }} type="dashed" size="small" onClick={() => undoRedoHistory.undo()}><i class={['shortcut-icon', 'fa', `fa-mail-reply`]} aria-hidden='true'/> 撤销</a-button>
                <a-button class="transparent-bg" style={{ color: 'white' }} type="dashed" size="small" onClick={() => undoRedoHistory.redo()}><i class={['shortcut-icon', 'fa', `fa-mail-forward`]} aria-hidden='true'/> 重做</a-button>
              </a-button-group>
            </a-menu-item>
            <a-menu-item key="1" class="transparent-bg"><a-button type="primary" size="small">预览</a-button></a-menu-item>
            <a-menu-item key="2" class="transparent-bg"><a-button size="small" onClick={() => this.saveWork()}>保存</a-button></a-menu-item>
            <a-menu-item key="3" class="transparent-bg"><a-button size="small">发布</a-button></a-menu-item>
          </a-menu>
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="160" style="background: #fff" collapsed>
            <a-menu
              mode="inline"
              defaultSelectedKeys={['pluginList']}
              style={{ height: '100%', borderRight: 1 }}
              onSelect={({ key }) => { this.activeMenuKey = key }}
            >
              {
                sidebarMenus.map(menu => (
                  <a-menu-item key={menu.value}>
                    <a-icon type={menu.antIcon} />
                    <span>{menu.label}</span>
                  </a-menu-item>
                ))
              }
            </a-menu>
          </a-layout-sider>
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '12px' }}>
            { this._renderMenuContent() }
          </a-layout-sider>
          <a-layout style="padding: 0 24px 24px">
            <a-layout-content style={{ padding: '24px', margin: 0, minHeight: '280px' }}>
              <div style="text-align: center;">
                <a-radio-group
                  value={this.isPreviewMode}
                  onInput={value => {
                    this.isPreviewMode = value
                  }}
                >
                  <a-radio-button label={false} value={false}>Edit</a-radio-button>
                  <a-radio-button label={true} value={true}>Preview</a-radio-button>
                </a-radio-group>
              </div>
              <div class='canvas-wrapper'>
                {/* { this.isPreviewMode ? this.renderPreview(h, this.elements) : this.renderCanvas(h, this.elements) } */}
                { this.isPreviewMode
                  ? <RenderPreviewCanvas elements={this.elements}/>
                  : <RenderEditCanvas
                    elements={this.elements}
                  />
                }
              </div>
            </a-layout-content>
          </a-layout>
          <a-layout-sider width="340" theme='light' style={{ background: '#fff', padding: '0 12px' }}>
            <a-tabs
              style="height: 100%;"
              tabBarGutter={10}
              onChange={activeTabKey => { this.activeTabKey = activeTabKey }}
            >
              {/*
                #!zh tab 标题：
                #!en tab title
                  ElementUI：label
                  Ant Design Vue：tab
              */}
              <a-tab-pane key="属性">
                <span slot="tab">
                  <a-icon type="apple" />
                  属性
                </span>
                {/* { this.renderPropsEditorPanel(h) } */}
                <RenderPropsEditor/>
              </a-tab-pane>
              <a-tab-pane label="动画" key='动画' tab='动画'>动画</a-tab-pane>
              <a-tab-pane label="动作" key='动作' tab='动作'>{this.activeTabKey === '动作'}{ this.activeTabKey === '动作' && <RenderActoionEditor/> }</a-tab-pane>
              <a-tab-pane label="脚本" key='脚本' tab='脚本'><RenderScriptEditor/></a-tab-pane>
            </a-tabs>
          </a-layout-sider>
        </a-layout>
      </a-layout>
    )
  },
  created () {
    let workId = this.$route.query.workId
    if (workId) {
      // this.$store.dispatch('getWorkById', workId)
      this.fetchWork(workId)
    } else {
      this.createWork()
    }
  }
}
