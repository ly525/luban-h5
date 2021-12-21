<!--
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors: ly525
 * @LastEditTime: 2019-12-08 15:28:42
 * @FilePath: /luban-h5/front-end/h5/src/views/work-manager/form-stat/detail.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
    #!zh: 某个作品的的表单统计页
    #!en: forms for the work
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 -->

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
  },
  data: () => ({
  }),
  computed: {
    ...mapState('editor', ['formDetailOfWork']),
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
     * formRecords example: <[{
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
      const { formRecords, uuidMap2Name } = this.formDetailOfWork
      const rows = formRecords.map(({ form, id }) => {
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
      'fetchFormsOfWork'
    ])
  },
  render (h) {
    return (
      <div class="works-wrapper">
        <a-table columns={this.columns} dataSource={this.rows} row-key="id" scopedSlots={{
          action: function (props) {
            // 查看数据
            return [<router-link to={{ name: 'stat-detail', params: { id: props.id } }} >{this.$t('basicData.viewData')}</router-link>]
          }
        }}>
        </a-table>
      </div>
    )
  },
  created () {
    const workId = this.$route.params.id
    this.fetchFormsOfWork(workId)
  }
}
</script>
