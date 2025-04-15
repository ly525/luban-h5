---
home: true
actionText: Get Started →
actionLink: /en/getting-started/introduction
features:
  - title: Form Collection
    details: Collect and organize information.Get answers from users fast.
  - title: Easy to set up
    details: Integrating dynamic effects, music, video and images, users can easily achieve Html5
  - title: PSD to HTML5
    details: Upload PSD, and parse it to HTML5, just seconds
footer: GPL 3.0 Licensed | Copyright © 2019-present
---


<p align="left">
<a href="https://github.com/ly525/luban-h5/releases"><img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/ly525/luban-h5"></a>
</p>

### What's LuBan-H5?
> LuBan-H5 is a mobile page builder based on Vue.js, which is similar with [Amolink](www.amolink.com) or [eqx](http://www.eqxiu.com)(it's a chinese website, you may need to translate the page). It also supports parsing PSD file to HMTL5 Page

<img src="https://s2.ax1x.com/2019/10/11/u7WzUx.gif" style="margin: 10px;" width="80%" />

# Quick Start
## Option 1
- if you are familiar with `Node`, `Yarn`(and already installed), please follow the commands to start quickly:

```bash
git clone https://github.com/ly525/luban-h5
cd luban-h5 # project root path

# back-end
cd back-end/h5-api && yarn && yarn dev

# front-end
cd front-end/h5 && yarn && yarn build:engine && yarn dev


!#en: default database is sqlite3(db location: h5-api/.tmp/data.db)

# visit http://localhost:1337/admin to config the api permissions

# read more here: https://ly525.github.io/luban-h5/en/getting-started/quick-start.html#setup-backend
```

## Option 2

```shell
docker pull ubuntu
docker run -it -p 1234:80 -p 1235:1337  -v `pwd`:/app ubuntu
apt update && apt install -y wget git
wget -qO- https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh | bash

# after the installation finished
# 1. visit ：http://localhost:1235/admin, add your admin account
# 1.2 config the api permissions, see more here：https://ly525.github.io/luban-h5/en/getting-started/quick-start.html#_2-something-important

# 2. front-end
# 2.1 visit https://localhost:1235 to get the front-end of luban-h5
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

Read more here [Online English Document](https://ly525.github.io/luban-h5)

## Community
1. [Gitter](https://gitter.im/luban-h5/community)
2. [Github Issues](https://github.com/ly525/blog/issues/new)
