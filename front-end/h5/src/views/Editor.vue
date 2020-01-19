<script>
import CoreEditor from '../components/core/editor/index.js'
import loadPluginMixin from '../mixins/load-plugins.js'
import '../components/core/support/index.js'

export default {
  extends: CoreEditor,
  mixins: [loadPluginMixin]
}
</script>
