#!/usr/bin/env sh
scp -r dist/* centos@aliyun:/home/centos/codebase/luban/luban-h5-dist/front-end
scp -r ../../back-end/h5-api/public/engine-assets/* centos@aliyun:/home/centos/codebase/luban/luban-h5/back-end/h5-api/public/engine-assets/