# 笛卡尔积

```js
let data = [['a', 'b'], ['x', 'y'], [1, 2, 3], [4, 5]]

function cartesion () {
    let args = Array.prototype.slice.call(arguments)
    let arr = []
    args[0].forEach(a1 => {
        args[1].forEach(a2 => {
            arr.push(ft(a1, a2))
        })
    })
    return arr
}

function ft (a, b) {
    let ret = []
    ret = Array.isArray(a) ? Array.apply(null, a) : Array.call(null, a)
    ret.push(b)
    return ret
}

function multiCartesion (arr) {
    let len = arr.length
    if (len === 0) return []
    if (len === 1) return arr[0]
    let result = arr[0]
    for (let i = 1; i < len; i++) {
        result = cartesion(result, arr[i])
    }
    return result
}

console.log(multiCartesion(data))
```
