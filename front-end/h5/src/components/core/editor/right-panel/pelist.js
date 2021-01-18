import Vue from 'vue'
import Antd from 'ant-design-vue';
// import { message } from 'ant-design-vue'
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
      tableScroll: {x:400, y:scrollY},
      pageShowEnable: true,
      columns: [
  {
    dataIndex: 'uuid',
    key: 'uuid',
    title: 'uuid',
    className: 'notshow'
  },
  {
    title: '序号',
    customRender: (text, record, index) => `${index+1}`,
    // ellipsis: true,
    width: 32
  },
  {
    dataIndex: 'ptn',
    key: 'ptn',
    title: '类别',
    customRender: (text, record, index) => `${text}`,
    // ellipsis: true,
    width: 50
  },
  {
    dataIndex: 'ppti',
    key: 'ppti',
    title: '说明',
    // ellipsis: true,
    width: 136,
    scopedSlots: { customRender: 'ppti' }
  },
  {
    dataIndex: 'csosn',
    key: 'csosn',
    title: '顺序',
    width: 32,
    // ellipsis: true,
    scopedSlots: { customRender: 'csosn' }
  },
  {
    dataIndex: 'csosne',
    key: 'csosne',
    title: '有序',
    width: 32,
    scopedSlots: { customRender: 'csosne' }
  },
  {
    dataIndex: 'pse',
    key: 'pse',
    title: '隐藏',
    width: 32,
    scopedSlots: { customRender: 'pse' }
  },
  {
    dataIndex: 'ste',
    key: 'ste',
    title: '显隐',
    width: 32,
    scopedSlots: { customRender: 'ste' }
  },
  {
    dataIndex: 'de',
    key: 'de',
    title: '拖动',
    width: 32,
    scopedSlots: { customRender: 'de' }
  },
  {
    dataIndex: '',
    key: '',
    title: ''
  }
]
}
},
 computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
    }),
    pesaList: function() {
      let elementList = new Array()
      let elements = this.elements
      let len = elements.length
      for(let i = 0; i < len; i++){
        let element = {}
        let item = elements[i]
        let elementName = item['name'].replace('lbp-','')
            element.ptn = elementName
            element.uuid = item['uuid']
            let pluginPropsText = item['pluginProps']['text']
            if(pluginPropsText){
              pluginPropsText = pluginPropsText.replace(/<[^>]*>|/g,"")
            }
            else{
              pluginPropsText = ''
            }
          element.ci = 0
          element.ppti = pluginPropsText
          element.csosn = i
          element.csosne = 0
          element.pse = 1
          element.ste = 0
          element.de = 0
          elementList.push(element)
      }
      return elementList
    }
  },
  methods: {
  },
  created () {
  },
render (h) {
  console.log(this.$scopedSlots)
    return (
            <div style={{ height: '100%', position: 'relative' }}>
              <a-form layout="vertical">
                  <a-form-item label="元素列表">
                      <a-table columns={this.columns} dataSource={this.pesaList} rowKey="uuid" tableLayout="fixed" scroll={this.tableScroll} pagination={false} defaultExpandAllRows={false} style={{tableLayout: 'fixed',wordBreak: 'break-all'}}>
                        <span slot="ppti" slot-scope="text, record, index"><a-input type="text" v-decorator="['ppti', {}]"  placeholder="元素名称" ></a-input></span>
                        <span slot="csosn" slot-scope="text, record, index">&nbsp;</span>
                        <span slot="csosne" slot-scope="text, record, index"><a-switch size="small" default-checked /></span>
                        <span slot="pse" slot-scope="text, record, index"><a-switch size="small" default-checked /></span>
                        <span slot="ste" slot-scope="text, record, index"><a-switch size="small" default-checked /></span>
                        <span slot="de" slot-scope="text, record, index"><a-switch size="small" default-checked /></span>
                        </a-table>
                  </a-form-item>
              </a-form>
            </div>
    )
  }
}
