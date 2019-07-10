简体中文 | [English](./README.en.md)

### 鲁班H5是什么？
鲁班H5是基于Vue2.0开发的，通过拖拽的形式，生成页面的工具，类似[易企秀](http://www.eqxiu.com/)、[百度 H5](https://h5.baidu.com) 等工具

### Screenshots
![image](https://user-images.githubusercontent.com/12668546/60982044-01965100-a36a-11e9-993d-d61e76186f3f.png)


### Features
1. 编辑器
    - [x] 参考线
    - [x] 吸附线、组件对齐
    - [x] 拖拽改变组件形状
    - [ ] 节点：复制、删除、编辑
    - [ ] 页面：新增、复制、删除
    - [x] 快速预览

2. 组件系统
    - [ ] 文字
    - [x] 普通按钮
    - [ ] 表单按钮
    - [ ] 表单输入框
    - [x] 普通图片
    - [ ] 背景图
    - [ ] 视频（Iframe形式）

3. 增强功能
    - [ ] 上传 PSD，一键转换为 H5
    - [ ] 图片库
    - [ ] 第三方无版权图片搜索

4. 数据统计
    - [ ] 表单数据统计

5. 其它
    - [ ] 在线预览
    - [ ] 二维码预览


### 技术栈（当前）
1. 前端：[Vue.js](https://vuejs.org/v2/guide/)
2. 后端：[Adonis.js](https://adonisjs.com)
3. 存储：[MongoDB](https://mongodb.com)


### 安装
> project：项目根目录

1. 前端
    1. 编辑器部分请参照 [`project/front-end/h5/README.md`](https://github.com/ly525/luban-h5/blob/dev/front-end/h5/README.md)


### 前端组件说明
1. `lbp-` 全称为 `lu-ban-plugin-`, 意思为 `鲁班H5的插件`，位置：`front-end/h5/src/components/plugins`