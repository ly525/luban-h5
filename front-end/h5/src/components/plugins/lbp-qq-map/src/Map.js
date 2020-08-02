function isScriptLoaded (src) {
  return !!document.querySelector('script[src="' + src + '"]')
}
export default {
  map: null,
  load: function (key) {
    return new Promise(function (resolve, reject) {
      const src = 'http://map.qq.com/api/js?v=2.exp&libraries=place&callback=init&key=' + key
      if (isScriptLoaded(src)) {
        resolve(window.qq)
        return
      }
      window.init = function () {
        resolve(window.qq)// 注意这里
      }
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = src
      script.onerror = reject
      document.head.appendChild(script)
    })
  },
  getPosition ({ lat, lng }) {
    return new window.qq.maps.LatLng(lat, lng) // 地图的中心地理坐标
  }
}
