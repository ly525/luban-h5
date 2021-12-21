
# Deployment


## Aliyun/Tencent Cloud/Digital Ocean

1. Preinstall
  > First of all, you need to install some basic software on your server(centos), please install them yourself (refer to its official website documents for details)

  >  `node、npm、yarn、pm2`

The following scripts are just for your information
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

2. Run the code on the server

```bash
# just run the following code on the server
git clone https://github.com/ly525/luban-h5.git
cd luban-h5
./luban-h5.sh init  # installation dependency, build front-end and back-end
./luban-h5.sh start # just start the service
./luban-h5.sh stop # stop the service
```

3. How to access
    1. configure the firewall security group and add port `1337`.
    2. visit `http://ServerIP:1337/admin` to get the admin panel for luban-h5
    3. config the API permissions, see more [here](https://ly525.github.io/luban-h5/en/getting-started/quick-start.html#_2-something-important)
    4. visit `http://ServerIP:1337` to get the app

## Docker deployment
> TODO



## Heroku
> Because Strapi + postgresql still has some pits on Heroku and needs official solution, this solution is temporarily pending.

