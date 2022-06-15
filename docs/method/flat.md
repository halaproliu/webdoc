# 数组扁平化

### 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

### 方法一

```js
var arr = [[1, '2', '2'], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
function flat (arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

Array.from(new Set(flat(arr))).sort((a, b) => a - b)
```

### 方法二

```js
var arr = [[1, '2', '2'], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
function flat (arr) {
  return arr.reduce((acc, v) => {
    let tmp = Array.isArray(v) ? flat(v) : v
    acc.push(tmp)
    return acc
  }, [])
}

Array.from(new Set(flat(arr))).sort((a, b) => a - b)
```

### 方法三

- 此方法只适合纯数字数组

```js
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
Array.from(new Set(arr.toString().split(',').sort((a, b) => a - b))).map(Number)
```

- 此方法只适合纯字符串

```js
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
Array.from(new Set(arr.toString().split(',').sort((a, b) => a - b)))
```

