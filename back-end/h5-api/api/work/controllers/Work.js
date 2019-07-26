'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // GET /previewOne
  // strapi-hook-ejs: https://github.com/strapi/strapi/tree/master/packages/strapi-hook-ejs
  previewOne: async (ctx) => {
    return ctx.render('engine', {work: { page2: []}});
  }
};
