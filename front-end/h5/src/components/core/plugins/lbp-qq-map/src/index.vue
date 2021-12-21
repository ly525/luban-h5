<template>
  <div>
    <div id="qq-map-container" ref="mapElement" style="height: 100%;width: 100%"></div>
  </div>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
import Map from './Map'
import MapMixin from './mixin'

export default {
  // extra.defaultStyle：组件的额外自定义配置，以拖拽组件到画布上为例
  // 按钮默认的样式可能是: { width: 100px, height: 40px }
  // 但地图可能是希望更大一些的默认样式，比如：{ width: 320px, height: 180px }
  // 就可以通过 extra.defaultStyle 来实现自定义样式需求
  extra: {
    defaultStyle: {
      width: 320,
      height: 180
    }
  },
  name: 'lbp-qq-map',
  mixins: [MapMixin], // loadMap、setMarker
  props: {
    labelContent: PropTypes.string({ label: '地址名称', defaultValue: '' }), // 标签内容
    zoomLevel: PropTypes.number({ label: '缩放层级', defaultValue: 12, visible: false }),
    // https://lbs.qq.com/dev/console/key/manage
    qqMapKey: PropTypes.string({
      label: '腾讯地图Key',
      defaultValue: 'GENBZ-G5S3J-7OLFW-FLBX4-WVEMK-SOBL4',
      component: 'a-textarea',
      extra: (h) => {
        return <div>
          <div>1. 请填入自己的腾讯地图开发密钥，<a href="https://lbs.qq.com/dev/console/key/manage" target="_blank">前往申请&gt;&gt;</a></div>
          <div>2. 鲁班的 Demo Key 随时可能失效；失效提示: 鉴权失败，请传入正确的key</div>
        </div>
      }
    }),
    poi: {
      type: Object,
      default: () => ({
        'latLng': {
          'lat': 39.90469,
          'lng': 116.40717
        },
        'name': '北京市',
        'type': 4
      }),
      editor: {
        custom: true
      }
    }
  },
  watch: {
    poi: {
      handler (poi) {
        if (!this.checkMapAvailable()) return
        this.setMarker(poi)
      },
      deep: true
    },
    labelContent (labelContent) {
      if (!this.checkMapAvailable()) return
      this.setLabel(labelContent)
    },
    zoomLevel (zoomLevel) {
      if (!this.checkMapAvailable()) return
      this.setZoomLevel(zoomLevel)
    }
  },
  methods: {
    checkMapAvailable () {
      return window.qq && window.qq.maps
    },
    onSearch (value) {
      console.log(value)
    },
    setLabel (labelContent) {
      const center = Map.getPosition(this.poi.latLng) // 地图的中心地理坐标
      this.label = this.label || new window.qq.maps.Label({
        position: center,
        map: this.map,
        content: ''
      })
      if (labelContent.trim()) {
        // https://lbs.qq.com/webDemoCenter/javascriptV2/marker/label
        this.label.setVisible(true)
        this.label.setContent(labelContent || '')
        this.label.setPosition(center)
      } else {
        this.label.setVisible(false)
      }
    },
    setZoomLevel (zoomLevel) {
      this.map.zoomTo(zoomLevel)
    },
    init () {
      const { poi, qqMapKey } = this
      this.loadMap(qqMapKey).then(qq => {
        this.initMap(poi)
        this.setLabel(this.labelContent)
        this.setMarker(poi)
      })
    },
    initMap (poi) {
      const el = this.$refs.mapElement
      const center = Map.getPosition(poi.latLng) // 地图的中心地理坐标
      this.map = new window.qq.maps.Map(el, {
        center,
        zoom: this.zoomLevel, // 设置地图的缩放级别
        disableDefaultUI: true, // 禁止所有控件
        draggable: false, // 设置是否可以拖拽
        scrollwheel: false, // 设置是否可以滚动
        disableDoubleClickZoom: true // 设置是否可以双击放大
        // 设置地图样式详情参见MapType
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
