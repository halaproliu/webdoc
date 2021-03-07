# docker部署node服务

### 前言

使用docker运行node服务，可以进行应用隔离，同时避免不同node版本带来的影响。

### 编写Dockerfile

```sh
FROM node:9.11.2
LABEL maintainer "luffybryant@gmail.com"
COPY . .
RUN npm install
RUN npm install -g pm2
EXPOSE 3000
CMD ["npm" "run" "server:prd"]
```

### 使用pm2

平常使用docker运行pm2直接启动会挂掉，是因为docker自身可以设置-d后台运行，因此运行pm2需要添加--no-daemon,后者使用pm2-docker命令
