// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'
import { addListener as addResizeListener, removeListener } from 'resize-detector'
import './styles/table.scss'

function sum (arr = [], key) {
  return arr.map(item => item[key]).reduce((a, b) => a + b, 0)
}

export default {
  name: 'lbp-table',
  extra: {
    defaultStyle: {
      width: 320,
      height: 150
    }
  },
  data: () => ({
    mainTableWrapperEle: null,
    mainTableEle: null,
    fixedTableWrapperEle: null,
    fixedTableEle: null
  }),
  props: {
    theme: PropTypes.string({ defaultValue: '', label: '主题', visible: false }),
    columnWidth: PropTypes.number({ label: '每列宽度(px)', defaultValue: 100 }),
    freezeCount: PropTypes.number({ label: '冻结列数(px)', defaultValue: 0 }),
    dataset: PropTypes.excel({
      defaultValue: () => [
        [ '列A', '列B', '列C'],
        [ '————', '————', '————'],
        [ '————', '————', '————'],
        [ '————', '————', '————']
      ]
    })
  },
  watch: {
    freezeCount () {
      setTimeout(() => {
        this.setFixedTableStyle()
      }, 100)
    }
  },
  render () {
    const renderCell = cell => {
      return <td><div class="cell" >{cell}</div></td>
    }

    const renderTable = (tableData = [], tableClass = '', tableStyle = {}) => {
      const headers = tableData.length ? tableData[0] : []
      const columnsCount = headers.length
      return (
        <table class={tableClass} style={tableStyle}>
          <colgroup>
            {
              [...Array(columnsCount)].map((item, i) => <col style={{ width: this.columnWidth + 'px' }} />)
            }
          </colgroup>
          <tbody>
            { tableData.map(row => <tr>{ row.map(renderCell) }</tr>) }
          </tbody>
        </table>
      )
    }

    return (
      <div class={['lbp-table', this.theme]} ref="lbpTable">
        <div class="main-table-wrapper">
          {renderTable(this.dataset)}
        </div>
        <div class="fixed-table-wrapper" v-show="freezeCount">
          {renderTable(this.dataset, 'left-table')}
        </div>
      </div>
    )
  },
  methods: {
    getFixedColsWidth () {
      const tableHeaders = [].slice.apply(this.mainTableEle.querySelectorAll('tr:first-child > td'))
      const freezeColsWidth = sum(tableHeaders.slice(0, +this.freezeCount), 'offsetWidth')
      return freezeColsWidth
    },
    setFixedTableStyle () {
      this.fixedTableWrapperEle.style.width = `${this.getFixedColsWidth()}px`
      this.fixedTableWrapperEle.style.height = `calc(100% - ${this.mainTableWrapperEle.offsetHeight - this.mainTableWrapperEle.scrollHeight}px)`
    },
    setTableWidth () {
      const parentWidth = this.$el.parentNode.style.width
      this.fixedTableEle.style.width = this.mainTableEle.style.width = parentWidth
    },
    initElements () {
      const root = this.$el
      this.mainTableWrapperEle = root.querySelector('.main-table-wrapper')
      this.mainTableEle = root.querySelector('.main-table-wrapper > table')
      this.fixedTableWrapperEle = root.querySelector('.fixed-table-wrapper')
      this.fixedTableEle = root.querySelector('.left-table')
    }
  },

  mounted () {
    this.initElements()
    this.setTableWidth()
    this.setFixedTableStyle()
    addResizeListener(this.$refs.lbpTable, () => {
      this.setTableWidth()
      if (this.freezeCount) {
        this.setFixedTableStyle()
      }
    })
  }
}
