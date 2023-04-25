# gitlab创建前端脚手架

### 项目入口文件

```js
// src/index.js
#! /usr/bin/env node
import fs from 'fs'
import path from 'path'
import * as commander from 'commander'
import figlet from 'figlet'
import chalk from 'chalk'
import create from './lib/create.js'
import { readFile } from "fs/promises"
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const packageJsonPath = path.join(__dirname, '../package.json')
const pkg = JSON.parse(await readFile(packageJsonPath))

const program = new commander.Command(pkg.name)

program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    create(name, options)
  })

// 配置版本号信息
program
  .version(pkg.version)
  .usage('<command> [option]')

  program
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('reactcli', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`react-cli <command> --help`)} show details\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv)

```

### 生成器

```js
// src/lib/Generator.js
import util from 'util'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import downloadGitRepo from 'download-git-repo'
import { getGroupList, getTagList, getBranchesList } from './http.js'
import * as config from './config/index.js'

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
    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  async getRepo() {
    // 1）从远程拉取模板数据
    const groupList = await wrapLoading(getGroupList, 'waiting fetch template', config.groupName);
    if (!groupList) return;
    const repoList = groupList.projects || [];

    // 过滤我们需要的模板名称
    const repos = repoList.filter(item => item.name !== 'cli').map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })

    const repoItem = repoList.find(item => item.name === repo) || {}

    // 3）return 用户选择的名称
    return repoItem;
  }

  // 获取用户选择的版本
  // 1）基于 repo 结果，远程拉取对应的 tag 列表
  // 2）用户选择自己需要下载的 tag
  // 3）return 用户选择的 tag

  async getTag(id) {
    // 1）基于 repo 结果，远程拉取对应的 tag 列表
    const tags = await wrapLoading(getTagList, 'waiting fetch tag', id);
    if (!tags) return;
    
    // 过滤我们需要的 tag 名称
    const tagsList = tags.map(item => item.name);
    let result = {}

    if (tagsList && tagsList.length) {
      // 2）用户选择自己需要下载的 tag
      result = await inquirer.prompt({
        name: 'tag',
        type: 'list',
        choices: tagsList,
        message: 'Place choose a tag to create project'
      })
    } else {

    }
    const { tag } = result;

    // 3）return 用户选择的 tag
    return tag
  }

  async getBranch(id) {
    const branches = await wrapLoading(getBranchesList, 'waiting fetch branch', id);
    if (!branches) return;

    const branchList = branches.map(item => item.name);
    // 2) 用户选择自己需要下载的branch
    const { branch } = await inquirer.prompt({
      name: 'branch',
      type: 'list',
      choices: branchList,
      message: 'Place choose a branch to create project'
    })
    return branch
  }

    // 下载远程模板
  // 1）拼接下载地址
  // 2）调用下载方法
  async download(repo, branch){

    // 1）拼接下载地址
    const requestUrl = `direct:${config.origin}/api/v4/projects/${repo.id}/repository/archive${branch ? `?sha=${branch}`: ''}`;
    
    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      'waiting download template', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir), // 参数2: 创建位置
      {
        headers: {
          'PRIVATE-TOKEN': config.accessToken
        }
      }
    )
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create(){

    // 1）获取模板名称
    const repoItem = await this.getRepo()
    const id = repoItem.id;

    // 2) 获取 tag 名称
    // const tag = await this.getTag(id)
    const branch = await this.getBranch(id)

    // 3）下载模板到模板目录
    await this.download(repoItem, branch)

    
    
    
  }
}

export default Generator;
```

### 创建

```js
// src/create.js
import path from 'path'
// fs-extra 是对 fs 模块的扩展，支持 promise 语法
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Generator from './generator.js';

export default async function (name, options) {
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
      console.log('action: ', action);

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  }

  // 创建项目
  const generator = new Generator(name, targetAir);
  // 开始创建项目
  generator.create()
}
```

### 工具方法


```js
// src/lib/util/getPkg.js

import fs from 'fs'
import path from 'path'

function getPackageJson (projectPath) {
  const packagePath = path.join(projectPath, 'package.json')

  let packageJson
  try {
    packageJson = fs.readFileSync(packagePath, 'utf-8')
  } catch (err) {
    throw new Error(`The package.json file at '${packagePath}' does not exist`)
  }

  try {
    packageJson = JSON.parse(packageJson)
  } catch (err) {
    throw new Error('The package.json is malformed')
  }

  return packageJson
}

export default getPackageJson
```

### 配置信息

```js
// src/lib/config/index.js
export const accessToken = 'xxxxxx'
export const origin = 'https://gitlab.com'
export const groupName = 'frontend'
```

### 请求api实现

```js
// src/lib/http.js
import axios from 'axios'
import * as config from './config/index.js'

const accessToken = config.accessToken
const baseURL = `${config.origin}/api/v4`
const service = axios.create({
  baseURL,
  timeout: 1000 * 60,
  // 允许跨域带token
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['PRIVATE-TOKEN'] = accessToken
  }
  return config;
})

service.interceptors.response.use(res => {
  const { status } = res;
  if (status === 200) {
    return res.data;
  } else {
    throw new Error('请求失败')
  }
})

/**
 * @description: 获取模板列表
 * @returns Promise
 */
export async function getGroupList(groupName) {
  return service.get(`/groups/${groupName}`)
}

/**
 * @description: 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
export async function getTagList(id) {
  return service.get(`/projects/${id}/repository/tags`)
}

/**
 * @description: 获取分支列表
 * @param {*} id
 * @return {*}
 */
export async function getBranchesList(id) {
  return service.get(`/projects/${id}/repository/branches`);
}
```

### gitlab api

> 请求gitlab api需要先申请access token,通过prefences->Access Tokens进行获取，一般身亲后只能看到一次token，需要及时保存

> 使用access token有两种方式，通过querystring的private_token添加，获取在headers中添加PRIVATE-TOKEN值

1. 获取所有projects

```bash
curl <gitlab_origin>/api/v4/projects?private_token=<your_access_token>

or

curl --header "PRIVATE-TOKEN: <your_access_token>" <gitlab_origin>/api/v4/projects/:id/repository/archive
```

2. 获取group下的所有项目

```bash
curl <gitlab_origin>/api/v4/groups/<group_name>?private_token=<your_access_token>
```

3. 获取指定project

```bash
curl <gitlab_origin>/api/v4/projects/:id/repository/tags?private_token=<your_access_token>
```

4. 获取所有分支列表

```bash
curl --header "PRIVATE-TOKEN: <your_access_token>" "<gitlab_origin>/api/v4/projects/:id/repository/branches"
```

5. 下载project

其中sha可以传branch或者tag，传path为只下载指定路径文件

```bash
curl --header "PRIVATE-TOKEN: <your_access_token>" <gitlab_origin>/api/v4/projects/:id/repository/archive?sha=<branch_name or tag_name>&path=<path>
```
