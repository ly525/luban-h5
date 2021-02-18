<template>
    <a-popconfirm
      title="Are you sure delete this task?"
      :visible="visible"
      @visibleChange="handleVisibleChange"
      @confirm="confirm"
      @cancel="cancel"
      okText="Yes"
      cancelText="No"
    >
      <!-- <a href="#">Delete a task</a> -->
      <slot><a-icon type="delete" /></slot>
    </a-popconfirm>
    <!-- <br />
    <br />
    Whether directly execute：<a-checkbox defaultChecked @change="changeisDirectlyExecute" />

    <delete-action onConfirm={} onCancel={} directlyExecute={false}>
      <slot></slot>
    </delete-action> -->
</template>
<script>
import { message } from 'ant-design-vue'

export default {
  name: 'delete-with-confirm',
  props: {
    directlyExecute: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      isDirectlyExecute: this.directlyExecute
    }
  },
  methods: {
    changeisDirectlyExecute (e) {
      this.isDirectlyExecute = e.target.checked
    },
    confirm () {
      this.visible = false
      message.success('Next step.')
      this.$emit('confirm')
    },
    cancel () {
      this.visible = false
      message.error('Click on cancel.')
      // this.$emit('cancel')
    },
    handleVisibleChange (visible) {
      if (!visible) {
        this.visible = false
        return
      }
      // Determining isDirectlyExecute before show the popconfirm.
      console.log(this.isDirectlyExecute)
      if (this.isDirectlyExecute) {
        this.confirm() // next step
      } else {
        this.visible = true
      }
    }
  }
}
</script>
