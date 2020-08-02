import Map from './lbp-qq-map/src/Map'
import MapMixin from './lbp-qq-map/src/mixin'

export default {
  name: 'lbp-qq-map__editor',
  mixins: [MapMixin], // loadMap、setMarker
  props: {
    // 地图的props 集合
    elementProps: {
      type: Object,
      default: () => ({
        labelContent: '',
        zoomLevel: 12
      })
    }
  },
  methods: {
    /**
     * 更新组件的 poi prop
     * @param {Object} poi 参考 lbp-qq-map 的 poi prop，用来表示坐标点信息
     */
    setPoi (poi) {
      this.elementProps.poi = poi
    },
    // https://lbs.qq.com/webDemoCenter/javascriptV2/libraries/placeLibrary
    initSearch () {
      const self = this
      let keyword = ''

      // 调用Poi检索类。用于进行本地检索、周边检索等服务。
      const searchService = new window.qq.maps.SearchService({
        complete: results => {
          if (results.type === 'CITY_LIST') {
            searchService.setLocation(results.detail.cities[0].cityName)
            searchService.search(keyword)
            return
          }
          const poi = results.detail.pois[0]
          self.setMarker(poi)
          self.setPoi(poi)
        }
      })
      // 添加监听事件
      const qqMapSearchElement = document.getElementById('editor__qq-map-search')
      const ap = new window.qq.maps.place.Autocomplete(qqMapSearchElement)

      window.qq.maps.event.addListener(ap, 'confirm', function (res) {
        keyword = res.value
        searchService.search(keyword)
      })
    },
    /**
     * 监听地图 缩小/放大
     */
    listenZoom () {
      window.qq.maps.event.addListener(this.map, 'zoom_changed', () => {
        this.elementProps.zoomLevel = this.map.getZoom()
      })
    },
    initMap (poi) {
      const center = Map.getPosition(poi.latLng) // 地图的中心地理坐标
      const el = document.getElementById('editor__qq-map-container')
      this.map = new window.qq.maps.Map(el, {
        center,
        zoom: 8, // 设置地图的缩放级别
        disableDefaultUI: true // 禁止所有控件
        // 设置地图样式详情参见MapType
      })
    },
    init () {
      const { poi, qqMapKey } = this.elementProps
      this.loadMap(qqMapKey).then(qq => {
        this.initMap(poi)
        this.setMarker(poi)
        this.initSearch()
        this.listenZoom()
      })
    }
  },
  mounted () {
    this.init()
  },
  render () {
    return (
      <div style="margin: 12px;">
        <input ref="search" id="editor__qq-map-search" placeholder="请输入地名" style="width: 100%;margin-bottom: 20px;" />
        <div id="editor__qq-map-container" style="padding-bottom: 60%;width: 100%"></div>
      </div>
    )
  }
}
