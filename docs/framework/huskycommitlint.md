# husky + commitlint配置

### husky作用

它会帮我们自动生成.git/hooks目录下的shell scrip， 从而实现git commit 的时候的验证。

### 安装git-hook工具

```js
yarn add husky -D
```

### 在当前目录下生成.husky文件夹，并删除里面的.gitignore忽略文件，否则无法将.husky下面的文件提交到git仓库

```js
npx husky install
```

### 在.husky文件夹下创建commit-msg文件

```js
npx husky add .husky/commit-msg
```

### 安装git 提交信息规范配置文件

```js
yarn add husky pre-commit lint-staged @commitlint/cli @commitlint/config-conventional -D
```

### 生成commitlint配置文件

```js
echo"module.exports = {extends: ['@commitlint/config-conventional']};"> commitlint.config.js 
```

### package.json添加配置

```js
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,js,vue}": [
      "npm run lint:nofix --production"
    ]
  }
```

### 常用提交类型

1. build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
2. chore 其他修改, 比如改变构建流程、或者增加依赖库、工具等
3. ci 持续集成修改
4. docs 文档修改
5. feat 新特性、新功能
6. fix 修改bug
7. perf 优化相关，比如提升性能、体验
8. refactor 代码重构
9. revert 回滚到上一个版本
10. style 代码格式修改, 注意不是 css 修改
11. test 测试用例修改

### 安装changelog自动化生成工具

```js
yarn add -D conventional-changelog-cli
```

### package.json的script中添加

```js
{
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
  "changelog:init": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
  "changelog:help": "conventional-changelog --help",
},
```

参数-p指定提交信息的规范，有以下选择：angular, atom, codemirror, ember, eslint, express, jquery, jscs or jshint
参数-s 表示将新生成的CHANGELOG输出到-i指定的文件中
参数-i 指定输出CHANGELOG内容的文件
参数-r默认为1，设为0将重新生成所有版本的变更信息