/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:49
 * @LastEditors  : ly525
 * @LastEditTime : 2019-12-22 18:09:54
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/edit-panel/background.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import propsEditPanel from './props.js'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('editor', [
      'editingPage'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement'
    ])
  },
  render () {
    return <propsEditPanel layout="vertical" />
  },
  created () {
    const bgElement = this.editingPage.elements.find(e => e.name === 'lbp-background')
    this.setEditingElement(bgElement)
  },
  beforeDestroy () {
    this.setEditingElement()
  }

}
