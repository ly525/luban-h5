# 快速开始

[[toc]]

::: tip 开始前必读
#### 共建文档
  - 发现任何拼写错误、阅读拗口（请直接评论 或 提issue）
  - 细节缺失、任何一点可以改进的（请直接评论 或 提issue）
  - 文档需要大家的Review
  - 流畅、优雅、舒服的阅读体验需要您的建议

#### 关于提问(我的一些期待)
  - 多读两遍：[提问的智慧](https://zhuanlan.zhihu.com/p/19779979)
  - 遇到问题，请先尝试Google 搜索相关问题+解决方案
  - 如果多次尝试仍未解决、卡住了，及时提问
  - 提问的话，请提供：
    - 上下文 + 基本信息：比如版本号、运行环境、自己做了哪些尝试 等
    - 换位思考 ！！！！

#### 其它
  - 重要：关于此部分有疑惑，请在下面直接评论，或者到[社区](https://support.qq.com/products/93432/)讨论
  - 如果您已经熟悉并已经安装了 `Node`、`Yarn`，可以直接参照下面的命令，快速上手
  - 如果您不熟悉，请阅读下面的详细教程
  - [安装常见问题汇总](https://github.com/ly525/luban-h5/issues/109)

:::


## 技术栈(当前)

::: warning
- 推荐采用 Node LTS (v10 or V12)
- 安装完成后， 如果遇到接口 403 问题，请看：[常见问题](#常见问题)
:::

::: details Node、Yarn 等基础概念
> 首先你需要大概了解下 Node.js 的相关生态、Node.js 的安装
我们接下来会花几分钟介绍一下基础概念. 我们默认你知道 Linux 和 Git 的基本操作
#### Node.js、npm、nvm

1. `Node.js` 
    - 服务器端的JavaScript 运行环境，你可以理解为和Python、Java等一样，它也是一门后端语言
1. `npm(or yarn)` Node.js 的包版本工具
    - 类似于 Python 的pip，或 Centos 的yum，或 Ubuntu 的 apt-get
    - 你在python 中安装requrest 库，通常是通过 `pip install requests` 来安装
    - 在 Node.js 中，也是一样的，只是把 `pip` 换成 `pip` or `yarn` 即可： `npm install requests`  or `yarn add requests` 
3. `nvm` ：Node.js 版本工具
    -  使用 nvm可以快速安装 Node 的某个版本，比如通过 `node -v` 查看你的Node 当前版本。
    -  假如这个版本(假设当前版本为 v.8.0.0)不符合要求，你可以通过 `nvm install v10.15.3` 来安装 `v10.15.3` 

#### Node、Yarn、npm 安装
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
:::

- 前端：[Vue.js](https://cn.vuejs.org/)
- 后端：[Strapi](https://strapi.io/)
- 存储：Sqlite/Mysql



## 本地快速上手
::: tip
以下三种方式，任选其中一种即可
:::

### 一、一键脚本（推荐）
```bash
git clone https://github.com/ly525/luban-h5 && cd luban-h5
# 安装依赖，构建前后端（安装依赖会耗时略长，请耐心等待）
./luban-h5.sh init

# 启动项目访问 http://localhost:1337 即可
./luban-h5.sh start

# ./luban-h5.sh stop
```

### 二、本地安装了 Node、Yarn
> 适合 熟悉前端开发的同学、使用 Windows 的同学
```bash
git clone https://github.com/ly525/luban-h5
cd luban-h5 # 项目根目录

# 后端
cd back-end/h5-api && yarn && yarn dev

# 前端
# 新开一个终端，在项目根目录执行如下命令
cd front-end/h5 && yarn && yarn build:engine && yarn dev
```
- 按照提示，在浏览器中访问终端中提示的 URL 即可
- 更多细节，请参照 [鲁班H5-在线文档](https://ly525.gitee.io/luban-h5/zh/) 的 [`快速开始`](https://ly525.gitee.io/luban-h5/zh/getting-started/quick-start.html) 章节，进行配置即可


### 三、熟悉 Docker
> 迭代中，不推荐使用，后期会推出docker image，欢迎提 Pull Request
::: details 点击查看
> 使用官方提供的 [***一键安装脚本***](https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh)，简化安装步骤，在本地通过使用 `Docker+Ubuntu 镜像`，即可`快速安装+体验` 鲁班H5

> [快速体验-完整文档](https://github.com/ly525/luban-h5/wiki/Quick-Start(%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E7%AF%87)%EF%BC%9ADocker-Ubuntu-Image-for-Quick-Local-Dev)，简而言之：

```shell
docker pull ubuntu
docker run -it -p 1234:80 -p 1235:1337  -v `pwd`:/app ubuntu
# 使用清华大学 Ubuntu 软件镜像
sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
apt update && apt install -y wget git
wget -qO- https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh | bash

# 安装完成之后
# 1. visit ：http://localhost:1234/admin，自定义配置账号密码，登录即可
# 1.2 配置相关权限，文档参见：https://ly525.gitee.io/luban-h5/zh/getting-started/quick-start.html#%E5%90%8E%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA

# 2. 鲁班前端
# 2.1 宿主机访问 「鲁班前端」：localhost:1234, 即可看到鲁班的前端
```
:::

## 详细教程
### 前端
#### 1. 快速上手

```bash
# 默认当前位置目录为 luban-h5 项目的根目录
cd front-end/h5 && yarn && yarn build:engine && yarn dev

# 更多命令请参见 project/front-end/h5/package.json
```

#### 2. 构建预览所需的渲染引擎
::: tip 所谓的渲染引擎是什么？
- 鲁班H5 编辑一个作品在服务端保存的其实是一个 JSON，相关原理参见：[如何将JSON转换成手机端网页?](https://www.yuque.com/luban-h5/docs/ug7xg5)，那么谁来把 JSON -> H5 页面呢？
- 答案：JSON -> ”渲染引擎“ -> H5页面（也就是说，“渲染引擎” 担当了 将 json 渲染为H5页面的重任）
- 使用场景：预览页面、用户最终看到H5页面
- 源码地址：`luban-h5/front-end/h5/src/engine-entry.js`
:::

####  如何构建
1. 在`front-end/h5`目录下，运行：`yarn build:engine`
2. 构建完成之后，后端的`h5-api/public`里面会多一个文件夹 `engine-assets`（即渲染引擎）

#### 相关原理
- 源码地址：`luban-h5/front-end/h5/src/engine-entry.js`
- 打开的预览窗口`preview.vue`, 里面的预览部分对应的其实是一个 iframe
- 该 iframe 对应的即一个H5页面，iframe.src 一般为：https://h5.luban-h5.com/works/preview/页面Id?view_mode=preview
- 该H5最终是由后端的模板引擎(鲁班采用的是 ejs) 进行渲染：
 后端模板引擎渲染的基本原理，参见：[previewOne](https://github.com/ly525/luban-h5/blob/bd486ce16fc24bfd7030fc51857a579776e12e68/back-end/h5-api/api/work/controllers/Work.js#L12)，关键代码如下：
  ```js
  previewOne: async (ctx) => {
    const work = await strapi.services.work.findOne(ctx.params);
    return ctx.render('engine', { work });
  },
  ```

### 后端
#### 1. 快速上手
```bash
# 默认当前目录为 luban 项目的根目录
cd back-end/h5-api
# 使用 yarn 安装依赖，而非 npm
# 原因参见：https://github.com/ly525/luban-h5/issues/92
yarn install # 安装依赖

yarn dev
# 补充说明: 如果需要在 vscode 中进行debug ，请使用 npm run localdev

# !#en: default database is sqlite3(h5-api/.tmp/data.db)
# !#zh: 默认数据库是 sqlite3，位置在 h5-api/.tmp/data.db

# 访问 http://localhost:1337/admin
# visit http://localhost:1337/admin

请继续阅读，进行相关配置
```

### 管理后台
> 本地访问地址为：[http://localhost:1337/admin](http://localhost:1337/admin)

::: details 详细介绍
- 对于 Node 框架，大家耳熟能详是 Egg.js、Express.js, Koa.js 这些
- 鲁班H5采用的是 [Strapi.js(一个 CMS)](strapi.io) 作为其后端框架，[答疑:为何采用Strapi.js作为 鲁班H5的后端框架?](https://github.com/ly525/luban-h5/discussions/234)
- 我们在上一步`cd back-end/h5/api && yarn && yarn dev`之后，就可以打开 [鲁班H5 的管理后台](http://localhost:1337/admin)了
- 管理后台主要功能：
  - 管理数据库Model
  - 接口权限
  - 用户注册、管理
  - 上传素材管理
  - 接口文档
  - 等等

- 步骤：
  - 如果你是第一次访问：[http://localhost:1337/admin](http://localhost:1337/admin) ，按照页面提示注册即可
  - 注册完成之后，使用刚才注册的账号、密码登录管理后台
  - 在右上角可以修改语言：zh-Hans(简体中文)
:::

## 常见问题
> [安装常见问题汇总](https://github.com/ly525/luban-h5/issues/109)

### 接口 `403 Forbidden`
::: details 点击查看 403 解决方案
- 本地开发，如果后端接口报错 403 Forbidden
- 访问：[http://localhost:1337/admin](http://localhost:1337/admin) (鲁班的管理后台，在这里管理数据、接口相关权限)
- 请按照下图的操作，打开接口访问权限：`Roles And Permission -> Public -> Permissions`

![image](https://user-images.githubusercontent.com/12668546/119246613-7d43c480-bbb5-11eb-943b-aa78619e8760.png)

#### 上传封面图使用
![image](https://user-images.githubusercontent.com/12668546/119246639-ba0fbb80-bbb5-11eb-9278-79c1587dbab8.png)
:::

### 预览页面显示空白
> 解决方案看这里：[2. 构建预览所需的渲染引擎](#_2-构建预览所需的渲染引擎)

## 视频教程
<iframe src="//player.bilibili.com/player.html?aid=76827615&cid=131403430&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="600"> </iframe>

---
> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="6" />
