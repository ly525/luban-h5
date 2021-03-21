#!/usr/bin/env node
'use strict';

/**
 * #!zh: 为了支持在 vscode 中进行 debug，添加 server.js。更多请参见: https://github.com/ly525/blog/issues/310
 * #!en: add server.js for debug in vscode, see more here: https://github.com/ly525/blog/issues/310
 */

// Start Strapi
const strapi = require('strapi');
strapi().start();