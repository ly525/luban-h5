/*
Luban-H5 PPT版本分支 html5全屏(Fullscreen) 放映模式 建议稿
"pageShowEnable":true(放映时可以show),
"pfst": false(放映时有工具板),

page Element Show attribute List (pesaList jsonArray)
attribute name	default Value	describe	instructions
uuid	　	Element uuid	　
eapta(ptn)	　	plugin type name	插件类型名称
eappti(ppti)	　	plugin PropsText instructions	插件文本文字描述说明

eacsosn(csosn)顺序	1,2,3,4,5,6……	click show order sequence number 	Element插件,Click时，先后Show的顺序，整数值1,2,3…HTML5全屏(Fullscreen)播放时，Click, Enter,这些元素按顺序Show出来，按键SpaceBar时逆顺序Hidden
eacsosn(csosne)有序	0(无csosn值)	csosn enable	0:取消Click Show的顺序csosn的复位空(0) 1:允许Click Show序,csosn值设为不重复的一个整数
eaphe(pse)注释(或备注)	1(可显示)	play show enable	预览或放映时 1:可显示，可隐藏 0:总是隐藏
easte(ste) 显隐	0(不许可Toggle)	show toggle enable	Element所在位置区域，有这样的显示属性:当Click时，要么Show，要么Hidden
eade(de) 拖动	0(不能拖动)	draggable enable	预览或放映时,长按Element元素Drag时 1:允许拖动 0:不允许拖动
*/
import { mapState, mapActions } from 'vuex'
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
      tableScroll: { x: 400, y: scrollY },
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
                  customRender: (text, record, index) => {
                    return <div class='dragenablerowcell' onmouseover={this.onmouseover1} onmouseleave={this.onmouseleave1}>{ index + 1 }</div>
                  }
                },
                {
                  dataIndex: 'ptn',
                  key: 'ptn',
                  title: '类别',
                  customRender: (text, record, index) => {
                    return <div class='dragenablerowcell' onmouseover={this.onmouseover2} onmouseleave={this.onmouseleave2}>{text}</div>
                  }
                },
                {
                  dataIndex: 'ppti',
                  key: 'ppti',
                  title: '说明',
                  // ellipsis: true,
                  customRender: (text, record, index) => {
                    return <a-input
                    type='text'
                    placeholder='元素名称'
                    default-value={record.ppti}
                    onChange = {
                       e => { // elementList.item.value = e.target.value
                      this.onchangePpti(e.target.value, { record })
                    }
                  }
                      >
                      </a-input>
                  }
                },
                {
                  dataIndex: 'csosn',
                  key: 'csosn',
                  title: '顺序',
                  sorter: (a, b) => {
                    let aCsosn = a.csosn
                    let bCsosn = b.csosn
                    aCsosn = aCsosn === 0 ? 65536 : aCsosn
                    bCsosn = bCsosn === 0 ? 65535 : bCsosn
                    return aCsosn - bCsosn
                  },
                  defaultSortOrder: 'ascend',
                  sortDirections: ['ascend', 'descend'],
                  customRender: (text, record, index) => {
                    // return <a-input type='text' placeholder='顺序' default-value={record.csosn} ></a-input>
                    return <span>{text}</span>
                  }
                },
                {
                  dataIndex: 'csosne',
                  key: 'csosne',
                  title: '有序',
                  customRender: (text, record, index) => {
                    let checkedvalue = text === 1
                    return <a-switch size='small' onChange={(checked) => { this.onchangeCsosne(checked, { record }) } } checked={checkedvalue} checked-children='序' un-checked-children='否' ></a-switch>
                  }
                },
                {
                  dataIndex: 'pse',
                  key: 'pse',
                  title: '注释',
                  customRender: (text, record, index) => {
                    let checkedvalue = text === 1
                    return <a-switch size='small' onChange={(checked) => { this.onchangePse(checked, { record }) } } checked={checkedvalue} checked-children='否' un-checked-children='是' ></a-switch>
                  }
                },
                {
                  dataIndex: 'ste',
                  key: 'ste',
                  title: '显隐',
                  customRender: (text, record, index) => {
                    let checkedvalue = text === 1
                    return <a-switch size='small' onChange={ (checked) => { this.onchangeSte(checked, { record }) } } checked={checkedvalue} checked-children='可' un-checked-children='否' ></a-switch>
                  }
                },
                {
                  dataIndex: 'de',
                  key: 'de',
                  title: '拖动',
                  customRender: (text, record, index) => {
                    let checkedvalue = text === 1 // let checkedvalue = text === 1 ? true : false
                    return <a-switch size='small' onChange={ (checked) => { this.onchangeDe(checked, { record }) } } checked={checkedvalue} checked-children='能' un-checked-children='否' ></a-switch>
                  }
                }
              ],
             /*  elementList: [], */
              pptiStyle: { width: '120px' },
              csosnStyle: { width: '50px' }
}
},
 computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      // editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      slidePresentation: state => state.editingPage.slidePresentation
    }),
    pesaList: function () {
      return this.slidePresentation.pesaList
    }
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement',
      'pesaListElementChangeAttr',
      'pesaListElementChangeAttrPpti',
      'pesaListElementRowDragDrog',
      'elementManager',
      'pageManager',
      'setEditingPage'
    ]),
    onchangeCsosne: function (checked, record) { // wmhz
      let payload = {}
      payload.elementUuid = record['record']['uuid']
      payload.elementAttrName = 'csosne'
      payload.elementAttrValue = record['record']['csosne']
      this.pesaListElementChangeAttr(payload)
    },
    onchangePse: function (checked, record) {
      let payload = {}
      payload.elementUuid = record['record']['uuid']
      payload.elementAttrName = 'pse'
      payload.elementAttrValue = record['record']['pse']
      this.pesaListElementChangeAttr(payload)
    },
    onchangeSte: function (checked, record) {
      let payload = {}
      payload.elementUuid = record['record']['uuid']
      payload.elementAttrName = 'ste'
      payload.elementAttrValue = record['record']['ste']
      this.pesaListElementChangeAttr(payload)
    },
    onchangeDe: function (checked, record) {
      let payload = {}
      payload.elementUuid = record['record']['uuid']
      payload.elementAttrName = 'de'
      payload.elementAttrValue = record['record']['de']
      this.pesaListElementChangeAttr(payload)
    },
    onchangePpti: function (pptiValue, record) {
      let recordValue = record['record']
      this.pesaListElementChangeAttrPpti({ pptiValue, recordValue })
    },
    onmouseover1: function ($event) {
      let row = $event.target.parentNode.parentNode
      row.setAttribute('draggable', 'true')
      row.style.cursor = 'move'
    },
    onmouseleave1: function ($event) {
      let row = $event.target.parentNode.parentNode
      row.setAttribute('draggable', 'false')
      row.style.cursor = 'default'
    },
    onmouseover2: function ($event) {
      let row = $event.target.parentNode.parentNode
      row.setAttribute('draggable', 'true')
      row.style.cursor = 'move'
    },
    onmouseleave2: function ($event) {
      let row = $event.target.parentNode.parentNode
      row.setAttribute('draggable', 'false')
      row.style.cursor = 'default'
    }
  },
  created () {
  },
  mounted () {
  },
