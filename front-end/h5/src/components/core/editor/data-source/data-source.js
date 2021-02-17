import { mapState, mapActions } from 'vuex'
import HttpAPIForm from './forms/http-api.vue'
import StaticDataForm from './forms/static-data.vue'
import DS_ENUM from 'core/enum/data-source'

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
    showAddDialog () {
      this.dialog.visible = true
    },
    handleSelectDataSourceType (menu) {
      this.activeDataSource.type = menu.key
      this.showAddDialog()
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
      switch (actionType) {
        case 'edit':
          this.showAddDialog()
          this.activeDataSource = ds
          break
        case 'delete':
        case 'add':
          this.dataSourceManager({
            type: actionType,
            value: {
              ...ds
            }
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
          </a-collapse-panel>
        </a-collapse>
        <a-modal
          width={600}
          title={`新增数据源 - ${this.activeDataSource.type}`}
          visible={this.dialog.visible}
          onOk={() => {
            this.$refs.form.checkForm().then(dataSourceForm => {
              // this.dataSourceManager({
              //   type: 'add',
              //   value: {
              //     ...form
              //   }
              // })
              this.manageDataSource('add', dataSourceForm)
              this.dialog.visible = false

              // this.$refs.form.resetFields()
              this.activeDataSource = {}
              // this.dialog.visible = false
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
