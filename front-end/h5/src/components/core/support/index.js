/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-11 10:13:29
 * @FilePath: /luban-h5/front-end/h5/src/components/core/support/index.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
 * - register-global-support-component
 * - 注册全局支撑类组件，比如颜色选择器、文字对齐 等等
 *
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import Vue from 'vue'
import PropMultiTextItemsEditor from './prop-multi-items-editor/text.js'
import ImageGallery from './image-gallery/gallery.js'
import VideoGallery from './video-gallery/gallery.js'
import LbsExcelEditor from './excel'
import ColorsPanel from './colors-panel'
import LbpTextAlign from '@luban-h5/lbs-text-align'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/icons/default'
import Editor from '@tinymce/tinymce-vue'

/**
 * #!en import element-ui color picker for bgcolor、color, because a-input(ant-design-vue) component do not support alpha
 * #!zh 引入 element-ui 颜色选择器，因为 ant-design-vue 没有提供颜色选择器，默认的 <a-input type="color" /> 不支持选择透明度
 * https://github.com/ly525/luban-h5/issues/105
 */
import { ColorPicker, Button } from 'element-ui'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror, {
  options: {
    tabSize: 2,
    mode: 'text/javascript',
    theme: 'base16-dark',
    lineNumbers: true,
    line: true
  },
  events: ['scroll']
})

Vue.component(Button.name, Button)
Vue.component(ColorPicker.name, ColorPicker)
Vue.component(PropMultiTextItemsEditor.name, PropMultiTextItemsEditor)
Vue.component(ImageGallery.name, ImageGallery)
Vue.component(VideoGallery.name, VideoGallery)
Vue.component(LbpTextAlign.name, LbpTextAlign)
Vue.component(LbsExcelEditor.name, LbsExcelEditor)
Vue.component(ColorsPanel.name, ColorsPanel)
Vue.component('tinymce-editor', Editor)
