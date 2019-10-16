[📖中文在线文档](https://ly525.github.io/luban-h5/zh/) | [📖English README](./README.en.md) | [English Document](https://ly525.github.io/luban-h5/en/getting-started/introduction.html)

<h2 align="center">
 鲁班 H5
</h2>
<p align="center">
基于Vue开发，通过拖拽的形式，生成移动页面
</p>
<p align="center">
Mobile Page Builder&Generator with Drag&Drop
</p>

<p align="left">
<a href="https://github.com/ly525/luban-h5/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/ly525/luban-h5"></a>
<a href="https://gitter.im/luban-h5/community"><img alt="Gitter" src="https://img.shields.io/gitter/room/luban-h5/community"></a>
 
</p>

### 🔗Links/相关链接
1. [中文社区/论坛](https://support.qq.com/product/93432)
2. [📖中文在线文档](https://ly525.github.io/luban-h5/zh/) 
3. [📖English README](./README.en.md)
4. GitHub：https://github.com/ly525/luban-h5
5. Gitee (国内镜像)：https://gitee.com/ly525/luban-h5

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
