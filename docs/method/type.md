# 类型判断

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
