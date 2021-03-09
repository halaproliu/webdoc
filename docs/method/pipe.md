# pipe函数实现

```js
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
```
