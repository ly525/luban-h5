<script>
import CoreEditor from '../components/core/editor/index.js'
import loadPluginMixin from '../mixins/load-plugins.js'
import loadEnhancePropsEditorMixin from '../components/core/support/index.js'

export default {
  extends: CoreEditor,
  mixins: [loadPluginMixin, loadEnhancePropsEditorMixin]
}
</script>
<style lang="scss">
$cellSize: 35.6px;
$designerWidth: 320px;
$designerHeight: 568px;
$designerWidthHalf: $designerWidth / 2;

.canvas-wrapper {
  position: relative;
  top: 5%;
  width: $designerWidth;
  height: $designerHeight;
  border: 1px #ebeaea solid;
  margin: 0 auto;
  background: #fff;
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
