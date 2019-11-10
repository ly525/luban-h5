import { Swipe, SwipeItem } from 'vant'
import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'

const defaultItems = [
  {
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg'
  },
  {
    image: 'https://img.yzcdn.cn/vant/apple-2.jpg'
  }
]

export default {
  name: 'lbp-slide',
  props: {
    interval: {
      type: Number,
      default: 4000,
      editor: {
        type: 'a-input-number',
        label: '间隔时间',
        require: true
      }
    },
    editorMode: {
      type: String,
      default: 'preview'
    },
    activeIndex: {
      type: Number,
      default: 0,
      editor: {
        custom: true
      }
    },
    items: {
      type: Array,
      default: () => defaultItems.slice(0),
      editor: {
        custom: true
      }
    }
  },
  editorConfig: {
    components: {
    }
  },
  mounted () {
  },
  methods: {

  },
  render () {
    const { items, activeIndex } = this
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
