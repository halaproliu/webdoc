# 字符串去除相邻重复项

```js
let str = 'aaccddeeffffgghh'
function unique (str) {
  return str.replace(/(.)(?=\1)/g, '')
}
```
