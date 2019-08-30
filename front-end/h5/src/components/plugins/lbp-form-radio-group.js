import LbpFormRadio from './lbp-form-radio.js'

const defaultItems = [
  {
    value: '选项A-value'
  },
  {
    value: '选项B-value'
  },
  {
    value: '选项C-value'
  }
]

export default {
  name: 'lbp-form-radio-group',
  components: {
    LbpFormRadio
  },
  props: {
    aliasName: {
      type: String,
      default: '标题演示'
    },
    items: {
      type: Array,
      default: () => defaultItems
    }
  },
  data: () => ({
    value: undefined,
    uuid: undefined
  }),
  editorConfig: {
    propsConfig: {
      items: {
        type: 'lbs-form-radio-items-editor',
        label: '选项列表',
        require: true,
        defaultPropValue: defaultItems
      },
      aliasName: {
        type: 'a-input',
        label: '填写标题',
        require: true,
        defaultPropValue: '标题演示'
      }
    },
    components: {
      'lbs-form-radio-items-editor': {
        render () {
          return <div>
            {
              this.value_.map((item, index) => (
                <div>
                  <a-input value={item.value} onChange={e => { item.value = e.target.value }}></a-input>
                  <a-button type="dashed" shape="circle" icon="plus" onClick={this.add} />
                  <a-button type="dashed" shape="circle" icon="minus" onClick={(item, index) => this.minus(item, index)} />
                </div>
              ))
            }
          </div>
        },
        props: {
          value: {
            type: Array,
            default: () => defaultItems
          }
        },
        computed: {
          value_: {
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        },
        methods: {
          add () {
            console.log(this.value_.length)
            this.$emit('change', [
              ...this.value_,
              {
                value: `选项${this.value_.length + 1}-value`,
                label: `选项${this.value_.length + 1}-label`
              }
            ])
          },
          minus (item, index) {
            const items = this.value_.slice(0)
            items.splice(index, 1)
            this.$emit('change', items)
          }
        }
      }
    }
  },
  mounted () {
    this.uuid = this.$el.dataset.uuid
  },
  render () {
    return (
      <div>
        <h3>{this.aliasName}</h3>
        <input type="text" hidden value={this.value} data-type="lbp-form-input" data-uuid={this.uuid} />
        {
          this.items.map(item => (
            <lbp-form-radio
              vertical
              value={item.value}
              checked={this.value === item.value}
              aliasName={this.aliasName}
              onChange={e => {
                this.value = e
              }}
            >{item.value}</lbp-form-radio>
          ))
        }
      </div>
    )
  }
}
