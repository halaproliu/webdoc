# JS实现继承的几种方式

1、使用ES6的方式
```js
class MyError extends Error {
  constructor (code, message) {
    super()
    this.code = code
    this.message = message
  }
}

const myError = new MyError('-1', '系统异常，请稍后再试')
console.log(myError)
```

2、使用原型链组合继承
```js
function JsonError (code, message) {
  Error.call(this, message)
  this.code = code
  this.message = message
}
JsonError.prototype = new Error()
JsonError.prototype.constructor = JsonError
const jsonError = new JsonError('-2', '网络超时')
console.log(jsonError)
```

3、使用Object.create实现继承

```js
function JsonError (code, message) {
  this.code = code
  this.message = message
}

JsonError.prototype = Object.create(Error.prototype)
JsonError.prototype.constructor = JsonError
const jsonError = new JsonError('-3', '异常')
console.log(jsonError)
```
