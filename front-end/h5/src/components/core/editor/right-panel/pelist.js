import Vue from 'vue'
import { message } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'
import Page from 'core/models/page'
import 'ant-design-vue/dist/antd.css'
import 'font-awesome/css/font-awesome.min.css'
import './pelist.css'
export default {
  data () {
    return {
      formLayout: 'vertical',
      rowKey: 'uuid',
      tableLayout: 'fixed',
      defaultExpandAllRows: false,
      pagination: false,
      pageElements: '',
      rows: this.$store.state.editor.editingPage.elements,
      columns: [
  {
    dataIndex: 'uuid',
    key: 'uuid',
    title: 'uuid',
    className: 'notshow'
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: '名称',
    width: '60px'
  },
  {
    dataIndex: 'customname',
    key: 'customname',
    title: '说明',
    width: '100px'
  },
  {
    dataIndex: 'initShow',
    key: 'initShow',
    title: '初显',
    width: '30px'
  },
  {
    dataIndex: 'hidden',
    key: 'hidden',
    title: '隐藏',
    width: '30px'
  }
]
}
},
 computed: {
    ...mapState('editor', [
      'editingPage'
    ])
  },
  methods: {
  },
  created () {},
render (h) {
    return (
            <div style={{ height: '100%', position: 'relative' }}>
              <a-form layout="vertical">
                  <a-form-item label="元素列表">
                      <a-table columns={this.columns} dataSource={this.rows} rowKey="uuid" tableLayout="fixed" pagination={false} defaultExpandAllRows={false} style={{tableLayout: 'fixed',wordBreak: 'break-all'}} scopedSlots={{}}>
                      </a-table>
                  </a-form-item>
              </a-form>
            </div>
    )
  }
}
