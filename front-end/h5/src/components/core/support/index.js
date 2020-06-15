/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors: ly525
 * @LastEditTime: 2020-01-12 20:42:55
 * @FilePath: /luban-h5/front-end/h5/src/components/core/support/index.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
// register-global-support-component
import Vue from 'vue'
import PropMultiTextItemsEditor from './prop-multi-items-editor/text.js'
import ImageGallery from './image-gallery/gallery.js'
import VideoGallery from './video-gallery/gallery.js'
import LbsExcelEditor from './excel'
import LbpTextAlign from '@luban-h5/lbs-text-align'

Vue.component(PropMultiTextItemsEditor.name, PropMultiTextItemsEditor)
Vue.component(ImageGallery.name, ImageGallery)
Vue.component(VideoGallery.name, VideoGallery)
Vue.component('lbs-text-align', LbpTextAlign)
Vue.component(LbsExcelEditor.name, LbsExcelEditor)
