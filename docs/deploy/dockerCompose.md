# docker命令行工具docker-compose

### 介绍

[docker-compose](https://docs.docker.com/compose/install/)是一个docker的命令行工具，可以在docker官网找到,下载链接https://github.com/docker/compose/releases,可以一次性运行多个docker容器，通过YAML文件来配置服务

```sh
curl -L https://github.com/docker/compose/releases/download/1.25.1-rc1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```


### docker-compose.yml配置

```js
version: '3.7'
services:
  mongo:
    image: mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - ~/data/db:data/db
    networks:
      - webapp-blog
  node:
    image: end
    depends_on:
      - mongo
    ports:
      - 3000:3000
    networks:
      - webapp-blog
  networks:
    webapp-blog:
      driver: bridge
```

- version 版本号
- environment 环境变量
- ports 端口映射（左边为本地端口，右边为容器内端口）
- image 镜像
- volumes 映射容器内的路径到本机
- depends_on 依赖的的服务
- networks 使用的网络环境

### 运行命令

```sh
docker-compose up
```

> 选项
-d 在后台运行服务容器
-no-color 不是有颜色来区分不同的服务的控制输出
-no-deps 不启动服务所链接的容器
--force-recreate 强制重新创建容器，不能与-no-recreate同时使用
–no-recreate 如果容器已经存在，则不重新创建，不能与–force-recreate同时使用
–no-build 不自动构建缺失的服务镜像
–build 在启动容器前构建服务镜像
–abort-on-container-exit 停止所有容器，如果任何一个容器被停止，不能与-d同时使用
-t, –timeout TIMEOUT 停止容器时候的超时（默认为10秒）
–remove-orphans 删除服务中没有在compose文件中定义的容器

### 常用命令

##### 列出所有容器

```sh
docker-compose ps
```

##### 查看日志

```sh
docker-compose logs
```

##### 构建（重新构建）项目中的容器

```sh
docker-compose bulid
```

##### 拉取服务依赖的镜像

```sh
docker-compose pull
```

##### 重启服务

```sh
docker-compose restart
```

##### 停止服务

```sh
docker-compose stop
```

##### 停止和删除容器

```sh
docker-compose down
```

