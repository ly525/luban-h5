/**
 * echarts demo: https://www.echartsjs.com/examples/zh/editor.html?c=line-simple
 * 通过输入固定格式的 echarts dataset，得到 echarts options
 *
 * TODO X轴 formatter：1.只针对 X轴，不针对 tooltip 2. tooltip 和 X轴同时生效
 * TODO legend(series) 到多Y轴的映射
 */
import _ from 'lodash'

export class LineChart {
  constructor ({ xAxis = [], yIndexMap = {}, dataset }) {
    this.chartType = 'line'
    this.colors = {
      series: [
        { value: '#57b2ff' },
        { value: '#d70b24' },
        { value: '#48c765' },
        { value: '#fbb64e' },
        { value: '#f95e58' }
      ],
      labelText: {
        xAxis: 'rgba(0,0,0,.6)',
        yAxis: 'rgba(0,0,0,.6)'
      },
      splitLine: 'rgba(236, 237, 239, 0.26)'
    }
    this.yIndexMap = yIndexMap
    this.dataset = dataset
    this.keys = { xAxis: 'x', yAxis: 'y', legend: 's' }
    this.legends = this.getLegends()
    this.xAxis = (xAxis.length && xAxis) || this.getXAxis()
    this.yAxis = this.getYAxis(this.legends)
    this.series = this.getSeries(this.legends, this.xAxis)
    this.tooltip = this.getTooltip()
  }
  /**
   * 填补缺失值，说白了其实就是 merge
   * seriesTemplate: [{x: '01-01', y: null}, {x: '02-01', y: null}, {x: '03-01', y: null}]
   * seriesItemsFromDataSet: [{ x: '01-01', y: 11}, {x: '03-01', y: 33 }]
   *
   * => [{x: '01-01', y: 11}, {x: '02-01', y: null}, {x: '03-01', y: 33}]
   *
   * seriesTemplate (X轴所有点): ['01-01', '01-02', '01-03]
   * seriesItemsFromDataSet: 可能缺失的数据作为 填充值
   * options: { legend: string // 某条折线图名字 }
   *
   * seriesTemplate -> 循环填充默认值 -> [Object, Object]
   * seriesItemsFromDataSet -> 字典{} -> 循环模板（X轴所有点）-> 找到X轴上点在 seriesItemsFromDataSet字典中的值 ->，替换模板中的默认值 -> 返回填充后的模板
   */
  padMissingValues (seriesTemplate, seriesItemsFromDataSet, options) {
    const { xAxis, yAxis, legend } = this.keys
    const seriesItemsFromDataSetDict = seriesItemsFromDataSet.reduce((obj, curr) => (Object.assign(Object.assign({}, obj), { [curr[xAxis]]: curr })), {})
    const templateWithValue = seriesTemplate.map(xAxis => {
      return (seriesItemsFromDataSetDict[xAxis] || {
        [legend]: options.legend,
        [xAxis]: xAxis,
        [yAxis]: null
      })
    })
    return templateWithValue
  }
  /**
     * 对于复杂的数据转换，需要写 ts，方便看懂代码之间的数据流转
     * @returns: ['折线图1', '折线图2']
     */
  getLegends () {
    const legendKey = this.keys.legend
    const allLegends = _.uniqBy(this.dataset, legendKey).map((item) => item[legendKey])
    const legends = Array.from(new Set(allLegends))
    return legends
  }
  /**
     * 获取X轴的数据
     * demo: ['01-01', '02-01', '03-01', '04-01']
     */
  getXAxis () {
    const xAxis = this.dataset.map(item => item[this.keys.xAxis])
    return xAxis
  }
  getTooltip () {
    return {
      trigger: 'axis'
    }
  }
  getDefaultYAxis (option) {
    const { show, axisLabelFormatter } = option
    return {
      show,
      type: 'value',
      axisLabel: {
        // Y轴文字颜色，
        color: this.colors.labelText.xAxis,
        // formatter: '{value}',
        formatter: axisLabelFormatter
      },
      // 不需要对 Y 轴顶部的文字做定制
      // nameTextStyle: {
      //   color: [yAxisTitleFontColor],
      //   fontSize: 14,
      //   fontWeight: 600,
      // },
      // y轴坐标轴轴线， 也就是y轴的一条竖线
      axisLine: {
        show: false,
        lineStyle: {
          // y轴上数字的颜色
          fontSize: 15,
          color: this.colors.labelText.yAxis
          // opacity: 1
        }
      },
      // 显示轴线与数值之间的 「-」
      axisTick: { show: false },
      splitLine: {
        lineStyle: {
          // 使用深浅的间隔色
          // 类似四条三格的横线的颜色
          color: [this.colors.splitLine]
        }
      }
    }
  }
  /**
   * Y轴数据
   * @param legends
   */
  getYAxis (legends) {
    // TODO 如果返回值 函数怎么办呢？
    function getAxisLabelFormatter (legend) {
      return function (value) {
        // const format = formatDict[legend] || "0.0a";
        // return numeral(value).format(format);
        // TODO 自己实现 formatter 函数
        return value
      }
    }
    const yAxis = legends.map(legend => this.getDefaultYAxis({
      show: window.innerWidth > 768,
      // TODO 外界传进来legendValueFormatter
      axisLabelFormatter: getAxisLabelFormatter(legend)
    }))
    return yAxis
  }
  /**
   *
   * @param {*} legends
   * @param {*} xAxis
   *
   interface Series {
     name: string,
      data: seriesData,

    }
  */
  getSeries (legends, xAxis) {
    /**
    interface groupbyLegend {
      [legendKey1]: [
        [legendKey1]: legendValue,
        [xAxiskey]: xAxisValue,
        [yAxiskey]: yAxisValue
      ]
    }
    */
    const groupbyLegend = _.groupBy(this.dataset, this.keys.legend)
    const series = legends.map((legend, index) => {
      const seriesItemsFromDataSet = groupbyLegend[legend]
      const data = this.padMissingValues(xAxis, seriesItemsFromDataSet, { legend }).map(item => item[this.keys.yAxis])
      return {
        name: legend,
        type: this.chartType,
        // TODO 值和 value 对应起来
        data,
        yAxisIndex: this.yIndexMap[legend] || 0,
        itemStyle: {
          normal: {
            color: this.colors.series[index].value
          }
          // emphasis: {
          //   color: '#59a4ed',
          // },
        }
        // TODO 指定 Y轴
        // TODO zlevel: 0,
      }
    })
    return series
  }
  getDefaultOption () {
    return {
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      axisTick: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            // x轴颜色, 包含：x轴的颜色、文字颜色
            // 图例： https://jietu.qq.com/upload/index.html?image=http://jietu-10024907.file.myqcloud.com/hwfezrujmosnhjesfoweuqdguwrwyekw.jpg
            color: 'rgba(0,0,0,.6)'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      color: this.colors.series
    }
  }
  getOption () {
    const option = {
      textStyle: {
        fontFamily: 'Roboto'
      },
      tooltip: this.tooltip,
      series: this.series,
      legend: {
        data: this.legends,
        show: true
      },
      xAxis: {
        data: this.xAxis
      },
      yAxis: this.yAxis
    }
    return _.merge(option, this.getDefaultOption())
  }
}
