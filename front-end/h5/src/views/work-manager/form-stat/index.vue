<script>
/**
 * [基础数据](/work-manager/form-stat) 对应的页面
 *
 */
import { mapState, mapActions } from 'vuex'
import { columns } from './column'

export default {
  components: {
  },
  data: () => ({
    activeWork: null,
    previewVisible: false
  }),
  computed: {
    ...mapState('editor', ['works']),
    computedWorks () {
      return this.works.map(w => ({
        id: w.id,
        title: w.title,
        pv: w.pv || 0,
        uv: w.uv || 0,
        formCount: w.formCount || 0
      }))
    }
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
      <div class="works-wrapper" style="background-color:white;padding: 12px;margin-top: 24px;">
        <a-table size="middle" columns={columns} dataSource={this.computedWorks} row-key="id" scopedSlots={{
          action: function (props) {
            return [<router-link to={{ name: 'stat-detail', params: { id: props.id } }} >查看数据</router-link>]
          }
        }}>
        </a-table>
      </div>
    )
  },
  created () {
    this.fetchWorks()
  }
}
</script>
