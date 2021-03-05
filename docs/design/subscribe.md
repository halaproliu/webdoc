# JavaScript设计模式-发布-订阅者模式

发布-订阅者模式定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在JavaScript开发中，我们一般用事件模型来替代传统的发布-订阅模式。

#### 一、发布-订阅者模式的作用
1. 发布-订阅者模式可以广泛用于异步编程中，这是一种替代回调函数的方案。在异步编程中使用发布-订阅者模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。（如订阅ajax的success和error事件）
2. 发布-订阅者模式可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另一个对象的某个接口。发布-订阅者模式让两个对象松耦合地联系在一起，虽然不太清楚彼此的细节，但不影响它们之间的通信。当有新的订阅者出现时，发布者的代码不需要任何修改；同样发布者需要改变时，也不会影响到之前的订阅者。只要之前约定的事件名没有变化，就可以自由地改变它们。

#### 二、发布订阅者模式的实现
```js
var Event = {
    clientList: {},
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key]
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key]
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l]
                if (_fn === fn) {
                    fns.splice(l, 1)
                }
            }
        }
    }
}

var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}
```

#### 三、发布订阅者的使用场景
- 网站登录
假如正在开发一个网站，网站里有header头部，菜单，购物车等模块。这几个模块的渲染都需要ajax获取用户的个人信息。

```js
Login.success(function (data) {
  header.setAvatar(data.avatar)
  nav.setAvatar(data.avatar)
  shopcart.refresh()
})
```

假如现在我们现在要新增一个消息列表的刷新，那就要再次修改代码，使得代码越来越繁杂。
这时候就可以使用发布-订阅者模式进行重构：

```js
const login = {}
installEvent(login)
ajax('http://xxxxx?login', function (data) {
  login.trigger('loginSuccess', data)
})

const header = (function() {
  login.listen('loginSuccess', function (data) {
    header.setAvatar(data.avatar)
  })
})()

const nav = (function() {
  login.listen('loginSuccess', function (data) {
    nav.setAvatar(data.avatar)
  })
})()

const shopcart = (function() {
  login.listen('loginSuccess', function (data) {
    shopcart.refresh()
  })
})()
```

这样当需要新增模块时，只需要指定模块监听对应事件即可，避免了强耦合造成的问题。
