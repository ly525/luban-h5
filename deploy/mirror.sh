#!/bin/bash

###
 # @Author: ly525
 # @Date: 2019-11-23 22:56:04
 # @LastEditors: ly525
 # @LastEditTime: 2019-11-23 23:04:08
 # @FilePath: /luban-h5/helpers/mirror.sh
 # @Github: https://github.com/ly525/luban-h5
 # @Description:
      #!zh: 设置 npm 和 yarn 的镜像源为淘宝镜像源
      #!en: set yarn and npm mirror for chinese users
 # @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 ###

# ==========================================================
# NPM
# ==========================================================

npm set registry "https://registry.npm.taobao.org"
npm set disturl "https://npm.taobao.org/dist"

npm set chromedriver-cdnurl "https://npm.taobao.org/mirrors/chromedriver"
npm set couchbase-binary-host-mirror "https://npm.taobao.org/mirrors/couchbase/v{version}"
npm set debug-binary-host-mirror "https://npm.taobao.org/mirrors/node-inspector"
npm set electron-mirror "https://npm.taobao.org/mirrors/electron/"
npm set flow-bin-binary-host-mirror "https://npm.taobao.org/mirrors/flow/v"
npm set fse-binary-host-mirror "https://npm.taobao.org/mirrors/fsevents"
npm set fuse-bindings-binary-host-mirror "https://npm.taobao.org/mirrors/fuse-bindings/v{version}"
npm set git4win-mirror "https://npm.taobao.org/mirrors/git-for-windows"
npm set gl-binary-host-mirror "https://npm.taobao.org/mirrors/gl/v{version}"
npm set grpc-node-binary-host-mirror "https://npm.taobao.org/mirrors"
npm set hackrf-binary-host-mirror "https://npm.taobao.org/mirrors/hackrf/v{version}"
npm set leveldown-binary-host-mirror "https://npm.taobao.org/mirrors/leveldown/v{version}"
npm set leveldown-hyper-binary-host-mirror "https://npm.taobao.org/mirrors/leveldown-hyper/v{version}"
npm set mknod-binary-host-mirror "https://npm.taobao.org/mirrors/mknod/v{version}"
npm set node-sqlite3-binary-host-mirror "https://npm.taobao.org/mirrors"
npm set node-tk5-binary-host-mirror "https://npm.taobao.org/mirrors/node-tk5/v{version}"
npm set nodegit-binary-host-mirror "https://npm.taobao.org/mirrors/nodegit/v{version}/"
npm set operadriver-cdnurl "https://npm.taobao.org/mirrors/operadriver"
npm set phantomjs-cdnurl "https://npm.taobao.org/mirrors/phantomjs"
npm set profiler-binary-host-mirror "https://npm.taobao.org/mirrors/node-inspector/"
npm set puppeteer-download-host "https://npm.taobao.org/mirrors"
npm set python-mirror "https://npm.taobao.org/mirrors/python"
npm set rabin-binary-host-mirror "https://npm.taobao.org/mirrors/rabin/v{version}"
npm set sass-binary-site "https://npm.taobao.org/mirrors/node-sass"
npm set sodium-prebuilt-binary-host-mirror "https://npm.taobao.org/mirrors/sodium-prebuilt/v{version}"
npm set sqlite3-binary-site "https://npm.taobao.org/mirrors/sqlite3"
npm set utf-8-validate-binary-host-mirror "https://npm.taobao.org/mirrors/utf-8-validate/v{version}"
npm set utp-native-binary-host-mirror "https://npm.taobao.org/mirrors/utp-native/v{version}"
npm set zmq-prebuilt-binary-host-mirror "https://npm.taobao.org/mirrors/zmq-prebuilt/v{version}"


npm cache clean --force # clean npm cache

# ==========================================================
# YARN
# ==========================================================

