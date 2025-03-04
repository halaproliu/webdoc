# 函数柯里化

```js
// 柯里化
const curry = fn => {
  if (fn.length <= 1) return fn;
  const generator = args =>
    args.length === fn.length ?
    fn(...args) :
    arg => generator([...args, arg]);
  return generator([]);
};
```
