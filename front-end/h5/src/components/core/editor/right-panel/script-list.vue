<template>
  <div>
    <a-table
      size="small"
      :columns="columns"
      :data-source="dataSource"
      :scroll="{  y: 300 }"
      v-if="dataSource.length"
      :pagination="false"
    >
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <a slot="action" slot-scope="text">
        <a-icon type="edit" />
      </a>
      <a-switch slot="status" slot-scope="text, record" :checked="record.status" size="small"></a-switch>
    </a-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true
  },
  {
    title: '已启用',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '脚本(装备)名称',
    width: 120,
    dataIndex: 'title',
    key: 'title',
    ellipsis: true
  }
]

export default {
  data () {
    return {
      columns
    }
  },
  computed: {
    ...mapState('editor', [
      'editingElement'
    ]),
    dataSource () {
      // const addedScriptsDict = this.editingElement.scripts.reduce((obj, curr) => {
      //   obj[curr.uuid] = curr
      //   return obj
      // }, {})
      // return scriptList.map(item => ({
      //   ...item,
      //   status: !!addedScriptsDict[item.uuid]
      // }))
      return this.editingElement.scripts.map(item => ({
        ...item,
        status: true
      })) || []
    }
  }
}
</script>
