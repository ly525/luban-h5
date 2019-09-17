## The api for Luban-H5 powered by [Strapi](https://github.com/strapi/strapi/)
#!zh: 鲁班H5的后端接口，由 [Strapi](https://github.com/strapi/strapi/) 强力驱动

## Project setup
#!zh: 项目启动

```bash
yarn

yarn dev

# #!en: default database is sqlite3(h5-api/.tmp/data.db)
# #!zh: 默认数据库是 sqlite3，位置在 h5-api/.tmp/data.db
# visit http://locahost:1337/admin
```

## Warning 
#!zh: 注意事项 

1. if you dev locally, if the api give you 403 Forbidden, please select all the options in [Roles And Permission] -> [Public] - [Permissions]

#!zh:  本地开发，如果后端接口报错 403 Forbidden，请 编辑 下图的 [Roles And Permission] -> [Public] - [Permissions] 里面打开接口的访问权限接口

![image](https://user-images.githubusercontent.com/12668546/64065999-658d1580-cc47-11e9-9760-e0ad503ec2e7.png)

![image](https://user-images.githubusercontent.com/12668546/64066025-c288cb80-cc47-11e9-9aaa-a93d79313ebe.png)

## Features(zh)
  - [x] 创建、保存、更新作品
  - [x] 在线预览
  - [x] 二维码预览
  - [x] 表单数据收集
  - [x] 表单数据展示

## Features(en)
  - [x] create work
  - [x] save work
  - [x] update work
  - [x] Online Preview
  - [x] QR Code Preview
  - [x] Form Statistics
