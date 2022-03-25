# 计时器实现

### 实现

setInterval并不能总是准确的按时执行，所以使用setTimeout来模拟setInterval

```js
class Timer {
  constructor () {
    this.timer = null
    this.flag = true
  }

  setTimer (fn, time) {
    this.timer = setTimeout(() => {
      fn()
      this.clearTimer()
    }, time)
  }

  clearTimer () {
    if (!this.timer) return
    clearTimeout(this.timer)
    this.timer = null
  }

  setInterval (fn, time) {
    let inter = () => {
      fn()
      this.flag && (this.timer = setTimeout(inter, time))
    }
    this.timer = setTimeout(inter, time)
  }
}
```