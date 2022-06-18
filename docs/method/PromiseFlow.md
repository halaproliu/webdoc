# Promise flow实现

### 代码实现

- 使用promise实现flow方法，使得可以按顺序执行以下方法

```js
function a() {
    console.log('a')
}
function b() {
        console.log('b')
}
function c() {
        console.log('c')
}
function d() {
        console.log('d')
}

console.log(flow([a, b]))
console.log(flow([a, [b, c], d]))
```

```js
function flow(que){
    let index =0
    const calculate = function(i){
        let fn = que[i]
        fn = Array.isArray(fn) ? fn:[fn]
        Promise.all(fn).then(res => {
            res.forEach(v => v())
            index++
            return index
        }).then(i => {
            if(i < que.length){
                calculate(i)
            }
        })
    }
    calculate(index)
}
```
