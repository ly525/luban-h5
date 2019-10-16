# 部署
> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动

## 阿里云/腾讯云/Digital Ocean
> 以 Centos 为例，Ubuntu等其它发行版，请自行调整

1. 预安装：

  - 首先需要安装一些基础的软件包，请自行安装（具体参照其官网文档）
    -  node
    -  npm
    -  nginx
    -  yarn
    -  pm2

  - 1.2 以下脚本仅供参考

  ```bash
  # install yarn
  curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
  sudo yum install yarn -y

  # install nginx
  sudo yum install nginx -y
  # install pm2
  npm install pm2 -g
  # pm2 examples
  # pm2 start server.js
  # pm2 stop server
  # pm2 restart server
  # pm2 stop all
  ```

nginx 配置文件 demo

```nginx
server {
  listen 443;
  server_name your_domain;

  client_body_buffer_size 20M;
  client_max_body_size 20M;
  proxy_buffer_size 20M;
  proxy_buffers 32 20M;
  proxy_busy_buffers_size 20M;

  ssl on;
  ssl_certificate cert/your-https.pem;
  ssl_certificate_key cert/your-https.key;
  ssl_session_timeout 5s;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;

  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_disable "MSIE [1-6]\.";
  gzip_comp_level 3;
  gzip_types image/png application/json text/plain application/x-javascript text/css application/xml text/javascript application/javascript;

  # TODO 这边的 psd-files、engine-assets、third-libs 开发的时候，可以走 proxy_pass
  # 生产环境的时候，最好走另外的 location，直接让 nginx 访问静态文件
  location ~ ^/(upload|content-manager|users-permissions|works|admin|psd-files|workforms|third-libs|engine-assets) {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://localhost:1337;
  }

  # 注意：
  # 鲁班H5 核心App 部分URL 路径为: https://domain-for-luban/main
  # 因此 `luban-h5/front-end/h5/vue.config.js` 中 publicPath 中的配置为 `publicPath: isProd ? '/main/' : '/'`
  # 请根据自己的实际情况做调整，如果你的项目是部署在根路径(比如：https://domain-for-luban)，修改为： publicPath: '/' 即可

  location / {
    root /home/centos/codebase/luban/luban-h5-dist/front-end/;
    #try_files $uri $uri/ /index.html;
  }

}
```

#### 本地执行：
请先提前调研：flightplan
在项目根目录作如下操作：

```bash
yarn add flightplan // 部署脚本，官方链接
npm run deploy:ecs // 云服务器 (Elastic Compute Service, 简称 ECS)
```

本地部署脚本

```javascript
var os = require('os');
var plan = require('flightplan');

// configuration
local_dist_dir = './'; // root path for luban-h5
remote_project_dir = '~/codebase/luban/luban-h5'; // root path for luban-h5 on server
remote_project_api_dir = '~/codebase/luban/luban-h5/back-end/h5-api'; // api root path for luban-h5 on server

// production server config
plan.target('production', {
  host: 'your host ip', // your server ip
  username: 'centos', // your server username
  // 更新为绝对路径
  privateKey: `${os.homedir}/.ssh/id_rsa` // your privateKey to rsync files
});

/**
 * 1. setup folders
 * 2. sync files
 * 3. install dependencies
 * 4. (re)start api service
 * 5. soft link nginx conf
 *
 * 1. 创建同步文件件
 * 2. 同步本地在 git 中的文件（你也可以在服务器端git clone）
 * 3. 在 h5-api 目录安装依赖
 * 4. 使用pm2 重启服务
 * 5. 给 nginx 文件做一个软件链接
 *
 */

// init remove server path
// 在第一步的时候，需要打开这一项：初始化服务器，现在还不完整，需要补充
// plan.remote(remote => {
//   // remove.exec(`mkdir -p ${remote_project_dir}`)
//   remove.sudo(`yum install nginx -y`)
//   remote.with(`mkdir -p ${remote_project_dir}`, () => {
//     // remote.log('Install dependencies');
//     // remote.exec('yarn');
//     remote.exec('pwd');
//   });
// });


// run commands on localhost
plan.local(local => {
  // local.log('=> Run build');
  // local.exec('npm run build');
  // local.log('=> Build finish');

  local.log('=> Copy files to remote hosts');
  // TODO reference: https://github.com/pstadler/flightplan/issues/142
  local.with(`cd ${local_dist_dir}`, () => {
    // const filesToCopy = local.exec('find . -type f', { silent: true })
    const filesToCopy = local.git('ls-files', {silent: true}) // get list of files under version control

    local.transfer(filesToCopy, remote_project_dir);
    local.log('=> Copy finish');

  });
});

// run commands on the target's remote hosts
plan.remote(remote => {
  remote.with(`cd ${remote_project_api_dir}`, () => {
    remote.log('Install dependencies');
    remote.exec('yarn');
    remote.exec('pm2 restart server')
  });
});


```



