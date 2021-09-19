# Object.create实现


```js
function create (proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
```


```js
function objectFactory() {
  const obj = new Object()
  const Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype

  const ret = Constructor.apply(obj, arguments)

  return typeof ret === 'object' ? ret : obj
}
```
