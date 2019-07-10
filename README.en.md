English | [简体中文](./README.md)

### What's LuBan-H5?
> LuBan-H5 is a mobile page builder based on Vue.js, which is similar with http://www.eqxiu.com、[Baidu-H5](https://h5.bce.baidu.com/). It also supports parsing PSD file to HMTL5 Page
###Features 功能
1. Editor
    - [x] Reference Line/GuideLine
    - [x] Adsorption Line
    - [x] Change plugin shape by drag-and-drop
    - [ ] Nodes: copy, delete, edit
    - [ ] Page: add, copy, delete
    - [x] Preview

2. Plugin System

    - [ ] Text
    - [x] Normal Button
    - [ ] Form Button
    - [ ] Form Field
    - [x] Picture
    - [ ] Background Image
    - [ ] Video (Iframe format)

3. enhanced function
    - [ ] parsing PSD file to HTML Page
    - [ ] Photo Gallery
    - [ ] Third Party uncopyrighted Image Search

4. Data Statistics
    - [ ] Form Statistics

5. Others
    - [ ] Online preview
    - [ ] QR Code Preview

### Technology Stack (current)
  1. Front end: Vue.js
  2. Back End: Adonis.js
  3. Storage: MongoDB

### Installs
> proj: project root path

  1. Front End
      Editor: please refer to: [`project/front-end/h5/README.md`](https://github.com/ly525/luban-h5/blob/dev/front-end/h5/README.md)

### Front-End Component Explanation
1. `lbp-`: `lu-ban-plugin-`, means `Luban H5 plugin`, location: `proj/front-end/h5/src/components/plugins`