import QRCode from 'qrcode'
import CardCover from './card-cover'

export default {
  props: {
    isTemplate: {
      type: Boolean,
      default: false
    },
    work: {
      type: Object,
      default: () => ({})
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
      const url = `${window.location.origin}/works/preview/${work.id}`
      QRCode.toDataURL(url, (err, url) => {
        if (err) console.log(err)
        this.qrcodeUrl = url
      })
    }
  },
  render (h) {
    return (
      <a-card hoverable>
        <CardCover
          slot="cover"
          qrcodeUrl={this.qrcodeUrl}
          coverImageUrl={this.work.cover_image_url}
        />
        <template class="ant-card-actions" slot="actions">
          {
            // 编辑
            this.isTemplate
              ? <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.useNow')}>
                <a-icon
                  type="plus-square"
                  title={this.$t('workCard.useNow')}
                  onClick={() => this.$emit('useTemplate', this.work)}
                />
              </a-tooltip>
              : <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.edit')}>
                <router-link
                  to={{ name: 'editor', params: { workId: this.work.id } }}
                  target="_blank"
                >
                  <a-icon type="edit" title={this.$t('workCard.edit')}/>
                </router-link>
              </a-tooltip>
          }
          {/** 预览 */}
          <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.preview')}>
            <a-icon type="eye" title={this.$t('workCard.preview')} onClick={() => this.$emit('preview')} />
          </a-tooltip>
          {
            !this.isTemplate &&
            <a-tooltip effect="dark" placement="bottom" title={this.$t('workCard.delete')}>
              <a-icon type="delete" title={this.$t('workCard.delete')} onClick={() => this.$emit('delete') } />
            </a-tooltip>
          }
          {
            this.qrcodeUrl
              ? <a-icon type="close-circle" onClick={() => { this.qrcodeUrl = '' }} />
              : <a-icon type="qrcode" onClick={() => this.genQRCodeUrl(this.work)} />
          }
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

export const AddNewCard = {
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
