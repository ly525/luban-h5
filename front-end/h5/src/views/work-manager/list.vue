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
        <div slot="cover" class="flex-center" style="height: 200px;font-size: 24px;border: 1px dashed #eee;color: #aaa;background: #f7f5f557;" >
          <CardCover qrcodeUrl={this.qrcodeUrl} coverImageUrl={this.work.cover_image_url} />
        </div>
        <template class="ant-card-actions" slot="actions">
          <a-tooltip effect="dark" placement="bottom" title="编辑">
            <router-link to={{ name: 'editor', params: { workId: this.work.id } }} target="_blank">
              <a-icon type="edit" title="编辑"/>
            </router-link>
          </a-tooltip>
          <a-tooltip effect="dark" placement="bottom" title="预览">
            <a-icon type="eye" title="预览" onClick={this.handleClickPreview} />
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
            <div>描述：{this.work.description}</div>
            <div>时间：{this.timeFmt(this.work.created_at)}</div>
          </div>
        </a-card-meta>
      </a-card>
    )
  }
}

const AddNewCard = {
  functional: true,
  render (h, { props }) {
    return (
      <a-card hoverable>
        <div slot="cover" class="flex-center" style="height: 305px;background: #f7f5f557;" onClick={props.handleCreate}>
          <a-icon type="plus" />
        </div>
        <template class="ant-card-actions" slot="actions">
          <span onClick={props.handleCreate}>创建新作品</span>
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
      'fetchWorks'
    ]),
    deleteWork (item) {
      // TODO delete work from work list
    },
    createWork () {
      this.$router.push({ name: 'editor' })
    }
  },
  render (h) {
    return (
      <div class="works-wrapper">
        <a-row gutter={24}>
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
          this.previewVisible &&
          <PreviewDialog
            work={this.activeWork}
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
