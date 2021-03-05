# JavaScript设计模式-单例模式

所谓单例，就是整个程序有且仅有一个实例，该类负责创建一个唯一的对象，同时确保不在有另一个相同的对象被创建。

1、普通单例模式
```js
var Singleton = function (name) {
    this.name = name
    this.instance = null
}

Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name)
    }
    return this.instance
}
```

2、惰性单例模式
```js
var lazySingleton = function (name) {
    this.name = name
}

lazySingleton.getInstance = (function (name) {
    var _instance = null
    return function (name) {
        if (!_instance) {
            _instance = new lazySingleton(name)
        }
        return _instance
    }
})()
```
