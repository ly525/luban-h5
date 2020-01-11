#/usr/bin/env


###
 # @Author: ly525
 # @Date: 2019-11-30 13:24:57
 # @LastEditors  : ly525
 # @LastEditTime : 2020-01-11 17:06:44
 # @FilePath: /luban-h5/deploy/ubuntu-install.sh
 # @Github: https://github.com/ly525/luban-h5
 # @Description:
 ## #!en: One-Click Setup Script to Install Luban-H5 on Ubuntu 18.04
 ## #!zh: 鲁班H5 Ubuntu18.04 一键安装脚本
 # @Copyright 2018 - 2019 luban-h5. All Rights Reserved
###

######################################################
#          #!zh [鲁班H5] Ubuntu18.04 一键安装脚本

# [一、本地一键安装步骤]
# docker pull ubuntu
# docker run -it -p 1234:80 -p 1235:1337  -v `pwd`:/app ubuntu
# wget -qO- https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh | bash

# [二、安装完成之后，在浏览器中的访问鲁班的步骤]
# 1. 鲁班后台
# 1.1 宿主机访问 [鲁班后台]：http://localhost:1234/admin，自定义配置账号密码，登录即可
# 1.2 配置相关权限，文档参见：https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html#%E5%90%8E%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA

# 2. 鲁班前端
# 2.1 宿主机访问 「鲁班前端」：http://localhost:1234, 即可看到鲁班的前端了

# [三、问题反馈]
# GitHub：https://github.com/ly525/luban-h5
######################################################


######################################################
#   #!en One-Click Setup Script to Install Luban-H5 on Ubuntu 18.04

# [Step1: Download && Run the Script]
# docker pull ubuntu
# docker run -it -p 1234:80 -p 1235:1337  -v `pwd`:/app ubuntu
# wget -qO- https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/ubuntu-install.sh | bash

# [Step2: After the Installation Finished, Visit Luban in the browser]
# 1. Luban H5 Admin
# 1.1 visit on your host machine：http://localhost:1234/admin,   custom the username and password, then login the admin
# 1.2 config the permission,see more here：https://ly525.github.io/luban-h5/zh/getting-started/quick-start.html#%E5%90%8E%E7%AB%AF%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA

# 2. Luban H5 Front-End
# 2.1 visit on your host machine ：http://localhost:1234, enjoy it!

# [Feedback]
# GitHub：https://github.com/ly525/luban-h5/issues
######################################################

#
## Variables
#

GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NEUTRAL="\033[0m"
NGINX_CONFIG_DIR='/etc/nginx/'


#
## Displaying functions
#

function already {
  echo -e "${YELLOW}[-]$1 is already installed${NEUTRAL}"
}

function installing {
  echo -e "${GREEN}[~]Installing $1...${NEUTRAL}"
}

function success {
  echo -e "${GREEN}[+]$1 successfully installed${NEUTRAL}"
}

function exitBanner {
    echo "#"
    echo "#  Node.js, Strapi, PM2, MongoDB and nginx are now installed"
    echo "#"
}

function base_install {
  RUN $1 &>/dev/null
  if [ $? == "1" ]; then
    already wget
  else
    installing $1
    apt-get install -y $1
    success $1
  fi
}

function set_apt_mirror {
  # 准备工作：
  # 1. 更换 ubuntu 镜像
  #
  # 查看 ubuntu 版本： cat /etc/issue
  # 替换为清华大学镜像：https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/
  # 或替换为中科大镜像：https://lug.ustc.edu.cn/wiki/mirrors/help/ubuntu
  # sudo sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
  # sudo sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
  #
  sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
  apt update

}

#
## Logic
#

# function install_wget {
#   wget &>/dev/null
#   if [ $? == "1" ]; then
#     already wget
#   else
#     installing wget
#     apt-get update
#     apt-get install -y wget
#     success wget
#   fi
# }

function install_nvm {
  if [ -a $HOME/.nvm ]; then
    already nvm
  else
    installing nvm
    #   -q,  --quiet               安静模式(无信息输出)
    #   -O,  --output-document=FILE    将文档写入 FILE
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    export NVM_DIR=$HOME/.nvm;
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
    # source $HOME/.nvm/nvm.sh;
    # . ~/.nvm/nvm.sh;
    # source ~/.bashrc
    nvm --version
    success nvm
  fi
}

function install_node {
  node -v &>/dev/null
  if [ $? == "0" ]; then
    already node
  else
    installing node
    # source $HOME/.nvm/nvm.sh;
    export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node/;
    # gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
    export NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node/;
    nvm install stable
    nvm use stable
    nvm alias default stable
    success node
  fi
}

