简体中文 | [English](./README.en.md)

目录
- [鲁班H5是什么？](#%E9%B2%81%E7%8F%ADh5%E6%98%AF%E4%BB%80%E4%B9%88)
- [Screenshots](#screenshots)
- [Features](#features)
- [安装](#%E5%AE%89%E8%A3%85)
- [更多说明](#%E6%9B%B4%E5%A4%9A%E8%AF%B4%E6%98%8E)
  * [前端组件说明](#%E5%89%8D%E7%AB%AF%E7%BB%84%E4%BB%B6%E8%AF%B4%E6%98%8E)
  * [技术栈（当前）](#%E6%8A%80%E6%9C%AF%E6%A0%88%E5%BD%93%E5%89%8D)
- [👨🏻‍💻👩🏻‍💻交流群](#%E4%BA%A4%E6%B5%81%E7%BE%A4)

### 鲁班H5是什么？
鲁班H5是基于Vue2.0开发的，通过拖拽的形式，生成页面的工具，类似[易企秀](http://www.eqxiu.com/)、[百度 H5](https://h5.baidu.com) 等工具


### Screenshots
> [在线访问地址](https://ly525.github.io/luban-h5)

![image](https://user-images.githubusercontent.com/12668546/61186568-974b1c80-a699-11e9-831b-a87a506699b9.png)



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
    - [ ] 背景图
    - [ ] 视频（Iframe形式）

3. 增强功能
    - [ ] 上传 PSD，一键转换为 H5(已经调研，可以实现)
    - [ ] 图片库
    - [ ] 第三方无版权图片搜索
    - [ ] 自定义脚本(已经调研，可以实现)

4. 后端 API
    - [x] 创建、保存、更新作品
    - [x] 表单数据收集
    - [x] 表单数据展示
    - [x] 在线预览
    - [x] 二维码预览

---

### 安装
> 说明：project：项目根目录

1. 前端
    1. 编辑器部分请参照 [`project/front-end/h5/README.md`](https://github.com/ly525/luban-h5/blob/dev/front-end/h5/README.md)

2. 后端
     1. 后端 API 部分请参照 [`project/back-end/h5-api/README.md`](https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/README.md)


### 更多说明
#### 前端组件说明
1. `lbp-` 全称为 `lu-ban-plugin-`, 意思为 `鲁班H5的插件`，位置：`front-end/h5/src/components/plugins`


#### 技术栈（当前）
1. 前端：[Vue.js](https://vuejs.org/v2/guide/)
2. 后端：[Strapi](https://strapi.io/)
3. 存储：[Sqlite](https://mongodb.com)

---

### 交流群
钉钉讨论组（推荐） 和 QQ讨论组 (QQ 群号：251936377)
> #!en: Scan the DingTalk QR code using [Dingtalk App](https://www.dingtalk.com) or Scan the QQ QR code using [QQ App](https://im.qq.com) to join in discussion group

> For users in other languages, please keep using Github issue tracker. 🤟

<img src="https://user-images.githubusercontent.com/12668546/62009529-d184e580-b192-11e9-93ba-e23c1fb5c72a.png" width="650px">
