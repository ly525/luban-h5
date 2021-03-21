import RenderDataSource from './data-source'
import RenderVariablePool from './variable-pool.vue'

export default {
  name: 'dataSourceIndex',
  render (h) {
    return (
      <div>
        <RenderVariablePool></RenderVariablePool>
        <RenderDataSource></RenderDataSource>
      </div>
    )
  }
}
