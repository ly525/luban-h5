# Quick Start
- if you are familiar with `Node`, `Yarn`(and already installed), please follow the commands to start quickly:
- if you are not familiar with the tech stack, please read the following detailed tutorial

```bash
# back-end
cd back-end/h5-api && yarn && yarn dev

# front-end
# open a new terminal and goto the project root path
cd front-end/h5 && yarn && yarn build:engine && yarn dev
```

# Overview

## Basic Concepts
> First of all, you need to know about the related ecology of Node. js and the installation of Node. js.
> We will take a minute to introduce the basic concepts. By default, you know the basic operations of Linux and Git.
> You can read the [Basic installation Requirements](https://strapi.io/documentation/3.0.0-beta.x/getting-started/install-requirements.html#basic-installation-requirements)

## Build With(current version)
Vue.js: Front-end framework<br />Strapi.js: Open source Node.js Headless CMS to easily build customisable APIs<br />Sqlite: Database

## Cases you may meet in local development

> suitable for whose who are a little careless, who have only read half of the documents

1. API `403 Forbidden`, the solution: [# _2-Caution] (#_ 2-Caution)

2. The `preview page shows blank` in the dialog, the solution : [2. Rendering engine required for building preview] (# _2-Rendering engine required for building preview)


# Setup
> the API is powered by [strapi.js](https://strapi.io/)

## Setup backend
### 1. quick start
```bash
# by default, the current path is the root path for luban-h5
cd back-end/h5-api
# use yarn (⚠️not npm) install dependencies
# reference: https://github.com/ly525/luban-h5/issues/92
yarn install # install dependencies

yarn dev # dev
# additional notes:
# if you want to debug it in vscode, please run `yarn localdev`

!#en: default database is sqlite3(db location: h5-api/.tmp/data.db)

# visit http://localhost:1337/admin
Please read on to config the strapi admin
```

### 2. Something important

1. `403 Forbidden` ：Please follow the instructions to config the API can be publicly accessible: `[Roles And Permission] -> [Public] - [Permissions]` 

![1567438464273-e0892ee2-5dca-45ec-a528-8090d80b23bd](https://user-images.githubusercontent.com/12668546/65381949-32addd00-dd2e-11e9-967a-e313dc6fca89.png)

![1567438463824-d6b87f12-eecf-4ae2-aa9c-bb4c73c4127d](https://user-images.githubusercontent.com/12668546/65381950-32addd00-dd2e-11e9-859a-dbec0941dc5a.png)


##### Used for upload work cover

![image](https://user-images.githubusercontent.com/12668546/91663261-64245080-eb1a-11ea-9e31-f43f910cbb57.png)



## setup front-end

### 1. quick start
```bash
# by default, the current path is the root path of luban-h5
cd front-end/h5 && yarn && yarn build:engine && yarn dev

# more commands
# please refer to project/front-end/h5/package.json
```

### 2. build preview engine
- just run `cd front-end/h5 && yarn && yarn build:engine`

#### 2.1 Basic(TLDR)
[previewOne](https://github.com/ly525/luban-h5/blob/bd486ce16fc24bfd7030fc51857a579776e12e68/back-end/h5-api/api/work/controllers/Work.js#L12), here is the key code:

```js
previewOne: async (ctx) => {
  const work = await strapi.services.work.findOne(ctx.params);
  return ctx.render('engine', { work });
},
```

#### 2.2 How to build preview engine(TLDR)
1. cd `front-end/h5`, run `yarn build:engine`
2. after build finished, an folder named `engine-assets`  is auto generated at `back-end/h5-api/public`
3. `preview.vue` is preview modal, the mobile div is an iframe which a wrapper for builded `engine-entry`, learn more about engine here: `luban-h5/front-end/h5/vue.config.js`
