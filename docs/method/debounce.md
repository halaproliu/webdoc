# 什么是防抖和节流函数

### 定义

防抖：一定时间内，只执行最后一次的操作
节流：一定时间内，只执行一次操作

### 使用场景

防抖：input输入
节流：resize、scroll

### 防抖函数实现

```js
function debounce (fn, interval, immediate) {
    let timer = null
    return function () {
        let context = this
        let callNow = !timer && immediate
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            !immediate && fn.apply(context, args)
            timer = null
        }, interval)
        callNow && fn.apply(context, args)
    }
}
```

### 节流函数实现

```js
function throttle (fn, delay) {
    let timer = null
    let startTime = Date.now()
    return function () {
        let curTime = Date.now()
        let remaining = delay - (curTime - startTime)
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            startTime = Date.now()
        } else {
            timer = setTimeout(funnction () {
              fn.apply(context, args)
              timer = null
            }, delay) 
        }
    }
}
```
