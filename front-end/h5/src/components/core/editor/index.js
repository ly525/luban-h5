import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

import 'core/support/index.js'
import '../styles/index.scss'
import 'animate.css'

import FixedTools from './fixed-tools/index'
import EditorRightPanel from './right-panel/index'
import EditorCanvas from './canvas/index'
import EditorActionMenu from './header/action-menu'
import EditorLeftPanel from './left-panel/index'
import PreviewDialog from './modals/preview.vue'
import Header from '@/components/common/header/index'
import Feedback from '@/components/common/feedback/index'
import AdjustLineV from 'core/support/adjust-line/vertical'

window.EditorApp = new Vue() // event bus
export default {
  name: 'Editor',
  data: () => ({
    previewDialogVisible: false,
    propsPanelWidth: 320
  }),
  computed: {
    ...mapState('editor', {
      work: state => state.work
    })
  },
  methods: {
    ...mapActions('editor', ['fetchWork']),
    handlePreview () { this.previewDialogVisible = true }
  },
  render (h) {
    return (
      <a-layout>
        <Header>
          <EditorActionMenu slot="action-menu" onPreview={this.handlePreview} />
        </Header>
        <a-layout>
          <EditorLeftPanel />
          <EditorCanvas />
          <AdjustLineV onLineMove={(offset) => { this.propsPanelWidth += offset }} />
          <FixedTools />
          <EditorRightPanel width={this.propsPanelWidth} />
        </a-layout>
        {
          <PreviewDialog
            work={this.work}
            visible={this.previewDialogVisible}
            handleClose={() => { this.previewDialogVisible = false }}
          />
        }
        <Feedback />
      </a-layout>
    )
  },
  created () {
    let workId = this.$route.params.workId
    if (workId) {
      this.fetchWork(workId)
    } else {
      this.$message.error('no work id!')
    }
  }
}
