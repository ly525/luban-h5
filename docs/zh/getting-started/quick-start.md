# 快速开始
> 重要：关于此部分有疑惑，请在下面直接评论，或者到社区讨论

> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


## 基础概念
> 首先你需要大概了解下 Node.js 的相关生态、Node.js 的安装
我们接下来会花一分钟介绍一下基础概念. 我们默认你知道 Linux 和 Git 的基本操作
### Node.js、npm、nvm

1. `Node.js` 
 服务器端的JavaScript 运行环境，你可以理解为和Python、Java等一样，它也是一门后端语言
1. `npm(or yarn)` Node.js 的包版本工具
> 1. 类似于 Python 的pip，或 Centos 的yum，或 Ubuntu 的 apt-get
> 1. 你在python 中安装requrest 库，通常是通过 `pip install requests` 来安装
> 1. 在 Node.js 中，也是一样的，只是把 `pip` 换成 `pip` or `yarn` 即可： `npm install requests`  or `yarn add requests` 


3. `nvm` ：Node.js 版本工具
> 1. 使用 nvm可以快速安装 Node 的某个版本，比如通过 `node -v` 查看你的Node 当前版本。
> 1. 假如这个版本(假设当前版本为 v.8.0.0)不符合要求，你可以通过 `nvm install v10.15.3` 来安装 `v10.15.3` 


### Node、Yarn、npm 安装

1. 请参照 [Strapi 的 预安装文档指导](https://strapi.io/documentation/3.0.0-beta.x/getting-started/install-requirements.html#installation-requirements) ，安装 Node、npm 和 Yarn
1. 因为 yarn 的仓库源在海外，所以，请配置国内镜像源，提高速度

```bash

yarn config get registry
# -> https://registry.yarnpkg.com

# 改成 taobao 的源：
yarn config set registry https://registry.npm.taobao.org
# -> yarn config v0.15.0
# -> success Set "registry" to "https://registry.npm.taobao.org".

# 看到 succes 表示安装完毕
```

## 技术栈(当前)
- 前端：Vue.js
- 后端：Strapi
- 存储：Sqlite

# 项目环境搭建

1. 鲁班H5的后端接口，由 [Strapi](https://github.com/strapi/strapi/) 强力驱动
1. 后端部分文档会尽量和 `[github-后端部分文档说明(project/back-end/h5-api/README.md)](https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/README.md)`保持同步

## 后端环境搭建
### 1. 快速上手

```bash
# 默认当前目录为 luban 项目的根目录
cd back-end/h5-api
# 使用 yarn 安装依赖，而非 yarn
# 原因参见：https://github.com/ly525/luban-h5/issues/92
yarn install # 安装依赖

npm run dev
# 补充说明: 如果需要在 vscode 中进行debug ，请使用 npm run localdev

# #!en: default database is sqlite3(h5-api/.tmp/data.db)
# #!zh: 默认数据库是 sqlite3，位置在 h5-api/.tmp/data.db

# 访问 http://locahost:1337/admin
# visit http://locahost:1337/admin

请继续阅读，进行相关配置
```

### 2. 注意事项

1. 本地开发，如果后端接口报错 403 Forbidden，请按照下图的操作，打开接口的访问权限接口：`[Roles And Permission] -> [Public] - [Permissions]`

![1567438464273-e0892ee2-5dca-45ec-a528-8090d80b23bd](https://user-images.githubusercontent.com/12668546/65381949-32addd00-dd2e-11e9-967a-e313dc6fca89.png)

![1567438463824-d6b87f12-eecf-4ae2-aa9c-bb4c73c4127d](https://user-images.githubusercontent.com/12668546/65381950-32addd00-dd2e-11e9-859a-dbec0941dc5a.png)

##### 上传封面图使用
![1567858269172-44561808-5d49-43b5-89c1-f4f876eeec24](https://user-images.githubusercontent.com/12668546/65381948-32154680-dd2e-11e9-95ea-589f808ce095.png)

2. 如果后端没有安装 strapi-hook-ejs 或者 没有在 hook.json 中进行配置，会报错(如下)。解决方案：只要装了 ejs 插件并且正确配置即可
```javascript
error TypeError: ctx.render is not a function
  at previewOne (~/luban-h5/back-end/h5-api/api/work/controllers/Work.js:13:16)
```

## 前端环境搭建
这部分会尽量和  `[project/front-end/h5/README.md](https://github.com/ly525/luban-h5/blob/dev/front-end/h5/README.md)` 保持同步

### 1. 快速上手

```bash
# 默认当前位置目录为 luban-h5 项目的根目录
cd front-end/h5

yarn # install dependencies
yarn serve # develop

# 更多命令
请参见 project/front-end/h5/package.json
```

### 2. 构建预览所需的渲染引擎
> 关于此部分有疑惑，请直接评论

#### 基本原理
作品预览的基本原理参见 [luban-h5/back-end/h5-api/api/work/controllers/Work.js/previewOne](https://github.com/ly525/luban-h5/blob/bd486ce16fc24bfd7030fc51857a579776e12e68/back-end/h5-api/api/work/controllers/Work.js#L12)

```js
previewOne: async (ctx) => {
  const work = await strapi.services.work.findOne(ctx.params);
  return ctx.render('engine', { work });
},
```
#### 如何构建
1. 在`front-end/h5`目录下，运行：`yarn engine:build`
2. 构建完成之后,后端的`h5-api/public`里面会多一个文件夹 `engine-assets`
3. 打开的预览窗口`preview.vue`, 里面的预览部分对应的其实是一个 iframe，可以看看对应的源码
  也就是说，这个预览其实依赖后端的渲染引擎，比如 ejs 或者 jade 这种模板引擎，所以参照这里：`luban-h5/front-end/h5/vue.config.js` `engineOutputDir` 变量，preview engine 构建完成，会生成到后端的 `back-end/h5-api/public/engine-assets` 目录


### 3. 前端组件说明

1. `lbp-`
全称为 `lu-ban-plugin:``鲁班H5的插件`，位置：`front-end/h5/src/components/plugins`

---
> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="6" />