#### 中间可能遇到的一些问题：

1. `Cannot parse privateKey: Unsupported key format` 

    解决方案请参照：[Cannot parse privateKey: Unsupported key format](https://stackoverflow.com/questions/53400628/cannot-parse-privatekey-unsupported-key-format)


## Docker 部署

> 以下方案来自：[https://github.com/yi-ge/luban-h5#docker-%E9%83%A8%E7%BD%B2](https://github.com/yi-ge/luban-h5#docker-%E9%83%A8%E7%BD%B2)，非常非常感谢。
> 但仅供参考，此方案不是鲁班的官方的解决方案
>
> 鲁班决定暂时不按照这种方案来做，可以先使用上面部署脚本来发布到服务器上，进行部署。
>
> 鲁班后期考虑出一个简单版本docker image的部署方案，直接拉镜像，在服务器端就能直接跑起来。

1. 请确保您的`80`端口和`443`端口均打开，如果已经配置了其它项目，请进行手工调整。
1. 修改`yourdomain.tld`为您的前端域名并解析到服务器。
1. 修改`api.yourdomain.tld`为您的后端域名并解析到服务器。
1. 依次执行以下命令。

```bash
# Clone luban-h5
git clone https://github.com/ly525/luban-h5.git
cd luban-h5

# Install require package
docker run --rm -v `pwd`:/root -w /root/back-end/h5-api node:12.8.1 bash -c "yarn && NODE_ENV=production yarn build"

docker run --rm -v `pwd`:/root -w /root/front-end/h5 \
    --env "PUBLIC_PATH=/" \
    --env "PROD_API_ORIGIN=api.yourdomain.tld" \
    node:12.8.1 bash -c "yarn && NODE_ENV=production yarn build && node build/engine.webpack.js"

# Start back-end
docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume /etc/nginx/certs \
    --volume /etc/nginx/vhost.d \
    --volume /usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    jwilder/nginx-proxy

docker run --detach \
    --name nginx-proxy-letsencrypt \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    jrcs/letsencrypt-nginx-proxy-companion

docker run -itd -m 512m \
    --restart=always \
    --name luban-h5-front \
    -v `pwd`/front-end/h5/dist:/usr/share/nginx/html \
    --env "NODE_ENV=production" \
    --env "VIRTUAL_HOST=yourdomain.tld" \
    --env "LETSENCRYPT_HOST=yourdomain.tld" \
    --env "PROD_API_ORIGIN=api.yourdomain.tld" \
    nginx

# Start font-end
docker run -itd -m 1024m \
    --name luban-h5-api \
    --restart=always \
    -v `pwd`:/root -w /root/back-end/h5-api \
    -p 1337:1337 \
    --env "NODE_ENV=production" \
    --env "VIRTUAL_PORT=1337" \
    --env "VIRTUAL_HOST=api.yourdomain.tld" \
    --env "LETSENCRYPT_HOST=api.yourdomain.tld" \
   --restart=always node:12.8.1 \
   yarn start
```

稍等片刻，访问`https://你的域名`，部署完成。

关于Nginx、SSL的配置，可以参考：[https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion)



---

docker 自我学习，请忽略

```bash
docker --rm
	相当于：
	1. docker run hello-world(hello-world为image-name)
	2. docker rm hello-world-container-id(通过 docker ps -a 查看)

	在Docker容器退出时，默认容器内部的文件系统仍然被保留，以方便调试并保留用户数据。
	但是，对于foreground容器，由于其只是在开发调试过程中短期运行，其用户数据并无保留的必要，因而可以在容器启动时设置--rm选项，这样在容器退出时就能够自动清理容器内部的文件系统。示例如下：
	docker run --rm bba-208等价于docker run --rm=true bba-208。
	显然，--rm选项不能与-d同时使用，即只能自动清理foreground容器，不能自动清理detached容器
	注意，--rm选项也会清理容器的匿名data volumes。
	所以，执行docker run命令带--rm命令选项，等价于在容器退出后，执行docker rm -v。


Docker命令详解（run篇）
	命令格式：docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
	Usage: Run a command in a new container
	中文意思为：通过run命令创建一个新的容器（container）

	常用选项说明
	-d, --detach=false， 指定容器运行于前台还是后台，默认为false
	-i, --interactive=false， 打开STDIN，用于控制台交互
	-t, --tty=false， 分配tty设备，该可以支持终端登录，默认为false
	-u, --user=""， 指定容器的用户
	-a, --attach=[]， 登录容器（必须是以docker run -d启动的容器）
	-w, --workdir=""， 指定容器的工作目录
	-c, --cpu-shares=0， 设置容器CPU权重，在CPU共享场景使用
	-e, --env=[]， 指定环境变量，容器中可以使用该环境变量
	-m, --memory=""， 指定容器的内存上限
	-P, --publish-all=false， 指定容器暴露的端口
	-p, --publish=[]， 指定容器暴露的端口
	-h, --hostname=""， 指定容器的主机名
	-v, --volume=[]， 给容器挂载存储卷，挂载到容器的某个目录
	--volumes-from=[]， 给容器挂载其他容器上的卷，挂载到容器的某个目录
	--cap-add=[]， 添加权限，权限清单详见：http://linux.die.net/man/7/capabilities
	--cap-drop=[]， 删除权限，权限清单详见：http://linux.die.net/man/7/capabilities
	--cidfile=""， 运行容器后，在指定文件中写入容器PID值，一种典型的监控系统用法
	--cpuset=""， 设置容器可以使用哪些CPU，此参数可以用来容器独占CPU
	--device=[]， 添加主机设备给容器，相当于设备直通
	--dns=[]， 指定容器的dns服务器
	--dns-search=[]， 指定容器的dns搜索域名，写入到容器的/etc/resolv.conf文件
	--entrypoint=""， 覆盖image的入口点
	--env-file=[]， 指定环境变量文件，文件格式为每行一个环境变量
	--expose=[]， 指定容器暴露的端口，即修改镜像的暴露端口
	--link=[]， 指定容器间的关联，使用其他容器的IP、env等信息
	--lxc-conf=[]， 指定容器的配置文件，只有在指定--exec-driver=lxc时使用
	--name=""， 指定容器名字，后续可以通过名字进行容器管理，links特性需要使用名字
	--net="bridge"， 容器网络设置:
	bridge 使用docker daemon指定的网桥
	host //容器使用主机的网络
	container:NAME_or_ID >//使用其他容器的网路，共享IP和PORT等网络资源
	none 容器使用自己的网络（类似--net=bridge），但是不进行配置
	--privileged=false， 指定容器是否为特权容器，特权容器拥有所有的capabilities
	--restart="no"， 指定容器停止后的重启策略:
	no：容器退出时不重启
	on-failure：容器故障退出（返回值非零）时重启
	always：容器退出时总是重启
	--rm=false， 指定容器停止后自动删除容器(不支持以docker run -d启动的容器)
	--sig-proxy=true， 设置由代理接受并处理信号，但是SIGCHLD、SIGSTOP和SIGKILL不能被代理
	示例
	运行一个在后台执行的容器，同时，还能用控制台管理：docker run -i -t -d ubuntu:latest
	运行一个带命令在后台不断执行的容器，不直接展示容器内部信息：docker run -d ubuntu:latest ping www.docker.com
	运行一个在后台不断执行的容器，同时带有命令，程序被终止后还能重启继续跑，还能用控制台管理，docker run -d --restart=always ubuntu:latest ping www.docker.com
	为容器指定一个名字，docker run -d --name=ubuntu_server ubuntu:latest
	容器暴露80端口，并指定宿主机80端口与其通信(: 之前是宿主机端口，之后是容器需暴露的端口)，docker run -d --name=ubuntu_server -p 80:80 ubuntu:latest
	指定容器内目录与宿主机目录共享(: 之前是宿主机文件夹，之后是容器需共享的文件夹)，docker run -d --name=ubuntu_server -v /etc/www:/var/www ubuntu:latest
```


## Heroku
> TODO

---

> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="7" />
