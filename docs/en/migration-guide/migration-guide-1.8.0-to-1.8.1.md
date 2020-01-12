# Migration guide from v.1.8.0 to v.1.8.1
Upgrading your Luban-H5 application to `v.1.8.1`.

Here are the patch changes:
- upgrade the strapi version from beta.17.x to beta.18.4 to fix [/upload return the url contains `localhost:1337` after migrate from beta.13 to beta.17.8](https://github.com/strapi/strapi/issues/4791)

- see more here: [Strapi Migration guide from beta.17+ to beta.18](https://strapi.io/documentation/3.0.0-beta.x/migration-guide/migration-guide-beta.17-to-beta.18.html)


To upgrade a project to the `v.1.8.1` version of Luban-H5 follow the instructions below.

```bash
# clone the newest code
# clean the h5-api cache, node_modules and admin panel
# !! and this step will stop the api service(it will run the `./luban-h5 stop` firstly)
./luban-h5 clean
# reinstall the dependencies and rebuild the admin panel
./luban-h5 init
./luban-h5 start
```

feel free open an [issue](https://github.com/ly525/luban-h5/issues) if you have questions about this.