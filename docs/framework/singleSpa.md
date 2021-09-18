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

### vue-cli-plugin-single-spa插件

此插件做了针对single-spa微前端所需的配置

```js
const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");
const StandaloneSingleSpaPlugin = require("standalone-single-spa-webpack-plugin");

module.exports = (api, options) => {
  options.css.extract = false;

  const packageJsonPath = api.resolve("package.json");
  const { name } = require(packageJsonPath);
  if (!name) {
    throw Error(
      `vue-cli-plugin-single-spa: could not determine package name -- change your package json name field`
    );
  }

  api.chainWebpack((webpackConfig) => {
    webpackConfig.devServer
      .headers({
        "Access-Control-Allow-Origin": "*",
      })
      .set("disableHostCheck", true);

    webpackConfig.optimization.delete("splitChunks");

    webpackConfig.output.libraryTarget("umd");

    webpackConfig.output.devtoolNamespace(name);

    webpackConfig.set("devtool", "sourcemap");

    webpackConfig
      .plugin("SystemJSPublicPathWebpackPlugin")
      .use(SystemJSPublicPathWebpackPlugin, [
        {
          rootDirectoryLevel: 2,
          systemjsModuleName: name,
        },
      ]);

    webpackConfig
      .plugin("StandaloneSingleSpaPlugin")
      .use(StandaloneSingleSpaPlugin, [
        {
          appOrParcelName: name,
          disabled: process.env.STANDALONE_SINGLE_SPA !== "true",
        },
      ]);

    webpackConfig.output.set("jsonpFunction", `webpackJsonp__${name}`);

    webpackConfig.externals(["single-spa"]);
  });
};
```

### Vue

需要在src目录下添加set-public-path.js文件设定模块名

##### .env.standalone

```env
VUE_APP_STANDALONE=true
# 必须，vue-cli-plugin-single-spa插件使用
STANDALONE_SINGLE_SPA=true
```

##### set-public-path.js

设置publicPath，可以通过在src/pages下新建set-public-path.js，并使用如下代码设置

```js
import { setPublicPath } from 'systemjs-webpack-interop'
// 名称需要与package.json中的name相同，否则无法读取
setPublicPath('navbar', 2)
```

或通过直接修改webpack配置

```js
chainWebpack: config => {
  config.when(
      !process.env.VUE_APP_STANDALONE,
      config => config.plugin('SystemJSPublicPathWebpackPlugin')
        .tap(args => {
          args[0].rootDirectoryLevel = 2
          return args
        })
        .end()
    )
}
```

或是直接使用vue-cli-plugin-single-spa插件

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
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    sockPort: 8081,
    sockHost: 'localhost',
    https: true,
    port: 8081
  },
  chainWebpack: config => {
    config.when(
      !process.env.VUE_APP_STANDALONE,
      config => config.externals(['single-spa', 'vue', 'vue-router', 'element-ui', 'vue-awesome', /^@bilibili\/.+/])
        .output
        .library(packageJson.name)
        .libraryTarget('umd')
        .end()
        .plugin('SystemJSPublicPathWebpackPlugin')
        .tap(args => {
          args[0].rootDirectoryLevel = 2
          return args
        })
        .end()
    )
    config
      .when(process.env.NODE_ENV === 'production',
        config => config.plugin('compressionPlugin')
          .use(CompressionPlugin, [{
            test: /\.js$|\.html$|\.css/,
            threshold: 10240,
            minRatio: 0.8
          }])
          .end()
          .plugin('ignorePlugin')
          .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/])
          .end(),
        config => config.devtool('source-map')
      )
    config.plugins.delete('prefetch')
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.whitespace = 'preserve'
        return options
      })
  }
}
```
