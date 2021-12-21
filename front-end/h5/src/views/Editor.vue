<script>
import CoreEditor from 'core/index.js'
// import CoreEditor from '@luban-h5/core-editor'
export default {
  render () {
    return (
      <CoreEditor workId={this.$route.params.workId} />
    )
  }
}
</script>
