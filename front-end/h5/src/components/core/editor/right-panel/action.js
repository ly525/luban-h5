import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState('editor', [
      'editingElement'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement'
    ])
  },
  created () {},
  render (h) {
    const ele = this.editingElement
    if (!ele) return (<span>{this.$t('editor.editPanel.common.empty')}</span>)
    return (<div>
      TODO
    </div>)
  }
}
