import { mapState, mapActions } from 'vuex'
import hotkeys from 'hotkeys-js'
import undoRedoHistory from '../../../store/plugins/undo-redo/History'

import '../styles/index.scss'
import 'animate.css'

import RenderEditCanvas from './canvas/edit'
import RenderPreviewCanvas from './canvas/preview'
import RenderPropsEditor from './edit-panel/props'
import RenderScriptEditor from './edit-panel/script'
import RenderAnimationEditor from './edit-panel/animation'
import RenderActoionEditor from './edit-panel/action'
import RenderBackgroundEditor from './edit-panel/background'
import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import PreviewDialog from './modals/preview.vue'

import LogoOfHeader from '@/components/common/header/logo.js'
import ExternalLinksOfHeader from '@/components/common/header/links.js'
import LangSelect from '@/components/common/header/LangSelect.vue'
import Feedback from '@/components/common/feedback/index'

// const sidebarMenus = [
//   {
//     i18nLabel: 'editor.sidebar.components',
//     label: '组件列表',
//     value: 'pluginList',
//     antIcon: 'bars'
//   },
//   {
//     i18nLabel: 'editor.sidebar.pages',
//     label: '页面管理',
//     value: 'pageManagement',
//     antIcon: 'snippets'
//   },
//   {
//     i18nLabel: 'editor.sidebar.templates',
//     label: '免费模板',
//     value: 'freeTemplate',
//     antIcon: 'appstore'
//   }
// ]

const fixedTools = [
  {
    i18nTooltip: 'editor.fixedTool.undo',
    icon: 'mail-reply',
    action: () => undoRedoHistory.undo(),
    hotkey: 'ctrl&z,⌘&z',
    hotkeyTooltip: '(ctrl+z)'
  },
  {
    i18nTooltip: 'editor.fixedTool.redo',
    icon: 'mail-forward',
    action: () => undoRedoHistory.redo(),
    hotkey: 'ctrl&y,⌘&u',
    hotkeyTooltip: '(ctrl+y)'
  },
  {
    i18nTooltip: 'editor.fixedTool.preview',
    icon: 'eye',
    action: function () { this.previewVisible = true }
  },
  {
    i18nTooltip: 'editor.fixedTool.copyCurrentPage',
    icon: 'copy',
    action: function () { this.pageManager({ type: 'copy' }) },
    hotkey: 'ctrl&c,⌘&c'
  },
  {
    i18nTooltip: 'editor.fixedTool.copyCurrentElement',
    icon: 'copy',
    action: function () { this.elementManager({ type: 'copy' }) }
  },
  {
    i18nTooltip: 'editor.fixedTool.importPSD',
    text: 'Ps',
    icon: '', // 优先级: icon > text > i18nTooltip
    action: '',
    disabled: true
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomOut',
    icon: 'plus',
    action: function () { this.scaleRate += 0.25 },
    hotkey: 'ctrl&=,⌘&=',
    hotkeyTooltip: '(ctrl +)'
  },
  {
    i18nTooltip: 'editor.fixedTool.zoomIn',
    icon: 'minus',
    action: function () { this.scaleRate -= 0.25 },
    hotkey: 'ctrl&-,⌘&-',
    hotkeyTooltip: '(ctrl -)'
  },
  {
    i18nTooltip: 'editor.fixedTool.issues',
    icon: 'question',
    action: function () { window.open('https://github.com/ly525/luban-h5/issues/110') }
  }
]

