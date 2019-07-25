import Vue from 'vue'
import LbpButton from '../components/plugins/lbp-button'
import LbpPicture from '../components/plugins/lbp-picture'
import LbpText from '../components/plugins/lbp-text'
import LbpFormInput from '../components/plugins/lbp-form-input'

const pluginsList = [
  {
    title: '图片',
    icon: 'photo',
    component: LbpPicture,
    visible: true,
    name: LbpPicture.name
  },
  {
    title: '文字',
    icon: 'font',
    component: LbpText,
    visible: true,
    name: LbpText.name
  },
  {
    title: '按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: LbpButton.name
  },
  // {
  //   title: '视频',
  //   icon: 'play-circle-o',
  //   component: LbpVideo,
  //   visible: true,
  //   name: LbpVideo.name
  // },
  {
    title: '表单输入',
    icon: 'pencil-square-o',
    component: LbpFormInput,
    visible: true,
    name: LbpFormInput.name
  }
  // {
  //   title: '表单提交',
  //   icon: 'hand-pointer-o',
  //   component: LbpFormButton,
  //   visible: true,
  //   name: LbpFormButton.name
  // },
]

export default {
  data: () => ({
    pluginsList
  }),
  methods: {
    mixinPlugins2Editor () {
      pluginsList.forEach(plugin => {
        // 全局注册组件，便于以后扩展自定义脚本，注释原来的局部注册：this.$options.components[plugin.name] = plugin.component
        Vue.component(plugin.name, plugin.component)
      })
    }
  },
  created () {
    this.mixinPlugins2Editor()
  }
}
