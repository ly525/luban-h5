/*
 * @Author: ly525
 * @Date: 2020-04-12 10:48:25
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-12 10:48:26
 * @FilePath: /luban-h5/front-end/h5/src/components/global/index.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */

import Vue from 'vue'

const requireComponent = require.context(
  '@/components/global', true, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})
