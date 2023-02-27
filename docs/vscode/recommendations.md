# vscode项目风格统一配置

### 配置文件

在项目根目录新建.vscode/extensions.json文件

```js
{
    "recommendations": [
        "dbaeumer.vscode-eslint",
        "formulahendry.auto-close-tag",
        "formulahendry.auto-rename-tag",
        "whtouche.vscode-js-console-utils",
        "hzwuxinhan.goto",
        "obkoro1.korofileheader",
        "felipecaputo.git-project-manager",
        "christian-kohler.npm-intellisense",
        "christian-kohler.path-intellisense",
        "pnp.polacode",
        "koppt.vscode-view-in-browser",
        "esbenp.prettier-vscode",
        "sleistner.vscode-fileutils",
        "aaron-bond.better-comments",
        "eamodio.gitlens",
        "formulahendry.code-runner",
        "shd101wyy.markdown-preview-enhanced",
        "wallabyjs.quokka-vscode",
        "wayou.vscode-todo-highlight",
        "jasonnutter.search-node-modules"
    ]
}
```

### 使用方式

新成员打开extensions列表，接着打开filter extensions -> recommended，就会显示配置文件里的所有插件，并进行安装即可。