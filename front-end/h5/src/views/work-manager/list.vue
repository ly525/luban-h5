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
          {/** 编辑 */}
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.edit')}>
            <router-link to={{ name: 'editor', params: { workId: this.work.id } }} target="_blank">
              <a-icon type="edit" title={this.$t('workCard.edit')}/>
            </router-link>
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

const AddNewCard = {
  functional: true,
  render (h, { props, parent }) {
    return (
      <a-card hoverable>
        <div slot="cover" class="flex-center" style="height: 405px;background: #f7f5f557;" onClick={props.handleCreate}>
          <a-icon type="plus" />
        </div>
        <template class="ant-card-actions" slot="actions">
          {/** 创建新作品 */}
          {/** https://kazupon.github.io/vue-i18n/guide/component.html#translation-in-functional-component */}
          <span onClick={props.handleCreate}>{parent.$t('workCard.createNewWork')}</span>
        </template>
      </a-card>
    )
  }
}

export default {
  components: {
    ListItemCard,
    AddNewCard
  },
  data: () => ({
    activeWork: null,
    previewVisible: false
  }),
  computed: {
    ...mapState('editor', ['works']),
    ...mapState('loading', ['fetchWorks_loading'])
  },
  methods: {
    ...mapActions('editor', [
      'fetchWorks',
      'createWork'
    ]),
    deleteWork (item) {
      // TODO delete work from work list
    }
  },
  render (h) {
    return (
      <div class="works-wrapper">
        <a-row gutter={12}>
          <a-col span={6} style="margin-bottom: 10px;">
            <AddNewCard handleCreate={this.createWork} />
          </a-col>
          {
            this.fetchWorks_loading
              ? <a-col span={18} style="margin-bottom: 10px;text-align: center;height: 355px;line-height: 355px;border-bottom: 1px solid #ebedf0;background: rgba(255, 255, 255, 0.5);">
                <a-spin tip="作品列表获取中..."/>
              </a-col>
              : this.works.map(work => (
                <a-col span={6} key={work.id} style="margin-bottom: 20px;">
                  <ListItemCard work={work} handleClickPreview={e => {
                    this.previewVisible = true
                    this.activeWork = work
                  }} />
                </a-col>
              ))
          }
        </a-row>
        {
          <PreviewDialog
            work={this.activeWork || {}}
            visible={this.previewVisible}
            handleClose={() => { this.previewVisible = false }}
          />
        }
      </div>
    )
  },
  created () {
    this.fetchWorks()
  }
}
</script>
