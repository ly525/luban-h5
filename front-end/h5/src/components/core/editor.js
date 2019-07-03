import Vue from 'vue'
import Element from './models/element'

export default {
  name: 'Editor',
  components: {
  },
  data: () => ({
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
     * 在左侧或顶部导航上显示可用的组件快捷方式，用户点击之后，即可将其添加到中间画布上
     * @param {Object} group: {children, title, icon}
     */
    renderPluginShortcut (group) {
      return group.children.length === 1
        ? this.renderSinglePluginShortcut(group)
        : this.renderMultiPluginShortcuts(group)
    },
    /**
     * 渲染多个插件的快捷方式
     * @param {Object} group: {children, title, icon}
     */
    renderMultiPluginShortcuts (group) {
      const plugins = group.children
      return <el-popover
        placement="bottom"
        width="400"
        trigger="hover">
        {
          plugins.sort().map(item => (
            <el-button
              class='ma-0 no-border-radius'
              onClick={this.clone.bind(this, item)}
            >
              <i
                class={['fa', `fa-${item.icon}`]}
                aria-hidden='true'
                style='display: block;font-size: 16px;margin-bottom: 10px;'
              />
              <span>{ item.title }</span>
            </el-button>
          ))
        }
        <el-button slot="reference" class='ma-0 no-border-radius'>
          <i
            class={['fa', `fa-${group.icon}`]}
            aria-hidden='true'
            style='display: block;font-size: 16px;margin-bottom: 10px;'
          />
          <span class="plugin-item__text">{group.title}</span>
        </el-button>
      </el-popover>
    },
    /**
     * #!zh: 渲染单个插件的快捷方式
     * #!en: render shortcut for single plugin
     * @param {Object} group: {children, title, icon}
     */
    renderSinglePluginShortcut ({ children }) {
      const [plugin] = children
      return <el-button
        class='ma-0 no-border-radius'
        style={{ width: '100%' }}
        onClick={this.clone.bind(this, plugin)}
      >
        <i
          class={['fa', `fa-${plugin.icon}`]}
          aria-hidden='true'
          style='display: block;font-size: 16px;margin-bottom: 10px;'
        />
        <span class="plugin-item__text">{ plugin.title }</span>
      </el-button>
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
        <el-tabs tab-position="left" class="lb-tabs">
          <el-tab-pane label='组件列表'>
            <div class="full-height">
              <el-row gutter={20}>
                {
                  this.groups.sort().map(group => (
                    <el-col span={12} style={{ marginTop: '10px' }}>
                      {this.renderPluginShortcut(group)}
                    </el-col>
                  ))
                }
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label='页面管理'>
            <span>页面管理</span>
          </el-tab-pane>
        </el-tabs>
      )
    },
    renderPropsEditorPanel (h) {
      if (!this.editingElement) return (<span>请先选择一个元素</span>)
      const editingElement = this.editingElement
      const propsConfig = editingElement.editorConfig.propsConfig
      return (
        <el-form ref="form" label-width="100px" size="mini" label-position="left">
          {
            Object.keys(propsConfig).map(propKey => {
              const item = propsConfig[propKey]
              // https://vuejs.org/v2/guide/render-function.html
              const data = {
                props: {
                  ...item.prop,
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  ...{ value: editingElement[propKey] || item.defaultPropValue }
                },
                on: {
                  // https://vuejs.org/v2/guide/render-function.html#v-model
                  input (value) {
                    editingElement[propKey] = value
                  }
                }
              }
              return (
                <el-form-item label={item.label}>
                  { h(item.type, data) }
                </el-form-item>
              )
            })
          }
        </el-form>
      )
    }
  },
  render (h) {
    return (
      <div id='designer-page'>
        <div class='el-col-5'>
          { this.renderPluginListPanel() }
        </div>
        <div class='el-col-13'>
          <div style="text-align: center;">
            <el-radio-group value={this.isPreviewMode} onInput={(value) => {
              this.isPreviewMode = value
            }} size="mini">
              <el-radio-button label={false}>Edit</el-radio-button>
              <el-radio-button label={true}>Preview</el-radio-button>
            </el-radio-group>
          </div>
          <div class='canvas-wrapper'>
            { this.isPreviewMode ? this.renderPreview(h, this.elements) : this.renderCanvas(h, this.elements) }
          </div>
        </div>
        <div class='el-col-6' style="border-left: 1px solid #eee;">
          <el-tabs type="border-card" style="height: 100%;">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 属性</span>
              { this.renderPropsEditorPanel(h) }
            </el-tab-pane>
            <el-tab-pane label="动画">动画</el-tab-pane>
            <el-tab-pane label="动作">动作</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    )
  }
}
