import Spreadsheet from 'x-data-spreadsheet'

/**
 *
 declare module ExcelRows {
  export interface cell {
      text: string;
  }
  export interface Cells {
    0: cell;
    1: cell;
    2: cell;
  }
  export interface ExcelRows {
    cells: Cells;
  }
}
 */

/**
  *
  BinaryMatrix = [
    [any, any, any, ...],
    [any, any, any, ...],
    [any, any, any, ...],
  ]

  ExcelDataType = [
    {
      cells: {
        0: { text: any },
        1: { text: any },
        2: { text: any }
      }
    },
    {
      cells: {
        0: { text: any },
        1: { text: any },
        2: { text: any }
      }
    },
  ]
  */

class Parser {
  /**
   *
   * @param {*} dataset ExcelDataType
   */
  static dataset2excel (dataset) {
    return dataset.map(item => ({
      cells: {
        0: { text: item.x },
        1: { text: item.y },
        2: { text: item.s }
      }
    }))
  }

  /**
   *
    [
      [1,2,3,4],
      [5,6,7,8],
      [9,10,11,12]
    ]
   * @param {Object} BinaryMatrix
   * @returns {Object} ExcelDataType
   */
  static binaryMatrix2excel (binaryMatrix) {
    const excelData = binaryMatrix.map((row, rowIndex) => {
      // cells: {
      //   0: { text: item.x },
      //   1: { text: item.y },
      //   2: { text: item.s }
      // }
      const cells = {}
      row.forEach((cellValue, cellIndex) => {
        cells[cellIndex] = { text: cellValue }
      })
      return { cells }
    })
    return excelData
  }

  static excel2chartDataSet (excelData) {
    const rowsArray = Object.values(excelData.rows).filter(item => typeof item === 'object')
    const dataset = rowsArray.map(row => {
      const [x, y, s] = Object.values(row.cells).map(item => item.text)
      return {
        x: x,
        y: y,
        s: s
      }
    })
    return dataset
  }

  static excel2BinaryMatrix (excelData) {
    const rowsArray = Object.values(excelData.rows).filter(item => typeof item === 'object')
    const dataset = rowsArray.map(row => {
      // [1,2,3,4]
      const cells = Object.values(row.cells).map(item => item.text)
      return cells
    })
    console.log('dataset', dataset)
    return dataset
  }
}

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
