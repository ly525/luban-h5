import Vue from 'vue'
import Element from '../models/element'
import '../styles/index.scss'

import RenderEditCanvas from './canvas/edit'
import RenderPreviewCanvas from './canvas/preview'
import RenderPropsEditor from './edit-panel/props'
import RenderShortcutsPanel from './shortcuts-panel/index'

const sidebarMenus = [
  {
    label: '组件列表',
    value: 'pluginList',
    antIcon: 'user'
  },
  {
    label: '页面管理',
    value: 'pageManagement',
    antIcon: 'copy'
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
    pages: [],
    elements: [],
    editingElement: null,
    isPreviewMode: false
  }),
  methods: {
    getEditorConfig (pluginName) {
      // const pluginCtor = Vue.options[pluginName]
      // const pluginCtor = this.$options.components[pluginName]
      const PluginCtor = Vue.component(pluginName)
      return new PluginCtor().$options.editorConfig
    },
    /**
     * !#zh 点击插件，copy 其基础数据到组件树（中间画布）
     * #!en click the plugin shortcut, create new Element with the plugin's meta data
     * pluginInfo {Object}: 插件列表中的基础数据, {name}=pluginInfo
     */
    clone ({ name }) {
      const zindex = this.elements.length + 1
      // const defaultPropsValue = this.getPropsDefaultValue(name)
      const editorConfig = this.getEditorConfig(name)
      this.elements.push(new Element({ name, zindex, editorConfig }))
    },
    setCurrentEditingElement (element) {
      this.editingElement = element
    },
    handleClickCanvas (e) {
      if (!e.target.classList.contains('element-on-edit-canvas')) {
        this.editingElement = null
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
            <a-menu-item key="1" class="transparent-bg"><a-button type="primary" size="small">预览</a-button></a-menu-item>
            <a-menu-item key="2" class="transparent-bg"><a-button size="small">保存</a-button></a-menu-item>
            <a-menu-item key="3" class="transparent-bg"><a-button size="small">发布</a-button></a-menu-item>
          </a-menu>
        </a-layout-header>
        <a-layout>
          <a-layout-sider width="160" style="background: #fff">
            <a-menu onSelect={val => { this.activeMenuKey = val }} mode="inline" defaultSelectedKeys={['pluginList']} style={{ height: '100%', borderRight: 1 }}>
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
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '0 12px' }}>
            <RenderShortcutsPanel groups={this.groups} handleClickShortcut={this.clone} />
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
                    handleClickElementProp={this.setCurrentEditingElement}
                    handleClickCanvasProp={this.handleClickCanvas}
                    editingElement={this.editingElement}
                  />
                }
              </div>
            </a-layout-content>
          </a-layout>
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '0 12px' }}>
            <a-tabs type="card" style="height: 100%;">
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
                <RenderPropsEditor editingElement={this.editingElement} />
              </a-tab-pane>
              <a-tab-pane label="动画" key='动画' tab='动画'>动画</a-tab-pane>
              <a-tab-pane label="动作" key='动作' tab='动作'>动作</a-tab-pane>
            </a-tabs>
          </a-layout-sider>
        </a-layout>
      </a-layout>
    )
  }
}
