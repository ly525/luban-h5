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
};
