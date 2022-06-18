# call、apply、bind实现

> call实现

```js
Function.prototype.$call = function (ctx) {
    var _context = ctx ? Object(ctx) : window
    _context.fn = this
    var args = []
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    eval('_context.fn(' + args + ')')
    delete _context.fn
}
```

> apply实现

```js
Function.prototype.$apply = function (ctx, args) {
    var _ctx = ctx ? Object(ctx) : window
    _ctx.fn = this
    if (!args) {
        _ctx.fn()
    } else {
        var _args = []
        for (var i = 0; i < args.length; i++) {
            _args.push('args[' + i + ']')
        }
        eval('_ctx.fn(' + _args + ')')
    }
    delete _ctx.fn
}
```

> bind实现

```js
Function.prototype.bind = function (oThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind is not callable')
  }

  var args = array.prototype.slice.call(arguments, 1)
  var argsLen = args.length
  var fNOP = funciton () {}
  var that = this
  var fBound = function () {
    // 重置参数长度
    args.length = argsLen
    // 添加后传入的参数
    args.push.apply(args, arguments)
    // 使用new对bind返回的函数实例化，this指向新的构造函数而不是传入的想要显示改变的oThis
    return that.apply(this instanceof fBound ? this : oThis, args)
  }
  // 
  if (this.prototype) {
    // 如果没有这一句，new关键字调用下继承的原型就是object，而不是绑定函数的prototype
    fNOP.prototype = this.prototype
  }
  fBound.prototype = new fNOP()
  return fBound
}
```
