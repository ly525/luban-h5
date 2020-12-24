<template>
  <div>
    <a-button type="primary" @click="showDrawer">
      打开 LuckySheet
    </a-button>
    <a-drawer
      :width="720"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      :bodyStyle="{ padding: 0, margin: 0 }"
      :destroyOnClose="true"
    >
      <div
        id="luckysheet"
        style="height: 800px;width:100%;overflow:scroll;"
      ></div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
      this.$nextTick(() => {
        window.$(function () {
          window.luckysheet.create({
            container: 'luckysheet',
            data: [
              {
                name: 'Cell', // 工作表名称
                color: 'red', // 工作表颜色
                index: 0, // 工作表索引
                status: 1, // 激活状态
                order: 0, // 工作表的顺序
                hide: 0, // 是否隐藏
                row: 36, // 行数
                column: 18, // 列数
                celldata: [
                  {
                    r: 0,
                    c: 0,
                    v: {
                      ct: { fa: 'General', t: 'g' },
                      m: 'value1',
                      v: 'value1'
                    }
                  },
                  {
                    r: 0,
                    c: 1,
                    v: {
                      ct: { fa: 'General', t: 'g' },
                      m: 'value2',
                      v: 'value2'
                    }
                  }
                ], // 初始化使用的单元格数据
                config: {
                  merge: {}, // 合并单元格
                  rowlen: {}, // 表格行高
                  columnlen: {}, // 表格列宽
                  rowhidden: {}, // 隐藏行
                  colhidden: {}, // 隐藏列
                  borderInfo: {} // 边框
                },
                scrollLeft: 0, // 左右滚动条位置
                scrollTop: 315, // 上下滚动条位置
                luckysheet_select_save: [], // 选中的区域
                calcChain: [], // 公式链
                isPivotTable: false, // 是否数据透视表
                pivotTable: {}, // 数据透视表设置
                filter_select: {}, // 筛选范围
                filter: null, // 筛选配置
                luckysheet_alternateformat_save: [], // 交替颜色
                luckysheet_alternateformat_save_modelCustom: [], // 自定义交替颜色
                luckysheet_conditionformat_save: {}, // 条件格式
                frozen: {}, // 冻结行列配置
                chart: [], // 图表配置
                allowEdit: true, // 是否允许编辑
                zoomRatio: 1, // 缩放比例
                image: [] // 图片
              },
              {
                name: 'Sheet2',
                color: '',
                index: 1,
                status: 0,
                order: 1,
                celldata: [],
                config: {}
              },
              {
                name: 'Sheet3',
                color: '',
                index: 2,
                status: 0,
                order: 2,
                celldata: [],
                config: {}
              }
            ]
          })
        })
      })
    },
    onClose () {
      this.visible = false
    }
  },
  mounted () {}
}
</script>
