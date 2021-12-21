# 原理篇:简单属性编辑器
> 自定义组件/插件/Plugin 原理概览

## [鲁班H5 按钮组件](https://github.com/luban-h5-components/lbc-button)
- 这个组件本质上就是一个 vue 组件
- [核心代码](https://github.com/luban-h5-components/lbc-button/blob/master/src/component/entry.js)
  - 可以看出来，核心代码其实非常简单，和大家平时写按钮组件差不多，基本上是配置一些 props，比如颜色、字体、内容、背景色、前景色、border 等
  - 以 color 为例：
  ![image](https://user-images.githubusercontent.com/12668546/73135438-f8a66c00-407c-11ea-9f7c-1b110ea3b2b3.png)

    ```js
    props: {
      color: {
        type: String,
        // 注意，根据 MDN 文档，颜色选择器的 value 只能是：# + 6个16进制字符串
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#Value
        // The value of an <input> element of type color is always a DOMString which contains a 7-character string specifying an RGB color in hexadecimal format.
        default: '#000000',
        editor: {
          type: 'el-color-picker',
          label: '文字颜色',
          // !#zh 为编辑组件指定 prop
          prop: {
            size: 'mini',
            showAlpha: true
          },
          require: true
        }
      },
    }
    ```
      - 可以看到相对于平时我们写的 Vue 或者 React 组件，这里的 color 的 prop 多了一个 key: `editor`
      - 这个 `color.editor` 就是 颜色的`属性编辑器`了，因为鲁班默认集成了 element-ui 的颜色选择器组件，因此我们可以直接使用 `'el-color-picker'` 来作为颜色属性的自定义编辑器
      - 当然，鲁班也集成了 ant-design-vue 的全部组件，但因为 ant-design-vue 的颜色选择器目前功能上没有 element-ui 的颜色选择器强大（不支持透明度），因此我们选择了 element-ui 的颜色选择器


  - 在把`按钮` 从左侧`拖拽放置`到 `编辑器`中间的画布上的时候，鲁班会自动执行如下代码：
    - 遍历`按钮组件`的`props`
    - 构造 pluginProps 对象，作为画布中按钮元素的描述信息（也是数据库中存储的信息）
        ```js
        // init prop of plugin
        getDefaultPluginProps (props) {
          const pluginProps = {
            uuid: this.uuid // uuid 用于在组件树中定位组件
          }
          Object.keys(props).forEach(key => {
            const defaultValue = props[key].default
            pluginProps[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
          })
          return pluginProps
        }
        ```

    - 得到的结果大致如下，也就代表着，按钮在画布上的颜色、文字、边框、对齐、字体等信息如下
      ```js
      pluginProps = {
        "uuid": 1580038843434,
        "text": "按钮",
        "vertical": false,
        "backgroundColor": "rgba(255, 255, 255, 0.2)",
        "color": "#000000",
        "fontSize": 14,
        "lineHeight": 1,
        "borderWidth": 0,
        "borderRadius": 0,
        "borderColor": "#ced4da",
        "textAlign": "center"
      }
      ```

## 简单属性编辑器小结
如果组件的某些属性比较简单，比如文本、数字，则可以使用 [ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn/) 组件来配置组件的属性

举个例子：图片的 imgSrc 配置，[图片演示](https://user-images.githubusercontent.com/12668546/69001390-42096b00-0918-11ea-85b4-0ec868e44769.png)

```js
props: {
  imgSrc: {
    type: String,
    defualt: '',
    editor: {
      type: 'a-input'
      // 调用 ant-design-vue 的 input(输入框) 组件来配置 imgSrc，直接复制粘贴图片的链接即可
      // 图片演示：https://user-images.githubusercontent.com/12668546/69001390-42096b00-0918-11ea-85b4-0ec868e44769.png

      // 这样比较简单，但是有时候，用户可能希望编辑图片的时候，可以自己上传 或 从图片库中选择图片
      // 图片演示：https://user-images.githubusercontent.com/12668546/69001396-6a916500-0918-11ea-8f39-5e27a688d2fe.png
      // 这时候，简单的 input(输入框) 就无法满足需求了，这时候给组件属性配置自定义编辑器就有了用武之地了，具体请往下看。
    }
  }
}
```
