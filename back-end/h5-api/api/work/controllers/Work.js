'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const _ = require('lodash');
const request = require('request');

// 浏览模式
const VIEW_MODE = {
  PREVIEW: 'preview' // 预览
};

module.exports = {
  // GET /previewOne
  // strapi-hook-ejs: https://github.com/strapi/strapi/tree/master/packages/strapi-hook-ejs
  previewOne: async (ctx) => {
    const { view_mode }  = ctx.request.query;
    // https://github.com/strapi/strapi/issues/5688
    const work = await strapi.services.work.findOne({ id: ctx.params.id
    });
    // 非发布状态, 查看不到内容
    // 非预览模式, 查看不到内容
    const canRender = view_mode === VIEW_MODE.PREVIEW || work.is_publish;
    if (!canRender) work.pages = [];
    work.width = work.width || 320;
    // yarn add strapi-hook-ejs
    return ctx.render('engine', { work });
  },
  renderCoreEditor: async (ctx) => {
    return ctx.render('core-editor');
  },
  submitForm: async (ctx) => {
    const work = await strapi.services.work.findOne({ id: ctx.params.id
    });
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

    const work = await strapi.services.work.findOne({ id: ctx.params.id
    });

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
    const work = await strapi.services.work.findOne({ id: ctx.params.id
    });

    // eslint-disable-next-line no-unused-vars
    const templateWork = await strapi.services.work.create();
    return strapi.services.work.update({id: templateWork.id}, { pages: work.pages, is_template: true, cover_image_url: work.cover_image_url });
  },
  useTemplate: async (ctx) => {
    const templateWork = await strapi.services.work.findOne({ id: ctx.params.id
    });
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
