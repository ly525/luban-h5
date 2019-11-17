// register-global-support-component
import Vue from 'vue'
import PropMultiTextItemsEditor from './prop-multi-items-editor/text.js'
import ImageGallery from './image-gallery/gallery.js'
import LbpTextAlign from '@luban-h5/lbs-text-align'

Vue.component(PropMultiTextItemsEditor.name, PropMultiTextItemsEditor)
Vue.component(ImageGallery.name, ImageGallery)
Vue.component('lbs-text-align', LbpTextAlign)
