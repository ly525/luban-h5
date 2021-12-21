<p align="left">
<a href="https://github.com/ly525/luban-h5/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/ly525/luban-h5"></a>
</p>

[📖 Document](https://ly525.github.io/luban-h5/) | [📖简体中文](./README.md)

### What's LuBan-H5?
> LuBan-H5 is a mobile page builder based on Vue.js, which is similar with [Amolink](www.amolink.com) [eqx](http://www.eqxiu.com)(it's a chinese website, you may need to translate the page). It also supports parsing PSD file to HMTL5 Page

### Demo
> [Preview Website](https://h5.luban-h5.com)

<img src="https://s2.ax1x.com/2019/10/11/u7WzUx.gif" style="margin: 10px;" width="60%" />

### let's go through it real quick.
> in short

```shell
git clone https://github.com/ly525/luban-h5 && cd luban-h5
# install dependencies &&  build front-end && build back-end
./luban-h5.sh init

./luban-h5.sh start

# ./luban-h5.sh stop

# after the installation finished
# 1. visit ：http://localhost:1337/admin, create your admin account
# 1.2 config the api permissions, see more here：https://ly525.github.io/luban-h5/en/getting-started/quick-start.html#_2-something-important

# 2. front-end
# 2.1 visit https://localhost:1337 to get the front-end of luban-h5
```

## Links
- Documents
    * [Chinese online document](https://ly525.github.io/luban-h5/zh/)
    * [English](https://ly525.github.io/luban-h5/en/getting-started/introduction.html)

- Source Code
    * GitHub: https://GitHub.com/ly525/luban-h5
    * [Gitee(China Mirror)](https://Gitee.com/ly525/luban-h5)

- Community
    * [Gitter](https://gitter.im/luban-h5/community)
    * [吐个槽：For Chinese Users](https://support.qq.com/product/93432)


- Ecosystem
    * back-end integration
        * [Strapi.js(official Node.js backend API for luban-h5)](/luban-h5/tree/dev/back-end/h5-api)
        * [Spring Boot API Demo](https://github.com/luban-h5/Spring-Boot-API-for-editor)

    * Custom components
       * [Rapid development of custom component scaffolding](https://github.com/luban-h5/vue-cli-plugin-lbhc)

    *  official components library
        * [Slide](https://github.com/luban-h5-components/lbp-slide)
        * [Normal Button(different from form-button)](https://github.com/luban-h5-components/lbc-button)

    * Support Component/Auxiliary Component
        * Image Gallery: For Quick Selection of images from the gallery
        * [Text alignment-Repo(for Button text alignment)](https://github.com/luban-h5/lbs-text-align)


### Features
1. Editor
    - [x] Reference Line/GuideLine
    - [x] Adsorption Line
    - [x] Change plugin shape by drag-and-drop
    - [x] Edit Element (Canvas)
    - [x] Copy Element (Canvas)
    - [x] Delete Element (Canvas)
    - [x] Edit Page
    - [x] Copy Page
    - [x] Delete Page
    - [x] Quick Preview
    - [x] Undo、Redo

2. Plugin System

    - [x] Text
    - [x] Normal Button
    - [x] Form Button
    - [x] Form Field
    - [x] Picture
    - [x] Background Image
    - [x] Background Music
    - [x] Video (Iframe format)

3. enhanced function
    - [ ] parsing PSD file to HTML Page
    - [x] Photo Gallery
    - [ ] Third Party uncopyrighted Image Search


4. back-end API
    - [x] create work
    - [x] save work
    - [x] update work
    - [x] Form Statistics
    - [x] Online Preview
    - [x] QR Code Preview

---

### Installs
> proj: project root path
please refer to: [`Document/Quick Start`](https://ly525.github.io/luban-h5/en/getting-started/quick-start.html?language=en-us)


---
### More Explanation
#### Front-End Component Explanation
1. `lbp-`: `lu-ban-plugin-`, means `Luban H5 plugin`, location: `proj/front-end/h5/src/components/plugins`


#### Build With (current)
  1. Front end: Vue.js
  2. Back End: Strapi
  3. Storage: Sqlite


Read more here [Online English Document](https://ly525.github.io/luban-h5)