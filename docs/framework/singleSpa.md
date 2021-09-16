# 微前端入门实战

### 安装single-spa cli

```js
npm install --global create-single-spa

# or
yarn global add create-single-spa
```

### 使用

```js
npm init single-spa

# or
npx create-single-spa

# or
yarn create single-spa
```

### 注意事项

- 子应用的package.json中的name为模块名称

### Vue

需要在src目录下添加set-public-path.js文件设定模块名

##### set-public-path.js

```js
import { setPublicPath } from 'systemjs-webpack-interop'
// 名称需要与package.json中的name相同，否则无法读取
setPublicPath('navbar')
```

##### main.js

```js
import './set-public-path'
import Vue from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueAwesome from 'vue-awesome'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component('icon', VueAwesome)
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'medium' }
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

let appOptions = {
  render (h) {
    return h(App, {
      props: {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      }
    })
  },
  router,
  store
}

// 若是独立运行
if (process.env.STANDALONE_SINGLE_SPA) {
  new Vue(appOptions).$mount('#app')
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
```

### vue.config.js

```js
const packageJson = require('./package.json')
module.exports = {
  configureWebpack: config => {
    let resultConfig = {}
    // 若不是独立运行，则要加上externals和output配置
    if (!process.env.STANDALONE_SINGLE_SPA) {
      resultConfig.output = {
        library: packageJson.name,
        libraryTarget: 'umd'
      }
    }
    return resultConfig
  },
  chainWebpack: config => {
    if (!process.env.STANDALONE_SINGLE_SPA) {
      config.externals = ['vue', 'vue-router', 'element-ui', 'vue-awesome', /^@orgName\/.+/]
    }
    config.plugin('SystemJSPublicPathWebpackPlugin').tap((args) => {
      args[0].rootDirectoryLevel = 1;
      return args;
    });
  }
}
```
