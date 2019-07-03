<script>
import Vue from 'vue'
import CoreEditor from '../components/core/editor'

import LbpButton from '../components/plugins/lbp-button'
import LbpPicture from '../components/plugins/lbp-picture'

const PluginList = [
  {
    title: '按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: 'lbp-button',
    children: [
      {
        title: '按钮',
        icon: 'hand-pointer-o',
        component: LbpButton,
        visible: true,
        name: 'lbp-button'
      }
    ]
  },
  {
    title: '图片',
    icon: 'image',
    component: LbpPicture,
    visible: true,
    name: 'lbp-picture',
    children: [
      {
        title: '图片',
        icon: 'image',
        component: LbpPicture,
        visible: true,
        name: 'lbp-picture'
      }
    ]
  },
  {
    title: '表单',
    icon: 'wpforms',
    visible: true,
    children: [
      {
        title: '按钮',
        icon: 'hand-pointer-o',
        component: LbpButton,
        visible: true,
        name: 'lbp-button'
      },
      {
        title: '图片',
        icon: 'image',
        component: LbpPicture,
        visible: true,
        name: 'lbp-picture'
      }
    ]
  }
]

export default {
  extends: CoreEditor,
  computed: {
    // !#zh 显示在侧边栏或顶部的 可用组件列表
    visiblePluginList () {
      return PluginList.filter(p => p.visible)
    },
    groups () {
      return PluginList.filter(p => p.visible)
    }
  },
  methods: {
    mixinPlugins2Editor () {
      PluginList.forEach(plugin => {
        // 全局注册组件，便于以后扩展自定义脚本，注释原来的局部注册：this.$options.components[plugin.name] = plugin.component
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
</script>
<style lang="scss">
$cellSize: 35.6px;
$designerWidth: 320px;
$designerHeight: 568px;
$designerWidthHalf: $designerWidth / 2;

#designer-page {
  display: flex;
  // https://stackoverflow.com/questions/17904088/disable-less-css-overwriting-calc
  // less: min-height: ~'calc(100% - 40px)';
  min-height: calc(100% - 40px);

}

.canvas-wrapper {
  position: relative;
  top: 5%;
  width: $designerWidth;
  height: $designerHeight;
  border: 1px #ebeaea solid;
  margin: 0 auto;
}

.lb-tabs {
  box-shadow: none;
  padding: 4px 8px 4px 0;
  border: 1px solid #EBEEF5;
  height: 100%;
}

.full-height {
  height: 100% !important;
}
</style>
