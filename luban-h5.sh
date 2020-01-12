#!/bin/sh

###
 # @Author: ly525
 # @Date: 2020-01-10 22:23:34
 # @LastEditors  : ly525
 # @LastEditTime : 2020-01-12 16:21:22
 # @FilePath: /luban-h5/luban-h5.sh
 # @Github: https://github.com/ly525/luban-h5
 # @Description: Do not edit
 # @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 ###


cur_dir=`pwd`

help_usage() {
cat << EOT
---------------------------------------------------------------------------
#!en Please make sure that node(>v10), npm, yarn have been installed
#!zh 在使用该脚本之前，请确认：Node(>v10)、npm、yarn 已经安装
---------------------------------------------------------------------------

Usage:
  $(basename $0) [--help|-h] [version|clean|init|start|restart|stop]

  help	   Show usage.
  version	 Show version.

  clean	   #!en Install dependencies, build front-end && back-end.
           #!zh 初始化: 安装依赖并编译前后端

  init	   #!en Install dependencies, build front-end && back-end.
           #!zh 初始化: 安装依赖并编译前后端

  start    #!en Start the luban-h5 service(powered by pm2).
           #!zh 启动luban-h5, 执行这一步骤之前, 需要执行 ./$(basename $0) init

  restart  #!en Restart the luban-h5 service.
           #!zh 重启luban-h5

  stop     #!em Build binary packages only.
           #!zh 停止luban-h5

e.g.
  ./luban-h5.sh version
  ./luban-h5.sh init
  ./luban-h5.sh start
  ./luban-h5.sh stop
EOT
exit
}


luban_h5_version() {
  # https://gist.github.com/yvele/e98e3a155335a6e00e71
  # Version key/value should be on his own line
  PACKAGE_VERSION=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')

  echo $PACKAGE_VERSION
}

luban_h5_clean() {
  luban_h5_stop
  cd back-end/h5-api && rm -rf node_modules .cache build

  echo "-------------------------------------------------------"
  echo "clean folder [node_modules, .cache, build] finish."
  echo "please run the following commands to start the app.\n"
  echo "1. ./luban-h5 init"
  echo "1. ./luban-h5 start"
  echo "-------------------------------------------------------"
}

luban_h5_init() {
  # 到前端目录安装依赖，并编译核心编辑器 + 预览引擎
  # #!en compile the core editor and preview engine
  cd front-end/h5 && yarn && yarn build
  cd ${cur_dir}

  # 在后端目录，编译后台管理系统
  cd back-end/h5-api && yarn && NODE_ENV=production yarn build
  cd ${cur_dir}
}

luban_h5_start() {
  cd back-end/h5-api && npx pm2 start --name luban-h5-service server.js
  cd ${cur_dir}
}

luban_h5_restart() {
  cd back-end/h5-api && npx pm2 restart luban-h5-service
  cd ${cur_dir}
}

luban_h5_stop() {
  cd back-end/h5-api && npx pm2 stop luban-h5-service
  cd ${cur_dir}
}



# Initialization step
action=$1
case "$action" in
    version|clean|init|start|restart|stop)
        luban_h5_${action}
        ;;
    *)
        help_usage
        ;;
esac