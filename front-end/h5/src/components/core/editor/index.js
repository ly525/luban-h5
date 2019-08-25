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
import PreviewDialog from './modals/preview.vue'

import LogoOfHeader from '@/components/common/header/logo.js'
import ExternalLinksOfHeader from '@/components/common/header/links.js'

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

const fixedTools = [
  {
    'tooltip': '撤消', // TODO 支持快捷键
    'text': '撤消',
    'icon': 'mail-reply',
    'action': () => undoRedoHistory.undo()
  },
  {
    'tooltip': '恢复',
    'text': '恢复',
    'icon': 'mail-forward',
    'action': () => undoRedoHistory.redo()
  },
  {
    'tooltip': '刷新预览',
    'text': '刷新预览',
    'icon': 'eye',
    'action': function () { this.previewVisible = true }
  },
  {
    'tooltip': '复制当前页',
    'text': '复制当前页',
    'icon': 'copy',
    'action': function () { this.pageManager({ type: 'copy' }) }
  },
  {
    'tooltip': '导入PSD',
    'text': 'Ps',
    'icon': '',
    'action': '',
    'disabled': true
  },
  {
    'tooltip': '放大画布',
    'text': '放大画布',
    'icon': 'plus',
    'action': function () { this.scaleRate += 0.25 }
  },
  {
    'tooltip': '缩小画布',
    'text': '缩小画布',
    'icon': 'minus',
    'action': function () { this.scaleRate -= 0.25 }
  }
]

export default {
  name: 'Editor',
  components: {
    LogoOfHeader,
    ExternalLinksOfHeader
  },
  data: () => ({
    activeMenuKey: 'pluginList',
    isPreviewMode: false,
    activeTabKey: '属性',
    previewVisible: false,
    scaleRate: 1
  }),
  computed: {
    ...mapState('editor', {
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work
    }),
    ...mapState('loading', {
      saveWork_loading: state => state.saveWork_loading,
      setWorkAsTemplate_loading: state => state.setWorkAsTemplate_loading
    })
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'createWork',
      'fetchWork',
      'setWorkAsTemplate'
    ]),
    ...mapActions('loading', {
      updateLoading: 'update'
    }),
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
      <a-layout id="luban-editor-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <LogoOfHeader />
          {/* TODO we can show the plugins shortcuts here */}
          <a-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', background: 'transparent' }}
          >
            <a-menu-item key="1" class="transparent-bg"><a-button type="primary" size="small" onClick={() => { this.previewVisible = true }}>预览</a-button></a-menu-item>
            <a-menu-item key="2" class="transparent-bg"><a-button size="small" onClick={() => this.saveWork()} loading={this.saveWork_loading}>保存</a-button></a-menu-item>
            {/* <a-menu-item key="3" class="transparent-bg"><a-button size="small">发布</a-button></a-menu-item> */}
            <a-menu-item key="3" class="transparent-bg">
              <a-dropdown-button onClick={() => {}} size="small">
                发布
                <a-menu slot="overlay" onClick={({ key }) => {
                  switch (key) {
                    case 'setAsTemplate':
                      this.updateLoading({ type: 'setWorkAsTemplate_loading', value: true })
                      this.saveWork().then(() => {
                        this.setWorkAsTemplate()
                      })
                  }
                }}>
                  <a-menu-item key="setAsTemplate">
                    <a-spin spinning={this.setWorkAsTemplate_loading} size="small">
                      <a-icon type="cloud-upload" />设置为模板
                    </a-spin>
                  </a-menu-item>
                  {/* <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item> */}
                  {/* <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item> */}
                </a-menu>
              </a-dropdown-button>
            </a-menu-item>
          </a-menu>
          <ExternalLinksOfHeader />
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
                  size="small"
                  value={this.isPreviewMode}
                  onInput={value => {
                    this.isPreviewMode = value
                  }}
                >
                  <a-radio-button label={false} value={false}>编辑模式</a-radio-button>
                  <a-radio-button label={true} value={true}>预览模式</a-radio-button>
                </a-radio-group>
              </div>
              <div class='canvas-wrapper' style={{ transform: `scale(${this.scaleRate})` }}>
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
          <a-layout-sider width="40" theme='light' style={{ background: '#fff', border: '1px solid #eee' }}>
            {/* <div>
              <a-button shape="circle" icon="search" type="link" />
            </div> */}
            <a-button-group style={{ display: 'flex', flexDirection: 'column' }}>
              {
                fixedTools.map(tool => (
                  <a-tooltip effect="dark" placement="left" title={tool.tooltip}>
                    <a-button block class="transparent-bg" type="link" size="small" style={{ height: '40px', color: '#000' }} onClick={() => tool.action && tool.action.call(this) } disabled={!!tool.disabled}>
                      { tool.icon ? <i class={['shortcut-icon', 'fa', `fa-${tool.icon}`]} aria-hidden='true'/> : tool.text }
                    </a-button>
                  </a-tooltip>
                ))
              }
              <div style={{ fontSize: '12px', textAlign: 'center' }}>{this.scaleRate * 100}%</div>
            </a-button-group>
          </a-layout-sider>
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
        {
          this.previewVisible && <PreviewDialog work={this.work} visible={this.previewVisible} handleClose={() => { this.previewVisible = false }} />
        }
      </a-layout>
    )
  },
  created () {
    let workId = this.$route.params.workId
    console.log(workId)
    if (workId) {
      this.fetchWork(workId)
    } else {
      this.createWork()
    }
  }
}
