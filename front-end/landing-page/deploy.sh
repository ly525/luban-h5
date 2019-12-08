# scp -r dist/* centos@aliyun:/home/centos/codebase/luban/luban-h5-dist/landing-page

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@gitee.com:ly525/luban-h5.git master:gh-pages-landing-page

cd -