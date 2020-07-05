import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { getVM, getComponentsForPropsEditor } from '../../../../utils/element'
import RenderGlobalWorkPropsEditor from './props/global-work.vue'

export default {
  data: () => ({
    loadCustomEditorFlag: false
  }),
  props: {
    layout: {
      type: String,
      default: 'horizontal'
    },
    // 优先级更高的当前编辑元素
    realEditingElement: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapState('editor', {
      stateEditingElement: state => state.editingElement
    }),
    customEditorName () {
      return `${this.editingElement.name}-custom-editor`
    },
    editingElement () {
      return this.realEditingElement || this.stateEditingElement
    }
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement'
    ]),
    loadCustomEditorForPlugin () {
      this.loadCustomEditorFlag = false
      if (!this.editingElement) return

      if (Vue.component(this.customEditorName)) {
        this.loadCustomEditorFlag = true
      } else {
        import(`../../../plugins/${this.editingElement.name}__editor`).then(component => {
          this.loadCustomEditorFlag = true
          Vue.component(this.customEditorName, component.default)
        }).catch(err => {
          console.log(err)
          console.warn('没有发现组件对应的编辑器')
        })
      }
    },
    /**
     * 将插件属性的 自定义增强编辑器注入 属性编辑面板中
     */
    mixinEnhancedPropsEditor (editingElement) {
      if (!this.componentsForPropsEditor) return
      for (const key in this.componentsForPropsEditor) {
        if (this.$options.components[key]) return
        this.$options.components[key] = this.componentsForPropsEditor[key]
      }
    },
    /**
     *
     * propKey: e.g:'color'
     * propConfig: {
     *  editor: {},
     *  default: 'red'
     * }
     */
    renderPropFormItem (h, { propKey, propConfig }) {
      const editingElement = this.editingElement
      const item = propConfig.editor
      // https://vuejs.org/v2/guide/render-function.html
      const data = {
        // style: { width: '100%' },
        props: {
          ...item.props || {},
          // https://vuejs.org/v2/guide/render-function.html#v-model

          // #!zh:不设置默认值的原因（下一行的代码，注释的代码）：
          // 比如表单 input，如果用户手动删除了 placeholder的内容，程序会用defaultPropValue填充，
          // 表现在UI上就是：用户永远无法彻底删掉默认值（必须保留至少一个字符）
          // value: editingElement.pluginProps[propKey] || item.defaultPropValue

          // https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
          [item.type === 'a-switch' ? 'checked' : 'value']: editingElement.pluginProps[propKey]
        },
        on: {
        // https://vuejs.org/v2/guide/render-function.html#v-model
        // input (e) {
        //   editingElement.pluginProps[propKey] = e.target ? e.target.value : e
        // }
          change (e) {
            // TODO fixme: update plugin props in vuex with dispatch
            editingElement.pluginProps[propKey] = e.target ? e.target.value : e
          }
        }
      }
      const formItemLayout = this.layout === 'horizontal' ? {
        labelCol: { span: 6 }, wrapperCol: { span: 16, offset: 2 }
      } : {}
      const formItemData = {
        props: {
          ...formItemLayout,
          label: item.label,
          ...item.layout
        }
      }
      return (
        <a-form-item {...formItemData}>
          {/* extra: 操作补充说明 */}
          { item.extra && <div slot="extra">{typeof item.extra === 'function' ? item.extra(h) : item.extra}</div>}
          { h(item.type, data) }
        </a-form-item>
      )
    },
    renderPropsEditorPanel (h, editingElement) {
      const vm = getVM(editingElement.name)
      const props = vm.$options.props

      return (
        <a-form
          ref="form"
          size="mini"
          id="props-edit-form"
          layout={this.layout}
          style="overflow: auto;position: absolute;top: 50px;bottom: 0;width: 100%; "
        >
          {
            // plugin-custom-editor
            this.loadCustomEditorFlag &&
            h(this.customEditorName, {
              props: {
                elementProps: editingElement.pluginProps
              }
            })
          }
          {
            Object
              .entries(props)
              .filter(([propKey, propConfig]) => propConfig.visible && propConfig.editor && !propConfig.editor.custom)
              .map(([propKey, propConfig]) => this.renderPropFormItem(h, { propKey, propConfig }))
          }
        </a-form>
      )
    },
    renderWorkGlobalPropsPanel (h) {
      return <RenderGlobalWorkPropsEditor />
    }
  },
  render (h) {
    const ele = this.editingElement
    if (!ele) return this.renderWorkGlobalPropsPanel(h)
    this.mixinEnhancedPropsEditor(ele)
    return this.renderPropsEditorPanel(h, ele)
  },
  created () {
    window.getEditorApp.$on('setEditingElement', (ele) => {
      this.loadCustomEditorForPlugin()
      this.componentsForPropsEditor = getComponentsForPropsEditor(ele.name)
    })
  }
}
