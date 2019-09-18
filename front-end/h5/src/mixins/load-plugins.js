import Vue from 'vue'
import LbpButton from '../components/plugins/lbp-button'
import LbpPicture from '../components/plugins/lbp-picture'
import LbpText from '../components/plugins/lbp-text'
import LbpFormInput from '../components/plugins/lbp-form-input'
import LbpFormButton from '../components/plugins/lbp-form-button'
import LbpFormRadioGroup from '../components/plugins/lbp-form-radio-group'

export const pluginsList = [
  {
    title: '图片',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '图片'
    },
    icon: 'photo',
    component: LbpPicture,
    visible: true,
    name: LbpPicture.name
  },
  {
    i18nTitle: {
      'en-US': 'Text',
      'zh-CN': '文字'
    },
    title: '文字',
    icon: 'text-width',
    component: LbpText,
    visible: true,
    name: LbpText.name
  },
  {
    i18nTitle: {
      'en-US': 'Button',
      'zh-CN': '普通按钮'
    },
    title: '普通按钮',
    icon: 'hand-pointer-o',
    component: LbpButton,
    visible: true,
    name: LbpButton.name
  },
  {
    i18nTitle: {
      'en-US': 'Carousel',
      'zh-CN': '轮播图'
    },
    title: '轮播图',
    icon: 'photo',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name,
    disabled: true
  },
  {
    i18nTitle: {
      'en-US': 'Map',
      'zh-CN': '地图'
    },
    title: '地图',
    icon: 'map-o',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name,
    disabled: true
  },
  {
    i18nTitle: {
      'en-US': 'Video',
      'zh-CN': '视频'
    },
    title: '视频',
    icon: 'file-video-o',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name,
    disabled: true
  },
  // {
  //   title: '视频',
  //   icon: 'play-circle-o',
  //   component: LbpVideo,
  //   visible: true,
  //   name: LbpVideo.name
  // },
  {
    i18nTitle: {
      'en-US': 'Form Input',
      'zh-CN': '表单输入'
    },
    title: '表单输入',
    icon: 'pencil-square-o',
    component: LbpFormInput,
    visible: true,
    name: LbpFormInput.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Submit',
      'zh-CN': '表单提交'
    },
    title: '表单提交',
    icon: 'hand-pointer-o',
    component: LbpFormButton,
    visible: true,
    name: LbpFormButton.name
  },
  // {
  //   title: '表单单选',
  //   icon: 'hand-pointer-o',
  //   component: LbpFormRadio,
  //   visible: true,
  //   name: LbpFormRadio.name
  // },
  {
    i18nTitle: {
      'en-US': 'Form Checkbox',
      'zh-CN': '表单多选'
    },
    title: '表单单选',
    icon: 'check-square-o',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Radio',
      'zh-CN': '表单单选'
    },
    title: '表单单选',
    icon: 'dot-circle-o',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name
  }
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
