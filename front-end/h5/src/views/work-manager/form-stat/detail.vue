<script>
/**
 * [基础数据](/work-manager/form-stat) 对应的页面
 *
 */
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data: () => ({
    activeWork: null,
    previewVisible: false
  }),
  computed: {
    ...mapState('editor', ['works', 'formDetailOfWork']),
    computedWorks () {
      return this.works.map(w => ({
        id: w.id,
        title: w.title,
        pv: w.pv || 0,
        uv: w.uv || 0,
        formCount: w.formCount || 0
      }))
    },
    /**
     * columns demo: [{"1565369322603":"abc"},{"1565595388440":"ddd"},{"1565595388440":"acd"},{"1565596393441":"b","1565596397671":"a"},{"1565596393441":"b","1565596397671":"a"}]
     */
    columns () {
      const { uuidMap2Name } = this.formDetailOfWork
      // the uuid for input plugin
      return Object.entries(uuidMap2Name).map(([uuid, inputName]) => ({
        title: inputName,
        key: `uuid-${uuid}`,
        dataIndex: `uuid-${uuid}`
      }))
    },
    /**
     * rows demo: [{"title":"姓名","key":"1565596393441"},{"title":"学校","key":"1565596397671"}]
     *
     * formDetails example: <[{
        "id": 4,
        "form": {
          "1565595388440": "ddd",
          1234: 'abc'
        },
        "work": 8,
        "created_at": "2019-08-11T07:36:54.521Z",
        "updated_at": "2019-08-11T07:36:54.526Z"
      }]>
    */
    rows () {
      const { formDetails, uuidMap2Name } = this.formDetailOfWork
      const rows = formDetails.map(({ form, id }) => {
        const row = {}
        Object.entries(form).forEach(([uuid, inputValue = '-']) => {
          if (uuidMap2Name[uuid]) {
            row[`uuid-${uuid}`] = inputValue
            row.id = id
          }
        })
        return row
      })
      return rows.filter(row => Object.keys(row).length)
    }
  },
  methods: {
    ...mapActions('editor', [
      'fetchWorks',
      'fetchFormsOfWork'
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
        <a-table columns={this.columns} dataSource={this.rows} row-key="id" scopedSlots={{
          action: function (props) {
            return [<router-link to={{ name: 'stat-detail', params: { id: props.id } }} >查看数据</router-link>]
          }
        }}>
        </a-table>
      </div>
    )
  },
  created () {
    // this.fetchWorks()
    const workId = this.$route.params.id
    this.fetchFormsOfWork(workId)
  }
}
</script>
