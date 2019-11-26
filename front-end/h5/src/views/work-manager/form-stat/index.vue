<!--
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2019-11-26 10:48:17
 * @FilePath: /luban-h5/front-end/h5/src/views/work-manager/form-stat/index.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 * @Description:
    #!zh: [基础数据页面](/work-manager/form-stat) 对应的页面
    #!en: [basic data page](/work-manager/form-stat)
 -->

<script>
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
    const that = this
    return (
      <div class="works-wrapper" style="background-color:white;padding: 12px;margin-top: 24px;">
        <a-table size="middle" columns={columns} dataSource={this.computedWorks} row-key="id" scopedSlots={{
          id: (props) => {
            return (
              <router-link to={{ name: 'editor', params: { workId: props.id } }} target="_blank" title={this.$t('workCard.view')}>
                {props.id}
                <a-icon type="link" title={this.$t('workCard.view')} class="ml-3" />
              </router-link>
            )
          },
          action: (props) => {
            // 查看数据
            return [<router-link to={{ name: 'stat-detail', params: { id: props.id } }} >{that.$t('basicData.viewData')}</router-link>]
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
