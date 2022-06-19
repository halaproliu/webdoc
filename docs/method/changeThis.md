# 改变this指向方法实现之-call,apply,bind

### 前言

在JavaScript中，如果想要改变当前函数调用的上下文对象的时候，我们都会联想到call、apply和bind。

### 三者的共同之处

1. 都是用来改变函数的this对象的指向
2. 第一个参数都是this要指向的对象
3. 都可以利用后续参数进行传参

### 区别

1. 第二个参数开始不同，apply是传入带下标的集合，数组或者类数组，apply把它传给函数作为参数，call从第二个开始传入的参数是不固定的，都会传给函数作为参数。
2. call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式，
3. 尤其是es6 引入了 Spread operator (延展操作符) 后，即使参数是数组，可以使用 call

```js
let params = [1,2,3,4]
xx.call(obj, ...params)
```

4. call方法传参是传一个或者是多个参数，第一个参数是指定的对象，如开篇的obj。

```js
func.call(thisArg, arg1, arg2, ...)
```

5. apply方法传参是传一个或两个参数，第一个参数是指定的对象，第二个参数是一个数组或者类数组对象。

```js
func.apply(thisArg, [argsArray])
```

6. bind方法传参是传一个或者多个参数，跟call方法传递参数一样。

```js
func.bind(this.thisArg, arg1, arg2, ...)
```

简言之，call和bind传参一样；apply如果要传第二个参数的话，应该传递一个类数组。

### 调用后是否立执行

call和apply在函数调用它们之后，会立即执行这个函数；而函数调用bind之后，会返回调用函数的引用，如果要执行的话，需要执行返回的函数引用。

变动下开篇的demo代码，会比较容易理解：

```js
var name = 'window name';
var obj = {
    name: 'call_me_R'
};
function sayName(){
    console.log(this.name);
}
sayName(); // window name
sayName.call(obj); // call_me_R
sayName.apply(obj); // call_me_R
console.log('---divided line---');
var _sayName = sayName.bind(obj);
_sayName(); // call_me_R
```

call, apply 和 bind的区分点主要是上面的这两点

### 代码实现

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
