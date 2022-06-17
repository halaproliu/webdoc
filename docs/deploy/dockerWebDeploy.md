# docker进行前端应用部署

# 前言

依赖环境为centos7

一、 安装与配置

### 安装依赖包

```sh
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

### 配置镜像

```sh
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

或配置阿里云镜像

```sh
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 查看所有docker版本

```sh
yum list docker-ce --showduplicates | sort -r
```

### 安装docker-ce

```sh
sudo yum install docker-ce
```

### 启动docker-ce

```sh
sudo systemctl start docker # 启动docker
sudo systemctl enable docker # 允许自动启动docker服务
```

### 部署Vue前端页面

- 编写Dockerfile

```docker
FROM nginx:latest
LABEL maintainer "luffybryant@gmail.com"
COPY ./dist/ /usr/share/nginx/html/blog
COPY nginx.conf /etc/nginx
COPY web.conf /etc/nginx/servers
EXPOSE 80
```

- 生成镜像

```sh
docker build -t front .
```

其中-t指定镜像名称，点则代表传递当前的工作目录

- 运行容器

```sh
docker run -d -p 80:80 front
```

### 部署mongo服务

- 获取mongo镜像

  - name参数：指定容器名称
  - network：指定容器网络
  - p：指定容器端口映射，左边的27017为本地端口，右边的27017为docker容器内的端口

```sh
docker pull mongo
```

- 运行mongodb服务

```sh
docker run --name mongodb -p 27017:27017 -v /tmp/db:/data/db -d mongo:latest
```

- 修改镜像配置文件，以支持远程连接mongo服务

```sh
docker exec -it <mongodb容器id> bash
```

- 安装vim

```sh
apt-get update
apt-install vim
```

- 修改配置文件

```sh
vim /etc/mongod.conf.orig
# 注释bindIp或者ip改为0.0.0.0
```

- 为mongo添加用户

  - 输入mongo，进入mongodb的环境

```sh
use admin
db.createUser(
  {
    user: "xxx",
    pwd: passwordPrompt(), // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

xxx为用户名，接着会提示password，输入密码，即可。

### 部署node服务

- 编写Dockerfile

```sh
# 指定node版本
FROM node:12.13
# 指定镜像作者
LABEL maintainer "luffybryant@gmail.com"
# 指定部署项目路径
ARG dir=/home/node/blog
WORKDIR $dir
COPY . $dir
RUN npm install
RUN npm install -g pm2
EXPOSE 3000
CMD ["npm" "run" "server"]
```

- 生成镜像
  - -f指定使用哪个Dockerfile

```sh
docker build -t end -f Dockerfile.node .
```

- 开启容器

```sh
docker run -d -p 3000:3000 --restart always end
```


