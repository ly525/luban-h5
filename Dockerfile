FROM node:10

# 安装pm2
RUN npm install -g pm2

# 映射nodejs可执行文件的目录
VOLUME ["/app"]
WORKDIR /app

# 复制容器的执行脚本
# COPY luban-h5.sh /app/luban-h5.sh
# RUN chmod 755 /app/luban-h5.sh
# 容器的执行命令
CMD ["/app/luban-h5.sh","init"]

# 暴露端口映射
EXPOSE 1337