export default {
  name: 'Editor',
  components: {
    LogoOfHeader,
    ExternalLinksOfHeader,
    LangSelect
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
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work
    }),
    ...mapState('loading', [
      'saveWork_loading',
      'previewWork_loading',
      'setWorkAsTemplate_loading',
      'uploadWorkCover_loading'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'createWork',
      'fetchWork',
      'setWorkAsTemplate',
      'setEditingElement',
      'setEditingPage'
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
      this.elementManager({
        type: 'add',
        value: { name }
      })
    },
    /**
     * #!zh: 设置 背景图tab 作为 active tab
     * #!en: set background(bg) tab as active tab
     */
    setActiveTab (activeTabKey) {
      this.activeTabKey = activeTabKey
    },
    _renderMenuContent () {
      return (
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
        >
          <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
            <div class="plugin-usage-tip ">
              <a-icon type="info-circle" />
              {/* <span class="ml-1">使用提示: <strong>点击</strong>组件即可</span> */}
              {/* Tip: just click on component */}
              <i18n path="editor.tip.componentUsage" tag="span" class="ml-1">
                <strong>{ this.$t('editor.tip.click') }</strong>{ this.$t('editor.tip.click') }
              </i18n>
            </div>
            <RenderShortcutsPanel pluginsList={this.pluginsList} handleClickShortcut={this.clone} />
          </a-tab-pane>
          <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager
              pages={this.pages}
              editingPage={this.editingPage}
              onSelectMenuItem={(menuKey) => {
                this.pageManager({ type: menuKey })
              }}
              onEditTitle={({ pageIndexForEditingTitle, newTitle }) => {
                this.pageManager({ type: 'editTitle', value: { pageIndexForEditingTitle, newTitle } })
                this.saveWork({ isSaveCover: false })
              }}
              onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
            />
          </a-tab-pane>
        </a-tabs>
      )
      // switch (this.activeMenuKey) {
      //   case sidebarMenus[0].value:
      //     return (
      //       <a-tabs
      //         style="height: 100%;"
      //         tabBarGutter={10}
      //       >
      //         <a-tab-pane key="plugin-list" tab={this.$t('editor.sidebar.components')}>
      //           <RenderShortcutsPanel pluginsList={this.pluginsList} handleClickShortcut={this.clone} />
      //         </a-tab-pane>
      //         <a-tab-pane key='page-manager' tab={this.$t('editor.sidebar.pages')}>
      //           <RenderPageManager
      //             pages={this.pages}
      //             editingPage={this.editingPage}
      //             onSelectMenuItem={(menuKey) => {
      //               this.pageManager({ type: menuKey })
      //             }}
      //             onEditTitle={({ pageIndexForEditingTitle, newTitle }) => {
      //               this.pageManager({ type: 'editTitle', value: { pageIndexForEditingTitle, newTitle } })
      //               this.saveWork({ isSaveCover: false })
      //             }}
      //             onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
      //           />
      //         </a-tab-pane>
      //       </a-tabs>
      //     )
      //   case sidebarMenus[1].value:
      //     return (
      //       <RenderPageManager
      //         pages={this.pages}
      //         editingPage={this.editingPage}
      //         onSelectMenuItem={(menuKey) => {
      //           this.pageManager({ type: menuKey })
      //         }}
      //         onSelectPage={(pageIndex) => { this.setEditingPage(pageIndex) }}
      //       />
      //     )
      //   default:
      //     return null
      // }
    }
  },
  mounted () {
    fixedTools.map(tool => {
      tool.hotkey && hotkeys(tool.hotkey, { splitKey: '&' }, (event, handler) => {
        event.preventDefault()
        event.stopPropagation()
        tool.action && tool.action.call(this)
      })
    })
  },
  render (h) {
    return (
      <a-layout id="luban-editor-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <LogoOfHeader />
          <LangSelect style="float: right;cursor: pointer;" />
          {/* we can show the plugins shortcuts here */}
          <a-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'right', background: 'transparent' }}
          >
            {/* 保存、预览、发布、设置为模板 */}
            <a-menu-item key="1" class="transparent-bg"><a-button type="primary" size="small" onClick={() => { this.saveWork({ loadingName: 'previewWork_loading' }).then(() => { this.previewVisible = true }) }} loading={this.previewWork_loading}>{this.$t('editor.header.preview')}</a-button></a-menu-item>
            <a-menu-item key="2" class="transparent-bg"><a-button size="small" onClick={() => this.saveWork({ isSaveCover: true })} loading={this.saveWork_loading || this.uploadWorkCover_loading}>{this.$t('editor.header.save')}</a-button></a-menu-item>
            {/* <a-menu-item key="3" class="transparent-bg"><a-button size="small">发布</a-button></a-menu-item> */}
            <a-menu-item key="3" class="transparent-bg">
              <a-dropdown-button onClick={() => {}} size="small">
                {/* 发布 */}
                {this.$t('editor.header.publish')}
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
                      {/* 设置为模板 */}
                      <a-icon type="cloud-upload" />{this.$t('editor.header.setAsTemplate')}
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
          {/* <a-layout-sider collapsedWidth={40} style="background: #fff" collapsed>
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
                    <span>{this.$t(menu.i18nLabel)}</span>
                  </a-menu-item>
                ))
              }
            </a-menu>
          </a-layout-sider> */}
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '12px' }}>
            { this._renderMenuContent() }
          </a-layout-sider>
          <a-layout id="canvas-outer-wrapper">
            <div class="mode-toggle-wrapper">
              <a-radio-group
                size="small"
                value={this.isPreviewMode}
                onInput={isPreviewMode => {
                  this.isPreviewMode = isPreviewMode
                  if (isPreviewMode) {
                    // 当切换到预览模式的时候，清空当前编辑元素
                    this.setEditingElement() // 相当于  setEditingElement(null)
                  }
                }}
              >
                {/* 编辑模式、预览模式 */}
                <a-radio-button label={false} value={false}>{this.$t('editor.centerPanel.mode.edit')}</a-radio-button>
                <a-radio-button label={true} value={true}>{this.$t('editor.centerPanel.mode.preview')}</a-radio-button>
              </a-radio-group>
            </div>
            <a-layout-content style={{ transform: `scale(${this.scaleRate})`, 'transform-origin': 'center top' }}>
              <div class='canvas-wrapper' style={{
                height: `${this.work.height}px`
              }}>
                {/* { this.isPreviewMode ? this.renderPreview(h, this.elements) : this.renderCanvas(h, this.elements) } */}
                { this.isPreviewMode
                  ? <RenderPreviewCanvas elements={this.elements}/>
                  : <RenderEditCanvas
                    class="edit-mode"
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
                  <a-tooltip effect="dark" placement="left" title={this.$t(tool.i18nTooltip, { hotkey: tool.hotkeyTooltip })}>
                    <a-button block class="transparent-bg" type="link" size="small" style={{ height: '40px', color: '#000' }} onClick={() => tool.action && tool.action.call(this) } disabled={!!tool.disabled}>
                      { tool.icon ? <i class={['shortcut-icon', 'fa', `fa-${tool.icon}`]} aria-hidden='true'/> : (tool.text || this.$t(tool.i18nTooltip)) }
                    </a-button>
                    { tool.icon === 'minus' && <div style={{ fontSize: '12px', textAlign: 'center' }}>{this.scaleRate * 100}%</div> }
                  </a-tooltip>
                ))
              }
            </a-button-group>
          </a-layout-sider>
          <a-layout-sider width="320" theme='light' style={{ background: '#fff', padding: '0 0 0 12px' }}>
            <a-tabs
              style="height: 100%;"
              tabBarGutter={10}
              defaultActiveKey={this.activeTabKey}
              activeKey={this.activeTabKey}
              onChange={this.setActiveTab}
            >
              {/*
                #!zh tab 标题：
                #!en tab title
                  ElementUI：label
                  Ant Design Vue：tab
              */}
              <a-tab-pane key="属性"><span slot="tab">{this.$t('editor.editPanel.tab.prop')}</span><RenderPropsEditor/></a-tab-pane>
              <a-tab-pane label="动画" key='动画' tab={this.$t('editor.editPanel.tab.animation')}><RenderAnimationEditor /></a-tab-pane>
              <a-tab-pane label="动作" key='动作' tab={this.$t('editor.editPanel.tab.action')}>{ this.activeTabKey === '动作' && <RenderActoionEditor/> }</a-tab-pane>
              <a-tab-pane label="脚本" key='脚本' tab={this.$t('editor.editPanel.tab.script')}><RenderScriptEditor/></a-tab-pane>
              <a-tab-pane label="背景" key='background' tab={this.$t('editor.editPanel.tab.background')}>{ this.activeTabKey === 'background' && <RenderBackgroundEditor/> }</a-tab-pane>
            </a-tabs>
          </a-layout-sider>

        </a-layout>
        {
          <PreviewDialog
            work={this.work}
            visible={this.previewVisible}
            handleClose={() => { this.previewVisible = false }}
          />
        }
        <Feedback />
      </a-layout>
    )
  },
  created () {
    // event bus for editor
    window.getEditorApp = this
    let workId = this.$route.params.workId
    if (workId) {
      this.fetchWork(workId).then(() => this.setActiveTab('background'))
    } else {
      this.$message.error('no work id!')
    }

    window.getEditorApp.$on('setEditingElement', ({ name }) => {
      this.setActiveTab(name === 'lbp-background' ? 'background' : '属性')
    })
  }
}
