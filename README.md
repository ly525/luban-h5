[📖中文在线文档](https://ly525.github.io/luban-h5/zh/) | [📖English Docs](https://ly525.github.io/luban-h5/en/getting-started/introduction.html) | [README(en)](./README.en.md)

<h2 align="center">
 鲁班 H5
</h2>
<p align="center">
基于Vue开发，通过拖拽的形式，生成移动页面
</p>
<p align="center">
Mobile Page Builder&Generator with Drag&Drop
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Docs](https://github.com/ly525/luban-h5/workflows/docs/badge.svg)](https://ly525.github.io/luban-h5/)
[![Release](https://img.shields.io/github/v/release/ly525/luban-h5)](https://github.com/ly525/luban-h5/workflows/docs)
[![Gitter](https://img.shields.io/gitter/room/luban-h5/community)](https://gitter.im/luban-h5/community)
[![GitHub issues](https://img.shields.io/github/issues/ly525/luban-h5)](https://github.com/ly525/luban-h5/issues)
[![GitHub stars](https://img.shields.io/github/stars/ly525/luban-h5.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/ly525/luban-h5/stargazers/)
[![码云](https://img.shields.io/badge/Gitee--yellow.svg?style=social&logo=data:image/svg+xml;base64,PHN2ZyB0PSIxNTc0ODM3MTM4ODM3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3NzAiICAgICB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPiAgICA8cGF0aCBkPSJNODkxIDQyOC44SDQ2NS44Yy0yMC40IDAtMzcgMTYuNS0zNyAzN3Y5Mi40YzAgMjAuNCAxNi41IDM3IDM3IDM3aDI1OC45YzIwLjQgMCAzNyAxNi42IDM3IDM3djE4LjRjMCA2MS4zLTQ5LjcgMTEwLjktMTEwLjkgMTEwLjlIMjk5LjRjLTIwLjQgMC0zNy0xNi42LTM3LTM3VjM3My4yYzAtNjEuMyA0OS43LTExMC45IDExMC45LTExMC45aDUxNy42YzIwLjQgMCAzNy0xNi41IDM3LTM3bDAuMS05Mi4zYzAtMjAuNC0xNi41LTM3LTM3LTM3SDM3My4zQzIyMC4yIDk2IDk2IDIyMC4yIDk2IDM3My4zVjg5MWMwIDIwLjQgMTYuNiAzNyAzNyAzN2g1NDUuNEM4MTYuMiA5MjggOTI4IDgxNi4zIDkyOCA2NzguNFY0NjUuOGMwLTIwLjQtMTYuNi0zNy0zNy0zN3oiICAgICAgICAgIGZpbGw9IiNkODFlMDYiIHAtaWQ9IjE3NzEiPjwvcGF0aD48L3N2Zz4=)](https://gitee.com/ly525/luban-h5.git)

### 快速体验
> 使用官方提供的 [***一键安装脚本***](https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh)，简化安装步骤，在本地通过使用 `Docker+Ubuntu 镜像`，即可`快速安装+体验` 鲁班H5

> [快速体验-完整文档](https://github.com/ly525/luban-h5/wiki/Quick-Start(%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E7%AF%87)%EF%BC%9ADocker-Ubuntu-Image-for-Quick-Local-Dev)

> 简而言之：

```bash
docker pull ubuntu
docker run -it -p 1234:80 -p 1235:1337  -v `pwd`:/app ubuntu
wget -qO- https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh | bash

# 安装完成之后
# 1. visit ：http://localhost:1234/admin，自定义配置账号密码，登录即可
# 1.2 配置相关权限，文档参见：https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html#%E5%90%8E%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA

# 2. 鲁班前端
# 2.1 宿主机访问 「鲁班前端」：localhost:1234/main, 即可看到鲁班的前端
```

<a href="https://terminalizer.com/view/b1432a8c2508"><img width="70%" alt="Gitter" src="https://user-images.githubusercontent.com/12668546/69896337-55d1ba00-1379-11ea-8a56-5122930d2501.png"></a>


### 🔗Links/相关链接
- 文档
    * [📖中文在线文档](https://ly525.github.io/luban-h5/zh/)
    * [📖English Docs](https://ly525.github.io/luban-h5/en/getting-started/introduction.html)
    * [README(En)](./README.en.md)

- 教程
    * [视频教程：快速开始(哔哩哔哩)](https://space.bilibili.com/121039466/channel/detail?cid=94066)


- 源码
    * GitHub：https://github.com/ly525/luban-h5
    * [Gitee (国内镜像)](https://gitee.com/ly525/luban-h5)

- 社区
    * [中文社区/论坛](https://support.qq.com/product/93432)
    * [Gitter](https://gitter.im/luban-h5/community)

- 生态
    * 后端集成
        * [Strapi.js (Node.js 官方后端API)](/luban-h5/tree/dev/back-end/h5-api)
        * [Spring Boot API Demo](https://github.com/luban-h5/spring-boot-api-for-editor)

    * 自定义组件
        * [快速开发脚手架](https://github.com/luban-h5/vue-cli-plugin-lbhc)

    * 官方组件库
        * [轮播图](https://github.com/luban-h5-components/lbp-slide)
        * [普通按钮](https://github.com/luban-h5-components/lbc-button)

    * 支撑组件(辅助类组件)
        * 图片库：用于从图库中快速选择图片
        * [文本对齐-Repo](https://github.com/luban-h5/lbs-text-align)：用于按钮文字对齐

- [RoadMap/开发计划](https://github.com/ly525/luban-h5/projects)


目录
- [鲁班H5是什么？](#%E9%B2%81%E7%8F%ADh5%E6%98%AF%E4%BB%80%E4%B9%88)
- [Demo](#Demo)
- [Features](#features)
- [快速开始](#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
- [更多说明](#%E6%9B%B4%E5%A4%9A%E8%AF%B4%E6%98%8E)
  * [前端组件说明](#%E5%89%8D%E7%AB%AF%E7%BB%84%E4%BB%B6%E8%AF%B4%E6%98%8E)
  * [技术栈（当前）](#%E6%8A%80%E6%9C%AF%E6%A0%88%E5%BD%93%E5%89%8D)
- [👨🏻‍💻👩🏻‍💻交流群](#%E4%BA%A4%E6%B5%81%E7%BE%A4)

### 鲁班H5是什么？
鲁班H5是基于Vue2.0开发的，通过拖拽的形式，生成页面的工具，类似[易企秀](http://www.eqxiu.com/)、[百度 H5](https://h5.baidu.com) 等工具


### Demo
> [在线访问地址](https://api.luban-h5.wxjcart.com)

> [更多作品演示图片，点击查看](https://github.com/ly525/luban-h5/issues/15)

<img src="https://s2.ax1x.com/2019/10/11/u7WzUx.gif" style="margin: 10px;" width="60%" />


### 快速开始
请参照 [鲁班H5-在线文档](https://ly525.github.io/luban-h5/zh/) 的 `快速开始` 章节


### 交流群

| 钉钉群  | 微信公众号  |  微信 |
|---|---|---|
| <img src="https://user-images.githubusercontent.com/12668546/61447488-a379f700-a983-11e9-9956-139352a2585d.png" width="200" />| <img src="https://user-images.githubusercontent.com/12668546/65471913-ab827580-dea3-11e9-919c-870c9605c60f.png" width="200" />  | <img src="https://user-images.githubusercontent.com/12668546/66585418-5cce1e80-ebb9-11e9-91c0-56f658f09e27.png" width="200" /> <br />请备注：鲁班H5交流|

## 更多细节请阅读[在线文档](https://ly525.github.io/luban-h5)


### Features
1. 编辑器
    - [x] 参考线
    - [x] 吸附线、组件对齐
    - [x] 拖拽改变组件形状
    - [x] 元素: 复制（画布）
    - [x] 元素: 删除（画布）
    - [x] 元素: 编辑（画布）
    - [x] 页面：新增
    - [x] 页面：复制
    - [x] 页面：删除
    - [x] 快速预览
    - [x] 撤销、重做

2. 组件系统
    - [x] 文字
    - [x] 普通按钮
    - [x] 表单按钮
    - [x] 表单输入框
    - [x] 普通图片
    - [x] 背景图
    - [x] 视频（Iframe形式）

3. 增强功能
    - [ ] 上传 PSD，一键转换为 H5(已经调研，可以实现)
    - [x] 图片库
    - [x] 第三方无版权图片搜索
    - [ ] 自定义脚本(已经调研，可以实现)

4. 后端 API
    - [x] 创建、保存、更新作品
    - [x] 表单数据收集
    - [x] 表单数据展示
    - [x] 在线预览
    - [x] 二维码预览


### 更多说明
#### 前端组件说明
1. `lbp-` 全称为 `lu-ban-plugin-`, 意思为 `鲁班H5的插件`，位置：`front-end/h5/src/components/plugins`


#### 技术栈（当前）
1. 前端：[Vue.js](https://vuejs.org/v2/guide/)
2. 后端：[Strapi](https://strapi.io/)
3. 存储：[Sqlite](https://mongodb.com)

#### 如何贡献
所有合理的改动、优化、修正，新的组件，或者文档的修正、更新 相关的提交都会被接收
