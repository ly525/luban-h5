// register-global-support-component
import Vue from 'vue'
import PropMultiTextItemsEditor from './prop-multi-items-editor/text.js'
import ImageGallery from './image-gallery/gallery.js'

export default {
  mounted () {
    Vue.component(PropMultiTextItemsEditor.name, PropMultiTextItemsEditor)
    Vue.component(ImageGallery.name, ImageGallery)
  }
}
