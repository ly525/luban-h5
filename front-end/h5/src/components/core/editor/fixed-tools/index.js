import { mapActions, mapState } from 'vuex'
import hotkeys from 'hotkeys-js'
import fixedTools from './options'

export default {
  computed: {
    ...mapState('editor', {
      scaleRate: state => state.scaleRate
    })
  },
  methods: {
    ...mapActions('editor', [
      'pageManager',
      'elementManager',
      'updateScaleRate',
      'downloadPoster'
    ])
  },
  render () {
    return (
      <a-layout-sider
        width="40"
        theme='light'
        style={{ background: '#fff', border: '1px solid #eee' }}
      >
        <a-button-group style={{ display: 'flex', flexDirection: 'column' }}>
          {
            fixedTools.map(tool => (
              <a-tooltip
                effect="dark"
                placement="left"
                title={this.$t(tool.i18nTooltip, { hotkey: tool.hotkeyTooltip })}>
                <a-button
                  block
                  class="transparent-bg"
                  type="link"
                  size="small"
                  style={{ height: '40px', color: '#000' }}
                  disabled={!!tool.disabled}
                  onClick={() => tool.action && tool.action.call(this)}
                >
                  {
                    tool.icon
                      ? <i class={['shortcut-icon', 'fa', `fa-${tool.icon}`]} aria-hidden='true' />
                      : (tool.text || this.$t(tool.i18nTooltip))
                  }
                </a-button>
                { tool.icon === 'minus' && <div style={{ fontSize: '12px', textAlign: 'center' }}>{this.scaleRate * 100}%</div>}
              </a-tooltip>
            ))
          }
        </a-button-group>
      </a-layout-sider>
    )
  },
  mounted () {
    fixedTools.map(tool => {
      tool.hotkey && hotkeys(tool.hotkey, { splitKey: '&' }, (event, handler) => {
        event.preventDefault()
        event.stopPropagation()
        tool.action && tool.action.call(this)
      })
    })
  }
}
