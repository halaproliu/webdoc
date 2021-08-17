
# 日期方法

### 日期格式化

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

### 获取相差指定时间的日期时间戳

```js
export const getPreDate = (duration = 1, type = 'd') => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  if (type === 'd') {
    return new Date(new Date().setHours(0, 0, 0) - 3600 * 1000 * 24 * duration)
  } else if (type === 'm') {
    if (month - duration > 0) {
      return new Date(year, month - duration, day).getTime()
    } else {
      return new Date(year - 1, 12 + (month - duration), day).getTime()
    }
  } else {
    return new Date(year - 1, month, day).getTime()
  }
}
```

