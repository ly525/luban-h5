# 脚手架-命令行参数说明

## 命令参数说明
1. `组件的名称(发布到npm)`：***输入组件名称***
   * 默认为 `test`，这个名字最后会作为：component name
   * 将在luban-h5的编辑器中，通过 `yarn add component-name` 的形式引入

2. `icon`: ***输入icon***
  > ![image](https://user-images.githubusercontent.com/12668546/69070298-daac0200-0a62-11ea-9543-9199f6040545.png)


  * 访问 [Font Awesome 4.7 版本](https://fontawesome.com/v4.7.0/icons/)

  * 按照下图的方法，选择一个 icon, 在命令行对话中，输入即可
  > ![image](https://user-images.githubusercontent.com/12668546/69069617-c3204980-0a61-11ea-8239-7f7bf660297d.png)


  ```js
  export default {
    // 在 https://fontawesome.com/v4.7.0/icons/ 中寻找对应的 icon，填入 icon 字段即可
    icon: 'address-book',
    name: 'luban-h5-address',
  }
  ```

3. `是否有命名空间(@scope)`：***Yes or No***
   * 作为组织或者企业开发组件，可以选择 `Yes`，在下一步，填写 `npm scope`

4. `scope(命名空间<理解为企业/组织名称>)`: ***输入scope名称***
   * 将企业/组织的组件放在 `@组织名` 下, 便于管理
   * 举例1：
       * LubanH5 的官方组件库，都放在了`@luban-h5`这个 scope 下。
       * 以按钮组件为例，通过 `yarn add @luban-h5/lbc-button`，即可引入官方按钮组件了
       * 用户一看到 `@luban-h5` 这个，就知道是由 LubanH5 官方提供的组件库
   * 举例2：
       * 你的企业/组织名称是 `abc`，你在开发 `upload` 上传组件，那么就可以选择：

       ```bash
       组件的名称(发布到npm) ：upload
       是否有命名空间(@scope)：Yes
       scope：abc

       通过 `npm publish --access public` 发布到 npm
       通过`npm install @abc/upload` 或 `yarn add @abc/uplaod`， 即可引入到`鲁班编辑器`中作为`自定义组件`使用
       ```


## 相关概念
[npm-scope 官网文档](https://docs.npmjs.com/misc/scope)