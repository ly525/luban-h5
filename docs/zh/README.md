---
home: true
actionText: Get Started →
actionLink: /zh/getting-started/introduction
features:
  - title: 表单提交
    details: 支持表单组件，即时倾听用户反馈，可以在后台查看和下载用户数据
  - title: 轻松建站
    details: 丰富的组件系统、支持可视化编辑、自由拖拽排版、实时预览、在线访问
  - title: 导入 PSD
    details: 支持一键导入PSD，将设计师的创意转换为 H5，快速查看效果、反馈、上线
footer: GPL 3.0 Licensed | Copyright © 2019-present
---

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Docs](https://github.com/ly525/luban-h5/workflows/docs/badge.svg)](https://ly525.github.io/luban-h5/)
[![Release](https://img.shields.io/github/v/release/ly525/luban-h5)](https://github.com/ly525/luban-h5/workflows/docs)
[![Gitter](https://img.shields.io/gitter/room/luban-h5/community)](https://gitter.im/luban-h5/community)
[![GitHub issues](https://img.shields.io/github/issues/ly525/luban-h5)](https://github.com/ly525/luban-h5/issues)
[![GitHub stars](https://img.shields.io/github/stars/ly525/luban-h5.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/ly525/luban-h5/stargazers/)
[![码云](https://img.shields.io/badge/Gitee--yellow.svg?style=social&logo=data:image/svg+xml;base64,PHN2ZyB0PSIxNTc0ODM3MTM4ODM3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3NzAiICAgICB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPiAgICA8cGF0aCBkPSJNODkxIDQyOC44SDQ2NS44Yy0yMC40IDAtMzcgMTYuNS0zNyAzN3Y5Mi40YzAgMjAuNCAxNi41IDM3IDM3IDM3aDI1OC45YzIwLjQgMCAzNyAxNi42IDM3IDM3djE4LjRjMCA2MS4zLTQ5LjcgMTEwLjktMTEwLjkgMTEwLjlIMjk5LjRjLTIwLjQgMC0zNy0xNi42LTM3LTM3VjM3My4yYzAtNjEuMyA0OS43LTExMC45IDExMC45LTExMC45aDUxNy42YzIwLjQgMCAzNy0xNi41IDM3LTM3bDAuMS05Mi4zYzAtMjAuNC0xNi41LTM3LTM3LTM3SDM3My4zQzIyMC4yIDk2IDk2IDIyMC4yIDk2IDM3My4zVjg5MWMwIDIwLjQgMTYuNiAzNyAzNyAzN2g1NDUuNEM4MTYuMiA5MjggOTI4IDgxNi4zIDkyOCA2NzguNFY0NjUuOGMwLTIwLjQtMTYuNi0zNy0zNy0zN3oiICAgICAgICAgIGZpbGw9IiNkODFlMDYiIHAtaWQ9IjE3NzEiPjwvcGF0aD48L3N2Zz4=)](https://gitee.com/ly525/luban-h5.git)

## 快速体验

#### 一键脚本
```bash
git clone https://github.com/ly525/luban-h5 && cd luban-h5
# 安装依赖，构建前后端（安装依赖会耗时略长，请耐心等待）
./luban-h5.sh init

# 启动项目访问 http://localhost:1337 即可
./luban-h5.sh start

# ./luban-h5.sh stop
```

- 更多细节，请参照 [鲁班H5-在线文档](https://ly525.gitee.io/luban-h5/zh/) 的 [`快速开始`](https://ly525.gitee.io/luban-h5/zh/getting-started/quick-start.html) 章节，进行配置即可

- 如果遇到接口 403 问题，请参照 [`快速开始`](https://ly525.gitee.io/luban-h5/zh/getting-started/quick-start.html) 章节，搜索关键字：403 即可

### 🔗Links/相关链接
 | 源码   | 文档   | 教程     | 社区 |
| ------ | -------- | ------ | ------ |
| [GitHub](https://github.com/ly525/luban-h5) | [中文文档](https://ly525.gitee.io/luban-h5/zh/) | [视频-快速开始(哔哩哔哩)](https://space.bilibili.com/121039466/channel/detail?cid=94066)       | [中文社区/论坛](https://support.qq.com/product/93432)
| [Gitee (国内镜像)](https://gitee.com/ly525/luban-h5)  | [English Docs](https://ly525.github.io/luban-h5/en/getting-started/introduction.html)  |   自定义组件教程(WIP)    | [Gitter](https://gitter.im/luban-h5/community)    |
|  |  [README(En)](./README.en.md)    | [核心实现原理](https://juejin.im/post/5d6df27a6fb9a06b2d77eef9)  |      |


### 🔗生态
| 后端集成                                                                                           | 官方组件库                                                     | 支撑/辅助组件                                            | 自定义组件                                                             | RoadMap                                                    |
|------------------------------------------------------------------------------------------------|-----------------------------------------------------------|----------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------|
| [Strapi.js (官方后端API)](http://localhost:8081/luban-h5/zh/ecosystem/#%E9%B2%81%E7%8F%ADh5%E7%94%9F%E6%80%81%E5%BB%BA%E8%AE%BE)                                      | [轮播图](https://github.com/luban-h5-components/lbp-slide)   | 图片库                                                | [自定义组件开发脚手架](https://github.com/luban-h5/vue-cli-plugin-lbhc)     | [RoadMap/开发计划](https://github.com/ly525/luban-h5/projects) |
| [SpringBoot2-JPA](https://github.com/luban-h5/spring-boot-api-for-editor)                      | [普通按钮](https://github.com/luban-h5-components/lbc-button) | [文本对齐](https://github.com/luban-h5/lbs-text-align) | [自定义组件开发教程](https://github.com/luban-h5/vue-cli-plugin-lbhc/wiki) |                                                            |
| [SpringBoot2-Mybatis-plus](https://github.com/luban-h5/springboot2-mybatis-plus-api-for-luban) |                                          |                                                    | 视频教程(WIP)                                                         |                                                            |



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
> [在线访问地址](https://h5.luban-h5.com)

<img src="https://s2.ax1x.com/2019/10/11/u7WzUx.gif" style="margin: 10px;" width="60%" />


### 快速开始
请参照 [鲁班H5-在线文档](https://ly525.gitee.io/luban-h5/zh/) 的 `快速开始` 章节


### 交流群

|  微信群<推荐> | 微信公众号  |  钉钉群 |
|---|---|---|
| <img src="https://user-images.githubusercontent.com/12668546/66585418-5cce1e80-ebb9-11e9-91c0-56f658f09e27.png" width="200" /> <br />请备注：鲁班H5交流| <img src="https://user-images.githubusercontent.com/12668546/65471913-ab827580-dea3-11e9-919c-870c9605c60f.png" width="200" />  | <img src="https://user-images.githubusercontent.com/12668546/90198376-157d7380-de04-11ea-8fb6-b53d33050741.png" width="200" /> |


#### 技术栈（当前）
1. 前端：[Vue.js](https://vuejs.org/v2/guide/)
2. 后端：[Strapi](https://strapi.io/)
3. 存储：[Sqlite](https://www.sqlite.org/)

## 如何贡献
所有合理的改动、优化、修正，新的组件，或者文档的修正、更新 相关的提交都会被接受

## 社区与交流群
#### 论坛地址：[鲁班H5-社区](https://support.qq.com/products/93432/)
#### 交流群
| 钉钉群  | 微信公众号  |  微信 |
|---|---|---|
| <img src="https://user-images.githubusercontent.com/12668546/90198376-157d7380-de04-11ea-8fb6-b53d33050741.png" width="200" />| <img src="https://user-images.githubusercontent.com/12668546/65471913-ab827580-dea3-11e9-919c-870c9605c60f.png" width="200" />  | <img src="https://user-images.githubusercontent.com/12668546/66585418-5cce1e80-ebb9-11e9-91c0-56f658f09e27.png" width="200" /> <br />请备注：鲁班H5交流|

---

> 如果有问题，欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动
