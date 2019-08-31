'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // GET /previewOne
  // strapi-hook-ejs: https://github.com/strapi/strapi/tree/master/packages/strapi-hook-ejs
  previewOne: async (ctx) => {
    const work = await strapi.services.work.findOne(ctx.params);
    return ctx.render('engine', { work });
  },
  submitForm: async (ctx) => {
    const work = await strapi.services.work.findOne(ctx.params);
    const formData = ctx.request.body.fields;
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

    let work = await strapi.services.work.findOne(ctx.params);
    work = work.toJSON();

    // learn the query from: https://github.com/strapi/foodadvisor/blob/master/api/api/restaurant/controllers/Restaurant.js#L40
    // eslint-disable-next-line no-undef
    let formDetails = await Workform.query(qb => {
      qb.where('work', '=', work.id);
    }).fetchAll();
    formDetails = formDetails.toJSON();

    const uuidMap2Name = getUuidMap2Name(work);
    // eslint-disable-next-line require-atomic-updates
    return ctx.body = { uuidMap2Name, formDetails };
  },
  setAsTemplate: async (ctx) => {
    let work = await strapi.services.work.findOne(ctx.params);
    work = work.toJSON();

    // eslint-disable-next-line no-unused-vars
    const templateWork = await strapi.services.work.create();
    return strapi.services.work.update({id: templateWork.id}, { pages: work.pages, is_template: true });
  },
  useTemplate: async (ctx) => {
    let templateWork = await strapi.services.work.findOne(ctx.params);
    templateWork = templateWork.toJSON();

    // eslint-disable-next-line no-unused-vars
    const work = await strapi.services.work.create();
    return strapi.services.work.update({id: work.id}, { pages: templateWork.pages, is_template: false });
  },
};
