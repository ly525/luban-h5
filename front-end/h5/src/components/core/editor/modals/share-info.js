import { mapState, mapActions } from 'vuex'
import QRCode from 'qrcode'
import './share-info.scss'
import { debounce } from 'lodash'

export function drawQRcode (el, url) {
  QRCode.toCanvas(el, url, { scale: 4 }, err => {
    console.log(err)
  })
}

export default {
  computed: {
    ...mapState('editor', {
      work: state => state.work
    }),
    previewUrl () {
      return `${window.location.origin}/works/preview/${this.work.id}?view_mode=preview`
    },
    releaseUrl () {
      return `${window.location.origin}/works/preview/${this.work.id}`
    },
    previewEngineDoc () {
      return 'https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html#_2-%E6%9E%84%E5%BB%BA%E9%A2%84%E8%A7%88%E6%89%80%E9%9C%80%E7%9A%84%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E'
    }
  },
  methods: {
    ...mapActions('editor', [
      'saveWork',
      'updateWork'
    ]),
    /**
     * 修改标题、描述信息后自动保存
     * @param {Object} info { title/description: String }
     */
    autoSave (info) {
      this.updateWork(info)
      this.debounceSave()
    }
  },
  mounted () {
    drawQRcode(this.$refs.qrcode, this.previewUrl)
    // 修改标题、描述信息后自动保存
    this.debounceSave = debounce(() => this.saveWork(), 2000)
  },
  render (h) {
    return (
        <div class="setting">
        <div class="info">
          <h4 class="label">设置作品信息</h4>
          <a-input
            class="input"
            value={this.work.title}
            onChange={e => this.autoSave({ title: e.target.value })}
            // onBlur={this.saveTitle}
            placeholder="请输入标题"
          ></a-input>
          <a-input
            class="input"
            value={this.work.description}
            onChange={e => this.autoSave({ description: e.target.value })}
            // v-model="description"
            // onBlur={this.saveDescription}
            placeholder="请输入描述"
            type="textarea"
          ></a-input>
        </div>
        <a-list item-layout="horizontal" dataSource={[
            {
              title: '查看预览引擎文档'
              // url: this.previewEngineDoc
            },
            {
              title: '查看预览页面',
              url: this.previewUrl
            },
            {
              title: '查看发布后页面',
              url: this.releaseUrl
            }

        ]}
        renderItem={(item, index) => (
          <a-list-item>
            <a-list-item-meta
              content={item.url}
            >
              <a slot="title" href={item.url}>{item.title}</a>
            </a-list-item-meta>
            {item.url}
          </a-list-item>
      )}>
        </a-list>
        <div class="qrcode my-4">
          <div class="label">
            <span>手机扫码分享给好友</span>
          </div>
          <div class="code">
            <canvas style="float: left" ref="qrcode"></canvas>
            {/**
            <a-radio-group class="radios" value={this.qrcodeSize} onChange={e => { this.qrcodeSize = e.target.value }}>
              <a-radio label={500} value={500}>500x500</a-radio>
              <a-radio label={1000} value={1000}>1000x1000</a-radio>
              <a-radio label={2000} value={2000}>2000x2000</a-radio>
            </a-radio-group>
            */}
          </div>
        </div>
      </div>
    )
  }
}
