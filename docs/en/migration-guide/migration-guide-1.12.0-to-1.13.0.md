# Migration guide from v.1.12.0 to v.1.13.0
Upgrading your Luban-H5 application to `v.1.13.0`.

Here are the minor changes:
remame works table column `mode` to `page_mode`


To upgrade a project to the `v.1.13.0` version of Luban-H5 follow the instructions below.

## Steps
1. choose database and exec the sql
- MySQL

  ```sql
  ALTER TABLE works RENAME COLUMN mode TO page_mode;
  ```

- sqlite
  ```sql
  # sqlite3 luban-h5/back-end/h5-api/.tmp/data.db
  ALTER TABLE works RENAME COLUMN mode TO page_mode;
  ```

2. update front-end
```bash
# clone the newest code
./luban-h5 rebuild_fe
./luban-h5 restart
```

feel free open an [issue](https://github.com/ly525/luban-h5/issues) if you have questions about this.