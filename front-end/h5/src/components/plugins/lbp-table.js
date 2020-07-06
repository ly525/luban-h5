// https://github.com/luban-h5-components/plugin-common-props
import './styles/table.scss'
import PropTypes from '@luban-h5/plugin-common-props'

let _mainPanel;
let _mainTable;
let _leftFixedPanel;
let _leftFixedTable;
let _freezeColsWidth;

export default {
  render () {
    const {
    } = this;

    const style = {
      width: this.tableWidth ? (this.tableWidth + 'px') : '100%'
    };

    return (<div class={'lbp-table ' + this.className}>
      <div class="lbp-table-main">
        <table style={style}>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            { this.dataset.map(row => (
              <tr>
                { row.map(cell => (<td>{cell}</td>)) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>
      <div class="lbp-table-fixed-left" style={{
        display: this.freezeCount > 0 ? "block" : "none"
      }}>
        <table class="lbp-table-fixed-left-table" style={style}>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            { this.dataset.map(row => (
              <tr>
                { row.map(cell => (<td>{cell}</td>)) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    </div>)
  },
  extra: {
    defaultStyle: {
      width: 300,
      height: 150
    }
  },
  name: 'lbp-table',
  props: {
    className: PropTypes.string({ defaultValue: 'default-table-template1', label: '类样式', visible: false }),
    tableWidth: PropTypes.number({ label: '表格宽度(px)', defaultValue: 0, props: { max: Number.MAX_VALUE } }),
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
    tableWidth () {
      setTimeout(() => {
        _freezeColsWidth = [0, 0, ...[..._mainTable.querySelectorAll('tr:first-child > td')].slice(0, this.freezeCount).map(i => i.offsetWidth)].reduce((a, b) => a + b);
        _leftFixedPanel.style.width = _freezeColsWidth + 'px';
        _leftFixedPanel.style.height = `calc(100% - ${_mainPanel.offsetHeight - _mainPanel.scrollHeight}px)`;
      }, 10);
    },
    freezeCount () {
      setTimeout(() => {
        _freezeColsWidth = [0, 0, ...[..._mainTable.querySelectorAll('tr:first-child > td')].slice(0, this.freezeCount).map(i => i.offsetWidth)].reduce((a, b) => a + b);
        _leftFixedPanel.style.width = _freezeColsWidth + 'px';
        _leftFixedPanel.style.height = `calc(100% - ${_mainPanel.offsetHeight - _mainPanel.scrollHeight}px)`;
      }, 10);
    }
  },
  mounted () {
    _mainPanel = this.$el.querySelector('.lbp-table-main');
    _mainTable = this.$el.querySelector('.lbp-table-main > table');
    _leftFixedPanel = this.$el.querySelector('.lbp-table-fixed-left');
    _leftFixedTable = this.$el.querySelector('.lbp-table-fixed-left-table');
    _freezeColsWidth = [0, 0, ...[..._mainTable.querySelectorAll('tr:first-child > td')].slice(0, this.freezeCount).map(i => i.offsetWidth)].reduce((a, b) => a + b);
    _leftFixedTable.style.width = this.$el.parentNode.style.width;

    new MutationObserver(([mutationRecord]) => {
      if (this.tableWidth) {
        _mainTable.style.width = this.tableWidth + 'px';
        _leftFixedTable.style.width = this.tableWidth + 'px';
      } else {
        _mainTable.style.width = this.$el.parentNode.style.width;
        _leftFixedTable.style.width = this.$el.parentNode.style.width;
      }

      if (this.freezeCount) {
        _freezeColsWidth = [0, 0, ...[..._mainTable.querySelectorAll('tr:first-child > td')].slice(0, this.freezeCount).map(i => i.offsetWidth)].reduce((a, b) => a + b);
        _leftFixedPanel.style.width = _freezeColsWidth + 'px';
        _leftFixedPanel.style.height = `calc(100% - ${_mainPanel.offsetHeight - _mainPanel.scrollHeight})`;
      }
    }).observe(this.$el.parentNode, {
      childList: false,
      attributes: true,
      subtree: false,
      attributeOldValue: true,
      attributeFilter: [ 'style' ]
    });
  }
}
