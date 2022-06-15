# mac下shell使用sed命令换行的方案

# 前言

鉴于自己在用gitbook写文档的时候，打开本地服务器的时候，需要添加一个自定义的summary配置，希望通过shell脚本自动生成，并在发布的时候自动取消。于是使用sed命令，发现mac电脑的sed和linux的sed有一定的区别，遂记录下来mac下的使用方法，共有以下两种方式：

### 方法一：

```sh
sed -i '' $'s/README.md"/README.md",\\\n"summary":"SUMMARY-DEV.md"/g' book.json
```

### 方法二：

```sh
sed -i '' 's/README.md"/README.md",\'$'\n"summary":"SUMMARY-DEV.md"/g' book.json
```
