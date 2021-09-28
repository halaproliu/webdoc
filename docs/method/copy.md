# JS实现复制剪贴板

```html
<button id="btn" value="hello world">点击复制</button>
```

```js
const btn = document.getElementById('btn')
btn.onclick = (e) => {
  console.log(e)
  var i = document.createElement('input')
  document.body.appendChild(i)
  i.value = e.target.value
  i.focus()
  i.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    alert('复制成功')
  }
  document.body.removeChild(i)
}
```