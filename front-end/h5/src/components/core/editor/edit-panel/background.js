/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:49
 * @LastEditors  : ly525
 * @LastEditTime : 2020-01-15 01:03:31
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
    const bgEle = this.editingPage.elements.find(e => e.name === 'lbp-background')
    return <propsEditPanel
      layout="vertical"
      realEditingElement={bgEle}
    />
  }

}
