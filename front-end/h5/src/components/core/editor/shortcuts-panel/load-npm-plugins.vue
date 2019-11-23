<template>
  <div style="text-align: center">
    <a-button type="primary" @click="showModal">配置 NPM 组件列表</a-button>
    <a-modal
      title="NPM 组件列表配置信息"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <div>
        <a-textarea v-model="text" placeholder="Basic usage"  :rows="20" />
      </div>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      text: JSON.stringify(
        [
          {
            'package': '@luban-h5/lbp-slide',
            'version': '0.0.7',
            'name': 'lbp-slide',
            'icon': 'photo',
            'i18nTitle': {
              'en-US': 'Carousel',
              'zh-CN': '轮播图'
            },
            title: '轮播图',
            visible: true
          }
        ], null, 2)
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      const createjs = window.createjs

      // eslint-disable-next-line no-new-func
      let npmPackages = new Function(`return ${this.text}`.replace('\n', ''))()
      npmPackages = npmPackages.map(pluginInfo => ({
        ...pluginInfo,
        // src: `https://cdn.jsdelivr.net/npm/${pluginInfo}/dist/${pluginInfo.name}.umd.js`
        // src: `https://unpkg.com/${pluginInfo}/dist/${pluginName}.umd.js`
        src: `https://cdn.jsdelivr.net/npm/${pluginInfo.package}@${pluginInfo.version}/dist/${pluginInfo.name}.umd.js`
      }))

      const queue = new createjs.LoadQueue()
      queue.on('fileload', handleFileLoad, this)
      queue.on('complete', handleComplete, this)

      queue.loadManifest(npmPackages)
      function handleComplete (e) {
        // 可以直接使用 this 的原因： query。on 最后一个参数用来做做 bind this 操作
        this.visible = false
        this.confirmLoading = false
        this.$emit('loadComplete', npmPackages)
      }

      function handleFileLoad (event) {
        const { name } = event.item
        Vue.component(name, window[name])
      }
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>
