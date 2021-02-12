/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:49
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:36:27
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/right-panel/background.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import PropsEditPanel from './props.js'
import { mapState, mapActions } from 'vuex'
import RenderWorkMode from './work-mode.vue'

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
    return (
      <div>
        <a-collapse expand-icon-position="right">
          {/* #!zh: H5模式 */}
          <a-collapse-panel key="1" header={this.$t('editor.editPanel.common.pageMode')}>
            <RenderWorkMode />
          </a-collapse-panel>
        </a-collapse>
        <PropsEditPanel
          layout="vertical"
          realEditingElement={bgEle}
        />
      </div>
    )
  }

}
