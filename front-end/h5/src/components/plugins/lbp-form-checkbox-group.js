import PropTypes from '@luban-h5/plugin-common-props'
import LbpFormRadio from './lbp-form-radio.js'

function getDefaultItems () {
  // defaultItems.slice(0)[0] === defaultItems.slice(0)[0] -> true
  // Object.assign(defaultItems)[0] === Object.assign(defaultItems)[0] -> true
  // clone = (val) => JSON.parse(JSON.stringify(val))
  // clone(defaultItems)[0] === clone(defaultItems)[0] -> false
  const defaultItems = [
    {
      value: '选项A'
    },
    {
      value: '选项B'
    },
    {
      value: '选项C'
    }
  ]

  return defaultItems
}

export default {
  extra: {
    style: {
      width: 120,
      height: 120
    }
  },
  name: 'lbp-form-checkbox-group',
  components: {
    LbpFormRadio
  },
  props: {
    aliasName: PropTypes.string({
      defaultValue: '标题演示',
      label: '填写标题'
    }),
    items: PropTypes.textOptions({
      label: '选项列表',
      defaultValue: () => getDefaultItems()
    }),
    // TODO 抽离 radio-group 至 common-props
    type: {
      type: String,
      default: 'checkbox',
      editor: {
        type: 'a-radio-group',
        label: '选择模式',
        require: true,
        props: {
          options: [
            { label: '单选', value: 'radio' },
            { label: '多选', value: 'checkbox' }
          ],
          name: 'mode'
        }
      }
    }
  },
  data () {
    return {
      value: this.type === 'radio' ? '' : [],
      uuid: undefined
    }
  },
  computed: {
    value_ () {
      if (this.type === 'radio') {
        return this.value
      } else {
        const value = (Array.isArray(this.value) && this.value) || []
        return value.join(',')
      }
    }
  },
  watch: {
    type (type) {
      this.value = type === 'radio' ? '' : []
    }
  },
  mounted () {
    this.uuid = this.$el.dataset.uuid
  },
  methods: {
    /**
     * @param {String, Number} val radioValue or checkboxValue
     */
    onChange (val) {
      switch (this.type) {
        case 'radio':
          this.toggleRadio(val)
          break
        case 'checkbox':
          this.toggleCheckbox(val)
          break
        default:
          break
      }
    },
    toggleCheckbox (val) {
      const index = this.value.indexOf(val)
      if (index === -1) {
        this.value.push(val)
      } else {
        this.value.splice(index, 1)
      }
    },
    toggleRadio (val) {
      this.value = val
    }
  },
  render () {
    return (
      <div>
        <h3>{this.aliasName}</h3>
        <input type="text" hidden value={this.value_} data-type="lbp-form-input" data-uuid={this.uuid} />
        {
          this.items.map(item => (
            <lbp-form-radio
              vertical
              value={item.value}
              checked={this.type === 'radio' ? this.value === item.value : this.value.includes(item.value)}
              aliasName={this.uuid}
              type={this.type}
              onChange={this.onChange}
            >{item.value}</lbp-form-radio>
          ))
        }
      </div>
    )
  }
}