function install_yarn {
  yarn -v &>/dev/null
  if [ $? == "0" ]; then
    already yarn
  else
    installing yarn
    apt install gnupg -y
    apt install gnupg1  -y
    apt install gnupg2  -y
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    # https://yarnpkg.com/en/docs/install#debian-stable
    apt-get remove -y cmdtest
    apt-get update
    apt-get install -y yarn
    success yarn
  fi
}

function set_npm_mirror {
  if [ -a $HOME/.npmrc ]; then
    already set_npm_mirror
  else
    installing set_npm_mirror
    wget -qO- https://raw.githubusercontent.com/ly525/luban-h5/dev/deploy/mirror.sh | bash
    success set_npm_mirror
  fi
}



function install_strapi {
  strapi &>/dev/null
  if [ $? == "0" ]; then
    already Strapi
  else
    installing Strapi
    # 这里将mac怀疑安全性的包采取信任
    # https://github.com/strapi/strapi/issues/2787
    npm install --unsafe-perm=true --allow-root -g strapi@alpha
    # . ~/.nvm/nvm.sh
    # source $HOME/.nvm/nvm.sh;
    strapi -v
    success Strapi
  fi
}

function install_pm2 {
  pm2 &>/dev/null
  if [ $? == "1" ]; then
    already PM2
  else
    installing PM2
    npm install -g pm2@latest
    . ~/.nvm/nvm.sh
    pm2 update
    success PM2
  fi
}

function install_nginx {
  nginx &>/dev/null
  if [ $? == "1" ]; then
    already nginx
  else
    installing nginx
    apt-get update
    apt-get install -y nginx

    # Relpace nginx config file
    sed -i 's/www-data/root/g' /etc/nginx/nginx.conf
    cat > /etc/nginx/sites-available/default <<EOF
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Generally, you will want to move this file somewhere, and start with a clean
# file but keep this around for reference. Or just disable in sites-enabled.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##


# ----- luban nginx config start
server {

  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;

  client_body_buffer_size 4096M;
  client_max_body_size 4096M;
  proxy_buffer_size 128M;
  proxy_buffers 32 128M;
  proxy_busy_buffers_size 128M;

  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_disable "MSIE [1-6]\.";
  gzip_comp_level 3;
  gzip_types image/png application/json text/plain application/x-javascript text/css application/xml text/javascript application/javascript;

  location ~ ^/(upload|content-manager|users-permissions|works|admin|psd-files|workforms|third-libs|engine-assets) {

    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_pass http://localhost:1337;
  }

  # location /index {
  #   root /home/centos/codebase/luban/luban-h5-dist/front-end/;
  #   #try_files \$uri \$uri/ /index.html;
  # }
  # location / {

  #   root /home/centos/codebase/luban/luban-h5-dist/landing-page/;
  #   #try_files \$uri \$uri/ /index.html;
  # }


  location / {
    root /root/luban-h5/front-end/h5/dist/;
    # index index.html;
    #try_files \$uri \$uri/ /index.html;
  }

}

# ----- luban nginx config end
EOF
    service nginx restart
    success nginx
  fi
}

function install_mongodb {
  mongo &>/dev/null
  if [ $? == "1" ]; then
    already MongoDB
  else
    installing MongoDB
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    apt-get update
    apt-get install -y mongodb-org
    service mongod start
    success MongoDB
  fi
}


function install_luban-h5 {
  if [ -a $HOME/luban-h5 ]; then
    already luban-h5
  else
    installing luban-h5
    cd ~/
    git clone https://github.com/ly525/luban-h5
    cd luban-h5

    # # 鲁班前端
    # cd luban-h5/front-end/h5 && yarn && yarn build # build editor and preview engine

    # cd -

    # # 鲁班后端
    # cd luban-h5/back-end/h5-api/ && yarn && yarn build # build strapi admin
    # pm2 start server.js
    # pwd
    # success luban-h5

    ./luban-h5.sh init
    ./luban-h5.sh start
  fi
}

#
## Main
#

set_apt_mirror


base_install vim
base_install wget
base_install curl
base_install git
base_install make
base_install gcc
base_install python
## for `yarn add sqlite3`
## https://packages.ubuntu.com/xenial/build-essential
## https://linuxconfig.org/how-to-install-g-the-c-compiler-on-ubuntu-18-04-bionic-beaver-linux
base_install build-essential


install_nvm
install_node
install_yarn
set_npm_mirror
install_strapi
install_pm2
# install_nginx
install_luban-h5
exitBanner

echo
echo -e "${GREEN}[+]Done.${NEUTRAL}"

exec $SHELL -l
