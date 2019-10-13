# Code Structure

## Front End
It is recommended to look at `router.js` first, and then start with `front-end/h5/src/views/Editor.vue`. Here is the entrance to the Editor.


```JavaScript
front-end/h5/src                # source code for front end, includes: editor, work-manager, form-stat etc.
├── assets
│   ├── 403.svg
│   ├── 404.svg
│   ├── 500.svg
│   ├── logo.png
│   ├── placeholder-for-work.svg
│   └── unauth-page-illustration.svg
├── components
│   ├── core                    # core
│   │   ├── editor              # editor module
│   │   │   ├── canvas          # cavas：edit model + preview mode
│   │   │   │   ├── edit.js     # canvas for edit mode
│   │   │   │   └── preview.js  # canvas for preview mode
│   │   │   ├── edit-panel      # config panel for actions, plugin props, animation, actions etc.
│   │   │   │   ├── action.js   #
│   │   │   │   ├── props.js    #
│   │   │   │   └── script.js   #
│   │   │   ├── header
│   │   │   ├── modals
│   │   │   │   └── preview.vue # preivew modal
│   │   │   ├── shortcuts-panel # the shortcut buttons for plugins
│   │   │   │   ├── index.js
│   │   │   │   └── shortcut-button.js
│   │   │   └── index.js
│   │   ├── models              #
│   │   │   ├── element.js      #
│   │   │   ├── page.js         #
│   │   │   └── work.js         #
│   │   ├── styles
│   │   │   └── index.scss
│   │   └── support             #
│   │       └── shape.js        # drag&drop to change the shape of an element
│   ├── plugins                 # plugin list: button, form (submit button + input box), text, pictures etc.
│   │   ├── lbp-button.js
│   │   ├── lbp-form-button.js
│   │   ├── lbp-form-input.js
│   │   ├── lbp-picture-placeholder.jpg
│   │   ├── lbp-picture.js
│   │   └── lbp-text.js
│   └── HelloWorld.vue
├── constants                  #
│   └── api.js                 #
├── mixins                     #
│   └── load-plugins.js        # load plugins
├── pages
│   ├── editor                 # entry for editor
│   ├── home
│   └── index
├── store
│   ├── modules
│   │   ├── editor.js
│   │   ├── element.js
│   │   ├── loading.js
│   │   ├── page.js
│   │   ├── user.js
│   │   ├── visible.js
│   │   └── work.js
│   ├── plugins               # vuex plugins
│   │   └── undo-redo         #
│   │       ├── History.js
│   │       └── index.js
│   └── index.js
├── utils
│   ├── element.js
│   ├── http.js
│   └── strapi.js
├── views
│   ├── work-manager
│   │   ├── form-stat
│   │   │   ├── column.js
│   │   │   ├── detail.vue
│   │   │   └── index.vue
│   │   ├── index.vue
│   │   └── list.vue
│   ├── About.vue
│   ├── Editor.vue           # a wrapper around the core editor, where the list of plug-ins is loaded
│   └── Home.vue
├── App.vue
├── engine-entry.js          # preview engine for previewing and viewing mobie page on your phone
├── main.js                  # entry for editor + work-manager
├── registerServiceWorker.js
└── router.js                #
```

---

<Vssue issueId="9" />
Editor + work-manager (work management page) entry

