#! /bin/sh

###
 # @Author: ly525
 # @Date: 2020-01-12 11:21:11
 # @LastEditors  : ly525
 # @LastEditTime : 2020-01-12 16:30:08
 # @FilePath: /luban-h5/sync2server.sh
 # @Github: https://github.com/ly525/luban-h5
 # @Description: script for sync source code from local to server
 # @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 ###
SOURCE_PATH=/centos/luban-h5
PEM_PATH=~/.ssh/id_rsa

# usage:
# $ ./sync2server.sh host --dry
# $ ./sync2server.sh host --source

usage() {
    N=$(basename "$0")
    echo "Usage: $N host [--source|--dry]" >&2
    exit 1
}

if [ $# != 2 ]; then
    echo $# $1 $2
    usage
fi

SERVER_HOST=$1

# 正式同步
sync_source() {
    echo "sync_source to $SERVER_HOST"
    rsync\
      -atzvhcP\
      -e "ssh -i $PEM_PATH"\
      --exclude "node_modules"\
      --exclude "build*"\
      --exclude "public"\
      --exclude "dist"\
      --exclude ".git"\
      --exclude ".cache"\
      --exclude ".DS_Store"\
      --exclude "*.apk"\
      --exclude "*.bak"\
      --exclude "logs"\
      --exclude "*.pyc"\
      --exclude "local_settings.py"\
      --exclude "*.swp"\
      --exclude "*.md"\
      --exclude "sync.sh"\
      --exclude ".idea"\
      --exclude ".vscode"\
      --exclude "*.db"\
      --exclude "db.sqlite3"\
      --exclude "vagrant"\
     ./* centos@$SERVER_HOST:$SOURCE_PATH
}

#!zh: 正式同步代码前的试运行，不会真正同步代码，主要用来检测本地和服务器代码有哪些不同
#!en: dry run before sync code
sync_sourcedryrun() {
    echo "sync_source to $SERVER_HOST"
    rsync\
      -atzvhncP\
      -e "ssh -i $PEM_PATH"\
      --exclude "node_modules"\
      --exclude "dist"\
      --exclude "build*"\
      --exclude "public"\
      --exclude ".DS_Store"\
      --exclude ".git"\
       --exclude ".cache"\
      --exclude "*.apk"\
      --exclude "*.bak"\
      --exclude "logs"\
      --exclude "*.pyc"\
      --exclude "local_settings.py"\
      --exclude "*.swp"\
      --exclude "*.md"\
      --exclude "sync.sh"\
      --exclude ".idea"\
      --exclude ".vscode"\
      --exclude "*.db"\
      --exclude "db.sqlite3"\
      --exclude "vagrant"\
     ./* centos@$SERVER_HOST:$SOURCE_PATH
}

case "$2" in
  --source)
    sync_source
    ;;
  --dry)
    sync_sourcedryrun
    ;;
  *)
    usage
    ;;
esac

exit 0