import {
  Slide
} from 'cube-ui'

const defaultItems = [
  {
    // url: 'http://www.didichuxing.com/',
    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
  },
  {
    // url: 'http://www.didichuxing.com/',
    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
  },
  {
    // url: 'http://www.didichuxing.com/',
    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
  }
]

export default {
  name: 'lbp-slide',
  components: {
    Slide
  },
  props: {
    interval: {
      type: Number,
      default: 4000
    },
    items: {
      type: Array,
      default: () => defaultItems
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
      return this.type === 'radio' ? this.value : this.value.join(',')
    }
  },
  editorConfig: {
    propsConfig: {
      interval: {
        type: 'a-input-number',
        label: '间隔时间',
        require: true,
        defaultPropValue: 4000
      },
      items: {
        type: 'lbs-slide-items-editor',
        label: '图片列表',
        require: true,
        defaultPropValue: defaultItems
      }
    },
    components: {
      'lbs-slide-items-editor': {
        render () {
          return <div>
            {
              this.value_.map((item, index) => (
                <div>
                  <label>图片 {index + 1}</label>
                  <a-textarea value={item.image} onChange={e => { item.image = e.target.value }} autosize={{ minRows: 2, maxRows: 6 }}></a-textarea>
                  <a-button-group size="small">
                    <a-button type="default" icon="plus" onClick={this.add}/>
                    <a-button type="default" icon="minus" onClick={this.minus}/>
                  </a-button-group>
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
  },
  methods: {

  },

  render () {
    return (
      <slide data={this.items} interval={+this.interval} />
    )
  }
}
