<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import QRCode from 'qrcode'
import scriptList from '@/constants/script'

const columns = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'action' }
  },
  {
    title: '查看',
    key: 'view',
    fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'view' }
  }
]
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
    ...mapState('editor', [
      'editingElement',
      'scripts'
    ]),
    releaseUrl () {
      return `${window.location.origin}/works/preview/${this.work.id}`
    }
  },
  data () {
    return {
      confirmLoading: false,
      qrcodeSize: 500,
      isLoaded: false,
      dataSource: Object.freeze(scriptList)
    }
  },
  // watch: {
  //   visible (val) {
  //     if (!val) return
  //     this.$nextTick(() => this.drawQRcode())
  //   }
  // },
  methods: {
    ...mapActions('editor', [
      'saveWork',
      'updateWork',
      'fetchScripts'
    ]),
    ...mapMutations('dialog', ['updateDialog']),
    handleOk (e) {
      this.confirmLoading = true
      this.saveWork().then(res => {
        this.handleClose()
        this.confirmLoading = false
      })
    },
    handleCancel (e) {
      this.handleClose()
    },
    drawQRcode () {
      var canvas = document.getElementById('qrcode-container')
      QRCode.toCanvas(canvas, this.releaseUrl, { scale: 4 }, err => {
        console.log(err)
      })
    },
    postMessage2Iframe (message) {
      let iframe = document.getElementById('iframe-for-preview')
      if (!iframe) return
      const iframeWin = iframe.contentWindow
      iframeWin.postMessage(message, window.location.origin)
    },
    openNewTab (urlType) {
      switch (urlType) {
        case 'previewDebug':
          window.open(this.releaseUrl)
          break
        case 'buildEngineDocs':
          window.open('https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html#_2-%E6%9E%84%E5%BB%BA%E9%A2%84%E8%A7%88%E6%89%80%E9%9C%80%E7%9A%84%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E')
          break
      }
    }
  },
  render (h) {
    return (
      <a-drawer
        title="请选择脚本(装备)"
        placement="left"
        closable={true}
        onClose={this.handleCancel}
        visible={this.visible}
        width={400}
        wrapStyle={{ margin: '16px -16px' }}
      >
        <div class="preview-wrapper">
          <a-table
            size="middle"
            columns={columns}
            dataSource={this.scripts}
            // scroll={{ x: 1500, y: 300 }}
            scopedSlots={{
              // interface ScriptItem { value: string, label: string, uuid: string }
              action: script => {
                return <a onClick={() => {
                  const target = this.editingElement.scripts.find(item => item.id === script.id)
                  if (target) {
                    this.$message.error('脚本已经存在')
                    return
                  }
                  this.editingElement.scripts.push(script)
                  this.editingElement.mixinScript(script)
                  this.handleCancel()
                }}>使用(购买装备)</a>
              },
              view: script => {
                return <a onClick={() => {
                  window.dispatchEvent(new CustomEvent('view-script', { detail: { data: script } }))
                  this.updateDialog({ type: 'viewScript_dialog', value: true })
                }}>查看</a>
              }
            }}
          />
        </div>
      </a-drawer>
      // <a-modal
      //   visible={this.visible}
      //   confirmLoading={this.confirmLoading}
      //   onOk={this.handleOk}
      //   onCancel={this.handleCancel}
      //   width="70%"
      //   okText="保存"
      // >
    // </a-modal>
    )
  },
  created () {
    this.fetchScripts()
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
  .setting {
    color: #4a4a4a;
    font-size: 14px;
    float: right;
    width: 380px;
    .info {
      .input {
        margin-top: 10px;
      }
    }
    .qrcode {
      margin-top: 20px;
      .label span {
        margin-right: 10px;
      }
    }
    .code {
      // !#zh 防止浮动塌陷
      overflow: hidden;
      .radios {
        width: 80px;
        margin-top: 5px;
        margin-left: 30px;
        label {
          margin-left: 0px;
          margin-top: 10px;
        }
        button {
          margin-top: 15px;
        }
      }
    }
    .link {
      width: 100%;
      display: block;
    }
    .edit {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
