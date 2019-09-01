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
 * 5. 在 /etc/nginx/conf.d 中给 luban-h5 新建一个软连接
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
