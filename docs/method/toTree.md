# tree数组转为tree格式

### 方法实现

```js
function structToTree(arr, key, pidKey) {
  const copyArr = arr.slice(0)
  copyArr.forEach(item => {
    toTree(item, copyArr, key, pidKey)
  })

  function toTree(leaf, data, key, pidKey) {
    let len = data.length
    while (len > 0) {
      len--
      const item = data[len]
      if (leaf[key] === item[pidKey]) {
        leaf.children = leaf.children || []
        leaf.children.push(item)
        data.splice(len, 1)
      }
    }
    return data
  }
  return copyArr
}
```

### 使用

```js
var arr = [{id: 1, pid: null, value: 11}, {id: 2, pid: 1, value: 22}, {id: 3, pid: 1, value: 33}, {id: 4, pid: 2, value: 44}, {id: 5, pid: 3, value: 55}]
structToTree(arr, 'id', 'pid')
```
