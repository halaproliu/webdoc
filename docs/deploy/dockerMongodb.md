# docker部署mongodb

### 获取镜像

```bash
docker pull mongo
```

### 创建容器

- name参数：指定容器名称
- network：指定容器网络
- p：指定容器端口映射，左边的27017为本地端口，右边的27017为docker容器内的端口

```bash
# 创建mongo容器
docker run -d --name blogmongo --network webapp-blog -p 27017:27017 mongo:latest
```