yarn set registry "https://registry.npm.taobao.org"
yarn set disturl "https://npm.taobao.org/dist"
yarn set chromedriver-cdnurl "https://npm.taobao.org/mirrors/chromedriver"
yarn set couchbase-binary-host-mirror "https://npm.taobao.org/mirrors/couchbase/v{version}"
yarn set debug-binary-host-mirror "https://npm.taobao.org/mirrors/node-inspector"
yarn set electron-mirror "https://npm.taobao.org/mirrors/electron/"
yarn set flow-bin-binary-host-mirror "https://npm.taobao.org/mirrors/flow/v"
yarn set fse-binary-host-mirror "https://npm.taobao.org/mirrors/fsevents"
yarn set fuse-bindings-binary-host-mirror "https://npm.taobao.org/mirrors/fuse-bindings/v{version}"
yarn set git4win-mirror "https://npm.taobao.org/mirrors/git-for-windows"
yarn set gl-binary-host-mirror "https://npm.taobao.org/mirrors/gl/v{version}"
yarn set grpc-node-binary-host-mirror "https://npm.taobao.org/mirrors"
yarn set hackrf-binary-host-mirror "https://npm.taobao.org/mirrors/hackrf/v{version}"
yarn set leveldown-binary-host-mirror "https://npm.taobao.org/mirrors/leveldown/v{version}"
yarn set leveldown-hyper-binary-host-mirror "https://npm.taobao.org/mirrors/leveldown-hyper/v{version}"
yarn set mknod-binary-host-mirror "https://npm.taobao.org/mirrors/mknod/v{version}"
yarn set node-sqlite3-binary-host-mirror "https://npm.taobao.org/mirrors"
yarn set node-tk5-binary-host-mirror "https://npm.taobao.org/mirrors/node-tk5/v{version}"
yarn set nodegit-binary-host-mirror "https://npm.taobao.org/mirrors/nodegit/v{version}/"
yarn set operadriver-cdnurl "https://npm.taobao.org/mirrors/operadriver"
yarn set phantomjs-cdnurl "https://npm.taobao.org/mirrors/phantomjs"
yarn set profiler-binary-host-mirror "https://npm.taobao.org/mirrors/node-inspector/"
yarn set puppeteer-download-host "https://npm.taobao.org/mirrors"
yarn set python-mirror "https://npm.taobao.org/mirrors/python"
yarn set rabin-binary-host-mirror "https://npm.taobao.org/mirrors/rabin/v{version}"
yarn set sass-binary-site "https://npm.taobao.org/mirrors/node-sass"
yarn set sodium-prebuilt-binary-host-mirror "https://npm.taobao.org/mirrors/sodium-prebuilt/v{version}"
yarn set sqlite3-binary-site "https://npm.taobao.org/mirrors/sqlite3"
yarn set utf-8-validate-binary-host-mirror "https://npm.taobao.org/mirrors/utf-8-validate/v{version}"
yarn set utp-native-binary-host-mirror "https://npm.taobao.org/mirrors/utp-native/v{version}"
yarn set zmq-prebuilt-binary-host-mirror "https://npm.taobao.org/mirrors/zmq-prebuilt/v{version}"

yarn cache clean # clean yarn cache


# ==========================================================
# Binaries those not provide api to  override download url
# ==========================================================

# 另外下载慢，还有可能是因为 有些包没有提供 更改其二进制包下载地址的 API
# 没有办法配置 mirror，在国内下载就很慢了

#  比如下面的几个：
# pngquant-bin
# mozjpeg-bin
# cwebp-bin
# optipng-bin


# 因此大家在下载之前，最好先ping 下其对应二进制包存储网站，最好能在hosts中做一下映射
# 比如 raw.githubusercontent.com 是多解析，解析到日本IP，可能访问不了。说不定手动配置host 到美国，就可以完成下载
# http://tool.chinaz.com/speedworld/raw.githubusercontent.com 在这里可以查看 raw.githubusercontent.com 的 DNS 检测结果
# 类似下面这样：

# 151.101.200.133 raw.githubusercontent.com
# 52.217.40.140 github-cloud.s3.amazonaws.com
# 216.105.38.13 sourceforge.net

# 相关 issue 和 链接
# https://github.com/imagemin/cwebp-bin/issues/34
# https://github.com/mapbox/node-sqlite3/issues/734
# https://github.com/mapbox/node-sqlite3/issues/816

#cwebp-bin
#https://raw.githubusercontent.com/imagemin/cwebp-bin/v${pkg.version}/vendor/`

#pngquant-bin
#https://github.com/imagemin/pngquant-bin/blob/master/lib/index.js#L6
#https://raw.githubusercontent.com/imagemin/pngquant-bin/v${pkg.version}/vendor/


#optipng-bin
#https://github.com/imagemin/optipng-bin/blob/master/lib/install.js#L17
#https://sourceforge.net/projects/optipng/files/OptiPNG/


#mozjpeg-bin
#https://github.com/imagemin/mozjpeg-bin/blob/master/lib/index.js#L6
#https://raw.githubusercontent.com/imagemin/mozjpeg-bin/v${pkg.version}/vendor/`

#gifsicle
#https://github.com/imagemin/gifsicle-bin/blob/master/lib/index.js#L6
#https://raw.githubusercontent.com/imagemin/gifsicle-bin/v${pkg.version}/vendor/

