# gitprofiles

不同的项目使用不同的全局配置，如user.name, user.email

![git-profiles](https://github.com/sudoforge/git-profiles)


### 实现方式

mac上在HOME目录添加.gitconfig-personal文件

```js
[user]
    name = halapro.liu
    email = xxx@gmail.com
```

修改~/.gitconfig文件，在最后添加配置，其中~/github/为需要单独配置的目录，最后的/符号是必须的

```js
[user]
    name = halapro.liu
    email = xxx@gmail.com
// 新增部分
[includeIf "gitdir:~/github/"]
    path = .gitconfig-personal
```