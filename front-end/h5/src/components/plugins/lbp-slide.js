import {
  Slide
} from 'cube-ui'
import ImageGallery from '@/components/core/support/image-gallery/gallery.js'

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
          const currentItem = this.value_[this.current - 1]
          return <div>
            {
              <a-pagination
                current={this.current}
                onChange={(page) => {
                  this.current = page
                }}
                size="small"
                total={this.value_.length}
                defaultPageSize={1}
                itemRender={this.itemRender}
              />
            }
            <ImageGallery
              style={{ margin: '16px 0' }}
              value={currentItem.image}
              onChange={url => {
                currentItem.image = url
              }}
            />
            {/* {
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
            } */}
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
        data: () => ({
          current: 1
        }),
        methods: {
          itemRender (current, type, originalElement) {
            if (type === 'prev') {
              return <a-button style={{ marginRight: '8px' }} size="small" icon="minus" onClick={this.minus}></a-button>
            } else if (type === 'next') {
              return <a-button style={{ marginLeft: '8px' }} size="small" icon="plus" onClick={this.add}></a-button>
            }
            return originalElement
          },
          add () {
            console.log(this.value_.length)
            this.$emit('change', [
              ...this.value_,
              {
                image: '',
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
