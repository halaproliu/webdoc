# 日期格式化

```js
function dateFormat (fmt, date) {
    let ret
    let opts = {
    'y+': date.getFullYear(),
    'M+': (date.getMonth() + 1),
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
    }
    for (let k in opts) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
        // fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opts[k]) : (opts[k].padStart(ret[1].length, '0')))
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opts[k] + '') : ('00' + opts[k]).substr(-ret[1].length))
    }
    }
    return fmt
}
```

