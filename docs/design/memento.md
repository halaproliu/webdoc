# JavaScript设计模式-备忘录模式

备忘录模式主要用于优化比较耗时的计算，通过将计算结果缓存到内存中，这样对于同样的输入值，下次只需要中内存中读取结果。

```js
const memento = func => {
  const cache = {}
  return function() {
    let key = arguments[0]
    return cache[key] || (cache[key] = func.apply(null, arguments))
  }
}
```

使用场景：
- 缓存搜索结果，避免重复请求的网络开销
- 缓存计算结果，避免多次计算的内存开销
