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

export default class Parser {
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

  /**
  *
  * @param {Array} csvArray
  *    [
         ['日期', '销售量'],
         ["1月1日",123],
         ["1月2日",1223],
         ["1月3日",2123],
         ["1月4日",4123],
         ["1月5日",3123],
         ["1月6日",7123]
       ]
  * @returns {Object}
     {
       columns: ['日期', '销售量'],
       rows:[
         { '日期': '1月1日', '销售量': 123 },
         { '日期': '1月2日', '销售量': 1223 },
         { '日期': '1月3日', '销售量': 2123 },
         { '日期': '1月4日', '销售量': 4123 },
         { '日期': '1月5日', '销售量': 3123 },
         { '日期': '1月6日', '销售量': 7123 }
       ]
     }
  */
  static csv2VChartJson (csvArray) {
    const columns = csvArray[0]
    const rows = csvArray.slice(1)
    const json = {
      columns,
      rows: rows.map((row, index) => {
        const obj = {}
        columns.forEach((col, colIndex) => {
          obj[col] = row[colIndex]
        })
        return obj
      })
    }
    return json
  }
}
