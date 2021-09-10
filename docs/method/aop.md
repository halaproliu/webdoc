# JS实现面向切面变成

```js
var before = function (fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments)
        return fn.apply(this, arguments)
    }
}

var after = function (fn, afterFn) {
    return function () {
        var ret = fn.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ret
    }
}
```
