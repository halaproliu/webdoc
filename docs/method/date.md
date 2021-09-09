
# 日期方法

### 日期格式化

```js
function formatDate (fmt, date) {
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
/**
 * @description: 获取之前的日期
 * @param duration 获取duration（小时/天/月/年前的日期）
 * @param type 获取（小时/天/月/年前的日期），d: 天，M: 月，y: 年，h: 小时
 * @param returnType 返回的日期格式,0: 时间戳，1: Date类型，2: 指定格式的日期（需搭配fmt参数）
 * @param fmt 返回的日期格式
 * @return {*}
 **/
const getDurationTime = (duration = 1, type = 'd', returnType = 0, fmt) => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // 查看是否是闰年
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
    daysInMonth[1] = 29
  }
  let time
  // 若日期大于前一个月，必须使用前一个月的最大日期
  day = day > daysInMonth[month] ? daysInMonth[month] : day
  if (type === 'h') {
    time = new Date() - 3600 * 1000 * duration
  } else if (type === 'd') {
    time = new Date() - 3600 * 1000 * 24 * duration
  } else if (type === 'M') {
    if (month - duration > 0) {
      time = new Date(year, month - duration, day).getTime()
    } else {
      time = new Date(year - 1, 12 + (month - duration), day).getTime()
    }
  } else {
    time = new Date(year - 1, month, day).getTime()
  }
  // 返回时间戳
  if (returnType === 0) {
    return time
  } else if (returnType === 1) { // 返回日期格式
    return new Date(time)
  } else {
    return formatDate(new Date(time), fmt)
  }
}
```

