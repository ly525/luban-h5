<script>
import { mapState, mapActions } from 'vuex'
import QRCode from 'qrcode'

import PreviewDialog from '@/components/core/editor/modals/preview.vue'
import CardCover from '@/components/common/work/card-cover.js'

const ListItemCard = {
  props: {
    work: {
      type: Object,
      default: () => {}
    },
    handleClickEdit: {
      type: Function,
      default: () => {}
    },
    handleClickPreview: {
      type: Function,
      default: () => {}
    },
    handleUseTemplate: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    qrcodeUrl: ''
  }),
  methods: {
    timeFmt (date) {
      const dateTime = new Date(date)
      const displayTime = `${dateTime.getFullYear()}-${dateTime.getMonth() +
        1}-${dateTime.getDate()}`
      return displayTime
    },
    genQRCodeUrl (work) {
      const url = `/works/preview/${work.id}`
      QRCode.toDataURL(url, (err, url) => {
        if (err) console.log(err)
        this.qrcodeUrl = url
      })
    }
  },
  render (h) {
    return (
      <a-card hoverable >
        <CardCover slot="cover" qrcodeUrl={this.qrcodeUrl} coverImageUrl={this.work.cover_image_url} />
        <template class="ant-card-actions" slot="actions">
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.useNow')}>
            <a-icon type="plus-square" title={this.$t('workCard.useNow')} onClick={() => {
              this.handleUseTemplate(this.work)
            }} />
          </a-tooltip>
          {/** 预览 */}
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.preview')}>
            <a-icon type="eye" title={this.$t('workCard.preview')} onClick={this.handleClickPreview} />
          </a-tooltip>
          {
            this.qrcodeUrl
              ? <a-icon type="close-circle" onClick={() => { this.qrcodeUrl = '' }} />
              : <a-icon type="qrcode" onClick={() => this.genQRCodeUrl(this.work)} />
          }
          {/**
          <a-icon type="setting" />
          <a-icon type="ellipsis" />
           */}
        </template>
        <a-card-meta
        >
          <div slot="title" class="ant-card-meta-title" style="font-size: 14px;">
            {this.work.title}({this.work.id})
          </div>
          <div slot="description" style="font-size: 12px;">
            {/** 描述 时间 */}
            <div>{this.$t('workCard.description')}: {this.work.description}</div>
            <div>{this.$t('workCard.createTime')}: {this.timeFmt(this.work.created_at)}</div>
          </div>
        </a-card-meta>
      </a-card>
    )
  }
}

export default {
  components: {
    ListItemCard
  },
  data: () => ({
    activeWork: null,
    previewVisible: false,
    useTemplateDialogVisible: false,
    clonedWorkFromTemplate: null // 从某个模板复制出来的作品
  }),
  computed: {
    ...mapState('editor', ['works', 'workTemplates']),
    ...mapState('loading', ['fetchWorks_loading'])
  },
  methods: {
    ...mapActions('editor', [
      'fetchWorks',
      'fetchWorkTemplates',
      'useTemplate'
    ]),
    deleteWork (item) {
      // TODO delete work from work list
    },
    createWork () {
      this.$router.push({ name: 'editor' })
      // window.open('#/editor', '_blank')
    }
  },
  render (h) {
    return (
      <div class="works-wrapper">
        <a-row gutter={12}>
          {
            this.fetchWorkTemplates_loading
              ? <a-col span={24} style="margin-bottom: 10px;text-align: center;height: 355px;line-height: 355px;border-bottom: 1px solid #ebedf0;background: rgba(255, 255, 255, 0.5);">
                <a-spin tip="作品列表获取中..."/>
              </a-col>
              : this.workTemplates.map(work => (
                <a-col span={6} key={work.id} style="margin-bottom: 20px;">
                  <ListItemCard work={work}
                    handleClickPreview={e => {
                      this.previewVisible = true
                      this.activeWork = work
                    }}
                    handleUseTemplate={templateWork => {
                      this.useTemplateDialogVisible = true
                      this.useTemplate(templateWork.id).then((clonedWork) => {
                        this.clonedWorkFromTemplate = clonedWork
                      })
                    }}
                  />
                </a-col>
              ))
          }
        </a-row>
        {
          this.previewVisible &&
          <PreviewDialog
            work={this.activeWork}
            visible={this.previewVisible}
            handleClose={() => { this.previewVisible = false }}
          />
        }
        {
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
                    <div style={{ margin: '12px' }}><a-icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> 模板已保存至"我的作品"中</div>
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
                    >立即使用</a-button>
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
    this.fetchWorkTemplates()
  }
}
</script>
