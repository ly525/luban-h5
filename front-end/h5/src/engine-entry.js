/**
 * #!zh:
 * engine 页面是 webpack 构建多页面中的其中的一个页面
 * entry-entry 是 构建 engine 页面的入口，类似于 src/main.js 的作用
 * 作用：作品预览的渲染引擎，其实就是简单遍历 work(作品) 的 pages 以及 elements，显示即可
 * 主要在预览弹窗中预览 和 用户在手机上查看作品使用
 *
 */
import Vue from 'vue'
// import 'font-awesome/css/font-awesome.min.css'
import { pluginsList } from './mixins/load-plugins.js'
import Element from './components/core/models/element'
import NodeWrapper from '@/components/preview/node-wrapper.js'

Vue.config.productionTip = true

const Engine = {
  name: 'engine',
  components: {
    NodeWrapper
  },
  methods: {
    renderPreview (h, _elements) {
      const elements = _elements.map(element => new Element(element))
      return (
        <div style={{ height: '100%', position: 'relative' }}>
          {
            elements.map((element, index) => {
              // const style = element.getStyle({ position: 'absolute', isRem: true })
              // const data = {
              //   style,
              //   props: element.getProps({ mode: 'preview' })
              // }
              // return h(element.name, data)
              return <node-wrapper element={element}>
                {h(element.name, element.getPreviewData({ position: 'static' }))}
              </node-wrapper>
            })
          }
        </div>
      )
    }
  },
  render (h) {
    const work = window.__work
    return (
      <div id="work-container" data-work-id={work.id}>
        <div class="swiper-container">
          <div class="swiper-wrapper">{
            work.pages.map(page => {
              return (
                <section class="swiper-slide flat">
                  {/* this.walk(h, page.elements) */}
                  { this.renderPreview(h, page.elements) }
                </section>
              )
            })
          }</div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

const install = function (Vue) {
  Vue.component(Engine.name, Engine)
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Engine
}
