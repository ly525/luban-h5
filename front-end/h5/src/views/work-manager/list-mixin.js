import { mapState, mapActions } from 'vuex'
import ListItemCard, { AddNewCard } from '@/components/common/work/card-item.js'
import PreviewDialog from '@/components/core/editor/modals/preview.vue'
import './list.scss'

export default {
  components: {
    ListItemCard,
    AddNewCard
  },
  props: {
    isTemplate: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    activeWork: null,
    previewVisible: false,
    pagination: {
      pageSize: 10,
      pageNum: 1
    }
  }),
  computed: {
    ...mapState('editor', ['works', 'workTemplates', 'total']),
    ...mapState('loading', ['fetchWorks_loading', 'fetchWorkTemplates_loading']),
    workList () {
      const workList = this.isTemplate ? this.workTemplates : this.works
      return workList.sort((a, b) => a.id - b.id)
    },
    loading () {
      return this.isTemplate ? this.fetchWorkTemplates_loading : this.fetchWorks_loading
    }
  },
  methods: {
    ...mapActions('editor', [
      'fetchCount',
      'fetchWorks',
      'createWork',
      'deleteWork',
      'useTemplate',
      'fetchWorkTemplates'
    ]),
    handleDeleteWork (work) {
      this.deleteWork(work.id).then(res => {
        const index = this.workList.findIndex(item => item.id === work.id)
        this.workList.splice(index, 1)
        this.fetchCount({ is_template: this.isTemplate })
        this.handleSearch()
      })
    },
    handleSearch () {
      const { pageSize, pageNum } = this.pagination
      const payload = {
        is_template: this.isTemplate,
        _limit: pageSize,
        _start: (pageNum - 1) * pageSize
      }
      this.isTemplate ? this.fetchWorkTemplates(payload) : this.fetchWorks(payload)
    },
    renderList () {
      return this.workList.map(work => (
        <a-col span={6} key={work.id} class="mb-3">
          <ListItemCard
            isTemplate={this.isTemplate}
            work={work}
            onPreview={e => {
              this.previewVisible = true
              this.activeWork = work
            }}
            onUseTemplate={work => {
              this.useTemplateDialogVisible = true
              this.useTemplate(work.id).then((clonedWork) => {
                this.clonedWorkFromTemplate = clonedWork
              })
            }}
            onDelete={() => this.handleDeleteWork(work)}
          />
        </a-col>
      ))
    }
  },
  render (h) {
    return (
      <div class="works-wrapper">
        <a-row gutter={12}>
          {
            !this.isTemplate &&
            <a-col span={6} style="margin-bottom: 10px;">
              <AddNewCard handleCreate={this.createWork} />
            </a-col>
          }
          {
            this.loading
              ? <a-col span={this.isTemplate ? 24 : 18} class="loading-col">
                <a-spin tip="作品列表获取中..."/>
              </a-col>
              : (
                this.workList.length
                ? this.renderList()
                : <a-col span={this.isTemplate ? 24 : 18} class="loading-col">
                    <a-empty class="vertical-align" />
                  </a-col>
              )
          }
        </a-row>
        <a-row gutter={12} class="pb-3">
          <a-col span={24} style="text-align:center;">
          <a-pagination
            show-size-changer
            default-current={1}
            total={this.isTemplate ? this.total.templates : this.total.works }
            current={this.pagination.pageNum}
            onShowSizeChange={(pageNum, pageSize) => {
              this.pagination.pageNum = 1
              this.pagination.pageSize = pageSize
              this.handleSearch()
            }}
            onChange={(currentPageNum, pageSize) => {
              this.pagination.pageNum = currentPageNum
              this.pagination.pageSize = pageSize
              this.handleSearch()
            }}
          />
          </a-col>
        </a-row>
        {
          <PreviewDialog
            work={this.activeWork || {}}
            visible={this.previewVisible}
            handleClose={() => { this.previewVisible = false }}
          />
        }
        {
          this.isTemplate &&
          this.useTemplateDialogVisible &&
          <a-modal
            visible={true}
            // onOk={() => { this.useTemplateDialogVisible = true }}
            // onCancel={() => { this.useTemplateDialogVisible = false }}
            width="240px"
            okText="保存"
            footer={null}
            closable={false}
            centered
          >
            <div style="text-align: center;">
              {
                this.clonedWorkFromTemplate
                  ? <div>
                    <div style={{ margin: '12px' }}>
                      <a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                      模板已保存至"我的作品"中
                    </div>
                    <a-button onClick={() => {
                      this.useTemplateDialogVisible = false
                      this.clonedWorkFromTemplate = null
                    }}>我再逛逛</a-button>
                    <a-button type="primary"
                      onClick={() => {
                        const routeData = this.$router.resolve({ name: 'editor', params: { workId: this.clonedWorkFromTemplate.id } })
                        window.open(routeData.href, '_blank')
                      }}
                      style={{ marginLeft: '12px' }}
                    >立即查看</a-button>
                  </div>
                  : <a-spin tip="复制中" />
              }
            </div>
          </a-modal>
        }
      </div>
    )
  },
  created () {
    this.handleSearch()
    this.fetchCount({ is_template: this.isTemplate })
  }
}
