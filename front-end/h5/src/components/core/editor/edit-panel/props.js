import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('editor', ['editingElement', 'editingElementEditorConfig'])
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement'
    ]),
    /**
     * 将插件属性的 自定义增强编辑器注入 属性编辑面板中
     */
    mixinEnhancedPropsEditor (editingElement) {
      const { components } = this.editingElementEditorConfig
      for (const key in components) {
        if (this.$options.components[key]) return
        this.$options.components[key] = components[key]
      }
    },
    renderPropsEditorPanel (h, editingElement) {
      const propsConfig = this.editingElementEditorConfig.propsConfig
      return (
        <a-form
          ref="form"
          size="mini"
          id="props-edit-form"
          label-width="100px"
          label-position="left"

        >
          {
            Object.keys(propsConfig).map(propKey => {
              const item = propsConfig[propKey]
              // https://vuejs.org/v2/guide/render-function.html
              const data = {
                style: { width: '100%' },
                props: {
                  ...item.prop,
                  // https://vuejs.org/v2/guide/render-function.html#v-model

                  // #!zh:不设置默认值的原因（下一行的代码，注释的代码）：
                  // 比如表单 input，如果用户手动删除了 placeholder的内容，程序会用defaultPropValue填充，
                  // 表现在UI上就是：用户永远无法彻底删掉默认值（必须保留至少一个字符）
                  // value: editingElement.pluginProps[propKey] || item.defaultPropValue
                  value: editingElement.pluginProps[propKey]
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
              return (
                <a-form-item label={item.label} labelCol={{ span: 8 }} wrapperCol={{ span: 14, offset: 2 }}>
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
    const ele = this.editingElement
    if (!ele) return (<span>请先选择一个元素</span>)
    this.mixinEnhancedPropsEditor(ele)
    return this.renderPropsEditorPanel(h, ele)
  }
}
