import echarts from 'echarts/lib/echarts'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
import { LineChart } from './chart-model'

// TODO 工具函数：获取某个时间段内的时间
function addDays (date, dayStep = 1) {
  const next = new Date(date)
  next.setDate(next.getDate() + dayStep)
  return next
}

function dateRange (start, end, range = []) {
  start = new Date(start)
  end = new Date(end)
  if (start > end) return range
  range = [start]
  while (start < end) {
    start = addDays(start, 1)
    range.push(start)
  }
  // const next = addDays(start, 1)
  // return dateRange(next, end, [...range, start])
  return range
}

export default {
  watch: {
    dataset: {
      handler (items) {
        this.renderChart()
      }
    }
  },
  methods: {
    getXAxis () {
      const [start, end] = this.dashboard.currentFilterState.daterange
      if (start === end) return Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, '0'))
      return dateRange(start, end).map(date => date.toISOString().slice(0, 10))
    },
    /**
     *
     */
    getDataSet () {
      // const [start, end] = daterange
      // if (start === end) {
      //   // return this.dataset.map(item => ({...item, s: s.replace(/[\d]{4}-[\d]{2}-[\d]{2}\s+([\d]{2}):[\d]{2}:[\d]{2}/, '$1'))
      //   return this.dataset.map(item => ({
      //     ...item,
      //     x: `${new Date(item.x).getHours()}`.padStart(2, '0')
      //   }))
      // }
      return this.dataset
    },
    renderChart () {
      const option = new LineChart({
        dataset: this.getDataSet(),
        yIndexMap: { count: 0, sum_base_cpm: 1 }
        // xAxis: this.getXAxis()
      }).getOption()
      // this.option = Object.freeze(option)
      this.$nextTick(() => {
        const ele = this.$refs.chart
        if (ele) {
          // const chart = window.echarts.init(ele)
          const chart = echarts.init(ele)
          this.chart = chart
          chart.clear()
          chart.setOption(option)
        }
      })
    },
    autoResize () {
      this.lastArea = this.getArea()
      this.__resizeHandler = debounce(
        () => {
          if (this.lastArea === 0) {
            // emulate initial render for initially hidden charts
            this.mergeOptions({}, true)
            this.resize()
            this.mergeOptions(this.options || this.manualOptions || {}, true)
          } else {
            this.resize()
          }
          this.lastArea = this.getArea()
        },
        100,
        { leading: true }
      )
      addListener(this.$el, this.__resizeHandler)
    }
  },
  mounted () {
    this.__resizeHandler = debounce(
      () => {
        this.chart.resize()
      },
      500,
      { leading: true }
    )
    addListener(this.$el, this.__resizeHandler)
  },
  destroy () {
    removeListener(this.$el, this.__resizeHandler)
  }
}
