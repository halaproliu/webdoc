# 从 0 构建自己的脚手架CLI知识体系（万字）

搭建脚手架的目的就是**快速的搭建项目的基本结构并提供项目规范和约定**。目前日常工作中常用的脚手架有 vue-cli、create-react-app、angular-cli 等等，都是通过简单的初始化命令，完成内容的快速构建。

脚手架是我们经常使用的工具，也是团队提效的重要手段。所以系统性的掌握脚手架相关知识，对前端开发者来说是非常重要的，即使很多人今后不一定都会参与到各自部门或者公司的基建工作，但是系统性掌握好这个技能也可以方便我们后期的源码阅读。**下面就一起来了解一下吧** 😉

## 一、脚手架的简单雏形 🐣

> **脚手架就是在启动的时候询问一些简单的问题，并且通过用户回答的结果去渲染对应的模板文件**，基本工作流程如下：
> 
> 1.  通过命令行交互询问用户问题
> 2.  根据用户回答的结果生成文件

例如我们在使用 [vue-cli](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fcreating-a-project.html "https://cli.vuejs.org/zh/guide/creating-a-project.html") 创建一个 vue 项目时的时候 👇

**step1：运行创建命令**

```
$ vue create hello-world
```

**step2：询问用户问题**

![cli-new-project.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/112909c003634b48a2e3f5e9be15501e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

![cli-select-features.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ebe1cdcdc004beaa74058b42e14136a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

**step3：生成符合用户需求的项目文件**

```
# 忽略部分文件夹
vue-project
├─ index.html
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  └─ HelloWorld.vue
│  ├─ main.js
│  └─ router
│     └─ index.js
└─ package.json
```

参考上面的流程我们可以自己来 **搭建一个简单的脚手架雏形**

### 1\. 在命令行启动 cli

**目标：** 实现在命令行执行 `my-node-cli` 来启动我们的脚手架

#### 1.1 新建项目目录 my-node-cli

```
$ mkdir my-node-cli 
$ cd my-node-cli 
$ npm init # 生成 package.json 文件
```

#### 1.2 新建程序入口文件 cli.js

```
$ touch cli.js # 新建 cli.js 文件
```

在 package.json 文件中指定入口文件为 cli.js 👇

```
{
  "name": "my-node-cli",
  "version": "1.0.0",
  "description": "",
  "main": "cli.js",
  "bin": "cli.js", // 手动添加入口文件为 cli.js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

此时项目目录结构：

```
my-node-cli      
├─ cli.js        
└─ package.json     
```

打开 cli.js 进行编辑

```
#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log('my-node-cli working~')
```

#### 1.3 npm link 链接到全局

```
$ npm link # or yarn link
```

执行完成 ✅

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fb239ce03784d81b57e1bfa5fee09d9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

我们就可以来测试了，在命令行中输入 my-node-cli 执行一下

```
$ my-node-cli
```

这里我们就看到命令行中打印了

```
my-node-cli working~
```

完成 ✔，接下来

### 2\. 询问用户信息

实现与询问用户信息的功能需要引入 inquirer.js 👉 [文档看这里](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FSBoudrias%2FInquirer.js%2F "https://github.com/SBoudrias/Inquirer.js/")

```
$ npm install inquirer --dev # yarn add inquirer --dev
```

接着我们在 cli.js 来设置我们的问题

```
#! /usr/bin/env node

const inquirer = require('inquirer')

inquirer.prompt([
  {
    type: 'input', //type： input, number, confirm, list, checkbox ... 
    name: 'name', // key 名
    message: 'Your name', // 提示信息
    default: 'my-node-cli' // 默认值
  }
]).then(answers => {
  // 打印互用输入结果
  console.log(answers)
})

```

在命令行输入 my-node-cli 看一下执行结果

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b5cfbbc3be84045a25ac7da91ae5b05~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

这里我们就拿到了用户输入的项目名称 `{ name: 'my-app' }`, 👌

### 3\. 生成对应的文件

#### 3.1 新建模版文件夹

```
$ mkdir templates # 创建模版文件夹 
```

#### 3.2 新建 index.html 和 common.css 两个简单的示例文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>
    <!-- ejs 语法 -->
    <%= name %>
  </title>
</head>
<body>
  <h1><%= name %></h1>
</body>

</html>
```

```
/* common.css */
body {
  margin: 20px auto;
  background-color: azure;
}
```

此时的目录结构

```
my-node-cli           
├─ templates          
│  ├─ common.css      
│  └─ index.html      
├─ cli.js             
├─ package-lock.json  
└─ package.json       
```

#### 3.3 接着完善文件生成逻辑

这里借助 ejs 模版引擎将用户输入的数据渲染到模版文件上

```
npm install ejs --save # yarn add ejs --save
```

完善后到 cli.js 👇

```
#! /usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input', //type：input,confirm,list,rawlist,checkbox,password...
    name: 'name', // key 名
    message: 'Your name', // 提示信息
    default: 'my-node-cli' // 默认值
  }
]).then(answers => {
  // 模版文件目录
  const destUrl = path.join(__dirname, 'templates'); 
  // 生成文件目录
  // process.cwd() 对应控制台所在目录
  const cwdUrl = process.cwd();
  // 从模版目录中读取文件
  fs.readdir(destUrl, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      // 使用 ejs 渲染对应的模版文件
      // renderFile（模版文件地址，传入渲染数据）
      ejs.renderFile(path.join(destUrl, file), answers).then(data => {
        // 生成 ejs 处理后的模版文件
        fs.writeFileSync(path.join(cwdUrl, file) , data)
      })
    })
  })
})
```

同样，在控制台执行一下 my-node-cli ，此时 `index.html`、`common.css` 已经成功创建 ✔

我们打印一下当前的目录结构 👇

```
my-node-cli           
├─ templates          
│  ├─ common.css      
│  └─ index.html      
├─ cli.js             
├─ common.css .................... 生成对应的 common.css 文件        
├─ index.html .................... 生成对应的 index.html 文件        
├─ package-lock.json  
└─ package.json       
```

打开生成的 index.html 文件看一下

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- ejs 语法 -->
  <title>
    my-app
  </title>
</head>

<body>
  <h1>my-app</h1>
</body>

</html>
```

用户输入的 `{ name: 'my-app' }` 已经添加到了生成的文件中了 ✌️

点此打开 👉 [my-node-cli 源码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FT-Roc%2Fmy-node-cli "https://github.com/T-Roc/my-node-cli")

## 二、热门脚手架工具库 🔧

实际生产中搭建一个脚手架或者阅读其他脚手架源码的时候需要了解下面这些工具库 👇

| 名称 | 简介 |
| --- | --- |
| [commander](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftj%2Fcommander.js%2Fblob%2Fmaster%2FReadme_zh-CN.md "https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md") | 命令行自定义指令 |
| [inquirer](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FSBoudrias%2FInquirer.js%2F "https://github.com/SBoudrias/Inquirer.js/") | 命令行询问用户问题，记录回答结果 |
| [chalk](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fchalk "https://www.npmjs.com/package/chalk") | 控制台输出内容样式美化 |
| [ora](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fora "https://www.npmjs.com/package/ora") | 控制台 loading 样式 |
| [figlet](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffiglet "https://www.npmjs.com/package/figlet") | 控制台打印 logo |
| [easy-table](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feasy-table "https://www.npmjs.com/package/easy-table") | 控制台输出表格 |
| [download-git-repo](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fdownload-git-repo "https://www.npmjs.com/package/download-git-repo") | 下载远程模版 |
| [fs-extra](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffs-extra "https://www.npmjs.com/package/fs-extra") | 系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API |
| [cross-spawn](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcross-spawn "https://www.npmjs.com/package/cross-spawn") | 支持跨平台调用系统上的命令 |

重点介绍下面这些，其他工具可以查看说明文档

### 1\. commander 自定义命令行指令

更多用法 👉 [中文文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftj%2Fcommander.js%2Fblob%2Fmaster%2FReadme_zh-CN.md "https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md")

简单案例 👇

#### 1.1 新建一个简单的 Node Cli 项目

```
// package.json
{
  "name": "my-vue",
  "version": "1.0.0",
  "description": "",
  "bin": "./bin/cli.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "T-Roc",
  "license": "ISC",
  "devDependencies": {
    "commander": "^7.2.0"
  }
}
```

目录结构：

```
npms-demo             
├─ bin                
│  └─ cli.js          
├─ package-lock.json  
└─ package.json              
```

#### 1.3 引入 commander 编写代码

```
# 安装依赖
npm install commander # yarn add commander 
```

完善 bin.js 代码

```
#! /usr/bin/env node

const program = require('commander')

program
.version('0.1.0')
.command('create <name>')
.description('create a new project')
.action(name => { 
    // 打印命令行输入的值
    console.log("project name is " + name)
})

program.parse()
```

#### 1.3 npm link 链接到全局

-   执行 `npm link` 将应用 `my-vue` 链接到全局
-   完成之后，在命令行中执行 `my-vue`

看一下，命令行中的输出内容 👇

```
~/Desktop/cli/npms-demo ->my-vue

Usage: my-vue [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  create <name>   create a new project
  help [command]  display help for command
```

这个时候就有了 `my-vue` 命令使用的说明信息，在 Commands 下面出现了我们刚刚创建的 create 命令 `create <name>`，我们在命令行中运行一下

```
~/Desktop/cli/npms-demo ->my-vue create my-app
project name is my-app
```

这个时候控制台就打印出来 create 命令后面的 `<name>` 值 `my-app` 👏

### 2\. chalk 命令行美化工具

chalk（粉笔）可以**美化我们在命令行中输出内容的样式**，例如对重点信息添加颜色

#### 2.1 安装依赖

```
npm install chalk # yarn add chalk
```

#### 2.2 基本使用

在 npms-demo 项目中打开 bin/cli.js

```
#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program
.version('0.1.0')
.command('create <name>')
.description('create a new project')
.action(name => { 
    // 打印命令行输入的值

    // 文本样式
    console.log("project name is " + chalk.bold(name))

    // 颜色
    console.log("project name is " + chalk.cyan(name))
    console.log("project name is " + chalk.green(name))

    // 背景色
    console.log("project name is " + chalk.bgRed(name))

    // 使用RGB颜色输出
    console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
    console.log("project name is " + chalk.hex('#049CDB').bold(name));
    console.log("project name is " + chalk.bgHex('#049CDB').bold(name))
})

program.parse()
```

在命令行中运行项目 `my-vue create my-app` 看一下效果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c93b32477ee741688a3439d387d622ca~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

具体的样式对照表如下 👇

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ee03ccfefa54bf38900cd372560c927~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 3\. inquirer 命令行交互工具

更多用法 👉 [文档地址](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Finquirer "https://www.npmjs.com/package/inquirer")

inquirer 在脚手架工具中的**使用频率是非常高**的，其实在上文**脚手架的简单雏形**中，我们已经使用到了，这里就不过多介绍了。

### 4\. ora 命令行 loading 动效

更多用法 👉 [文档地址](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fora "https://www.npmjs.com/package/ora")

```
// 自定义文本信息
const message = 'Loading unicorns'
// 初始化
const spinner = ora(message);
// 开始加载动画
spinner.start();

setTimeout(() => {
    // 修改动画样式

    // Type: string
    // Default: 'cyan'
    // Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
    spinner.color = 'red';    
    spinner.text = 'Loading rainbows';

    setTimeout(() => {
        // 加载状态修改
        spinner.stop() // 停止
        spinner.succeed('Loading succeed'); // 成功 ✔
        // spinner.fail(text?);  失败 ✖
        // spinner.warn(text?);  提示 ⚠
        // spinner.info(text?);  信息 ℹ
    }, 2000);
}, 2000);
```

命令行是输出效果如下

![QQ20210516-173914-HD.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71843c4048f843dabfc0d679b5e608a9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 5\. cross-spawn 跨平台 shell 工具

更多用法 👉 [文档地址](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcross-spawn "https://www.npmjs.com/package/cross-spawn")

在脚手架里面，可以用来自动执行 shell 命令，例如：

```
#! /usr/bin/env node 

const spawn = require('cross-spawn');
const chalk = require('chalk')

// 定义需要按照的依赖
const dependencies = ['vue', 'vuex', 'vue-router'];

// 执行安装
const child = spawn('npm', ['install', '-D'].concat(dependencies), { 
    stdio: 'inherit' 
});

// 监听执行结果
child.on('close', function(code) {
    // 执行失败
    if(code !== 0) {
        console.log(chalk.red('Error occurred while installing dependencies!'));
        process.exit(1);
    }
    // 执行成功
    else {
        console.log(chalk.cyan('Install finished'))   
    }
})
```

同样的在命令行执行一下 `my-vue` 看一下执行结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d805fb04d6cb46719b9578c3baa6631b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

成功安装 👍

## 三、搭建自己的脚手架 🏗

先给我们的脚手架起个名字吧，正好祝融号登陆了火星，不如就叫：**zhurong-cli** 😆

```
   .-') _  ('-. .-.             _  .-')                    .-') _             
  (  OO) )( OO )  /            ( \( -O )                  ( OO ) )            
,(_)----. ,--. ,--. ,--. ,--.   ,------.  .-'),-----. ,--./ ,--,'  ,----.     
|       | |  | |  | |  | |  |   |   /`. '( OO'  .-.  '|   \ |  |\ '  .-./-')  
'--.   /  |   .|  | |  | | .-') |  /  | |/   |  | |  ||    \|  | )|  |_( O- ) 
(_/   /   |       | |  |_|( OO )|  |_.' |\_) |  |\|  ||  .     |/ |  | .--, \ 
 /   /___ |  .-.  | |  | | `-' /|  .  '.'  \ |  | |  ||  |\    | (|  | '. (_/ 
|        ||  | |  |('  '-'(_.-' |  |\  \    `'  '-'  '|  | \   |  |  '--'  |  
`--------'`--' `--'  `-----'    `--' '--'     `-----' `--'  `--'   `------' 
```

**需要实现哪些基本功能：**

1.  通过 `zr create <name>` 命令启动项目
2.  询问用户需要选择需要下载的模板
3.  远程拉取模板文件

**搭建步骤拆解：**

1.  创建项目
2.  创建脚手架启动命令（使用 commander）
3.  询问用户问题获取创建所需信息（使用 inquirer）
4.  下载远程模板（使用 download-git-repo）
5.  发布项目

### 1\. 创建项目

参照前面的例子，先创建一个简单的 Node-Cli 结构

```
zhurong-cli           
├─ bin                
│  └─ cli.js  # 启动文件      
├─ README.md          
└─ package.json       
```

配置脚手架启动文件

```
{
  "name": "zhurong-cli",
  "version": "1.0.0",
  "description": "simple vue cli",
  "main": "index.js",
  "bin": {
    "zr": "./bin/cli.js" // 配置启动文件路径，zr 为别名
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": {
    "name": "T-Roc",
    "email": "lxp_work@163.com"
  },
  "license": "MIT"
}
```

简单编辑一下我们的 cli.js

```
#! /usr/bin/env node

console.log('zhurong-cli working ~')
```

为了方便开发调试，使用 `npm link` 链接到全局

```
~/Desktop/cli/zhurong-cli ->npm link
npm WARN zhurong-cli@1.0.0 No repository field.

up to date in 1.327s
found 0 vulnerabilities

/usr/local/bin/zr -> /usr/local/lib/node_modules/zhurong-cli/bin/cli.js
/usr/local/lib/node_modules/zhurong-cli -> /Users/Desktop/cli/zhurong-cli
```

完成之后，接着测试一下

```
~/Desktop/cli/zhurong-cli ->zr
zhurong-cli working ~ # 打印内容
```

OK，得到了我们想要的打印内容，接下来

### 2\. 创建脚手架启动命令

**简单分析一下我们要怎么做？**

1.  首先我们要借助 commander 依赖去实现这个需求
2.  参照 vue-cli 常用的命令有 create、config 等等，在最新版本中可以使用 vue ui 进行可视化创建
3.  如果创建的存在，需要提示是否覆盖

现在开始吧 😉

#### 2.1 安装依赖

```
$ npm install commander --save
```

安装完成之后 👇

#### 2.2 创建命令

打开 cli.js 进行编辑

```
#! /usr/bin/env node

const program = require('commander')

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    console.log('name:',name,'options:',options)
  })
  
program
   // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
  
// 解析用户执行命令传入参数
program.parse(process.argv);
```

在命令行输入 zr，检查一下命令是否创建成功

```
~/Desktop/cli/zhurong-cli ->zr
Usage: zr <command> [option]

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create [options] <app-name>  create a new project
  help [command]               display help for command
```

我们可以看到 Commands 下面已经有了 `create [options] <app-name>`，接着执行一下这个命令

```
~/Desktop/cli/zhurong-cli ->zr create
error: missing required argument 'app-name'

~/Desktop/cli/zhurong-cli ->zr create my-project
执行结果 >>> name: my-project options: {}

~/Desktop/cli/zhurong-cli ->zr create my-project -f
执行结果 >>> name: my-project options: { force: true }

~/Desktop/cli/zhurong-cli ->zr create my-project --force
执行结果 >>> name: my-project options: { force: true }
```

成功拿到命令行输入信息 👍

#### 2.3 执行命令

创建 lib 文件夹并在文件夹下创建 create.js

```
// lib/create.js

module.exports = async function (name, options) {
  // 验证是否正常取到值
  console.log('>>> create.js', name, options)
}
```

在 cli.js 中使用 create.js

```
// bin/cli.js

......
program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist') // 是否强制创建，当文件夹已经存在
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    require('../lib/create.js')(name, options)
  })
......
```

执行一下 `zr create my-project`，此时在 create.js 正常打印了我们出入的信息

```
~/Desktop/cli/zhurong-cli ->zr create my-project
>>> create.js
my-project {}
```

在创建目录的时候，需要思考一个问题：**目录是否已经存在？**

1.  如果存在
    -   当 `{ force: true }` 时，直接移除原来的目录，直接创建
    -   当 `{ force: false }` 时 询问用户是否需要覆盖
2.  如果不存在，直接创建

这里用到了 fs 的扩展工具 [fs-extra](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffs-extra "https://www.npmjs.com/package/fs-extra")，先来安装一下

```
# fs-extra 是对 fs 模块的扩展，支持 promise 
$ npm install fs-extra --save
```

我们接着完善一下 create.js 内部的实现逻辑

```
// lib/create.js

const path = require('path')
const fs = require('fs-extra')

module.exports = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {

    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
    }
  }
}
```

询问部分的逻辑，我们将在下文继续完善

#### 2.3 创建更多命令

如果想添加其他命令也是同样的处理方式，这里就不扩展说明了，示例如下 👇

```
// bin/cli.js

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })
```

#### 2.4 完善帮助信息

我们先看一下 vue-cli 执行 --help 打印的信息

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea06d4eaa8a344b9b74ea3286f2bd8fc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

对比 `zr --help` 打印的结果，结尾处少了一条说明信息，这里我们做补充，重点需要注意**说明信息是带有颜色的**，这里就需要用到我们工具库里面的 [chalk](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fchalk "https://www.npmjs.com/package/chalk") 来处理

```
// bin/cli.js

program
  // 监听 --help 执行
  .on('--help', () => {
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
  })

```

#### 2.5 打印个 Logo

如果此时我们想给脚手架整个 Logo，工具库里的 [figlet](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffiglet "https://www.npmjs.com/package/figlet") 就是干这个的 😎

```
// bin/cli.js

program
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('zhurong', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
  })

```

我们再看看此时的 `zr --help` 打印出来的是个什么样子

![WX20210519-224306@2x.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83e5997df127452e8fe0f7b0bc1db70b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

看起来还是挺不错的，哈哈 😄

### 3\. 询问用户问题获取创建所需信息

这里召唤我们的老朋友 [inquirer](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Finquirer "https://www.npmjs.com/package/inquirer")，让他来帮我们解决命令行交互的问题

**接下来我们要做的：**

1.  上一步遗留：询问用户是否覆盖已存在的目录
2.  用户选择模板
3.  用户选择版本
4.  获取下载模板的链接

#### 3.1 询问是否覆盖已存在的目录

这里解决上一步遗留的问题：

1.  如果目录已存在
    -   当 `{ force: false }` 时 询问用户是否需要覆盖

逻辑实际上已经完成，这里补充一下询问的内容

首选来安装一下 [inquirer](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffiglet "https://www.npmjs.com/package/figlet")

```
$ npm install inquirer --save
```

然后询问用户是否进行 Overwrite

```
// lib/create.js

const path = require('path')

// fs-extra 是对 fs 模块的扩展，支持 promise 语法
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {

    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {

      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  }
}
```

我们来测试一下：

1.  在当前目录，即命令行中显示的目录下手动创建2个目录，这里随便取名为 my-project 和 my-project2
2.  执行 `zr create my-project`，效果如下

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74c9cb996fa04644a7dbcc2ea5039593~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

3.  执行 `zr create my-project2 --f`，可以直接看到 my-project2 被移除

**⚠️注意：为什么这里只做移除？** 因为后面获取到模板地址后，下载的时候会直接创建项目目录

#### 3.2 如何获取模版信息

模板我已经上传到远程仓库：[github.com/zhurong-cli](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fzhurong-cli "https://github.com/zhurong-cli")

![WX20210520-221040.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2fe38a3ee81465ca7c0235e5eb921ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

vue3.0-template 版本信息 👇

![WX20210520-220540.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46ba6f0154264982bf0867b29cdca1e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

vue-template 版本信息 👇

![WX20210520-221400.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74eedb3fe7a54164a48363c93d3f2156~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

github 提供了

-   [api.github.com/orgs/zhuron…](https://link.juejin.cn/?target=https%3A%2F%2Fapi.github.com%2Forgs%2Fzhurong-cli%2Frepos "https://api.github.com/orgs/zhurong-cli/repos") 接口获取模板信息
-   [api.github.com/repos/zhuro…](https://link.juejin.cn/?target=https%3A%2F%2Fapi.github.com%2Frepos%2Fzhurong-cli%2F%24%257Brepo%257D%2Ftags "https://api.github.com/repos/zhurong-cli/$%7Brepo%7D/tags") 接口获取版本信息

我们在 lib 目录下创建一个 http.js 专门处理模板和版本信息的获取

```
// lib/http.js

// 通过 axios 处理请求
const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})


/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return axios.get('https://api.github.com/orgs/zhurong-cli/repos')
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}
```

#### 3.3 用户选择模板

我们专门新建一个 Generator.js 来处理项目创建逻辑

```
// lib/Generator.js

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 核心创建逻辑
  create(){

  }
}

module.exports = Generator;
```

在 create.js 中引入 Generator 类

```
// lib/create.js

...
const Generator = require('./Generator')

module.exports = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    ...
  }

  // 创建项目
  const generator = new Generator(name, targetAir);

  // 开始创建项目
  generator.create()
}

```

接着来写询问用户选择模版都逻辑

```
// lib/Generator.js

const { getRepoList } = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  } 
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    // 3）return 用户选择的名称
    return repo;
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo()
    
    console.log('用户选择了，repo=' + repo)
  }
}

module.exports = Generator;
```

测试一下，看看现在是个什么样子

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61ca9d00cdd94af5ab5322ada3693ef0~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

我选择了默认的 vue-template，此时

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9ff4d63105540b38e222447c724acac~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

成功拿到模板名称 repo 的结果 ✌️

#### 3.4 用户选择版本

过程和 3.3 一样

```
// lib/generator.js

const { getRepoList, getTagList } = require('./http')
...

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  ...
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    ...
  }

  // 获取用户选择的版本
  // 1）基于 repo 结果，远程拉取对应的 tag 列表
  // 2）用户选择自己需要下载的 tag
  // 3）return 用户选择的 tag

  async getTag(repo) {
    // 1）基于 repo 结果，远程拉取对应的 tag 列表
    const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
    if (!tags) return;
    
    // 过滤我们需要的 tag 名称
    const tagsList = tags.map(item => item.name);

    // 2）用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Place choose a tag to create project'
    })

    // 3）return 用户选择的 tag
    return tag
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo()

    // 2) 获取 tag 名称
    const tag = await this.getTag(repo)
     
    console.log('用户选择了，repo=' + repo + '，tag='+ tag)
  }
}

module.exports = Generator;
```

测试一下，执行 `zr create my-project`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b584c81cc000417fbfa8823bb2f4fca6~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

选择好了之后，看看打印结果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9990a61710c44c67bdaa80562558a075~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

到此询问的工作就结束了，可以进行模板下载了

### 4\. 下载远程模板

下载远程模版需要使用 [download-git-repo](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fdownload-git-repo "https://www.npmjs.com/package/download-git-repo") 工具包，实际上它也在我们上面列的工具菜单上，但是在使用它的时候，需要注意一个问题，就是它是**不支持 promise**的，所以我们这里需要使用 使用 util 模块中的 [promisify](https://link.juejin.cn/?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Futil.html%23util_util_promisify_original "http://nodejs.cn/api/util.html#util_util_promisify_original") 方法对其进行 promise 化

#### 4.1 安装依赖与 promise 化

```
$ npm install download-git-repo --save
```

进行 promise 化处理

```
// lib/Generator.js

...
const util = require('util')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise

class Generator {
  constructor (name, targetDir){
    ...

    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  
  ...
}
```

#### 4.2 核心下载功能

接着，就是模板下载部分的逻辑了

```
// lib/Generator.js

...
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  ...
}

class Generator {
  constructor (name, targetDir){
    ...

    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  ...
  
  // 下载远程模板
  // 1）拼接下载地址
  // 2）调用下载方法
  async download(repo, tag){

    // 1）拼接下载地址
    const requestUrl = `zhurong-cli/${repo}${tag?'#'+tag:''}`;

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  // 4）模板使用提示
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo()

    // 2) 获取 tag 名称
    const tag = await this.getTag(repo)

    // 3）下载模板到模板目录
    await this.download(repo, tag)
    
    // 4）模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')
  }
}

module.exports = Generator;
```

完成这块，一个简单的脚手架就完成了 ✅

来试一下效果如何，执行 `zr create my-project`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da78f3e3e13a474fafc745f7ae67b8c3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

这个时候，我们就可以看到模板就已经创建好了 👏👏👏

```
zhurong-cli                 
├─ bin                      
│  └─ cli.js                
├─ lib                      
│  ├─ Generator.js          
│  ├─ create.js             
│  └─ http.js               
├─ my-project .............. 我们创建的项目             
│  ├─ public                
│  │  ├─ favicon.ico        
│  │  └─ index.html         
│  ├─ src                   
│  │  ├─ assets             
│  │  │  └─ logo.png        
│  │  ├─ components         
│  │  │  └─ HelloWorld.vue  
│  │  ├─ App.vue            
│  │  └─ main.js            
│  ├─ README.md             
│  ├─ babel.config.js       
│  └─ package.json          
├─ README.md                
├─ package-lock.json        
└─ package.json             

```

### 5\. 发布项目

上面都是在本地测试，实际在使用的时候，可能就需要发布到 npm 仓库，通过 npm 全局安装之后，直接到目标目录下面去创建项目，如何发布呢？

1.  第一步，在 git 上建好仓库
2.  第二步，完善 package.json 中的配置

```
{
  "name": "zhurong-cli",
  "version": "1.0.4",
  "description": "",
  "main": "index.js",
  "bin": {
    "zr": "./bin/cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "files": [
    "bin",
    "lib"
  ],
  "author": {
    "name": "T-Roc",
    "email": "lxp_work@163.com"
  },
  "keywords": [
    "zhurong-cli",
    "zr",
    "脚手架"
  ],
  "license": "MIT",
  "dependencies": {
    "axios": "^0.21.1",
    "chalk": "^4.1.1",
    "commander": "^7.2.0",
    "download-git-repo": "^3.0.2",
    "figlet": "^1.5.0",
    "fs-extra": "^10.0.0",
    "inquirer": "^8.0.0",
    "ora": "^5.4.0"
  }
}

```

3.  第三步，使用 `npm publish` 进行发布，更新到时候，注意修改版本号

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ba9bddedd1d41288d35003fcbbf43f9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

这样就发布成功了，我们打开 npm 网站搜索一下 🔍

![WX20210522-220454@2x.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76394ce2d2e0445c84f3478b611a610c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

已经可以找到它了，这样我们就可以通过 npm 或者 yarn 全局安装使用了

点此打开 👉 [zhurong-cli 源码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FT-Roc%2Fzhurong-cli.git "https://github.com/T-Roc/zhurong-cli.git")

## 四、Yeoman：一个通用的脚手架系统

![yeoman.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14549fefe4ca4d0cbaa25a52d1dbb3ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

> Yeoman 最初发布于 2012 年，它是一款高效、开源的 Web 应用脚手架（scaffolding）软件，意在精简软件的开发过程。脚手架软件用于实现项目中多种不同的工具和接口的协同使用，优化项目的生成过程。允许创建任何类型的应用程序（Web，Java，Python，C＃等)。  

Yeoman 实际上是**三个工具**的总和：

-   yo --- 脚手架，自动生成工具
-   grunt、gulp --- 构建工具
-   bower、npm --- 包管理工具

使用 Yeoman 搭建脚手架非常简单，Yeoman 提供了 `yeoman-generator` 让我们快速生成一个脚手架模板，我们可以通过各类 Generator 实现任何类型的项目搭建，下面我们来试一下 🤓

### 1\. Yeoman 基础使用

Yeoman 是一套构建系统，在这里我们搭建脚手架需要使用的就是 yo 👇

#### 1.1 全局范围安装 yo

```
$ npm install yo --global # or yarn global add yo
```

#### 1.2 安装对应的 generator

yo 搭配不同 `generator-xxx` 可以创建对应的项目，例如 `generator-webapp`、`generator-node`、`generator-vue` 等等，这里我们使用 `generator-node` 来演示操作。

```
$ npm install generator-node --global # or yarn global add generator-node
```

#### 1.3 通过 yo 运行 generator

```
$ mkdir yo-project
$ cd yo-project
$ yo node
```

这样我们就通过 `yo + generator-node` 快捷搭建一个 node 项目，目录结构如下 👇

```
yo-project
├─ .editorconfig
├─ .eslintignore
├─ .travis.yml
├─ .yo-rc.json
├─ LICENSE
├─ README.md
├─ lib
│  ├─ __tests__
│  │  └─ testCli.test.js
│  └─ index.js
├─ package-lock.json
└─ package.json          

```

如何查找自己需要的 generator 呢？我们可以去官网 generators 列表搜索 👉 [点此进入](https://link.juejin.cn/?target=https%3A%2F%2Fyeoman.io%2Fgenerators%2F "https://yeoman.io/generators/")

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/818b143d85864d408f456de12dedf92d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

这种使用方式真的非常的简单方便，但是它的问题也很明显--**不够灵活**，毕竟不同的团队在使用的技术栈上都有所差异，**如果我们想搭建自己想要的项目结构要怎么处理呢？** 接着往下看 👇

### 2\. 自定义 Generator

自定义 Generator **实际上就是创建一个特定结构的 npm 包**，这个特定的结构是这样的 👇

```
generator-xxx ............ 自定义项目目录  
├─ generators ............ 生成器目录   
│  └─ app ................ 默认生成器目录      
│     └─ index.js ........ 默认生成器实现
└─ package.json .......... 模块包配置文件
```

或者这样的 👇

```
generator-xxx   
├─ app           
│  └─ index.js     
├─ router        
│  └─ index.js   
└─ package.json  
```

这里我们需要注意的是，项目的名称必须是 `generator-<name>` 格式，才可以正常被 yo 识别出来，例如上面举例使用的 generator-node。

#### 2.1 创建项目

```
$ mkdir generator-simple # 创建项目
$ cd generator-simple    # 进入项目目录
```

#### 2.2 初始化 npm

```
$ npm init # or yarn init
```

一路 enter 之后我们就生成好了 package.json，不过我们还需要额外检查一下：

-   `name` 属性值须是 "generator-<name>"
-   `keyword` 中必须包含 yeoman-generator
-   `files` 属性要指向项目的模板目录。

完成上面的工作之后我们看一下 package.json 是个什么样子

```
{
  "name": "generator-simple",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [ 
    "yeoman-generator" 
  ],
  "files": [
    "generators"
  ],
  "author": "ITEM",
  "license": "MIT"
}
```

⚠️注意：这里如果使用的是第二种目录结构，那么 package.json 中需要做点修改 🔧

```
{
  "files": [
    "app",
    "router"
  ]
}
```

#### 2.3 安装 `yeoman-generator`

`yeoman-generator` 是 Yeoman 提供的一个 Generator 基类，让我们在创建自定义 Generator 的时候更加便捷。

```
$ npm install yeoman-generator --save # or yarn add yeoman-generator 
```

#### 2.4 Generator 基类的使用说明

在介绍 Generator 基类之前，我们先来实现一个简单的 🌰

首先打开核心入口文件，编辑内容如下 👇

```
// ～/generators/app/index.js

// 此文件作为 Generator 的核心入口
// 需要导出一个继承自 Yeoman Generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // add your own methods
  method1() {
    console.log('I am a custom method');
  }
  method2() {
    console.log('I am a custom method2');
  }
};

```

完成之后，我们通过 `npm link` 的方式把项目链接到全局

```
$ npm link # or yarn link
```

这样我们就可以在全局去访问到 generator-simple 项目了，我们来试一下

```
$ yo simple
```

看一下控制台的输出

```
I am a custom method1
I am a custom method2
```

OK，是我们想要的结果 😎

⚠️ **注意**，如果运行`yo simple` 出现下面的错误

```
This generator (simple:app) 
requires yeoman-environment at least 3.0.0, current version is 2.10.3,
try reinstalling latest version of 'yo' or use '--ignore-version-check' option
```

可以这样处理：

方案一

```
# 卸载当前版本
npm uninstall yeoman-generator

# 安装低版本的包
npm i yeoman-generator@4.13.0

# 执行
yo simple
```

方案二

```
# 全局安装模块
npm i -g yeoman-environment

# 新的执行方式(yoe没有打错)
yoe run simple
```

从上面的小 🌰 我们可以看到我们自定义方法是自动顺序执行，Generator 基类也提供了一些顺序执行的方法，类似于生命周期一样，我们看一下有哪些 👇

> 1.  `initializing` -- 初始化方法（检查状态、获取配置等）  
>     
> 2.  `prompting` -- 获取用户交互数据（this.prompt()）  
>     
> 3.  `configuring` -- 编辑和配置项目的配置文件  
>     
> 4.  `default` -- 如果 Generator 内部还有不符合任意一个任务队列任务名的方法，将会被放在 default 这个任务下进行运行  
>     
> 5.  `writing` -- 填充预置模板  
>     
> 6.  `conflicts` -- 处理冲突（仅限内部使用）  
>     
> 7.  `install` -- 进行依赖的安装（eg：npm，bower）  
>     
> 8.  `end` -- 最后调用，做一些 clean 工作  
>     

#### 2.5 开始我们的自定义 Generator

我们借助 Generator 提供的方法，我们对入口文件改造一下

```
// ～/generators/app/index.js

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // yo 会自动调用该方法
  writing () {
    // 我们使用 Generator 提供的 fs 模块尝试往目录中写入文件
    this.fs.write(
      // destinationPath() 基于项目地址
      this.destinationPath('temp.txt'), // 写入地址
      Math.random().toString() // 写入内容
    )
  }
};
```

运行一下看看

```
$ yo simple
```

这个时候，控制台输出出 `create temp.txt`，我们打印一下目录结构

```
generator-simple      
├─ generators         
│  └─ app             
│     └─ index.js     
├─ package-lock.json  
├─ package.json       
└─ temp.txt .............. writing 中创建的文件        
```

打开新创建的 temp.txt 瞅瞅

```
0.8115477932475306
```

可以看到文件中写入了一串随机数。

在实际使用的时候，我们需要通过模板去创建多个文件，这个时候我们就需要这样处理 👇

**首先**，创建模板文件目录 `./generators/app/templates/`，并在文件夹中新增一个模板文件 `temp.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- yo 支持 ejs 语法 -->
  <title><%= title %></title>
</head>
<body>
  <% if (success) { %>
    <h1>这里是模版文件<%= title %></h1>
  <% } %>
</body>
</html>
```

**然后**，修改一下入口文件 👇

```
// ～/generators/app/index.js

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // yo 会自动调用该方法
  writing () {
    // 我们使用 Generator 提供的 fs 模块尝试往目录中写入文件
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )

    // 模版文件路径，默认指向 templates
    const tempPath = this.templatePath('temp.html')
    // 输出目标路径
    const output = this.destinationPath('index.html')
    // 模板数据上下文
    const context = { title: 'Hello ITEM ~', success: true}

    this.fs.copyTpl(tempPath, output, context)
  }
};
```

**完成之后**，`yo simple` 运行一下，这样我们就在根目录下得到了 `index.html`，打开看看 🤓

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 支持 ejs 语法 -->
  <title>Hello ITEM ~</title>
</head>
<body>
  
    <h1>这里是模版文件Hello ITEM ~</h1>

</body>
</html>
```

ejs 写入的变量，都已经被数据成功替换了 ✌️

**接下来**，我们要如何通过命令行交互获取用户自定义的一些数据，例如：项目名称、版本号等等。

这个就需要借助 Generator 提供的 Promting 来处理命令行的一些交互

```
// ～/generators/app/index.js

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // 在此方法中可以调用父类的 prompt() 方法与用户进行命令行询问
  prompting(){
    return this.prompt([
      {
        type: 'input', // 交互类型
        name: 'name', 
        message: 'Your project name', // 询问信息
        default: this.appname // 项目目录名称，这里是 generator-simple
      }
    ])
    .then(answers => {
      console.log(answers) // 打印输入内容
      this.answers = answers // 存入结果，可以在后面使用
    })
  }
  // yo 会自动调用该方法
  writing () {
    ......
  }
};
```

保存之后，再运行 `yo simple`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d7360ec81a6422793f8befa4bcacc40~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

我们看到命令行询问了 `Your Project name ?`，在用户输入完成之后，我们拿到了 anwsers，这样我们就可以在接下来的流程里面去使用这个结果。

```
// ～/generators/app/index.js
...
// 模板数据上下文
 writing () {
    ...
    // 模板数据上下文
    const context = { title: this.answers.name, success: true}

    this.fs.copyTpl(tempPath, output, context)
  }
...
```

再运行一下 `yo simple`，查看输出的 index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 支持 ejs 语法 -->
  <title>my-project</title>
</head>
<body>
  
    <h1>这里是模版文件my-project</h1>
  
</body>
</html>
```

我们可以看到用户输入的内容 `{ name: 'my-project' }` 已经显示在我们的 index.html 里面了 👌

点此打开 👉 [generator-simple 源码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FT-Roc%2Fgenerator-simple "https://github.com/T-Roc/generator-simple")

yeoman 就介绍到这里，接下来我们来看另外一款脚手架工具 -- plop 👇

## 五、plop：一款小而美的脚手架工具

> plop 小在体积轻量，美在简单易用

更多使用方法 👉 [plop 使用文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fplopjs%2Fplop "https://github.com/plopjs/plop")

我们可以将其直接集成到项目中，解决一下重复性的活着需要标准化的创建工作，下面我们就来做个小案例，比如

**我们已经约定好了组件的创建规范**：

-   组件名称使用大驼峰
-   样式需要单独拧出来写
-   需要搭配说明文档

**plop 的使用过程大致可以拆解为**：

1.  安装 plop，新增配置文件 plopfile.js
2.  编辑 plop 配置文件
3.  创建模板文件
4.  执行创建任务

下面进入 coding 环节

### 1\. 安装 plop

首先用我们的 zhurong-cli 初始化一个 vue 项目

```
# 全局安装
$ npm install zhurong-cli -g 
# 创建 vue 项目
$ zr create plop-demo
```

我们这里为了团队统一使用，plop 直接就集成到项目之中

```
$ npm install plop --save-dev
```

项目目录下面创建 plop 的配置文件 plopfile.js

### 2\. 编辑 plop 配置文件

```
// ./plopfile.js

module.exports = plop => {
  plop.setGenerator('component', {
    // 描述
    description: 'create a component',
    // 询问组件的名称
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Your component name',
        default: 'MyComponent'
      }
    ],
    // 获取到回答内容后续的动作
    actions: [
      //每一个对象都是一个动作
      {
        type: 'add', // 代表添加文件
        // 被创建文件的路径及名称
        // name 为用户输入的结果，使用 {{}} 使用变量
        // properCase: plop 自带方法，将 name 转换为大驼峰
        path: 'src/components/{{ properCase name }}/index.vue',
        // 模板文件地址
        templateFile: 'plop-templates/component.vue.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{ properCase name }}/index.scss',
        templateFile: 'plop-templates/component.scss.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{ properCase name }}/README.md',
        templateFile: 'plop-templates/README.md.hbs'
      }
    ]
  })
}

```

上面用到 properCase 方法将 name 转化为大驼峰，其他格式还包括 👇

-   `camelCase`: changeFormatToThis
-   `snakeCase`: change\_format\_to\_this
-   `dashCase/kebabCase`: change-format-to-this
-   `dotCase`: change.format.to.this
-   `pathCase`: change/format/to/this
-   `properCase/pascalCase`: ChangeFormatToThis
-   `lowerCase`: change format to this
-   `sentenceCase`: Change format to this,
-   `constantCase`: CHANGE\_FORMAT\_TO\_THIS
-   `titleCase`: Change Format To This

我们看到上面已经引用了模板文件，实际上我们还没创建，接着创建一下

### 3\. 创建模板文件

项目文件夹下面创建 plop-templates 文件夹，里面创建对应的模板文件

```
plop-templates         
├─ README.md.hbs ............... 说明文档模板     
├─ component.scss.hbs .......... 组件样式模板
└─ component.vue.hbs ........... 组件模板
```

模板引擎我们用到是 Handlebars ，更多语法说明 👉 [Handlebars 中文网](https://link.juejin.cn/?target=https%3A%2F%2Fwww.handlebarsjs.cn%2F "https://www.handlebarsjs.cn/")

编辑 component.scss.hbs

```
{{!-- ./plop-templates/component.scss.hbs --}}
{{!-- dashCase/kebabCase: change-format-to-this --}}
{{!-- name: 输入模板名称 --}}

.{{ dashCase name }} {

}
```

编辑 component.vue.hbs

```
{{!-- ./plop-templates/component.vue.hbs --}}

<template>
  <div class="{{ dashCase name }}">{{ name }}</div>
</template>

<script>
  export default {
    name: '{{ properCase name }}',
  }
</script>

<style lang="scss">
@import "./index.scss";

</style>
```

编辑 README.md.hbs

```
{{!-- ./plop-templates/README.md.hbs --}}

这里是组件 {{ name }} 的使用说明
```

补充说明：

-   这里模板都是最简单实现，实际生产中可以根据需求丰富模板内容
-   模板中的 dashCase、properCase 为变更 name 命令的显示规则，上文已经列表过
    -   `dashCase`：变为横线链接 aa-bb-cc
    -   `properCase`：变为大驼峰 AaBbCc
    -   `...`
-   Handlebars 中使用变量，用 `{{}}` 包裹

### 4\. 执行创建任务

打开 package.json

```
// scripts 中 增加一条命令
...
"scripts": {
    ...
    "plop": "plop"
  },
...  
```

此时我们就可以使用 `npm run plop` 来创建组件了

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4983f9db608347f4b952f8de27c6bd3e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dceca1b12194d4b94503ea0a73ee8ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

很快组件就创建完成了 ✅

此时看一下 components 文件夹下面

```
components         
├─ MyApp           
│  ├─ README.md    
│  ├─ index.scss   
│  └─ index.vue    
└─ HelloWorld.vue  
```

已经创建了 MyApp 的组件了，里面的文件我们也打开看看

打开 MyApp/index.vue

```
<template>
  <div class="my-app">my-app</div>
</template>

<script>
  export default {
    name: 'MyApp',
  }
</script>

<style lang="scss">
@import "./index.scss";

</style>
```

打开 MyApp/index.scss

```
.my-app {

}
```

打开 MyApp/README.md

```
这里是组件 my-app 的使用说明
```

点此打开 👉 [plop-demo 源码地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FT-Roc%2Fplop-demo "https://github.com/T-Roc/plop-demo")

## 六、写在最后

不知道大家看完这篇文章，学废了吗 😂

本篇文章整理了很久，希望对大家的学习有所帮助 😁

另外也希望大家可以 **点赞 评论 关注** 支持一下，您的支持就是写作的动力 😘

预告一下，下一篇将带来 👉 **打包与构建工具相关的知识体系**

___

**参考文章：**

[github.com/CodeLittleP…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FCodeLittlePrince%2Fgenerator-zx-vue%2Fblob%2Fmaster%2Fgenerators%2Fapp%2Findex.js "https://github.com/CodeLittlePrince/generator-zx-vue/blob/master/generators/app/index.js")  
[cli.vuejs.org/zh/guide/cr…](https://link.juejin.cn/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fcreating-a-project.html "https://cli.vuejs.org/zh/guide/creating-a-project.html")  
[yeoman.io/authoring/i…](https://link.juejin.cn/?target=https%3A%2F%2Fyeoman.io%2Fauthoring%2Findex.html "https://yeoman.io/authoring/index.html")  
[www.jianshu.com/p/93211004c…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F93211004c5ac "https://www.jianshu.com/p/93211004c5ac")