<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    script: {
      title: '',
      content: ''
    }
  }),
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    ...mapActions('editor', [
      'saveWork',
      'updateWork'
    ]),
    handleOk (e) {
      this.handleClose()
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.handleClose()
    }
  },
  render (h) {
    return (
      <a-modal
        visible={this.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width="70%"
        title={this.script.title}
      >
        <codemirror value={this.script.content} />
      </a-modal>
    )
  },
  mounted () {
    window.addEventListener('view-script', e => {
      this.script = JSON.parse(JSON.stringify(e.detail.data))
    })
  }
}
</script>
