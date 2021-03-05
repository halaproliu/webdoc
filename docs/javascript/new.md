# new的时候发生了什么

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象。

### new的实现方法

```js
function _new(fn, ...arg) {
    // const obj = Object.create(fn.prototype);
    const obj = {}
    Object.setPrototypeof(obj, fn.prototype)
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```

```js
function _new(fn) {
    let obj = {}
    let arg = Array.prototype.slice.call(arguments, 1)
    obj.__proto__ = fn.prototype
    obj.__proto__.constructor = fn
    let ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```

```js
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```
