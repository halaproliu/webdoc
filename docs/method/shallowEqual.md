# 浅比较

```js
function shallowEqual (obj1, obj2) {
    if (obj1 !== obj2) {
        return false
    }
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false
    }
    if (Object.keys(obj1) !== Object.keys(obj2)) return false
    for (let key of obj1)  {
        if (!obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
            return false
        }
    }
}
```
