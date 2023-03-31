# ESLint常见配置

### 前言

eslint作为代码检查工具，已经融入了现代前端开发中了。因此，熟悉eslint配置是非常重要的。

### vscode支持eslint自动格式化

必须禁用如Vetur，Volar等插件，否则ESLint会无效

> 安装eslint依赖包

```js
yarn add -D eslint @babel/eslint-parser
```

> eslint配置

- 一般使用@babel/eslint-parser作为parser，若使用typescript，则一般使用@typescript-eslint/parser
- typescript插件@typescript-eslint
- react插件eslint-plugin-react-hooks

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    indent: [2, 2], // 缩进2个空格
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
    quotes: [2, 'single'], // 使用单引号
    'no-mixed-spaces-and-tabs': [2], // 禁止空格和 tab 的混合缩进
    'no-extra-semi': [2], // 禁止不必要的分号
    'comma-dangle': [2, 'never'] // 禁止末尾逗号
  }
}

```

> vscode配置

```js
{
  "eslint.validate": ["javascript", "javascriptreact", "vue"],
  "eslint.codeActionsOnSave.mode": "all",
  "eslint.format.enable": true,
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

### 使用prettier

ESLint主要解决了两类问题，但ESLint主要解决的是代码质量问题。另外一类问题，ESLint并没有做完全，因为这些问题***"没那么重要"***，代码质量出现问题意味着程序有潜在bug，而风格问题充其量是看着不爽而已。这时候就出现了prettier，prettier认为格式很重要，但是格式很麻烦，于是我来帮你解决。诸如是用单引号还是双引号，需要用分号结尾，还是不需要等等问题。prettier还给予了一部分配置项，可以通过.prettierrc配置修改。

所以相当于prettier接管了两个问题其中的代码格式问题，而使用ESLint + Prettier就完完全全解决了这两个问题。但实际使用起来容易出现冲突，所以：

1. 我们首先使用eslint-config-prettier来关掉（disable）所有和prettier冲突的ESLint的配置（这部分配置就是上面说的，格式问题的配置，所以关掉不会有问题），方法就是在 .eslintrc 里面将 prettier 设为最后一个 extends

```js
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

2. (可选，推荐) 然后再启用 eslint-plugin-prettier ，将 prettier 的 rules 以插件的形式加入到 ESLint 里面。这里插一句，为什么"可选" ？当你使用 Prettier + ESLint 的时候，其实格式问题两个都有参与，disable ESLint 之后，其实格式的问题已经全部由 prettier 接手了。那我们为什么还要这个 plugin？其实是因为我们期望报错的来源依旧是 ESLint ，使用这个，相当于把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入，这样相当于可以统一代码问题的来源。

```js
// .eslintrc    
{      
    "plugins": ["prettier"],      
    "rules": {        
        "prettier/prettier": "error"      
    }    
}
```

> 将上面两个步骤和在一起就是下面的配置，也是官方的推荐配置

```js
// .eslintrc
{
  "extends": ["plugin:prettier/recommended"]
}
```

### 解决eslint indent冲突

```js
{
  rules: {
    // 设置tabWidth，使prettier的配置和eslint风格统一
    'prettier/prettier': ['error', { tabWidth: 2 }]
  }
}
```