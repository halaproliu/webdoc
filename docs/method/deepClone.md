# 深拷贝


```js
function isObj(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}
// 只解决date，reg类型，其他的可以自己添加
function deepCopy(obj, hash = new WeakMap()) {
  let cloneObj
  let Constructor = obj.constructor
  switch (Constructor) {
    case RegExp:
      cloneObj = new Constructor(obj)
      break
    case Date:
      cloneObj = new Constructor(obj.getTime())
      break
    default:
      // 解决闭环问题（对象循环引用）
      if (hash.has(obj)) return hash.get(obj)
      cloneObj = new Constructor()
      hash.set(obj, cloneObj)
  }
  for (let key in obj) {
    cloneObj[key] = isObj(obj[key]) ? deepCopy(obj[key], hash) : obj[key];
  }
  return cloneObj
}
```
