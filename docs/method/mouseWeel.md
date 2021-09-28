# JS判断鼠标滚动是否在指定元素内

### 实现方式

```js
window.addEventListener('mousewheel', (e) => {
  let x = e.pageX
  let y = e.pageY
  let canvas = this.$refs.canvas
  let rect = canvas.getBoundingClientRect()
  let y1 = rect.top
  let y2 = y1 + rect.height
  let x1 = rect.left
  let x2 = x1 + rect.width
  if (x < x1 || x > x2 || y < y1 || y > y2) {
    this.zoomer.pause()
  } else {
    this.zoomer.resume()
  }
})
```