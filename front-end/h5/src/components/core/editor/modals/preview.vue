<script>
import { mapActions } from 'vuex'
import ShareInfo from './share-info'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    },
    work: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // ...mapState('editor', {
    //   work: state => state.work
    // }),
    previewUrl () {
      return `${window.location.origin}/works/preview/${this.work.id}?view_mode=preview`
    }
  },
  data: () => ({
    confirmLoading: false
  }),
  methods: {
    ...mapActions('editor', [
      'saveWork',
      'updateWork'
    ]),
    handleOk (e) {
      this.confirmLoading = true
      this.saveWork().then(res => {
        this.handleClose()
        this.confirmLoading = false
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.handleClose()
    },
    postMessage2Iframe (message) {
      let iframe = document.getElementById('iframe-for-preview')
      if (!iframe) return
      const iframeWin = iframe.contentWindow
      iframeWin.postMessage(message, window.location.origin)
    }
  },
  render (h) {
    return (
      <a-modal
        visible={this.visible}
        confirmLoading={this.confirmLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width="70%"
        okText="保存"
      >
        <div class="preview-wrapper">
          <a-row gutter={20}>
            <a-col span={8}>
              <div class="phone-wrapper" style={{ transform: 'scale(0.8)' }}>
                <div class="phone">
                  <div class="float-ctrl-panel">
                    <a class="page-controller" onClick={(e) => { this.postMessage2Iframe('prev') }}>上一页</a>
                    <a class="page-controller" onClick={(e) => { this.postMessage2Iframe('next') }}>下一页</a>
                    {/**
                    <a-button icon="up" shape="circle" onClick={() => { this.postMessage2Iframe('prev') }}></a-button>
                    <a-button icon="down" shape="circle" onClick={() => { this.postMessage2Iframe('next') }}></a-button>
                    <a-icon type="up" class="page-controller" onClick={() => { this.postMessage2Iframe('prev') }}/>
                    <a-icon type="down" class="page-controller"  onClick={() => { this.postMessage2Iframe('next') }}/>
                    */}
                  </div>
                  {
                    // 类似 v-if="this.visible" 的目的：关闭预览弹框之后，销毁 iframe，避免继续播放音乐、视频
                    // similar with v-if="this.visible": destory the iframe after close the preview dialog to avoid playing the music and video
                    this.visible && <iframe
                      id="iframe-for-preview"
                      src={this.previewUrl}
                      frameborder="0"
                      style="height: 100%;width: 100%;"
                    ></iframe>
                  }
                  {/** <engine :work="editingWork" :map-config="{}" /> */}
                </div>
              </div>
            </a-col>
            <a-col span={12} offset={4}>
              <ShareInfo />
            </a-col>
          </a-row>
        </div>
      </a-modal>
    )
  }
}
</script>

<style lang="scss">
.preview-wrapper {
  position: relative;
  min-height: 480px;

  .phone-wrapper {
    position: absolute;
    box-sizing: content-box;
    .phone {
      position: absolute;
      width: 320px;
      height: 568px;

      display: inline-block;
      background: #fff;
      box-sizing: content-box;
      border-top: 10px solid #f6f6f6;
      border-left: 10px solid #f6f6f6;
      border-right: 10px solid #f6f6f6;
      border-bottom: 20px solid #f6f6f6;
      border-radius: 20px;
      -webkit-transform-origin: 100% 0;
      transform-origin: 100% 0;
      -webkit-transform: scale(1);
      transform: scale(1);

      .float-ctrl-panel {
        position: absolute;
        top: 100px;
        right: -40px;

        .page-controller {
          display: block;
          cursor: pointer;
          width: 30px;
          height: 80px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: #2096f9;
          font-size: 12px;
          text-align: center;
          border: 1px solid #2096f9;
          color: #fff;
          // position: absolute;
          padding: 14px 8px;
          margin-top: 12px;
          // margin-top: -50px;
        }

      }
    }
  }
}

</style>
