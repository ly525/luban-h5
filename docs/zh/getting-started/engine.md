# 作品预览/渲染引擎
> 关于此部分有疑惑，请直接评论

## 基础概念
作品预览的基本原理参见 [luban-h5/back-end/h5-api/api/work/controllers/Work.js/previewOne](https://github.com/ly525/luban-h5/blob/bd486ce16fc24bfd7030fc51857a579776e12e68/back-end/h5-api/api/work/controllers/Work.js#L12)


```js
previewOne: async (ctx) => {
  const work = await strapi.services.work.findOne(ctx.params);
  return ctx.render('engine', { work });
},
```

---

<Vssue issueId="15" />