import Vue from 'vue'
// import LbpButton from '@luban-h5/lbc-button'
import LbpButton from '../components/plugins/lbp-button'
import LbpPicture from '../components/plugins/lbp-picture'
import LbpVideo from '../components/plugins/lbp-video'
import LbpText from '../components/plugins/lbp-text'
import LbpFormInput from '../components/plugins/lbp-form-input'
import LbpFormButton from '../components/plugins/lbp-form-button'
import LbpFormRadioGroup from '../components/plugins/lbp-form-radio-group'
import LbpFormCheckboxGroup from '../components/plugins/lbp-form-checkbox-group'
import LbpBackground from '../components/plugins/lbp-background'
import LbpSlide from '../components/plugins/lbp-slide'
import LbpBgMusic from '../components/plugins/lbp-bg-music'
import LbpNoticeBar from '../components/plugins/lbp-notice-bar'
import LbpRate from '../components/plugins/lbp-rate'
import LbpTable from '../components/plugins/lbp-table'
// import LbpTabs from '../components/plugins/lbp-tabs'

export const pluginsList = [
  {
    title: '公告',
    i18nTitle: {
      'en-US': 'Notice-Bar',
      'zh-CN': '公告'
    },
    icon: 'volume-up',
    img: 'notice-bar.png',
    component: LbpNoticeBar,
    visible: true,
    name: LbpNoticeBar.name
  },
  // {
  //   title: '标签页',
  //   i18nTitle: {
  //     'en-US': 'Tabs',
  //     'zh-CN': '标签页'
  //   },
  //   icon: 'tab',
  //   component: LbpTabs,
  //   visible: true,
  //   name: LbpTabs.name
  // },
  {
    title: '评分',
    i18nTitle: {
      'en-US': 'Rate',
      'zh-CN': '评分'
    },
    icon: 'star-o',
    img: 'rate.png',
    component: LbpRate,
    visible: true,
    name: LbpRate.name
  },
  {
    title: '图片',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '图片'
    },
    icon: 'photo',
    img: 'picture.png',
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
    img: 'text.png',
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
    img: 'button.png',
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
    img: 'carousel.png',
    component: LbpSlide,
    visible: true,
    name: LbpSlide.name
    // disabled: true
  },
  {
    i18nTitle: {
      'en-US': 'Map',
      'zh-CN': '地图'
    },
    title: '地图',
    // icon: 'map-o',
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
    img: 'video.png',
    component: LbpVideo,
    visible: true,
    name: LbpVideo.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Input',
      'zh-CN': '表单输入'
    },
    title: '表单输入',
    icon: 'pencil-square-o',
    img: 'input.png',
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
    img: 'submit.png',
    component: LbpFormButton,
    visible: true,
    name: LbpFormButton.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Checkbox',
      'zh-CN': '表单多选'
    },
    title: '表单多选',
    icon: 'check-square-o',
    img: 'radio-group.png',
    component: LbpFormCheckboxGroup,
    visible: true,
    name: LbpFormCheckboxGroup.name
  },
  {
    i18nTitle: {
      'en-US': 'Form Radio',
      'zh-CN': '表单单选'
    },
    title: '表单单选',
    icon: 'dot-circle-o',
    img: 'radio-group.png',
    component: LbpFormRadioGroup,
    visible: true,
    name: LbpFormRadioGroup.name
  },
  {
    i18nTitle: {
      'en-US': 'Background',
      'zh-CN': '背景'
    },
    title: '背景',
    icon: 'dot-circle-o',
    component: LbpBackground,
    visible: false,
    name: LbpBackground.name
  },
  {
    i18nTitle: {
      'en-US': 'BgMusic',
      'zh-CN': '背景音乐'
    },
    title: '背景音乐',
    icon: 'music',
    img: 'music.png',
    component: LbpBgMusic,
    visible: true,
    name: LbpBgMusic.name
  },
  {
    i18nTitle: {
      'en-US': 'Table - Theme Blue',
      'zh-CN': '表格 - 深蓝色主题',
    },
    icon: 'table',
    img: 'table_theme1.png',
    category: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name,
    shortcutProps: {
      className: 'default-table-template1'
    }
  },
  {
    i18nTitle: {
      'en-US': 'Table - Theme Gray',
      'zh-CN': '表格 - 淡灰色主题',
    },
    icon: 'table',
    img: 'table_theme2.png',
    category: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name,
    shortcutProps: {
      className: 'default-table-template2'
    }
  },
  {
    i18nTitle: {
      'en-US': 'Table - Default',
      'zh-CN': '表格 - 默认主题',
    },
    icon: 'table',
    img: 'table_theme3.png',
    category: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name,
    shortcutProps: {
      className: 'default-table-general-a'
    }
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
