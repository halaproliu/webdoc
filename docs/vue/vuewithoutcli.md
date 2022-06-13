# Building Vue3 + Typescript + without cli 最佳实践

随着Vue3正式版的到来，带来了一些新的特性：

- Composition API: 这是一个从react hooks上受启发的组件
- Portals: 可以在vue当前组件外渲染dom节点
- Fragments: 允许有多个root节点
- 更新的v-model-api: 支持多个models
- Suspense: 异步加载组件的loading界面
- TypeScript: Vue从现在起完全支持Typescript

本着学习的精神，我决定尝试下从零开始自己搭建一个Vue3 + Typescript的项目

### 创建一个项目

第一件事就是初始化一个项目

```
yarn init
```

然后添加依赖,对Vue3实现最基本的支持

```js
yarn add vue
yarn add -D webpack webpack-cli webpack-dev-server @vue/compiler-sfc
```

添加webpack配置

```ts
import { resolve } from './utils'
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { VueLoaderPlugin } from 'vue-loader'

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: "./src/main.tsx",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 4000,
    open: true,
    hot: true,
    allowedHosts: 'all',
    compress: true, // 为所有服务启用gzip 压缩
  }
}

export default config
```

### 增加Typescript支持

> 方案一：使用ts-loader

```js
yarn add -D ts-loader
```

```js
module: {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }
  ]
}
```

> 方案二：使用babel-loader + @babel/preset-typescript

```
yarn add -D @babel/core babel-loader @babel/preset-typescript
```

```js
module: {
  rules: [
    {
      test: /\.(jsx?|tsx?)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }
  ]
}
```

- babel.config.js

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.0',
      },
    ],
    [
      "@babel/preset-typescript",
      {
        allExtensions: true, // 支持所有文件扩展名，否则在vue文件中使用ts会报错
      },
    ]
  ]
}

```

### tsconfig.json

```js
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "baseUrl": "./",
    "typeRoots": [
      "types",
      "node_modules/@types"
    ],
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```


### 配置package.json命令

当webpack基本配置好后，添加scripts命令来运行

```js
{
  "scripts": {
    "dev": "webpack serve --development",
    "build": "webpack --mode production"
  }
}
```


### .vue文件使用ts问题

为了避免.vue文件使用ts报错，在src目录下添加shim-vue.d.ts文件

```
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}
```

### vue-router

vue3相对应的vue-router版本是@4.0+的，语法上与过往版本略有区别

- 创建Vue-router配置，createWebHashHistory为hash模式，createWebHistory为history模式

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

### pinia

pinia是完全使用Composition API编写的，对于使用新的特性非常适合，可以抛弃vuex了。

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // other options...
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})
```

### Vue入口文件main.ts


```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const app = createApp(App) // 创建Vue实例
const pinia = createPinia() // 创建pinia实例
app.use(router)
app.use(pinia)
app.mount('#app')
```

### 结语

以上就是分享的使用Vue + TypeScript的简单案例，欢迎互相交流。