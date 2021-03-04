### isAllTrue

```js
function isAllTrue() {
  var sum = 0
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      sum += arguments[i]
    }
  }
  // sum的数量为true的个数
  return sum === arguments.length
}
```
