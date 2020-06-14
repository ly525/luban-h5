/*
 * @Author: ly525
 * @Date: 2019-11-23 12:35:21
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-17 18:19:23
 * @FilePath: /h5/src/components/plugins/lbp-tabs.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: #!zh: 轮播图组件 #!en slide component
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import PropTypes from '@luban-h5/plugin-common-props'

import { Tab, Tabs, Icon } from 'vant'
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'
import './styles/lbp-tabs.scss'

function getDefaultItems () {
  const defaultItems = [
    {
      'value': '标签1',
      'icon': ''
    },
    {
      'value': '标签2',
      'icon': ''
    },
    {
      'value': '标签3',
      'icon': ''
    }
  ]

  return defaultItems
}

export default {
  name: 'lbp-tabs',
  defaultStyle: {
    width: 260,
    height: 190
  },
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
    items: PropTypes.textOptions({
      label: '选项列表',
      defaultValue: () => getDefaultItems()
    })
    // items: {
    //   type: Array,
    //   default: () => getDefaultItems(),
    //   editor: {
    //     custom: true
    //   }
    // }
  },
  componentsForPropsEditor: {
  },
  mounted () {
  },
  methods: {

  },
  render () {
    // const { items, activeIndex } = this
    return (
    // this.editorMode === 'edit'
    // ? items.length && <img src={items[activeIndex].image} />
    // : <Swipe autoplay={+this.interval} indicator-color="red">
    //   {
    //     items.map(item => (
    //       <SwipeItem><img src={item.image} width="100%" height="100%" /></SwipeItem>
    //     ))
    //   }
    // </Swipe>

      <Tabs class="lbp-tabs">
        {
          this.items.map((item, index) => (
            <Tab
              key={index}
              title={item.value}
              name={index}
              style="background:white;width: 100%;height: 100%;"
            >
              {/* <div slot="title">
                <Icon name={item.icon} />
                <span style="margin-left: 4px;">{item.value}</span>
              </div> */}
              <slot name={'child' + index} >
                <a-empty />
                {/* <form-design-blank-control /> */}
              </slot>
            </Tab>
          ))
        }

      </Tabs>
    )
  }
}
