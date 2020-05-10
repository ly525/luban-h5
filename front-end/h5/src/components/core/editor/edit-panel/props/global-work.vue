<!--
 * @Author: ly525
 * @Date: 2020-05-10 23:10:52
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-10 23:20:22
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/edit-panel/props/global-work.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 -->
<template>
  <a-form :layout="formLayout">
    <a-form-item
      label="H5类型"
    >
      <a-radio-group default-value="h5_swipper" @change="handleChangeMode" size="small">
        <a-radio-button value="h5_swipper">
          翻页H5
        </a-radio-button>
        <a-radio-button value="h5_long_page">
          长页面H5
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formLayout: 'vertical'
    }
  },
  methods: {
    ...mapActions('editor', [
      'updateWork'
    ]),
    handleModeChange (e) {
      this.updateWork({ mode: e.target.value })
    }
  }
}
</script>
