# 解析url

```js
function getAllQuery() {
    let query = location.search.substr(1)
    if (!query) return {}
    let arr = query.split('&')
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let tmp = arr[i].split('=')
        obj[tmp[0]] = tmp[1]
    }
    return obj
}
```
