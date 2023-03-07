# JavaScript类型判断

```js
var class2type = {}
var toString = class2type.toString
var str =
  'String Number Boolean Symbol Null Object Array Date RegExp Function Error'
var arr = str.split(' ')
arr.forEach(function(name) {
  class2type['[object ' + name + ']'] = name.toLowerCase()
})

function type(obj) {
  if (obj === null) return obj + ''
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[toString.call(obj)] || 'object'
    : typeof obj
}
```

### 如何判断async函数

```js
function isAsyncFunction(func) {
  return Object.prototype.toString.call(func) === '[object AsyncFunction]'
}
```

```js
function isAsyncFunction(func) {
  return func[Symbol.toStringTag] === 'AsyncFunction'
}
```

### 如何判断isPromiseLike

```js
function isPromiseLike(obj) {
  return obj !== null && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
```

### 判断浏览器是否支持方法

```js
function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
```

### 判断是否是有效的日期

```js
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}
```