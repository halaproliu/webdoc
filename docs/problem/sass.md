# Sass问题

### node-sass安装问题

项目根目录添加.npmrc文件，内容如下：

```bash
registry=https://registry.npmmirror.com 
sass_binary_site=https://npmmirror.com/mirrors/node-sass/ 
```

### node-sass必须使用python2.0版本编译

node-sass 从 v5.0.0 版本开始，就已经支持使用 Python 3 进行构建了 。你可以尝试将项目中的 node-sass 升级到 v5.0.0 或更高版本。升级前请务必检查新版本与你当前 Node.js 版本的兼容性 。

```bash
npm install node-sass@5.0.0
```

如果不是第三方库的依赖，可以直接迁移至sass，无需升级node-sass。