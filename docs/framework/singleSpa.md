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

### root模块

##### src/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Root Config</title>

  <!--
    Remove this if you only support browsers that support async/await.
    This is needed by babel to share largeish helper code for compiling async/await in older
    browsers. More information at https://github.com/single-spa/create-single-spa/issues/112
  -->
  <script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"></script>

  <!--
    This CSP allows any SSL-enabled host and for arbitrary eval(), but you should limit these directives further to increase your app's security.
    Learn more about CSP policies at https://content-security-policy.com/#directive
  -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: localhost:*; script-src 'unsafe-inline' 'unsafe-eval' https: localhost:*; connect-src https: localhost:* ws://localhost:*; style-src 'unsafe-inline' https:; object-src 'none';">
  <meta name="importmap-type" content="systemjs-importmap" />
  <!-- If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below -->
  <!-- More info at https://github.com/joeldenning/import-map-overrides/blob/master/docs/configuration.md#domain-list -->
  <!-- <meta name="import-map-overrides-domains" content="denylist:prod.example.com" /> -->

  <!-- Shared dependencies go into this import map. Your shared dependencies must be of one of the following formats:

    1. System.register (preferred when possible) - https://github.com/systemjs/systemjs/blob/master/docs/system-register.md
    2. UMD - https://github.com/umdjs/umd
    3. Global variable

    More information about shared dependencies can be found at https://single-spa.js.org/docs/recommended-setup#sharing-with-import-maps.
  -->
  <script type="systemjs-importmap">
    {
      "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js",
        "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js",
        "vue-router": "https://unpkg.com/vue-router@3.5.2/dist/vue-router.js",
        "element-ui": "https://cdn.bootcdn.net/ajax/libs/element-ui/2.6.2/index.js",
        "vue-awesome": "https://cdn.jsdelivr.net/npm/vue-awesome"
      }
    }
  </script>
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js" as="script">

  <!-- Add your organization's prod import map URL to this script's src  -->
  <!-- <script type="systemjs-importmap" src="/importmap.json"></script> -->

  <% if (isLocal) { %>
  <script type="systemjs-importmap">
    {
      "imports": {
        "@orgName/root-config": "//localhost:9000/bilibili-root-config.js",
        "navbar": "//localhost:8081/js/app.js"
      }
    }
  </script>
  <% } %>

  <!--
    If you need to support Angular applications, uncomment the script tag below to ensure only one instance of ZoneJS is loaded
    Learn more about why at https://single-spa.js.org/docs/ecosystem-angular/#zonejs
  -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/zone.js@0.11.3/dist/zone.min.js"></script> -->

  <script src="https://cdn.jsdelivr.net/npm/import-map-overrides@2.2.0/dist/import-map-overrides.js"></script>
  <% if (isLocal) { %>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.js"></script>
  <% } else { %>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js"></script>
  <% } %>

</head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script>
    System.import('@orgName/root-config');
  </script>
  <import-map-overrides-full show-when-local-storage="devtools" dev-libs></import-map-overrides-full>
</body>
</html>

```

##### src/orgName-root-config.js

```js
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
```

##### src/microfrontend-layout.html

```html
<single-spa-router>
  <main>
    <route default>
      <application name="navbar"></application>
    </route>
  </main>
</single-spa-router>
```

##### webpack.config.js

```js
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "orgName";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};
```

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
import 'element-ui/lib/theme-chalk/index.css'

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
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
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
