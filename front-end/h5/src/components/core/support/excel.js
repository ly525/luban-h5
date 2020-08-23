/**
 * 后续学习资料：https://github.com/myliang/x-spreadsheet/issues/159
 */

import Spreadsheet from 'x-data-spreadsheet'
import Parser from '../../../utils/excel-parser'

// const getDefaultTableMatrix = () => [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12]
// ]

export default {
  name: 'lbs-excel-editor',
  props: {
    value: {
      type: Array,
      // default: () => getDefaultTableMatrix()
      default: () => []
    },
    formatter: {
      type: Function,
      default: Parser.excel2BinaryMatrix
    }
  },
  computed: {
    innerItems: {
      get () {
        return Parser.binaryMatrix2excel(this.value)
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  render () {
    return <div id="excel-wrapper" ref="excel" style="margin-right: 12px;width: 100%;overflow: scroll"></div>
  },
  mounted () {
    const ele = this.$refs.excel
    const options = {
      showToolbar: false,
      showGrid: true,
      showContextmenu: true
      // view: {
      //   height: () => 400,
      //   width: () => ele.getBoundingClientRect().width
      // }
    }
    new Spreadsheet(ele, options)
      .loadData({
        rows: this.innerItems
      }) // load data
      .change(excelData => {
        // console.log('----------')
        // console.log(excelData)
        // console.log(this.formatter(excelData))
        // console.log('----------')
        this.$emit('change', this.formatter(excelData) /** BinaryMatrix */)
        // save data to db
      })
  }
}
