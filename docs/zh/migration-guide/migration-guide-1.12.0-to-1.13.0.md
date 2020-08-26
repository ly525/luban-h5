# 鲁班 H5 v.1.12.0 至 v.1.13.0 迁移指南

升级`鲁班H5`版本至 `v.1.13.0`.

主要修改请参见[v1.13.0 release log](https://github.com/ly525/luban-h5/releases/tag/v1.13.0)

### 背景介绍
因为涉及了数据库字段的改动，但比较简单：是将 works 表的 mode 列 重命名为 page_mode

原因是：mode 是一个无意义的词语，因此改为 page_mode 用来表明 H5 作品的页面的当前模式，是：

- 长页面(PAGE_MODE.LONG_PAGE)
- 翻页 H5(PAGE_MODE.SWIPPER_PAGE)

### 升级步骤
1. 请根据自己的数据库，选择更新方案

- MySQL
```sql
ALTER TABLE works RENAME COLUMN mode TO page_mode;
```

- Sqlite
```sql
# sqlite3 luban-h5/back-end/h5-api/.tmp/data.db
ALTER TABLE works RENAME COLUMN mode TO page_mode;
```

```bash
sqlite3 luban-h5/back-end/h5-api/.tmp/data.db
SQLite version 3.28.0 2019-04-15 14:49:49
Enter ".help" for usage hints.
sqlite> ALTER TABLE works RENAME COLUMN mode TO page_mode;
sqlite> .exit
```

2. 前端代码更新
```bash
# pull 最新代码
# 重新编译前端代码
./luban-h5 rebuild_fe
./luban-h5 restart
```

如果有疑问，提 [issue](https://github.com/ly525/luban-h5/issues) 即可
