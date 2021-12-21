<template>
  <a-tree
    class="draggable-tree"
    :default-expanded-keys="expandedKeys"
    draggable
    :tree-data="treeData"
    @dragenter="onDragEnter"
    @drop="onDrop"
  />
</template>

<script>
import { mapState } from 'vuex'
function getTreeNode (ele) {
  return {
    title: ele.name,
    key: ele.uuid,
    children: (ele.children || []).map(getTreeNode)
  }
}

export default {
  computed: {
    ...mapState('editor', {
      elements: state => state.editingPage.elements
    }),
    treeData () {
      return this.elements.map(getTreeNode)
    }
  },
  data () {
    return {
      gData: [],
      expandedKeys: []
    }
  },
  methods: {
    onDragEnter (info) {
    },
    onDrop (info) {
    }
  }
}
</script>
