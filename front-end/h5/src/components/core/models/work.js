/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:32:31
 * @FilePath: /luban-h5/front-end/h5/src/components/core/models/work.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: work model
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import Page from './page.js'
import DataSource from './data-source.js'
import { PAGE_MODE } from 'core/constants/work'

export default class Work {
  constructor (work = {}) {
    this.id = work.id
    this.title = work.title || '标题'
    this.description = work.description || '描述'
    this.pages = work.pages || [new Page()]
    this.datasources = (work.datasources || []).map(item => new DataSource(item))

    // this.id = this.id
    // TODO 用id 并不是一个好办法，有心人会得知整个系统中共有多少作品等额外信息，尽量防止信息泄漏
    // this.key = this.key
    this.cover_image_url = ''
    // TODO 后期可以添加一个类似项目组的概念，每个项目组下可以有多个作品
    // this.project_id = 1

    // #!zh: strapi.js 会自动创建与维护 created_at、updated_at
    // #!en: strapi.js will auto create and maintain the fields: created_at、updated_at
    // this.created_at = new Date()
    // this.updated_at = new Date()

    this.is_publish = !!work.is_publish
    this.is_template = false
    this.width = work.width || 320
    this.height = work.height || 568
    this.page_mode = work.page_mode || PAGE_MODE.SWIPPER_PAGE
  }
}
