# JS判断鼠标滚动是否在指定元素内

### 实现方式

```js
function wheelAction (e) {
  let x = e.pageX
  let y = e.pageY
  let canvas = this.$refs.canvas
  let rect = canvas.getBoundingClientRect()
  let y1 = rect.top
  let y2 = y1 + rect.height
  let x1 = rect.left
  let x2 = x1 + rect.width
  if (x < x1 || x > x2 || y < y1 || y > y2) {
    // 不在元素内
  } else {
    // 在元素内
  }
}
// 针对火狐的事件
window.addEventListener('DOMMouseScroll', wheelAction)
// 针对google，mousewheel非标准事件已被弃用
window.addEventListener('wheel', wheelAction)
// 兼容IE，ie不支持wheel事件
window.addEventListener('mousewheel', wheelAction)
```