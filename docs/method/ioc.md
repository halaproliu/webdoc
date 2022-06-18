# IOC依赖注入

```js
/**
 * @description 依赖注入实现（Ioc）
 * @author halapro.liu
 * @class App
 */
class App {
  static modules = []
  constructor (options) {
    this.options = options
    this.init()
  }
  init () {
    window.addEventListener('DOMContentLoaded', () => {
      this.initModules()
      this.options.onReady(this)
    })
  }
  static use (module) {
    Array.isArray(module) ? module.map(item => App.use(item)) : App.modules.push(module)
  }
  initModules () {
    App.modules.map(item => module.init && typeof module.init === 'function' && module.init(this))
  }
}

class Router {
  init (app) {
    app.router = new Router(app.options.router)
  }
}

App.use(Router)
new App({
  router: {
    mode: 'history'
  },
  onReady (app) {
    console.log(app)
  }
})
```
