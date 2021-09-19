# 将数字转成货币形式

```js
// 将数字转成货币形式
function toThousands(num) {
  var result = [],
    counter = 0
  num = (num || 0).toString().split('')
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result.unshift(num[i])
    if (!(counter % 3) && i != 0) {
      result.unshift(',')
    }
  }
  return result.join('')
}
```
