# Vue中diff算法的原理

```js
//sameNode
function sameVnode (a, b) {
  return (
    //没有定义key时，key为undefined，不同的节点也会认为是同一个节点，所以也会执行patch操作。
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

首先会对比新旧节点的vnode属性，
