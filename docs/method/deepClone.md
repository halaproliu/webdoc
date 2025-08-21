# 深拷贝

### 前言

由于 JavaScript 引用类型特性，为了实现作用域隔离，深拷贝的使用必不可少。

### 实现方式

```js
function deepClone(obj) {
    if (Array.isArray(obj)) {
        let clone = [];
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deepClone(obj[i]);
        }
        return clone;
    } else if (typeof obj === 'object' && obj !== void 0) {
        let clone = {};
        for (let key in obj) {
            clone[key] = deepClone(obj[key]);
        }
        return clone;
    }
}
```

### 完整实现

```js
function isObj(obj) {
    return (
        (typeof obj === 'object' || typeof obj === 'function') && obj !== null
    );
}
// 只解决date，reg类型，其他的可以自己添加
function deepClone(obj, hash = new WeakMap()) {
    let cloneObj;
    let Constructor = obj.constructor;
    switch (Constructor) {
        case RegExp:
            cloneObj = new Constructor(obj);
            break;
        case Date:
            cloneObj = new Constructor(obj.getTime());
            break;
        default:
            // 解决闭环问题（对象循环引用）
            if (hash.has(obj)) return hash.get(obj);
            cloneObj = new Constructor();
            hash.set(obj, cloneObj);
    }
    for (let key in obj) {
        cloneObj[key] = isObj(obj[key]) ? deepClone(obj[key], hash) : obj[key];
    }
    return cloneObj;
}
```
