# 概览
一个开源项目的发展不单单靠这个项目本身，更多还取决于周边的生态建设。比如 jQuery 有众多插件，Vue 有 Awesome-Vue、React 有 Awesome-React，其强大的生态系统降低了大家上手使用的成本，避免了重复造轮子。

鲁班H5也希望向这些优秀的项目学习，构建自己的社区生态，让开发者能够借助社区的力量，更好的完成自己的需求。

## 鲁班H5生态建设
> WIP: working in progress/开发中

### 前端
1. 更多的营销组件(抽奖、滚动信息、地图等等)
    - 当鲁班提供的组件无法满足某些定制化的业务需求的时候，开发者可能需要开发适合实际业务的组件
    - 我们提供了[组件开发脚手架](https://github.com/luban-h5/vue-cli-plugin-lbhc)，用来辅助开发者进行快速开发组件。开发完成之后，可以发布到 npm 上，在鲁班后台做一些简单的配置，就可以使用自定义组件了
    - 开发自定义组件，请参见 [***🔌插件/自定义组件开发*** ](/zh/plugin-development/)章节

2. [WIP]注入 JS 脚本，让页面拥有有和后端交互的能力。能做到：
    - 从后端请求数据
    - 根据数据渲染页面
    - 提交数据
    - 打点统计等等

    更多讨论，参见[鲁班H5-Wiki [辅助篇] 自定义脚本](https://github.com/ly525/luban-h5/wiki/%5B%E8%BE%85%E5%8A%A9%E7%AF%87%5D-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%84%9A%E6%9C%AC)。拥有了执行脚本的能力，就可以实现如下的H5页面了：
    1. 千人千面
    2. 支付宝年度账单
    3. 网易云音乐年终总结


### 后端
目前鲁班H5的后端是基于 Node.js 写的，社区的很多小伙伴反馈，希望能够提供 Spring Boot 或者 PHP 等其它语言驱动的后端API。因为精力有限，我们提供了如下的解决方案，来尝试解决这个需求：
1. 提供[基于 Swagger UI 的后端API 文档](https://h5.luban-h5.com/documentation/)，小伙伴只要参照参照 API 文档，使用 Spring Boot 或者 其它语言实现相同的API即可
![image](https://user-images.githubusercontent.com/12668546/73250033-04b33a80-41f1-11ea-9688-96fe03dccbbe.png)

2. 社区有小伙伴贡献了基于 Spring Boot 的API项目，如下，大家可以根据自己的需求，跟进这两个项目，非常欢迎提 PR 或 相关 issue：
    - [springboot2-jpa-api-for-luban](https://github.com/luban-h5/springboot2-jpa-api-for-luban) ![GitHub stars](https://img.shields.io/github/stars/luban-h5/springboot2-jpa-api-for-luban.svg?style=social&label=Star&maxAge=2592000) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
    - [springboot2-mybatis-plus-api-for-luban](https://github.com/luban-h5/springboot2-mybatis-plus-api-for-luban) ![GitHub stars](https://img.shields.io/github/stars/luban-h5/springboot2-mybatis-plus-api-for-luban.svg?style=social&label=Star&maxAge=2592000) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

更多内容，请阅读 [LubanH5-Wiki](https://github.com/ly525/luban-h5/wiki)