import { mapState, mapActions } from 'vuex'

import RenderEditCanvas from './edit'
import RenderPreviewCanvas from './preview'
import formComponentPanel from './formComponentPanel.vue'

import './styles/form-design.less'
export default {
  name: 'EditorCanvas',
  data: () => ({
    isPreviewMode: false,
    selectItem: {
      key: ''
    },
    noModel: [
      'button',
      'divider',
      'card',
      'grid',
      'tabs',
      'table',
      'alert',
      'text',
      'html'
    ],
    data: {
      list: [],
      config: {
        layout: 'horizontal',
        labelCol: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
        labelWidth: 100,
        labelLayout: 'flex',
        wrapperCol: { xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 },
        hideRequiredMark: false,
        customStyle: ''
      }
    }
  }),
  computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work,
      scaleRate: state => state.scaleRate,
      startType: state => state.startType
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
      'updateWork',
      'setWorkAsTemplate',
      'setEditingElement',
      'setEditingPage'
    ]),
    handleToggleMode (isPreviewMode) {
      this.isPreviewMode = isPreviewMode
      if (isPreviewMode) {
        // 当切换到预览模式的时候，清空当前编辑元素
        this.setEditingElement() // 相当于  setEditingElement(null)
      }
    }
  },
  render (h) {
    return (
      <a-layout id="canvas-outer-wrapper">
        <a-radio-group
          class="mode-toggle-wrapper"
          size="small"
          value={this.isPreviewMode}
          onInput={this.handleToggleMode}
        >
          {/* 编辑模式、预览模式 */}
          <a-radio-button label={false} value={false}>
            {this.$t('editor.centerPanel.mode.edit')}
          </a-radio-button>
          <a-radio-button label={true} value={true}>
            {this.$t('editor.centerPanel.mode.preview')}
          </a-radio-button>
        </a-radio-group>
        <a-layout-content
          style={{
            transform: `scale(${this.scaleRate})`,
            transformOrigin: 'center top'
          }}
        >
          <div
            class="canvas-wrapper"
            style={{
              // height: `${this.work.height}px`
              // width: `${this.work.width}px`
            }}
          >
            <formComponentPanel
              class={{ 'no-toolbars-top': !this.toolbarsTop }}
              data={this.data}
              selectItem={this.selectItem}
              noModel={this.noModel}
              hideModel={this.hideModel}
              startType={this.startType}
              ref="KFCP"
              onHandleSetSelectItem={() => {}}
            />
            {/* {this.isPreviewMode ? (
                <RenderPreviewCanvas elements={this.elements} />
              ) : (
                <RenderEditCanvas class="edit-mode" elements={this.elements} />
              )} */}
          </div>
        </a-layout-content>
      </a-layout>
    )
  }
}
