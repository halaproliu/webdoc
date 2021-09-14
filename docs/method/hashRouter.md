# web前端hash路由的实现机制

#### 前言
前端发展到今天这个地步，Angular,Vue,React三大框架作为主力，最常见的是SPA的开发模式，辅以路由，从而实现前端的系统机制。Angular有ui-router, Vue有对应的Vue-router，而React则有React-router，实现上无非大同小异，包含hash和history模式，今天我们就来学习下hash模式的路由机制。

#### hash模式的router是什么？
简单来讲，hash模式的router是基于url的hash值，通过监听hash值的改变，从而模拟路由的跳转。

#### 如何实现对hash值的监听？
在webapi中，有一个hashchange事件，当路由的hash值变化的时候，会触发hashchange事件。

#### 实现简单的hash路由

```js
class Router {
  constructor () {
    this.currentUrl = ''
    this.routes = {}
    window.addEventListener('load', this.refresh.bind(this))
    window.addEventListener('hashchange', this.refresh.bind(this))
  }

  route (path, callback) {
    this.routes[path] = callback || function () {}
  }

  refresh () {
    this.currentUrl = location.hash.slice(1)
    this.routes[this.currentUrl]()
  }
}
```

以上的代码中，我们简单的实现了路由的跳转和初始化。但是还不够完善，当我们回退的时候，应该如何处理呢？

#### 添加了回退功能的hash路由

```js
class Router {
  constructor() {
    this.routes = {}
    this.currentUrl = ''
    this.history = []
    this.currentIndex = 0
    this.isBack = false
    this.back = this.back.bind(this)
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  route(path, callback) {
    this.routes[path] = callback || function() {}
  }

  refresh() {
    if (this.isBack) {
      // 回退时
      this.currentUrl = this.history[this.currentIndex] // 获取当前的path（通过历史记录）
      this.history.pop() // 移除历史记录
    } else {
      // 跳转时
      this.currentIndex++
      this.currentUrl = location.hash.slice(1) || '/' // 获取当前的path（通过url上的hash值）
      this.history.push(this.currentUrl) // 新增历史记录
    }
    this.route(this.currentUrl)() // 执行对应方法
    this.isBack = false // 重置回退状态
  }

  back() {
    this.isBack = true // 置标志位为true，表明是回退
    this.currentIndex-- // 回退历史位置
    this.currentIndex =
      this.currentIndex < 0 ? (this.currentIndex = 0) : this.currentIndex // 获取回退后的历史位置
    this.currentUrl = this.history[this.currentIndex] // 获取回退后的url
    location.hash = `#${this.currentUrl}` // 修改url的hash值
    this.routes[this.currentUrl]() // 执行url对应的函数进行页面初始化操作
  }
}
```

通过isBack标志位，在判断是否是回退，并通过history对象，从而完成历史记录功能，以便支持回退。

具体实现可以参照[https://github.com/halaproliu/myRouter](https://github.com/halaproliu/myRouter)

