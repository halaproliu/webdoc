# single-spa微前端项目落地

### 前言

&nbsp;&nbsp;&nbsp;&nbsp;由于公司当前项目过于臃肿，打包速度越来越慢，同时在每次代码合并时，会出现非常多的冲突。因此，希望找到一种方式，来减小项目体积，又不影响现有代码的方式。在寻找过程中，发现微前端是一种很不错的方式，技术无关，同时可以分开部署，简直完美。

&nbsp;&nbsp;&nbsp;&nbsp;目前主流的微前端方式，主要有iframe，[single-spa](https://single-spa.js.org/)，[qiankun](https://qiankun.umijs.org/zh/guide)，[micro-app](http://zeroing.jd.com/micro-app)以及webpack5的module ferderation等。鉴于我们当前项目是以webpack4为主，首先排除了module ferderation。micro-app是京东开源的微前端框架，基于shadowdom实现，shadowdom容易出现一些问题，如iconfront显示问题，因此跳过。qiankun是蚂蚁集团基于single-spa进行的封装，但基于更喜欢自己封装，遂最终选择了single-spa。


### single-spa

single-spa实现原理：首先对微前端路由进行注册，使用single-spa充当微前端加载器，并做为项目单一入口来接受全部页面URL的访问，根据页面URL与微前端的匹配关系，选择加载对应的微前端模块，再由该微前端模块进行路由响应URL，即微前端模块中路由找到相应的组件，渲染页面内容。

### single-spa实现过程

1. 基座项目

> 基于vue的基座项目,使用vue-cli创建基座项目

```js
vue create micro-front-cli-root-config
```

- 首先在dom创建节点挂载子项目，子项目注册后即可挂载在基座项目

```js
<template>
  <div id="singleVue"></div>
</template>
```

2. 微前端子应用注册

> 子应用打包成umd包，通过script加载，再使用single-spa的registerApplication api进行注册应用，最终调用start方法启动子项目


```js
// appConfig
const apps = [{
  host: 'http://localhost:9001',
  projectName: 'singleVue',
  activeWhen: location => location.pathname.startsWith('/vue'),
  bundle: 'app'
}]

export default apps
```

```js
import { registerApplication, start } from 'single-spa'; //导入single-spa
import axios from 'axios'
import AppConfig from './appConfig'

/**
 * @name 加载异步js
 * @description 一个promise同步方法。可以代替创建一个script标签，然后加载服务
 * @param {*} url 
 * @returns 
 */
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      resolve()
    };
    script.onerror = (err) => {
      console.log(err)
      reject()
    };
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });
};

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 加载子应用
 * @param {*} host 
 * @param {*} globalVar 
 * @returns 
 */
const loadApp = (host, globalVar, bundle) => {
  return async () => {
    await getManifest(`${host}/asset-manifest.json`, bundle, host)
    return window[globalVar]
  }
}

/**
 * @description 加载子应用
 * @param {*} url stats-webpack-plugin或者webpack-manifest-plugin插件生成的manifest文件
 * @param {*} bundle
 * @param {*} host 子应用host+port
 */
const getManifest = async (url, bundle, host) => {
  const { data } = await axios.get(url);
  const { entrypoints } = data;
  let assets = []
  if (Array.isArray(entrypoints)) {
    assets = entrypoints
  } else {
    assets = entrypoints[bundle].assets
    assets = assets.map(obj => {
      if (isObject(obj)) {
        return obj.name
      }
      return obj
    })
  }

  for (let i = 0; i < assets.length; i++) {
    await runScript(`${host}/${assets[i]}`)
  }
}

AppConfig.forEach(app => {
  // 注册微服务（子应用）
  registerApplication({
    name: app.projectName,
    app: loadApp(app.host, app.projectName, app.bundle), // 子应用为umd包，挂载在window下
    activeWhen: app.activeWhen, // 当url匹配时展示子应用
    customProps: app.customProps
  })
})

start(); // 启动
```

### Vue子项目改造

> Vue2.0

```js
import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false
// el 为子项目待挂载到父项目的DOM节点
const vueOptions = {
  el: "#singleVue2",
  render: h => h(App)
};

// 主应用注册成功后会在window下挂载singleSpaNavigate方法
// 为了独立运行，避免子项目页面为空，
// 判断如果不在微前端环境下进行独立渲染html
if (!window.singleSpaNavigate) {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions,
  handleInstance(app, props) {
    Vue.prototype.$eventBus = props.EventBus
  }
});

export const bootstrap = vueLifecycles.bootstrap; // 启动时
export const mount = vueLifecycles.mount; // 挂载时
export const unmount = vueLifecycles.unmount; // 卸载时

export default vueLifecycles;
```

> Vue3.0

```js
import { h, createApp } from 'vue'
import singleSpaVue from 'single-spa-vue'

import App from './App.vue'
import router from './router'

const appOptions = {
  el: '#singleVue', // 若提供el属性，则挂载在el上，否则是，single-spa-application:${name}上，name为基座项目注册子应用设置的name
  render() {
    return h(App, {
      // single-spa props are available on the "this" object. Forward them to your component as needed.
      // https://single-spa.js.org/docs/building-applications#lifecycle-props
      // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
      /*
      name: this.name,
      mountParcel: this.mountParcel,
      singleSpa: this.singleSpa,
      */
      name: this.name,
      singleSpa: this.singleSpa,
      EventBus: this.EventBus,
    })
  },
}

if (!window.singleSpaNavigate) {
  createApp(App).use(router).mount('#app')
}

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions,
  handleInstance(app) {
    app.use(router)
  },
})

export const bootstrap = [vueLifecycles.bootstrap]

export const mount = [vueLifecycles.mount]
export const unmount = [vueLifecycles.unmount]

export default vueLifecycles
```

> 修改vue.config.js

```js
const StatsPlugin = require('stats-webpack-plugin')
const projectName = 'singleVue'
module.exports = {
  publicPath: '//localhost:9001',
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      library: {
        name: projectName, // 导出名称
        type: 'umd' // 挂载目标,window.singleVue
      }
    },
    devServer: {
      port: '9001',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      allowedHosts: 'all'
    },
    plugins: [
      new StatsPlugin('asset-manifest.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks:false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
}
```

### React子项目改造

> 当前改造基于React18.1,项目使用create-react-app创建

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import singleSpaReact from 'single-spa-react';

function rootComponent () {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

if (!window.singleSpaNavigate) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(rootComponent());
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: rootComponent,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  renderType: 'createRoot',
  domElementGetter: () => document.getElementById('singleReact')
})

