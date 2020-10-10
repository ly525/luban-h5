import PropTypes from '@luban-h5/plugin-common-props'
import Parser from '@/utils/excel-parser'
import './styles/news-list.scss'

export default {
  extra: {
    defaultStyle: {
      width: 320,
      height: 256
    }
  },
  name: 'lbp-news-list',
  props: {
    dataset: PropTypes.excel({
      defaultValue: () => [
        ['新闻标题', '摘要', '链接', '日期', '来源'],
        [
          '1 . 鲁班H5 可视化搭建平台！',
          '鲁班H5-是一款基于常见业务组件，通过拖拽的形式，生成页面的可视化搭建系统；我们的初心也是希望能通过工程化的手段，提高简单H5页面的制作效率',
          'https://luban-h5.com/',
          '2020-01-01',
          '鲁班H5'
        ],
        [
          '2 . 鲁班H5-开源的可视化搭建平台！',
          'en: web design tool || mobile page builder/editor || mini webflow for mobile page. zh: 类似易企秀的H5制作、建站工具、可视化搭建系统.',
          'https://github.com/ly525/luban-h5',
          '2020-01-01',
          '鲁班H5(github)'
        ]
      ]
    })
  },
  data () {
    return {
      option: {}
    }
  },
  render () {
    /**
     * rows[0] {
        '新闻标题': '',
        '摘要': '',
        '链接': '',
        '日期': '',
        '来源': '',
      }
     */
    const { rows } = Parser.csv2VChartJson(this.dataset)
    return <div class="newslist" style="border-color: transparent;">
      {
        rows.map((item, i) =>
          <div class="news-item">
            <a href={item['链接']} target="_blank" class="link">
              <div class="title">{item['新闻标题']}</div>
            </a>
            <div class="content">{item['摘要']}</div>
            <div class="source">{item['来源']}</div>
            <div class="time">{item['日期']}</div>
          </div>
        )
      }
    </div>
  },
  mounted () {
    // this.renderChart()
  }
}
