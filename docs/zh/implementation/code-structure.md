# 代码目录说明

## 前端目录
推荐先看 router.js, 再从 front-end/h5/src/views/Editor.vue 开始了解，这里是编辑器的入口

```JavaScript
front-end/h5/src                # 前端源码目录：包含编辑器、作品管理、表单统计等部分
├── assets
│   ├── 403.svg
│   ├── 404.svg
│   ├── 500.svg
│   ├── logo.png
│   ├── placeholder-for-work.svg
│   └── unauth-page-illustration.svg
├── components
│   ├── core                    # 核心部分
│   │   ├── editor              # 编辑器模块
│   │   │   ├── canvas          # 画布：编辑模式 + 快速预览模式
│   │   │   │   ├── edit.js     # 编辑模式对应画布
│   │   │   │   └── preview.js  # 快速预览模式对应的画布
│   │   │   ├── edit-panel      # 编辑器右侧的编辑、配置面板
│   │   │   │   ├── action.js   #
│   │   │   │   ├── props.js    # 组件属性编辑面板
│   │   │   │   └── script.js   # 自定义脚本
│   │   │   ├── header
│   │   │   ├── modals
│   │   │   │   └── preview.vue # 预览弹窗
│   │   │   ├── shortcuts-panel # 插件列表对应的快捷按钮
│   │   │   │   ├── index.js
│   │   │   │   └── shortcut-button.js
│   │   │   └── index.js
│   │   ├── models              # 编辑器中的各种 model
│   │   │   ├── element.js      # 插件在画布中对应的元素
│   │   │   ├── page.js         # 页面
│   │   │   └── work.js         # 整个H5作品
│   │   ├── styles
│   │   │   └── index.scss
│   │   └── support             # 辅助支持部分
│   │       └── shape.js        # 拖拽改变元素形状
│   ├── plugins                 # 插件列表：按钮、表单(提交按钮+输入框)、文字、图片
│   │   ├── lbp-button.js
│   │   ├── lbp-form-button.js
│   │   ├── lbp-form-input.js
│   │   ├── lbp-picture-placeholder.jpg
│   │   ├── lbp-picture.js
│   │   └── lbp-text.js
│   └── HelloWorld.vue
├── constants                  # 常量配置
│   └── api.js                 # 后端 API 接口地址等配置
├── mixins                     # 加载插件
│   └── load-plugins.js
├── pages
│   ├── editor                 # 核心编辑器入口
│   ├── home
│   └── index
├── store
│   ├── modules
│   │   ├── editor.js
│   │   ├── element.js
│   │   ├── loading.js
│   │   ├── page.js
│   │   ├── user.js
│   │   ├── visible.js
│   │   └── work.js
│   ├── plugins               # vuex 插件
│   │   └── undo-redo         # 撤销、重做
│   │       ├── History.js
│   │       └── index.js
│   └── index.js
├── utils
│   ├── element.js
│   ├── http.js
│   └── strapi.js
├── views
│   ├── work-manager
│   │   ├── form-stat
│   │   │   ├── column.js
│   │   │   ├── detail.vue
│   │   │   └── index.vue
│   │   ├── index.vue
│   │   └── list.vue
│   ├── About.vue
│   ├── Editor.vue           # 编辑器入口，对核心编辑器做了一层包装，在这里加载插件列表
│   └── Home.vue
├── App.vue
├── engine-entry.js          # 用于在手机端预览、查看H5作品的入口
├── main.js                  # 编辑器 + work-manager(作品管理页面) 的入口
├── registerServiceWorker.js
└── router.js                # 页面路由
```

## 组件说明
> `lbp-` 全称为 `lu-ban-plugin:` `鲁班H5的插件`，位置 `front-end/h5/src/components/plugins`


---

> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="9" />