export const bootstrap = [lifecycles.bootstrap]
export const mount = [lifecycles.mount]
export const unmount = [lifecycles.unmount]

// export const { bootstrap, mount, unmount } = lifecycles;
```

> 修改webpack配置，使用react-app-rewired，customize-cra修改配置

```js
const { override, addWebpackPlugin, overrideDevServer } = require('customize-cra')
const StatsPlugin = require('stats-webpack-plugin')
const projectName = 'singleReact'
const customizePlugin = () => config => {
  config.output.publicPath = 'http://localhost:9003/'
  config.output.library = projectName
  config.output.libraryTarget = 'umd'
  return config
}

module.exports = {
  webpack: override(
    addWebpackPlugin(
      new StatsPlugin('asset-manifest.json', {
        chunkModules: false,
        entryPoints: true,
        source: false,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ),
    customizePlugin()
  ),
  devServer: overrideDevServer(
    config => {
      config.port = '9003'
      config.headers = config.headers || {}
      config.headers['Access-Control-Allow-Origin'] = '*'
      return config
    }
  )
}
```

### 基座项目与子项目的通信

single-spa官网推荐了两种方式，一种是[rxjs](https://rxjs.dev/),另一种是使用自定义Event的方式。目前我采用了[rxjs](https://rxjs.dev/),实现类似EventBus的方式来通信。

```js
import { ReplaySubject, filter, map } from 'rxjs'
class EventBus {
  constructor() {
    this.subject$ = new ReplaySubject()
  }
  emit(event) {
    this.subject$.next(event)
  }
  on(eventName, action) {
    return this.subject$.pipe(
      filter(e => e.name === eventName),
      map((e) => e.data)
    ).subscribe(action)
  }
}

export default EventBus
```

> 使用方式

```js
// 下发消息
EventBus.emit({name: 'msgFromRoot', data: 'vue3 root msg'})

// 接收消息
EventBus?.value?.on('msgFromRoot', data => {
  console.log('vue:', data)
})
```

### 样式隔离

可以通过[postcss-selector-namespace](https://www.npmjs.com/package/postcss-selector-namespace)或者[postcss-prefix-selector](https://www.npmjs.com/package/postcss-prefix-selector2)插件来为所有样式添加前缀。

### 项目地址

完整源码请查看[microfront](https://github.com/halaproliu/microfront)