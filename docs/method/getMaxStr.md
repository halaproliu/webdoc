# 获取文章中出现最多的字符

```js
function search(str) {
    let obj = {}
    let max = 0
    let maxKeyObj = {}
    for (let i = 0; i < str.length; i++) {
        let key = str[i]
        if (!obj[key]) {
            obj[key] = 0
        }
        obj[key]++
        if (obj[key] >= max) {
            max = obj[key]
            if (!maxKeyObj[max]) {
                maxKeyObj[max] = []
            }
            if (maxKeyObj[max].indexOf(key) === -1) {
                maxKeyObj[max].push(key)
            }
        }
    }
    return maxKeyObj[max]
}
```
