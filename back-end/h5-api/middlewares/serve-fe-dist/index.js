/*
 * You will find information here:
 * 1. https://github.com/strapi/strapi/issues/3007
 * 2. https://stackoverflow.com/questions/55090339/strapi-custom-routes-to-redirect-to-public-directory/55130475#55130475
 * 3. https://medium.com/@schalkneethling/automate-package-releases-with-semantic-release-and-commitizen-d7d4c337f04f
 * 4. https://strapi.io/documentation/3.0.0-beta.x/concepts/middlewares.html#middlewares
 * 5. https://github.com/strapi/strapi/blob/master/packages/strapi/lib/middlewares/public/index.js#L73
 */

const koaStatic = require('koa-static');
const path  = require('path');

module.exports = strapi => {
  return {
    // eslint-disable-next-line no-unused-vars
    initialize: function(cb) {
      // https://github.com/strapi/strapi/blob/master/packages/strapi/lib/middlewares/public/index.js#L73
      strapi.router.get(
        '/*',
        koaStatic(path.resolve('./build-editor')) // <strapi-app>/fe-dist
      );
    }
  };
};