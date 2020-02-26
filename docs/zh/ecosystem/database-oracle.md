# Oracle 适配([Strapi.js](https://strapi.io/))
> 本文作者[shaxm](https://github.com/shaxm), 特别感谢他的辛勤写作和探索

以下适用于luban-h5的v1.8.1 以上版本
[1.8.1](https://github.com/ly525/luban-h5/compare/v1.8.0...v1.8.1) (2020-01-12)

1. 安装 oracledb 模块

```bash
npm install oracledb
```

2. back-end\h5-api\config\environments\development\database.json

> 注：username就是数据库的用户名，由于框架原因，创建数据库用户时要注意，用户名前后必须带半角双引号。


```javascript
{
  "defaultConnection": "default",
  "enabled": true,
  "connections": {
    "default": {
      "connector": "bookshelf",
      "settings": {
        "client": "oracledb",
        "connectString": "ip:port/orcl",
        "username": "\"luban\"",
        "password": "your password",
        "charset": "utf8"
      },
      "options": {
        "debug": true,
        "pool": {
          "acquireTimeoutMillis": 60000,
          "min": 0,
          "max": 7
        },
        "acquireConnectionTimeout": 600000,
        "useNullAsDefault": true,
        "fetchAsString": ["clob"]
      }
    }
  }
}
```

3. back-end\h5-api\node_modules\bookshelf\lib\sync.js

```javascript
// Sync
// ---------------
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const validLocks = ['forShare', 'forUpdate'];

function supportsReturning(client = {}) {
  if (!client.config || !client.config.client) return false;
  return ['postgresql', 'postgres', 'pg', 'oracle', 'mssql', 'oracledb'].includes(client.config.client);
}
```

4.back-end\h5-api\node_modules\strapi-connector-bookshelf\lib\knex.js

```javascript
/* eslint-disable prefer-template */
// Array of supported clients.
const CLIENTS = [
  'pg',
  'mysql',
  'mysql2',
  'sqlite3',
  'mariasql',
  'oracle',
  'oracledb',
  'strong-oracle',
  'mssql',
];
```

```
ssl: _.get(connection.settings, 'ssl', false),
timezone: _.get(connection.settings, 'timezone', 'utc'),
filename: _.get(connection.settings, 'filename', '.tmp/data.db'),
connectString: _.get(connection.settings, 'connectString'),

增加oracledb的fetchAsString属性的支持，处理blob字段
// Resolve path to the directory containing the database file.
const fileDirectory = options.connection.filename
  ? path.dirname(path.resolve(strapi.config.appPath, options.connection.filename))
  : '';

switch(options.client) {
  case 'oracledb':
    options.fetchAsString =  _.get(connection.options, 'fetchAsString', []);
    break;
```

5. back-end\h5-api\node_modules\knex\lib\query\builder.js

```javascript
增加空字符串判断逻辑
    if (arguments.length === 2) {
      value = operator;
      operator = '='; // If the value is null, and it's a two argument query,
      // we assume we're going for a `whereNull`.
      if ((this.client.config.client === 'oracledb' && (typeof value === "undefined" || value === '')) || value === null) {
        return this.whereNull(column);
      }
    } // lower case the operator for comparison purposes

增加空字符串判断逻辑
    // If the value is still null, check whether they're meaning
    // where value is null
    if ((this.client.config.client === 'oracledb' && (typeof value === "undefined" || value === '')) || value === null) {
      // Check for .where(key, 'is', null) or .where(key, 'is not', 'null');
      if (checkOperator === 'is' || checkOperator === 'is not') {
        return this._not(checkOperator === 'is not').whereNull(column);
      }
    } // Push onto the where statement stack.

6. back-end\h5-api\node_modules\strapi-connector-bookshelf\lib\mount-models.js

```js
const getDatabaseName = connection => {
  const dbName = _.get(connection.settings, 'database');
  const dbSchema = _.get(connection.settings, 'schema', 'public');
  switch (_.get(connection.settings, 'client')) {
    case 'sqlite3':
      return 'main';
    case 'pg':
      return `${dbName}.${dbSchema}`;
    case 'mysql':
      return dbName;
    case 'oracledb':
      return _.get(connection.settings, 'username').replace(/"/g, '');
    default:
      return dbName;
  }
};
```

7. back-end\h5-api\node_modules\strapi-connector-bookshelf\lib\buildDatabaseSchema.js

```javascript
const uniqueColName = (table, key) => generateCombinedName('unique', table, key); //`${table}_${key}_unique`;

function generateCombinedName(postfix, name, subNames) {
  const crypto = require('crypto');
  const limit = 30;
  if (!Array.isArray(subNames)) subNames = subNames ? [subNames] : [];
  const table = name.replace(/\.|-/g, '_');
  const subNamesPart = subNames.join('_');
  let result = `${table}_${
    subNamesPart.length ? subNamesPart + '_' : ''
  }${postfix}`.toLowerCase();
  if (result.length > limit) {
    console.log(
      `Automatically generated name "${result}" exceeds ${limit} character ` +
        `limit for Oracle. Using base64 encoded sha1 of that name instead.`
    );
    // generates the sha1 of the name and encode it with base64
    result = crypto
      .createHash('sha1')
      .update(result)
      .digest('base64')
      .replace('=', '');
  }
  return result;
}
```
