/*
 * @Author: ly525
 * @Date: 2019-11-23 12:35:21
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-17 21:22:01
 * @FilePath: /luban-h5/front-end/h5/src/components/plugins/lbp-slide.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: #!zh: 轮播图组件 #!en slide component
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import PropTypes from '@luban-h5/plugin-common-props'

import { Swipe, SwipeItem } from 'vant'
import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'

function getDefaultItems () {
  const defaultItems = [
    {
      image: 'https://img.yzcdn.cn/vant/apple-1.jpg'
    },
    {
      image: 'https://img.yzcdn.cn/vant/apple-2.jpg'
    }
  ]

  return defaultItems
}

export default {
  name: 'lbp-slide',
  props: {
    interval: PropTypes.number({
      defaultValue: 4000,
      label: '间隔时间'
    }),
    editorMode: PropTypes.string({
      defaultValue: 'preview',
      label: '模式'
    }),
    activeIndex: {
      type: Number,
      default: 0,
      editor: {
        custom: true
      }
    },
    items: {
      type: Array,
      default: () => getDefaultItems(),
      editor: {
        custom: true
      }
    }
  },
  componentsForPropsEditor: {
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