render () {
   const table = (<a-table
     customRow={(record, index) => {
    return {
      props: {
        draggable: true
      },
      on: {
        mouseenter: ($event) => {
          let nodes = document.querySelectorAll('div[eluid]')
          let currentEluid = record.uuid
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i]
            let eluid = node.getAttribute('eluid')
            if (('' + eluid) === ('' + currentEluid)) {
              document.querySelector('div[eluid="' + eluid + '"]').classList.add('elHighlighted')
            } else {
              document.querySelector('div[eluid="' + eluid + '"]').classList.remove('elHighlighted')
            }
          }
        },
        mouseleave: ($event) => {
          let nodes = document.querySelectorAll('div[eluid]')
          for (let i = 0; i < nodes.length; i++) {
            nodes[i].classList.remove('elHighlighted')
          }
        },
        dragstart: ($event) => {
            var ev = $event || window.event
            ev.stopPropagation()
            ev.dataTransfer.setData('sourceRowUuid', record.uuid)
            ev.dataTransfer.setData('sourceRowCsosn', record.csosn)
          },
          dragover: ($event) => {
            var ev = $event || window.event
            ev.preventDefault()
          },
          drop: ($event) => {
            var ev = $event || window.event
            ev.stopPropagation()
            let sourceRowUuid = ev.dataTransfer.getData('sourceRowUuid')
            let sourceRowCsosn = ev.dataTransfer.getData('sourceRowCsosn')
            let targetRowUuid = record.uuid
            let targetRowCsosn = record.csosn
            let rowDragDrogPayload = {}
            rowDragDrogPayload.sourceRowUuid = sourceRowUuid
            rowDragDrogPayload.sourceRowCsosn = sourceRowCsosn
            rowDragDrogPayload.targetRowUuid = targetRowUuid
            rowDragDrogPayload.targetRowCsosn = targetRowCsosn
            if (sourceRowCsosn > 0 && targetRowCsosn > 0) {
              this.pesaListElementRowDragDrog(rowDragDrogPayload)
            }
          }
      }
    }
  }}
   columns={this.columns} dataSource={this.pesaList} sortDirections={['ascend', 'descend']} scopedSlots={this.$scopedSlots} rowKey="uuid" tableLayout="fixed" scroll={this.tableScroll} pagination={false} defaultExpandAllRows={false} style={{ tableLayout: 'fixed', wordBreak: 'break-all' }}></a-table>)
   return (
    <div>
     { table }
    </div>
   )
  }
}
