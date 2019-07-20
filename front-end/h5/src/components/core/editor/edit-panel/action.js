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
    if (!ele) return (<span>请先选择一个元素</span>)
    return (<div>
      TODO
    </div>)
  }
}
