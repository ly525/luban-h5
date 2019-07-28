English | [简体中文](./README.md)

### What's LuBan-H5?
> LuBan-H5 is a mobile page builder based on Vue.js, which is similar with http://www.eqxiu.com、[Baidu-H5](https://h5.bce.baidu.com/). It also supports parsing PSD file to HMTL5 Page

### Screenshots
![image](https://user-images.githubusercontent.com/12668546/61186568-974b1c80-a699-11e9-831b-a87a506699b9.png)


###Features 功能
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
    - [ ] Form Button
    - [ ] Form Field
    - [x] Picture
    - [ ] Background Image
    - [ ] Video (Iframe format)

3. enhanced function
    - [ ] parsing PSD file to HTML Page
    - [ ] Photo Gallery
    - [ ] Third Party uncopyrighted Image Search


4. back-end API
    - [x] create work
    - [x] save work
    - [x] update work
    - [ ] Form Statistics
    - [x] Online Preview
    - [x] QR Code Preview

---

### Installs
> proj: project root path

  1. Front End
      Editor: please refer to: [`project/front-end/h5/README.md`](https://github.com/ly525/luban-h5/blob/dev/front-end/h5/README.md)


---
### More Explanation
#### Front-End Component Explanation
1. `lbp-`: `lu-ban-plugin-`, means `Luban H5 plugin`, location: `proj/front-end/h5/src/components/plugins`


#### Technology Stack (current)
  1. Front end: Vue.js
  2. Back End: Strapi
  3. Storage: Sqlite