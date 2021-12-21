# 原理篇:单属性自定义编辑器
> 自定义组件/插件/Plugin 原理概览

通过`自定义属性编辑器`来配置组件的某些属性的`复杂编辑需求`

举个例子：图片的 imgSrc 属性，采用自定义编辑器的方法如下，[图片演示](https://user-images.githubusercontent.com/12668546/69001396-6a916500-0918-11ea-8f39-5e27a688d2fe.png)

```js
props: {
  imgSrc: {
    type: String,
    defualt: '',
    editor: {
      custom: true
      // 如果写了 custom: true，则会采用 editor.vue 或者 editor.js 来配置组件的相关属性
      // 自定义组件的加载目前在 mini-editor/panel/props.js 的 loadCustomEditorForPlugin 方法中加载并注册
      // 这样，就可以通过自定义属性编辑器来配置组件的某些复杂属性了
      // 图片演示：https://user-images.githubusercontent.com/12668546/69001396-6a916500-0918-11ea-8f39-5e27a688d2fe.png
    }
  }
}
```

- 1. 从上面来看，其实我们自定义的这个图片选择器，只影响到了 imgSrc 这一个属性
- 2. 其实可以把它抽象出来作为一个组件(比如叫做 `luban-support-image-gallery`(鲁班辅助支撑组件-图片库))
- 3. 发布到 npm 上，作为全局组件引入即可

简单改造下 imgSrc 的属性配置：
```js
props: {
  imgSrc: {
    type: String,
    defualt: '',
    editor: {
      type: 'luban-support-image-gallery'
    }
  }
}
```
