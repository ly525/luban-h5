# Feedback/意见反馈

## 完善文档

- [ ] 完善构建预览引擎文档

弹框预览时，engine.js 缺失，导致预览失败。
需要说明如何构建 engine.js，以及解释 engine.js 的作用

  1. 在 front-end/h5 目录下，运行：`node build/engine.webpack.js` (这个是用来生成预览引擎的东西)
  2. 构建完成之后,看下 后端的`h5-api/public` 里面会多一个文件夹 `engine-assets`
  3. 打开的预览窗口（preview.vue）,里面的小手机那个div 对应的其实是一个 iframe，可以看看对应的源码
  4. 也就是说，这个预览其实依赖后端的渲染引擎 比如 ejs 或者 jade 这种模板引擎，所以 `build/engine.webpack.js` 的 output dir 是在`back-end/h5-api/public`中的

- [ ] 在 readme 中补充后端API的使用说明


## 需求收集

- [ ] 二级子域名
- [ ] 小程序
- [ ] 多浏览器适配
- [ ] 私有部署
- [ ] docker 部署
- [ ] pv 统计


<Vssue issueId="8" />