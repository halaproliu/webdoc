# Webpack 转译 Typescript 现有方案

### 使用babel-loader + @babel/preset-typescript

- 当webpack编译的时候，babel-loader会读取babel配置文件（.babelrc|babel.config.js）的配置，不会调用typescript，因此本地项目也无需安装typescript。

- tsconfig.json依然需要，因为开发的ide需要根据此配置文件进行错误信息提示

- 此方案仅支持babel7

```js
// webpack.config.js
{
  rules: [{
    test: /\.tsx?$/,
    // 默认会调用 @babel/core 
    use: 'babel-loader'
  }]
}
```

```js
//babel.config.js
module.exports = {
  compact: false,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
}

```

### 类型检查

此方案不带类型检查，若需要检查可使用命令

```sh
tsc --watch
```

```json
//tsconfig.json
{
  "compilerOptions: {
    noEmit: true // 不生成文件，只做类型检查
  }
}
```


### Typescript 官方转向 ESLint 的原因

- TSLint 执行规则的方式存在一些架构问题，从而影响了性能，而修复这些问题会破坏现有规则；
- ESLint 的性能更好并且使用者较多

### 使用了 TypeScript，为什么还需要 ESLint

- TS 主要是用来做类型检查和语言转换的，顺带一小部分的语法检查
- ESLint 主要是用来检查代码风格和语法错误的

### 为什么不适用ts-loader

- ts-loader 是不会读取 .babelrc 里的配置，即无法使用 babel 系列的插件，所以直接使用 ts-loader 将 ts/tsx 转成 js ，就会出现垫片无法按需加载、antd 无法按需引入的问题。所以需要用 ts-loader 把 ts/tsx 转成 js/jsx，然后再用 babel-loader 去调用 babel 系列插件，编译成最终的 js。