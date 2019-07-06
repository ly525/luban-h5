import Vue from 'vue'
import Element from '../models/element'
import '../styles/index.scss'

export default {
  name: 'Editor',
  components: {
    ShortcutButton: {
      functional: true,
      props: {
        faIcon: {
          required: true,
          type: String
        },
        title: {
          required: true,
          type: String
        },
        clickFn: {
          required: false,
          type: Function
        }
      },
      render: (h, { props, listeners, slots }) => {
        const onClick = props.clickFn || function () {}
        return (
          <a-button
            class="shortcut-button"
            onClick={onClick}
          >
            <i
              class={['shortcut-icon', 'fa', `fa-${props.faIcon}`]}
              aria-hidden='true'
            />
            <span>{ props.title }</span>
          </a-button>
        )
      }
    }
  },
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
    mixinPluginCustomComponents2Editor () {
      const { components } = this.editingElement.editorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    },
    setCurrentEditingElement (element) {
      this.editingElement = element
      this.mixinPluginCustomComponents2Editor()
    },
    /**
     * #!zh: 在左侧或顶部导航上显示可用的组件快捷方式，用户点击之后，即可将其添加到中间画布上
     * #!en: render shortcust at the sidebar or the header. if user click the shortcut, the related plugin will be added to the canvas
     * @param {Object} group: {children, title, icon}
     */
    renderPluginShortcut (group) {
      return group.children.length === 1
        ? this.renderSinglePluginShortcut(group)
        : this.renderMultiPluginShortcuts(group)
    },
    /**
     * #!zh 渲染多个插件的快捷方式
     * #!en render shortcuts for multi plugins
     * @param {Object} group: {children, title, icon}
     */
    renderMultiPluginShortcuts (group) {
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
                  clickFn={this.clone.bind(this, item)}
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
    renderSinglePluginShortcut ({ children }) {
      const [plugin] = children
      return <ShortcutButton
        clickFn={this.clone.bind(this, plugin)}
        title={plugin.title}
        faIcon={plugin.icon}
      />
    },
    /**
     * #!zh: renderCanvas 渲染中间画布
     * elements
     * @param {*} h
     * @param {*} elements
     * @returns
     */
    renderCanvas (h, elements) {
      return (
        <div style={{ height: '100%' }}>
          {elements.map((element, index) => {
            return (() => {
              const data = {
                style: element.getStyle(),
                props: element.pluginProps, // #6 #3
                nativeOn: {
                  click: this.setCurrentEditingElement.bind(this, element)
                }
              }
              return h(element.name, data)
            })()
          })}
        </div>
      )
    },
    renderPreview (h, elements) {
      return (
        <div style={{ height: '100%' }}>
          {elements.map((element, index) => {
            return (() => {
              const data = {
                style: element.getStyle(),
                props: element.pluginProps, // #6 #3
                nativeOn: {}
              }
              return h(element.name, data)
            })()
          })}
        </div>
      )
    },
    renderPluginListPanel () {
      return (
        <a-row gutter={20}>
          {
            this.groups.sort().map(group => (
              <a-col span={12} style={{ marginTop: '10px' }}>
                {this.renderPluginShortcut(group)}
              </a-col>
            ))
          }
        </a-row>
      )
    },
    renderPropsEditorPanel (h) {
      if (!this.editingElement) return (<span>请先选择一个元素</span>)
      const editingElement = this.editingElement
      const propsConfig = editingElement.editorConfig.propsConfig
      return (
        <a-form ref="form" label-width="100px" size="mini" label-position="left">
          {
            Object.keys(propsConfig).map(propKey => {
              const item = propsConfig[propKey]
              // https://vuejs.org/v2/guide/render-function.html
              const data = {
                props: {
                  ...item.prop,
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  value: editingElement.pluginProps[propKey] || item.defaultPropValue
                },
                on: {
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  // input (e) {
                  //   editingElement.pluginProps[propKey] = e.target ? e.target.value : e
                  // }
                  change (e) {
                    editingElement.pluginProps[propKey] = e.target ? e.target.value : e
                  }
                }
              }
              return (
                <a-form-item label={item.label}>
                  { h(item.type, data) }
                </a-form-item>
              )
            })
          }
        </a-form>
      )
    }
  },
  render (h) {
    return (
      <a-layout id="luban-layout" style={{ height: '100vh' }}>
        <a-layout-header class="header">
          <div class="logo">鲁班 H5</div>
          {/* TODO we can show the plugins shortcuts here
          <a-menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', float: 'left', marginLeft: '30%', background: 'transparent' }}
          >
            {
              this.groups.sort().map((group, id) => (
                <a-menu-item key={id} class="transparent-bg">
                  {this.renderPluginShortcut(group)}
                </a-menu-item>
              ))
            }
          </a-menu> */}
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
              <a-menu-item key="pluginList">
                <a-icon type="user" />
                <span>组件列表</span>
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="video-camera" />
                <span>页面管理</span>
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="upload" />
                <span>更多模板</span>
              </a-menu-item>
            </a-menu>
          </a-layout-sider>
          <a-layout-sider width="240" theme='light' style={{ background: '#fff', padding: '0 12px' }}>
            { this.renderPluginListPanel() }
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
                { this.isPreviewMode ? this.renderPreview(h, this.elements) : this.renderCanvas(h, this.elements) }
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
                { this.renderPropsEditorPanel(h) }
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
