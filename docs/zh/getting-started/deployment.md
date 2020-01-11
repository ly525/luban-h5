# 部署
> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动

## 阿里云/腾讯云/Digital Ocean
> 以 Centos 为例，Ubuntu等其它发行版，请自行调整

1. 首先需要安装一些基础的软件包，请自行安装（具体参照其官网文档）
>  `node、npm、yarn、pm2`

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

2. 在服务器上执行如下代码即可

```bash
git clone https://github.com/ly525/luban-h5.git
cd luban-h5
./luban-h5.sh init  # 安装依赖，构建前后端
./luban-h5.sh start # 启动项目即可
./luban-h5.sh stop  # 停止服务
```

3.  如何访问：
    1.  配置防火墙安全组，添加 1337 端口，通过 `http://服务器IP:1337` 访问即可访问
    2. `http://服务器IP:1337/admin` 为鲁班的管理后台


## Docker 部署
> TODO，PR is welcome

## Heroku
> TODO

---

> 欢迎大家到[鲁班H5-社区](https://support.qq.com/products/93432/) 交流，在这里可以提问、反馈意见和建议，与作者直接互动


<Vssue issueId="7" />
