### Vue多页面应用的配置

### package.json

```js
// package.json
{
  "name": "test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "create": "node .bin/utils/init.js"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "core-js": "^3.6.5",
    "glob": "^7.1.7",
    "stylus": "^0.54.8",
    "stylus-loader": "3.0.2",
    "vant": "^2.12.26",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "autoprefixer": "8.0.0",
    "babel-eslint": "^10.1.0",
    "babel-plugin-import": "^1.13.3",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "mockjs": "^1.1.0",
    "path-to-regexp": "^6.2.0",
    "readline": "^1.3.0",
    "shelljs": "^0.8.4",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "vue-template-compiler": "^2.6.11",
    "webpack-api-mock": "^1.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 3 versions",
    "not ie <= 8",
    "chrome >= 14",
    "safari >= 3",
    "ios >= 8",
    "android >= 4.0"
  ]
}

```

### .eslintrc.js

```js
// .eslintrc.js
module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {}
}
```

```js
// babel.config.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
```

### postcss.config.js

支持css自动添加前缀，需配合autoprefixer插件使用

```js
// postcss.config.js
module.exports = {
  plugins: {
   autoprefixer: {}
  }
}
```

### pages.js

多页面title配置以及页面key配置，其中key值为最终build生成的页面key值，value为最终title值

```js
//.bin/config/pages
module.exports = {
  home: {
    title: '首页'
  }
}
```

### config.js

配置反向代理

```js
// config.js
module.exports = {
  proxy: {
    '/test': {
      target: 'http://xxx.xxx.com',
      changeOrigin: true,
      secure: false
    }
  }
}
```

### vue.config.js

```js
// vue.config.js
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const pageConfig = require('./.bin/config/pages')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const mockMiddleware = require('webpack-api-mock')

const configPath = path.join(process.cwd(), 'config.js')
let config = {}
if (fs.existsSync(configPath)) {
  config = require(configPath)
}

let proxy = config.proxy

let pages = {}
glob.sync('./src/pages/**/main.js').forEach(file => {
  let filename = file.match(/\/pages\/(.*?)\/main\.js$/)[1]
  pages[filename] = {
    entry: file,
    template: 'public/index.html',
    filename: `${filename}.html`,
    title: pageConfig[filename] && pageConfig[filename].title,
    // chunks: ['chunk-vendors', 'chunk-common', filename],
    inject: true
  }
})
module.exports = {
  pages: pages,
  lintOnSave: true,
  outputDir: './dist',
  productionSourceMap: !(process.env.NODE_ENV === 'production'),
  devServer: {
    disableHostCheck: true, // 避免浏览器验证host
    contentBase: path.join(__dirname, 'mock'),
    hot: true,
    before: (app) => {
      app.use(mockMiddleware)
    },
    proxy
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].__ISPRD__ = JSON.stringify(process.env.NODE_ENV === 'production')
      args[0]['process.env'].MOCK = process.env.MOCK
      return args
    })
    config.resolve.symlinks(true)
  },
  configureWebpack: (config) => {
    // splitChunk 配置
    const splitChunksConfig = {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          minChunks: 2
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
    let plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          },
          sourceMap: true
        })
      ]
      config.optimization.splitChunks = splitChunksConfig
    }

    config.plugins = [...config.plugins, ...plugins]
  }
}
```

### 自动生成多页面模板

```js
// .bin/utils/init.js
const shell = require('shelljs')
const readline = require('readline')
const path = require('path')
let projectPath = process.cwd()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question('请输入要创建的页面名称：', name => {
  const dirPath = path.resolve(projectPath, `src/pages/${name}`)
  if (!shell.test('-d', dirPath)) shell.mkdir(dirPath)
  const templatePath = path.resolve(projectPath, '.bin/template')
  shell.cp(path.resolve(templatePath, 'index.vue'), path.resolve(dirPath, `index.vue`))
  shell.cp(path.resolve(templatePath, 'main.js'), path.resolve(dirPath, `main.js`))
  rl.close()
})
```

```vue
// .bin/template/index.vue
<template>
  <div class="box"></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>
```

```js
// .bin/template/main.js
import Vue from 'vue'
import index from './index.vue'

import { Dialog, Loading } from 'vant'

Vue.use(Dialog)
Vue.use(Loading)

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  render: h => h(index)
}).$mount('#app')
```