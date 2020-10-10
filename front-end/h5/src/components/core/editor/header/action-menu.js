import { mapState, mapActions } from 'vuex'

export default {
  name: 'EditorActionMenu',
  data: () => ({
    previewDialogVisible: false,
    propsPanelWidth: 320
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
      'updateWork',
      'setWorkAsTemplate',
      // 'setEditingElement',
      'setEditingPage'
    ]),
    ...mapActions('loading', {
      updateLoading: 'update'
    }),
    handlePreview () {
      this.saveWork({ loadingName: 'previewWork_loading' }).then(() => {
        this.$emit('preview')
        // this.previewDialogVisible = true
      })
    },
    handleSave () {
      this.saveWork({ isSaveCover: true })
    },
    handlePublish () {
      this.updateWork({ is_publish: true })
      this.saveWork({ successMsg: '发布成功' })
    },
    handleSetAsTemplate () {
      this.updateLoading({ type: 'setWorkAsTemplate_loading', value: true })
      this.saveWork().then(() => {
        this.setWorkAsTemplate()
      })
    },
    handleSelectItem ({ key }) {
      switch (key) {
        case 'setAsTemplate':
          this.handleSetAsTemplate()
      }
    }
  },
  render (h) {
    return (
      <a-menu
        slot="action-menu"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', float: 'right', background: 'transparent' }}
      >
        {/* 保存、预览、发布、设置为模板 */}
        <a-menu-item key="1" class="transparent-bg">
          <a-button
            type="primary"
            size="small"
            onClick={this.handlePreview}
            loading={this.previewWork_loading}
          >{this.$t('editor.header.preview')}</a-button>
        </a-menu-item>
        <a-menu-item key="2" class="transparent-bg">
          <a-button
            size="small"
            onClick={this.handleSave}
            loading={this.saveWork_loading || this.uploadWorkCover_loading}
          >{this.$t('editor.header.save')}</a-button>
        </a-menu-item>
        {/* <a-menu-item key="3" class="transparent-bg"><a-button size="small">发布</a-button></a-menu-item> */}
        <a-menu-item key="3" class="transparent-bg">
          <a-dropdown-button
            size="small"
            onClick={this.handlePublish}
            loading={this.saveWork_loading || this.uploadWorkCover_loading}
          >
            {this.$t('editor.header.publish') /* 发布 */}
            <a-menu slot="overlay" onClick={this.handleSelectItem}>
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
    )
  }
}
