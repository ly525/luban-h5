/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-11 00:01:25
 * @FilePath: /luban-h5/front-end/h5/src/components/core/support/image-gallery/tabs/pixabay.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import axios from 'axios'
import ImageItem from 'core/support/image-gallery/components/image-item.js'

export default {
  data: () => ({
    items: [],
    loading: false,
    options: {
      key: '12120348-2ad26e4cc05d9bc068097ab3b', // pixabay demo key from https://pixabay.com/zh/service/about/api/
      image_type: 'photo',
      pretty: true,
      q: 'yellow+flowers',
      orientation: 'all' // "all", "horizontal", "vertical"
    }
  }),
  computed: {
    isVertial () {
      return this.options.orientation === 'vertical'
    }
  },
  methods: {
    queryAPI () {
      axios
        .get('https://pixabay.com/api/', { params: this.options })
        .then(res => {
          this.items = res.data.hits.map(item => ({ ...item, url: item.previewURL }))
        })
    }
  },
  render (h) {
    return (
      <div>
        <a-spin tip="Loading..." spinning={this.loading}>
          <a-card >
            <div slot="extra" style={{ display: 'flex' }}>
              <a-dropdown>
                <a-menu slot="overlay" onClick={({ key }) => {
                  this.options.orientation = key
                  this.queryAPI()
                }}>
                  <a-menu-item key="all"><a-icon type="user" />任意方位</a-menu-item>
                  <a-menu-item key="horizontal"><a-icon type="user" />水平</a-menu-item>
                  <a-menu-item key="vertical"><a-icon type="user" />竖直</a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px" type="link">
                  图片方向 <a-icon type="down" />
                </a-button>
              </a-dropdown>
              <a-input-search
                placeholder="input search text"
                onSearch={value => {
                  this.options.q = value
                  this.queryAPI()
                }}
              />
            </div>
            <a-list
              grid={{ gutter: 12, column: this.isVertial ? 4 : 3 }}
              dataSource={this.items}
              renderItem={(item, index) => (
                <a-list-item onClick={(event /** mouseEvent */) => {
                  this.$emit('changeItem', item)
                }}>
                  <ImageItem item={item} height={this.isVertial ? 240 : 142 } />
                </a-list-item>
              )}
            >
            </a-list>
          </a-card>
        </a-spin>
      </div>
    )
  },
  mounted () {
    this.queryAPI()
  }
}
