import Vue from 'vue'
// import LbpButton from '@luban-h5/lbc-button'
import LbpButton from 'core/plugins/lbp-button'
import LbpPicture from 'core/plugins/lbp-picture'
import LbpVideo from 'core/plugins/lbp-video'
import LbpText from 'core/plugins/lbp-text'
import LbpTextTinymce from 'core/plugins/lbp-text-tinymce'
import LbpFormInput from 'core/plugins/lbp-form-input'
import LbpFormButton from 'core/plugins/lbp-form-button'
import LbpFormRadioGroup from 'core/plugins/lbp-form-radio-group'
import LbpFormCheckboxGroup from 'core/plugins/lbp-form-checkbox-group'
import LbpBackground from 'core/plugins/lbp-background'
import LbpSlide from 'core/plugins/lbp-slide'
import LbpBgMusic from 'core/plugins/lbp-bg-music'
import LbpNoticeBar from 'core/plugins/lbp-notice-bar'
import LbpRate from 'core/plugins/lbp-rate'
import LbpQQMap from 'core/plugins/lbp-qq-map/src'
import LbpLineChart from 'core/plugins/charts/line'
import LbpTable from 'core/plugins/lbp-table'
import LbpNewsList from 'core/plugins/lbp-news-list'
// import LbpTabs from 'core/components/plugins/lbp-tabs'

export const pluginsList = [
  {
    i18nTitle: {
      'en-US': 'RadarChart',
      'zh-CN': '雷达图'
    },
    title: '雷达图',
    icon: 'line-chart',
    component: LbpLineChart,
    visible: true,
    name: LbpLineChart.name,
    shortcutProps: {
      type: 'radar'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '折线图'
    },
    title: '折线图',
    icon: 'line-chart',
    component: LbpLineChart,
    visible: true,
    name: LbpLineChart.name,
    shortcutProps: {
      type: 'line'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '柱状图'
    },
    title: '柱状图',
    icon: 'bar-chart',
    component: LbpLineChart,
    visible: true,
    name: LbpLineChart.name,
    shortcutProps: {
      type: 'histogram'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '饼状图'
    },
    title: '饼状图',
    icon: 'pie-chart',
    component: LbpLineChart,
    visible: true,
    name: LbpLineChart.name,
    shortcutProps: {
      type: 'pie'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '漏斗图'
    },
    title: '漏斗图',
    icon: 'filter',
    component: LbpLineChart,
    visible: true,
    name: LbpLineChart.name,
    shortcutProps: {
      type: 'funnel'
    }
  },
  {
    title: '公告',
    i18nTitle: {
      'en-US': 'Notice-Bar',
      'zh-CN': '公告'
    },
    icon: 'volume-up',
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
      'en-US': 'Text(Tiny)',
      'zh-CN': '文字(Tiny)'
    },
    title: '文字(Tiny)',
    icon: 'text-width',
    component: LbpTextTinymce,
    visible: true,
    name: LbpTextTinymce.name
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
    icon: 'map-o',
    component: LbpQQMap,
    visible: true,
    name: LbpQQMap.name
    // disabled: true
  },
  {
    i18nTitle: {
      'en-US': 'Video',
      'zh-CN': '视频'
    },
    title: '视频',
    icon: 'file-video-o',
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
  {
    i18nTitle: {
      'en-US': 'Form Checkbox',
      'zh-CN': '表单多选'
    },
    title: '表单多选',
    icon: 'check-square-o',
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
    component: LbpBgMusic,
    visible: true,
    name: LbpBgMusic.name
  },
  {
    i18nTitle: {
      'en-US': 'Table(Default)',
      'zh-CN': '默认表格'
    },
    icon: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name
  },
  {
    i18nTitle: {
      'en-US': 'Table(Stripe)',
      'zh-CN': '(斑马线)表格'
    },
    icon: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name,
    shortcutProps: {
      theme: 'lbp-table-theme-stripe'
    }
  },
  {
    i18nTitle: {
      'en-US': 'Table(LightBlue)',
      'zh-CN': '(淡蓝色)表格'
    },
    icon: 'table',
    component: LbpTable,
    visible: true,
    name: LbpTable.name,
    shortcutProps: {
      theme: 'lbp-table-theme-light-blue'
    }
  },
  {
    i18nTitle: {
      'en-US': 'NewsList',
      'zh-CN': '新闻列表'
    },
    title: '新闻列表',
    icon: 'list',
    component: LbpNewsList,
    visible: true,
    name: LbpNewsList.name
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
