<script>
import Vue from 'vue'

import LbpButton from '../components/plugins/lbp-button'

const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: 'lbp-button'
  }
]

const defaultProps = {
  top: 100,
  left: 100,
  width: 100,
  height: 40,
  zindex: 1,
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#ffffff',
  fontSize: 14
}

class Element {
  constructor (ele) {
    this.name = ele.name
    this.editorConfig = ele.editorConfig || {}
    this.init()
  }

  init () {
    // init common props
    Object.keys(defaultProps).forEach(key => {
      this[key] = defaultProps[key]
    })

    // init prop of plugin
    this.pluginProps = {}
    const propConf = this.editorConfig.propsConfig
    Object.keys(propConf).forEach(key => {
      // #6
      if (key === 'name') {
        console.warn('Please do not use {name} as plugin prop')
        return
      }
      this.pluginProps[key] = propConf[key].defaultPropValue
    })
  }

  getStyle () {
    return {
      top: `${this.top}px`,
      left: `${this.left}px`,
      width: `${this.width}px`,
      height: `${this.height}px`,
      fontSize: `${this.fontSize}px`,
      color: this.color,
      backgroundColor: this.backgroundColor,
      textAlign: this.textAlign
    }
  }

  getClass () {

  }

  getData () {

  }
}

const Editor = {
  name: 'Editor',
  components: {
  },
  data: () => ({
    pages: [],
    elements: [],
    editingElement: null,
    isPreviewMode: false,
  }),
  methods: {
    getEditorConfig (pluginName) {
      // const pluginCtor = Vue.options[pluginName]
      // const pluginCtor = this.$options.components[pluginName]
      const pluginCtor = Vue.component(pluginName)
      return new pluginCtor().$options.editorConfig
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
              {this.visiblePluginList.sort().map(item => {
                return (
                  <el-button
                    class='plugin-item ma-0 no-border-radius'
                    onClick={this.clone.bind(this, item)}
                  >
                    <i
                      class={['fa', `fa-${item.icon}`]}
                      aria-hidden='true'
                      style='display: block;font-size: 16px;margin-bottom: 10px;'
                    />
                    <span>{ item.title }</span>
                  </el-button>
                )
              })}
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
        <el-form ref="form" label-width="100px" size="mini">
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
            <el-radio-group value={this.isPreviewMode} onInput={(value) => this.isPreviewMode = value} size="mini">
              <el-radio-button label={false}>Edit</el-radio-button>
              <el-radio-button label={true}>Preview</el-radio-button>
            </el-radio-group>
          </div>
          <div class='canvas-wrapper'>
            { this.isPreviewMode ? this.renderPreview(h, this.elements) : this.renderCanvas(h, this.elements)  }
          </div>
        </div>
        <div class='el-col-6' style="border-left: 1px solid #eee;">
          { this.renderPropsEditorPanel(h) }
        </div>
      </div>
    )
  }
}

export default {
  extends: Editor,
  computed: {
    // !#zh 显示在侧边栏或顶部的 可用组件列表
    visiblePluginList () {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    mixinPlugins2Editor () {
      PluginList.forEach(plugin => {
        // 全局注册组件，便于以后扩展自定义脚本，注释原来的局部注册：this.$options.components[plugin.name] = plugin.component
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
</script>
<style lang="scss">
$cellSize: 35.6px;
$designerWidth: 320px;
$designerHeight: 568px;
$designerWidthHalf: $designerWidth / 2;

#designer-page {
  display: flex;
  // https://stackoverflow.com/questions/17904088/disable-less-css-overwriting-calc
  // less: min-height: ~'calc(100% - 40px)';
  min-height: calc(100% - 40px);

}

.plugin-item {
  border: 1px solid #f1efef;
  width: 49%;
  padding: 12px 12px;

  &:nth-child(even) {
    margin: 4px 0 4px 2% !important;
  }
}

.canvas-wrapper {
  position: relative;
  top: 5%;
  width: $designerWidth;
  height: $designerHeight;
  border: 1px #ebeaea solid;
  margin: 0 auto;
}

.lb-tabs {
  box-shadow: none;
  padding: 4px 8px 4px 0;
  border: 1px solid #EBEEF5;
  height: 100%;
}

.full-height {
  height: 100% !important;
}
</style>
