/*
 * @Author: ly525
 * @Date: 2020-04-18 18:21:27
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-18 19:40:03
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/data-source/forms/form-mixin.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
import { mapState } from 'vuex'

export default {
  computed: {
    /**
     * 需要过滤掉当前名称，否则编辑的时候，也会提示重名
     * @returns {Array}
     */
    dsNames () {
      return this.work.datasources.filter(item => item.name !== this.form.name).map(item => item.name)
    },
    ...mapState('editor', [
      'work'
    ])
  },
  methods: {
    // https://www.antdv.com/components/form-model-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99
    // 务必注意：因为要给 validator 使用，这里的函数不能写成箭头函数的形式，
    validateNameFromMixin (rule, value, callback) {
      if (this.dsNames.includes(value)) {
        // https://github.com/standard/eslint-plugin-standard/issues/12
        const message = new Error(`数据源 ${value} 已存在`)
        return callback(message)
      } else {
        return callback()
      }
    }
  }
}
