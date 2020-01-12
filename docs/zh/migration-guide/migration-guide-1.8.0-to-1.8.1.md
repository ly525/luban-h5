# 鲁班H5 v.1.8.0 至 v.1.8.1 迁移指南
升级`鲁班H5`版本至 `v.1.8.1`.

主要修改是：
- 将 strapi依赖从 beta.17.x 升级至 beta.18.4， 主要为了修复 [图片上传之后，返回的response url 中包含 localhost:1337](https://github.com/strapi/strapi/issues/4791)

- 更多请参见 Strapi 升级指南: [Strapi Migration guide from beta.17+ to beta.18](https://strapi.io/documentation/3.0.0-beta.x/migration-guide/migration-guide-beta.17-to-beta.18.html)


将 鲁班H5 升级到`v.1.8.1` 比较简单，只要执行如下命令即可：

```bash
# clone 最新代码
# 删除后端相关的缓存、admin后台、node_modules
# !! 注意下面的命令会先停止服务
./luban-h5 clean
# 重新安装依赖，构建admin后台
./luban-h5 init
./luban-h5 start
```

如果有疑问，提 [issue](https://github.com/ly525/luban-h5/issues) 即可