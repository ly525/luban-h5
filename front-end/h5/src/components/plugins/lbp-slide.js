import { Swipe, SwipeItem } from 'vant'
import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'
import ImageGallery from '@/components/core/support/image-gallery/gallery.js'

const defaultItems = [
  {
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg'
  },
  {
    image: 'https://img.yzcdn.cn/vant/apple-2.jpg'
  }
]

function getDefaultDataSource () {
  return {
    activeIndex: 0,
    items: defaultItems.slice(0)
  }
}

export default {
  name: 'lbp-slide',
  props: {
    interval: {
      type: Number,
      default: 4000,
      editor: {
        type: 'a-input-number',
        label: '间隔时间',
        require: true,
        defaultPropValue: 4000
      }
    },
    dataSource: {
      type: Object,
      default: () => getDefaultDataSource(),
      editor: {
        type: 'lbs-slide-items-editor',
        label: '图片列表',
        require: true,
        defaultPropValue: getDefaultDataSource()
      }
    },
    editorMode: {
      type: String,
      default: 'preview'
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  editorConfig: {
    components: {
      'lbs-slide-items-editor': {
        render () {
          const currentItem = this.innerItems[this.current - 1] || {}
          return <div>
            {
              <a-pagination
                current={this.current}
                onChange={(page) => {
                  this.current = page
                  this.$emit('change', {
                    items: this.innerItems,
                    activeIndex: page - 1
                  })
                }}
                size="small"
                total={this.innerItems.length}
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
          </div>
        },
        props: {
          value: {
            type: Object,
            default: () => getDefaultDataSource()
          }
        },
        computed: {
          innerItems () {
            return this.value.items
          }
        },
        data: () => ({
          current: 1
        }),
        methods: {
          itemRender (current, type, originalElement) {
            if (type === 'prev') {
              return <a-button style={{ marginRight: '8px' }} size="small" icon="minus" onClick={() => this.minus(current)} disabled={this.innerItems.length === 1}></a-button>
            } else if (type === 'next') {
              return <a-button style={{ marginLeft: '8px' }} size="small" icon="plus" onClick={this.add}></a-button>
            }
            return originalElement
          },
          add () {
            this.$emit('change', {
              activeIndex: this.innerItems.length,
              items: [
                ...this.innerItems,
                {
                  image: '',
                  value: `选项${this.innerItems.length + 1}-value`,
                  label: `选项${this.innerItems.length + 1}-label`
                }
              ]
            })
          },
          minus (index) {
            if (this.innerItems.length === 1) return
            const items = this.innerItems.slice(0)
            items.splice(index, 1)
            this.$emit('change', {
              items,
              activeIndex: index > 0 ? index - 1 : 0
            })
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
    const { items, activeIndex } = this.dataSource
    return (
      this.editorMode === 'edit'
        ? items.length && <img src={items[activeIndex].image} />
        : <Swipe autoplay={+this.interval} indicator-color="red">
          {
            items.map(item => (
              <SwipeItem><img src={item.image} width="100%" height="100%" /></SwipeItem>
            ))
          }
        </Swipe>
    )
  }
}
