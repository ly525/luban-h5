# 快速开始
> 以下内容与 [vue-cli-plugin-lbhc README](https://github.com/luban-h5/vue-cli-plugin-lbhc) 相同

> vue-cli-plugin-lbhc 全称为：vue-cli-plugin-luban-h5-component

## 安装

### 使用preset自动安装插件
```
vue create --preset luban-h5/vue-cli-plugin-lbhc my-luban-component-demo
```


### 目录结构

```bash
mini-editor 模拟鲁班H5的核心编辑器功能
component   你要编写组件的目录
  index.js  组件入口
  editor.js 组件的编辑面板配置

```


### 开发流程

```bash
vue create --preset luban-h5/vue-cli-plugin-lbhc lbc-demo
cd lbc-demo
yarn serve

# 构建、发布个人组件
yarn build
npm login
npm publish


# 构建发布 scope 组件
yarn build
npm login
npm publish --access publish
```
