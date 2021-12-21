import { mapState, mapActions } from 'vuex'
import HttpAPIForm from './forms/http-api.vue'
import StaticDataForm from './forms/static-data.vue'
import DS_ENUM from 'core/enum/data-source'
import { LuBanDC } from 'core/store/modules/data-source'
import template from 'babel-template'

export default {
  props: {
    pages: {
      required: false,
      type: Array,
      default: () => []
    },
    editingPage: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    hoverIndex: -1, // 显示编辑按钮
    editingTitle: '', // 临时缓存当前编辑的 title，点击 Yes 再真正用其更新 page title
    dialog: {
      visible: false,
      confirmLoading: false
    },
    activeDataSource: {
      type: DS_ENUM.code2value.HTTP_API
    }
  }),
  computed: {
    ...mapState('editor', [
      'work'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'dataSourceManager'
      // 'elementManager',
      // 'saveWork',
      // 'createWork',
      // 'fetchWork',
      // 'setWorkAsTemplate',
      // 'setEditingElement',
      // 'setEditingPage'
    ]),
    getTitle (page, index) {
      return page.title || this.$t('editor.pageManager.title', { index })
    },
    toggleAddDialog () {
      this.dialog.visible = !this.dialog.visible
    },
    handleSelectDataSourceType (menu) {
      this.activeDataSource.type = menu.key
      this.toggleAddDialog()
    },
    _renderEditTitle (page, index) {
      return (
        <a-popconfirm
          placement="bottom"
          onConfirm={() => {
            this.$emit('editTitle', { newTitle: this.editingTitle, pageIndexForEditingTitle: index })
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <a-input
            slot="title"
            value={this.editingTitle}
            size="small"
            onChange={e => {
              this.editingTitle = e.target.value
            }}
          >
          </a-input>
          <a-icon type="edit" onClick={(e) => {
            e.stopPropagation() // 将 click icon 与 click page item 隔离开。编辑标题的同时不要切换页面
            this.editingTitle = this.getTitle(page, index)
          }}/>
        </a-popconfirm>
      )
    },
    renderAddAction (page, index) {
      // const addPageText = this.$t('editor.pageManager.action.add')
      // const copyPageText = this.$t('editor.pageManager.action.copy')
      // const deletePageText = this.$t('editor.pageManager.action.delete')
      return (
        <a-dropdown trigger={['click']} placement='bottomCenter' slot="extra">
          <a-icon type="plus" onClick={e => e.stopPropagation()}></a-icon>
          <a-menu slot="overlay" onClick={this.handleSelectDataSourceType}>
            {
              DS_ENUM.options.map(type => (
                <a-menu-item key={type.value} index={type.value}>{type.label}</a-menu-item>
              ))
            }
          </a-menu>
        </a-dropdown>
      )
    },
    viewDataCenter (page, index) {
      return (
        <a-popover title="数据中心预览" trigger="click">
          <a-button type="link" icon="eye" />
          <template slot="content">
            <a-alert
              class="mb-3"
              message="使用方法："
              description="使用 {{DC.[keyPath]}} 消费数据。比如输入框内容为 下载了{{DC.count}}次 => 下载了count次"
              type="info"
            />
            <codemirror value={JSON.stringify(LuBanDC, null, 2)}  />

          </template>
        </a-popover>
      )
    },
    onLeave () {
      this.hoverIndex = -1
    },
    renderForm () {
      switch (this.activeDataSource.type) {
        case DS_ENUM.code2value.HTTP_API:
          return <HttpAPIForm ref="form" dataSource={this.activeDataSource} type={this.activeDataSource.type} />
        case DS_ENUM.code2value.STATIC:
          return <StaticDataForm ref="form" dataSource={this.activeDataSource} type={this.activeDataSource.type} />
      }
    },
    manageDataSource (actionType, ds) {
      // TODO add/edit dataSource 需要补充 loading，即创建、编辑需要调用接口，需要等待
      this.toggleAddDialog()
      switch (actionType) {
        case 'edit':
          this.activeDataSource = {...ds}
          this.dataSourceManager({
            type: actionType,
            value: {...ds }
          })
          break
        case 'delete':
        case 'add':
          this.dataSourceManager({
            type: actionType,
            value: {...ds }
          })
          break
      }
    },
    editDataSource (ds) {

    },
    renderDataSourceList () {
      return <a-list dataSource={this.work.datasources} scopedSlots={{
        renderItem: ds => {
          return (
            <a-list-item slot="renderItem">
              <delete-with-confirm
                slot="actions"
                directlyExecute={false}
                onConfirm={() => this.manageDataSource('delete', ds)}
                onCancel={() => { console.log('cancel action') }}
              >
                <a-icon type="delete"></a-icon>
              </delete-with-confirm>
              {/* <a-icon type="delete" slot="actions" onClick={() => this.manageDataSource('delete', ds)} /> */}
              <a-icon type="setting" slot="actions" onClick={() => this.manageDataSource('edit', ds)} />
              <a-tooltip slot="actions" placement="bottom">
                <template slot="title">
                  最后更新时间：
                  <p>{new Date(ds.updated).toJSON()}</p>
                </template>
                <a-icon
                  type="sync"
                  spin={ds.loading}
                  onClick={() => {
                    ds.request().then(() => {
                      this.$message.success(`数据源: ${ds.name} 更新成功`)
                    })
                  }}
                  title=""
                />
              </a-tooltip>
              <a-list-item-meta
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <span slot="title">{ ds.name }</span>
                {/* <a slot="title" href="https://www.antdv.com/">{ item.name }</a> */}
                {/* <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                /> */}
              </a-list-item-meta>
              {/* <div>content</div> */}
            </a-list-item>
          )
          // return <div>
          //   {scope.name}
          //   <a slot="actions">edit</a>
          //   <a slot="actions">more</a>
          // </div>
        }
      }}>
        {/* <a-list-item ></a-list-item> */}
        {/* <div slot="header">Header</div> */}
        {/* <div slot="footer">Footer</div> */}
      </a-list>
    }
  },
  render (h) {
    return (
      <div>
        <a-collapse
          activeKey={this.activeKey}
          onChange={val => { this.activeKey = val }}
          expandIconPosition="right"
          bordered={false}
        >
          <a-collapse-panel header="数据源" key="2">
            {this.renderAddAction()}
            {this.renderDataSourceList()}
            {this.viewDataCenter()}
          </a-collapse-panel>
        </a-collapse>
        <a-modal
          width={600}
          title={`新增数据源 - ${this.activeDataSource.type}`}
          visible={this.dialog.visible}
          onOk={() => {
            this.$refs.form.checkForm().then(dataSourceForm => {
              debugger
              const actionType = dataSourceForm.id ? 'edit' : 'add'
              this.manageDataSource(actionType, dataSourceForm)
              this.activeDataSource = {}
            })
          }}
          onCancel={() => {
            this.dialog.visible = false
            // this.$refs.form.resetFields()
            this.activeDataSource = {}
          }}
          confirmLoading={this.dialog.confirmLoading}
        >
          <div>
            {this.renderForm()}
          </div>
        </a-modal>
      </div>
    )
  }
}
