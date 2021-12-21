import PropTypes from '@luban-h5/plugin-common-props'
import Parser from '@/utils/excel-parser'

const {
  VeLine,
  VeRadar,
  VePie,
  VeHistogram,
  VeFunnel
} = window.VeIndex

// const title = str => str.slice(0, 1).toUpperCase() + str.slice(1)

export default {
  extra: {
    defaultStyle: {
      width: 320,
      height: 400
    }
  },
  name: 'lbp-line-chart',
  // mixins: [ChartMixin],
  props: {
    dataset: PropTypes.excel({
      defaultValue: () => [
        ['日期', '销售量'],
        ['1月1日', 123],
        ['1月2日', 1223],
        ['1月3日', 2123],
        ['1月4日', 4123],
        ['1月5日', 3123],
        ['1月6日', 7123]
      ]
    }),
    type: PropTypes.string({
      label: '类型',
      defaultValue: 'line',
      visible: false
    }),
    colors: PropTypes.colors({
      label: '颜色面板',
      defaultValue: () => [
        // https://github.com/ElemeFE/v-charts/blob/01ebb541a5d905047dd52957ae0898d529342235/src/constants.js#L20
        '#19d4ae', '#5ab1ef', '#fa6e86',
        '#ffb980', '#0067a6', '#c4b4e4',
        '#d87a80', '#9cbbff', '#d9d0c7',
        '#87a997', '#d49ea2', '#5b4947',
        '#7ba3a8'
      ]
    })
  },
  data () {
    return {
      option: {}
    }
  },
  render () {
    const chartData = Parser.csv2VChartJson(this.dataset)
    switch (this.type) {
      case 'line':
        return <VeLine data={chartData} colors={this.colors} />
      case 'histogram':
        return <VeHistogram data={chartData} colors={this.colors} />
      case 'pie':
        return <VePie data={chartData} colors={this.colors} />
      case 'funnel':
        return <VeFunnel data={chartData} colors={this.colors} />
      case 'radar':
        return <VeRadar data={chartData} colors={this.colors} />
      default:
        return null
    }
  },
  mounted () {
    // this.renderChart()
  }
}
