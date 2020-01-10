/*
 * @Author: ly525
 * @Date: 2020-01-02 21:50:50
 * @LastEditors  : ly525
 * @LastEditTime : 2020-01-11 00:22:10
 * @FilePath: /h5-api/api/work/controllers/Work.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
 * serve luban-h5 front-end dist
 *
 * You will find information here:
 * 1. https://github.com/strapi/strapi/issues/3007
 * 2. https://stackoverflow.com/questions/55090339/strapi-custom-routes-to-redirect-to-public-directory/55130475#55130475
 * 3. https://medium.com/@schalkneethling/automate-package-releases-with-semantic-release-and-commitizen-d7d4c337f04f
 * 4. https://strapi.io/documentation/3.0.0-beta.x/concepts/middlewares.html#middlewares
 */

const koaStatic = require('koa-static');
const path  = require('path');

module.exports = strapi => {
  return {
    // eslint-disable-next-line no-unused-vars
    initialize: function(cb) {
      strapi.router.get(
        '/*',
        koaStatic(path.resolve('./build-editor'))
      );
    }
  };
};