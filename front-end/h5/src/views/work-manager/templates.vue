<script>
import WorkList from './list-mixin'

export default {
  data: () => ({
    isTemplate: true,
    useTemplateDialogVisible: false,
    clonedWorkFromTemplate: null // 从某个模板复制出来的作品
  }),
  render (h) {
    return <WorkList isTemplate={this.isTemplate} />
  }
}
</script>
