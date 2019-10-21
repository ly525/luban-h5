# Deployment


## Aliyun/Tencent Cloud/Digital Ocean

#### 1. on your server(centos)
First of all, you need to install some basic software packages, please install them yourself (refer to its official website documents for details)

1. Node
1. Npm
1. Nginx
1. Yarn
1. Pm2

> The following scripts are just for your information


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

Nginx profile demo

```nginx
server {
  listen 443;
  server_name your_domain;

  client_body_buffer_size 20M;
  client_max_body_size 20M;
  proxy_buffer_size 20M;
  proxy_buffers 32 20M;
  proxy_busy_buffers_size 20M;

  # https ssl config
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


  location ~ ^/(upload|content-manager|users-permissions|works|admin|psd-files|workforms|third-libs|engine-assets) {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://localhost:1337;
  }
  location / {

    root /home/centos/luban-h5-dist/front-end/;
    #try_files $uri $uri/ /index.html;
  }

}
```

#### 2. on local machine
Do the following in the root path of the project:

```bash
yarn add flightplan
npm run deploy:ecs // Elastic Compute Service
```

Local deployment script

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
  // privateKey should be absolute path
  privateKey: `${os.homedir}/.ssh/id_rsa` // your privateKey to rsync files
});

/**
 * 1. setup folders
 * 2. sync files
 * 3. install dependencies
 * 4. (re)start api service
 * 5. soft link nginx conf
 *
 */

// init remove server path
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
  // reference: https://github.com/pstadler/flightplan/issues/142
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

#### Some problems that may be encountered in the middle:

1. `Cannot parse privateKey: Unsupported key format` <br />For solutions, please refer: [Cannot parse privateKey: Unsupported key format](https://stackoverflow.com/questions/53400628/cannot-parse-privatekey-unsupported-key-format)



## Docker deployment
> TODO



## Heroku
> Because Strapi + postgresql still has some pits on Heroku and needs official solution, this solution is temporarily pending.

