# 原理篇:多属性自定义编辑器
> 自定义组件/插件/Plugin 原理概览

## 举例 [鲁班H5 轮播图组件](https://github.com/luban-h5-components/lbp-slide)
- 这个组件本质上就是一个 vue 组件
- 其本质是对 [Vant组件库的轮播组件](https://youzan.github.io/vant/#/zh-CN/swipe) 的简单封装
- [核心代码](https://github.com/luban-h5-components/lbp-slide/blob/master/src/component/entry.vue)
  - 可以看出来，核心代码其实非常简单，和大家平时写轮播图，或者调用第三方组件库的轮播图的方式几乎没有区别，基本上是配置一些 props，比如轮播间隔时间、轮播图列表等
  - 接下来我们来讲一下不同的地方在哪里🧐

## 自定义组件和常规组件的不同之处(影响多个属性)
以[如下这段代码](https://github.com/luban-h5-components/lbp-slide/blob/master/src/component/entry.vue#L57-L67)为例，相信写 `vue` 或者 `react` 的同学，应该会比较熟悉

配置 轮播组件的 items，也就是轮播的选项信息
```js
props: {
  items: {
    type: Array,
    default: () => [
      { value: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
      { value: 'https://img.yzcdn.cn/vant/apple-2.jpg' }
    ],
    // 主要区别应该是这里
    editor: {
      custom: true
    }
  }
}
```

- 这里和我们平时写的组件是有些区别的，我们添加了这些信息
```js
editor: {
  custom: true
}
```
- 其中`custom: true` 表示在编辑器的右侧面板，采用`自定义属性编辑器`来配置`自定义组件`的相关属性

- 在这里可以理解为：采用`自定义属性编辑器`来配置`轮播组件`的`items`属性

- 那么，它和上面的 按钮组件的 `color.editor` 有什么区别呢？为何这里不采用一个第三方组件呢？

- 答案：因为有时候，有些操作会影响多个属性值（联动）

- 以轮播图组件的实际场景为例，我们来解释下什么叫：`有些操作会影响多个属性值`。毕竟这句话猛的一听，有点像教科书，晦涩难懂，咱还是说说实际业务场景吧

> 有图有真相：
> ![image](https://user-images.githubusercontent.com/12668546/73135735-b7b05680-4080-11ea-9d54-02760c9a13d3.png)

- 按照图中的说法，如果我们点击了【减号】按钮，其实就会影响到两个属性：`activeIndex` 和 `items`，因此如果写了一个和上面的颜色选择器一样的组件，放在 activeIndex 或 items 任意一方中都是不太合适的，因为这个算是二者共有的；
    - 轮播图 props 主要代码如下：[代码链接](https://github.com/luban-h5-components/lbp-slide/blob/master/src/component/entry.vue#L50-L67)：

    ```js
    props: {
      activeIndex: {
        type: Number,
        default: 0,
        editor: {
          custom: true
        }
      },
      items: {
        type: Array,
        default: () => [
          { value: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
          { value: 'https://img.yzcdn.cn/vant/apple-2.jpg' }
        ],
        editor: {
          custom: true
        }
      }
    }
    ```

- 如何解决呢：
  - 还记得我们上面讲过的，将按钮 放置到 中间画布上的操作吗？

    ***鲁班会自动遍历`按钮组件` 的 `props`，构造一个包含了组件基本属性和其默认值的配置对象：`pluginProps`***

  - 我们可以写一个组件，比如叫 `slideEditor` (轮播编辑器，叫啥随你，最好有相关性，清晰易懂即可，最好加注释)
  - 我们要解决的问题是，点击一个按钮，会修改多个属性的值，多个属性的值和其值存在哪里呢？其实就在 `pluginProps` 中
  - 我们把 `pluginProps` 作为属性传入到 `slideEditor`(也就说将轮播图组件的所有 props和其值 都传入到 slideEditor 中)，这样就可以在 slideEditor 中更新这个 pluginProps 了，换句话说，所有的 props和值都给你了，你可以改多个 props 的值了
  - show me the code，让我们看下 slideEditor 是如何实现的吧，主要代码如下：[完整代码链接](https://github.com/luban-h5-components/lbp-slide/blob/master/src/component/editor.vue)
  ```vue
    <!--
      轮播组件属性自定义编辑器（增强编辑器）
      文档：https://github.com/luban-h5/vue-cli-plugin-lbhc/wiki
    -->
    <template>
      <div>
        <a-pagination
          :current="current"
          @change="handleSelectPage"
          size="small"
          :total="innerItems.length"
          :defaultPageSize="1"
          :itemRender="itemRender"
        />
        <lbs-image-gallery
          style="margin: 16px 0"
          :value="currentItem.value"
          @change="handleSelectImage"
        />
      </div>
    </template>

    <script>
    export default {
      props: {
        /**
         * 通过 new Vue.component('plugin-name').$optioins.props 收集组件的属性
         * 作为 Object，传递给 props editor，从而从过属性自定义编辑器 来更新属性值
         */
        pluginProps: {
          type: Object,
          default: () => ({
            items: [],
            activeIndex: 0
          })
        }
      },
      methods: {
        itemRender (current, type, originalElement) {
          // 减号按钮
          if (type === 'prev') {
            return <a-button style={{ marginRight: '8px' }} size="small" icon="minus" onClick={() => this.minus(current)} disabled={this.innerItems.length === 1}></a-button>
          } else if (type === 'next') {
            return <a-button style={{ marginLeft: '8px' }} size="small" icon="plus" onClick={this.add}></a-button>
          }
          return originalElement
        },
        // 点击减号的 callback：items.splice 和 activeIndex--
        minus (index) {
          if (this.innerItems.length === 1) return
          this.pluginProps.items.splice(index, 1)
          this.pluginProps.activeIndex = Math.max(index - 1, 0)
        }
      }
    }
    </script>
  ```

大概的原理到这里就差不多，这也是鲁班H5的自定义组件和其编辑器的核心原理了

下一章来讲讲，如何利用鲁班H5 官网提供的`自定义组件-脚手架`来`快速开发`自定义组件
