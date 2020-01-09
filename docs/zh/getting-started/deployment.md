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
> TODO，PR is welcome

## Heroku
> TODO

---

> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="7" />
