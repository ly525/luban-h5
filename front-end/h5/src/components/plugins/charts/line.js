import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeFunnel from 'v-charts/lib/funnel.common'
import PropTypes from '@luban-h5/plugin-common-props'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markArea'
import Parser from '../../../utils/excel-parser'

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
    })
  },
  data () {
    return {
      option: {}
    }
  },
  render () {
    const chartData = Parser.csv2VChartJson(this.dataset)
    const settings = {
      // metrics: ['日期', '销售量'],
      // dimension: ['日期']
    }
    switch (this.type) {
      case 'line':
        return <VeLine data={chartData} settings={settings} />
      case 'histogram':
        return <VeHistogram data={chartData} settings={settings} />
      case 'pie':
        return <VePie data={chartData} settings={settings} />
      case 'funnel':
        return <VeFunnel data={chartData} settings={settings} />
      default:
        return null
    }
  },
  mounted () {
    // this.renderChart()
  }
}
