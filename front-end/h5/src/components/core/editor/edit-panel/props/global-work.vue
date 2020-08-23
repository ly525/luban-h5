<!--
 * @Author: ly525
 * @Date: 2020-05-10 23:10:52
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-13 00:09:56
 * @FilePath: /h5/src/components/core/editor/edit-panel/props/global-work.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 -->
<template>
  <a-form :layout="formLayout">
    <a-form-item label="H5类型">
      <a-radio-group v-model="pageMode" @change="handleModeChange" size="small">
        <a-radio-button v-for="(value, key) in PAGE_MODE" :key="key" :value="value">
          {{PAGE_MODE_LABEL[key]}}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { PAGE_MODE, PAGE_MODE_LABEL } from '@/constants/work'

export default {
  data () {
    return {
      formLayout: 'vertical',
      PAGE_MODE: Object.freeze(PAGE_MODE),
      PAGE_MODE_LABEL: Object.freeze(PAGE_MODE_LABEL)
    }
  },
  computed: {
    ...mapState('editor', ['work']),
    // 翻页模式、长页面模式
    // src/constants/work -> PAGE_MODE
    // https://vuex.vuejs.org/zh/guide/forms.html#%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7
    pageMode: {
      get () {
        return this.work.mode
      },
      set (model) {
        this.updateWork({ mode })
      }
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
