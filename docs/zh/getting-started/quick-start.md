# 快速开始
- 重要：关于此部分有疑惑，请在下面直接评论，或者到[社区](https://support.qq.com/products/93432/)讨论
- 如果您已经熟悉并已经安装了 `Node`、`Yarn`，可以直接参照下面的命令，快速上手
- 如果您不熟悉，请阅读下面的详细教程

## 快速体验
> 以下三种方式，任选其中一种即可

#### 一、一键脚本（推荐！）
```bash
git clone https://github.com/ly525/luban-h5 && cd luban-h5
# 安装依赖，构建前后端（安装依赖会耗时略长，请耐心等待）
./luban-h5.sh init

# 启动项目访问 http://localhost:1337 即可
./luban-h5.sh start

# ./luban-h5.sh stop
```

- 更多细节，请参照 [鲁班H5-在线文档](https://ly525.github.io/luban-h5/zh/) 的 [`快速开始`](https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html) 章节，进行配置即可

- 如果遇到接口 403 问题，请参照 [`快速开始`](https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html) 章节，搜索关键字：403 即可


#### 二、本地安装了 Node、Yarn
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
- 更多细节，请参照 [鲁班H5-在线文档](https://ly525.github.io/luban-h5/zh/) 的 [`快速开始`](https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html) 章节，进行配置即可


#### 三、熟悉 Docker（迭代中，不推荐使用，后期会推出docker image）
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
# 1.2 配置相关权限，文档参见：https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html#%E5%90%8E%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA

# 2. 鲁班前端
# 2.1 宿主机访问 「鲁班前端」：localhost:1234, 即可看到鲁班的前端
```


# 常见问题
> 这部分一般是按照下面的教程运行之后，仍然可能会遇到的问题。比较适合粗心、文档只看了一半、比较着急的同学

1. 接口 `403 Forbidden`，解决方案看这里：[#_2-注意事项](#_2-注意事项)
2. 弹框中的 `预览页面显示空白`，解决方案看这里：[2. 构建预览所需的渲染引擎](#_2-构建预览所需的渲染引擎)


# 视频教程
<iframe src="//player.bilibili.com/player.html?aid=76827615&cid=131403430&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="600"> </iframe>

## 基础概念
> 首先你需要大概了解下 Node.js 的相关生态、Node.js 的安装
我们接下来会花几分钟介绍一下基础概念. 我们默认你知道 Linux 和 Git 的基本操作
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
> 鲁班H5的后端接口，由 [Strapi.js](https://github.com/strapi/strapi/) 驱动

## 后端环境搭建
> 如果遇到接口 403 问题，请看：[#_2-注意事项](#_2-注意事项)
### 1. 快速上手

```bash
# 默认当前目录为 luban 项目的根目录
cd back-end/h5-api
# 使用 yarn 安装依赖，而非 yarn
# 原因参见：https://github.com/ly525/luban-h5/issues/92
yarn install # 安装依赖

yarn dev
# 补充说明: 如果需要在 vscode 中进行debug ，请使用 npm run localdev

# #!en: default database is sqlite3(h5-api/.tmp/data.db)
# #!zh: 默认数据库是 sqlite3，位置在 h5-api/.tmp/data.db

# 访问 http://localhost:1337/admin
# visit http://localhost:1337/admin

请继续阅读，进行相关配置
```

### 2. 注意事项

1. 本地开发，如果后端接口报错 403 Forbidden，请按照下图的操作，打开接口的访问权限接口：`[Roles And Permission] -> [Public] - [Permissions]`

![1567438464273-e0892ee2-5dca-45ec-a528-8090d80b23bd](https://user-images.githubusercontent.com/12668546/65381949-32addd00-dd2e-11e9-967a-e313dc6fca89.png)

![1567438463824-d6b87f12-eecf-4ae2-aa9c-bb4c73c4127d](https://user-images.githubusercontent.com/12668546/65381950-32addd00-dd2e-11e9-859a-dbec0941dc5a.png)

##### 上传封面图使用
![1567858269172-44561808-5d49-43b5-89c1-f4f876eeec24](https://user-images.githubusercontent.com/12668546/65381948-32154680-dd2e-11e9-95ea-589f808ce095.png)


## 前端环境搭建
### 1. 快速上手

```bash
# 默认当前位置目录为 luban-h5 项目的根目录
cd front-end/h5 && yarn && yarn build:engine && yarn dev

# 更多命令请参见 project/front-end/h5/package.json
```

### 2. 构建预览所需的渲染引擎
- 如果在`「1. 快速上手」` 已经执行了 `yarn build:engine`，这一步可以跳过
- 关于此部分有疑惑，请直接到[社区](https://support.qq.com/products/93432/)评论即可

1. 只需要在`front-end/h5`目录下，运行：`yarn build:engine` 即可
2. 下面的内容感兴趣可以了解，感觉内容太多可以不看

#### 2.1 基本原理
作品预览的基本原理参见 [previewOne](https://github.com/ly525/luban-h5/blob/bd486ce16fc24bfd7030fc51857a579776e12e68/back-end/h5-api/api/work/controllers/Work.js#L12)，关键代码如下：

```js
previewOne: async (ctx) => {
  const work = await strapi.services.work.findOne(ctx.params);
  return ctx.render('engine', { work });
},
```

#### 2.2 如何构建
1. 在`front-end/h5`目录下，运行：`yarn build:engine`
2. 构建完成之后，后端的`h5-api/public`里面会多一个文件夹 `engine-assets`
3. 打开的预览窗口`preview.vue`, 里面的预览部分对应的其实是一个 iframe，可以看看对应的源码
4. 这个预览其实依赖后端的模板引擎（比如 ejs、jade等）
5. 参照这里`luban-h5/front-end/h5/vue.config.js`的`engineOutputDir` 变量（这个变量就是预览引擎构建完成，生成的文件所在的目录。默认是后端的 `back-end/h5-api/public/engine-assets` 目录）


---
> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="6" />