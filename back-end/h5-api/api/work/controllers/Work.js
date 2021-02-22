/*
 * @Author: ly525
 * @Date: 2019-12-04 19:55:24
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-11 20:02:09
 * @FilePath: /luban-h5/back-end/h5-api/api/work/controllers/Work.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
'use strict';
const request = require('request');
const _ = require('lodash');
// 浏览模式
const VIEW_MODE = {
  PREVIEW: 'preview' // 预览
};

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // GET /previewOne
  // strapi-hook-ejs: https://github.com/strapi/strapi/tree/master/packages/strapi-hook-ejs
  previewOne: async (ctx) => {
    const { view_mode }  = ctx.request.query;
    const work = await strapi.services.work.findOne(ctx.params);
    // 非发布状态, 查看不到内容
    // 非预览模式, 查看不到内容
    const canRender = view_mode === VIEW_MODE.PREVIEW || work.is_publish;
    if (!canRender) work.pages = [];
    work.width = work.width || 320;
    return ctx.render('engine', { work });
  },
  renderCoreEditor: async (ctx) => {
    return ctx.render('core-editor');
  },
  submitForm: async (ctx) => {
    const work = await strapi.services.work.findOne(ctx.params);
    const formData = ctx.request.body;
    // eslint-disable-next-line no-unused-vars
    const workform = await strapi.services.workform.create({ form: formData, work });

    // eslint-disable-next-line require-atomic-updates
    ctx.body = { message: 'success', status: 0 };
  },
  queryFormsOfOneWork: async (ctx) => {
    // move to util module or front-end
    function getUuidMap2Name(work) {
      const uuidMap2Name = {};
      work.pages.forEach(page => {
        page.elements.forEach(ele => {
          if (ele.name === 'lbp-form-input') {
            uuidMap2Name[ele.uuid] = ele.pluginProps.placeholder;
          }
          if (ele.name === 'lbp-form-radio-group') {
            uuidMap2Name[ele.uuid] = ele.pluginProps.aliasName;
          }
        });
      });
      return uuidMap2Name;
    }

    const work = await strapi.services.work.findOne(ctx.params);

    // learn the query from: https://github.com/strapi/foodadvisor/blob/master/api/api/restaurant/controllers/Restaurant.js#L40
    let formRecords = await strapi.services.workform.find({ work: work.id });

    const uuidMap2Name = getUuidMap2Name(work);
    // eslint-disable-next-line require-atomic-updates
    return ctx.body = { uuidMap2Name, formRecords };
  },
  queryWorksWithForms: async (ctx) => {
    let formRecords = await strapi.query('workform').model.fetchAll({
      withRelated: [
        {'work': qb => qb.column('id') }
      ],
      columns: ['id', 'work']
    });
    formRecords = formRecords.toJSON();
    const groupedFormRecords = _.groupBy(formRecords, 'work.id');

    let workRecords = await strapi.query('work').model.fetchAll({
      columns: ['id', 'title']
    });
    workRecords = workRecords.toJSON().map(work => ({
      ...work,
      form_count: groupedFormRecords[work.id] && groupedFormRecords[work.id].length
    })).filter(work => work.form_count);

    return ctx.body = workRecords;
  },
  setAsTemplate: async (ctx) => {
    const work = await strapi.services.work.findOne(ctx.params);

    // eslint-disable-next-line no-unused-vars
    const templateWork = await strapi.services.work.create();
    return strapi.services.work.update({id: templateWork.id}, { pages: work.pages, is_template: true, cover_image_url: work.cover_image_url });
  },
  useTemplate: async (ctx) => {
    const templateWork = await strapi.services.work.findOne(ctx.params);
    const datasources = templateWork.datasources; // clone datasource

    // eslint-disable-next-line no-unused-vars
    const work = await strapi.services.work.create({ datasources });
    return strapi.services.work.update({id: work.id}, { pages: templateWork.pages, is_template: false });
  },
  uploadPSD: async (ctx) => {
    const pageJSON = await strapi.services.work.parsePSD(ctx.request.body.files.file);
    // eslint-disable-next-line
    ctx.body = pageJSON;
  },
  corsProxy: async (ctx) => {
    ctx.body = request(ctx.query.url);
  }
};
