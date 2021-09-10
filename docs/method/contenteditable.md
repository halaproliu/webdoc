# contenteditable兼容问题解决方案

- div可以使用contenteditable模拟input框,在vue中，可以使用v-model实现组件的双向绑定，组件中使用v-html显示值
- 可以给div添加tabindex，使div支持focus和blur事件
- 可以使用css3实现placeholder

```css
 /* 当div为空时，显示data-placeholder的值*/
.input-text-placeholder:empty:before {
  content: attr(data-placeholder);
  color: #cacaca;
}
```

> ios无法输入问题

可以使用-webkit-user-select: text;解决

```css
.ios-user-select {
  -webkit-user-select: text;
}
```

> 在使用了input事件后，光标位置显示不正常问题

```html
<div
  ref="input"
  :name="attr"
  contenteditable="true"
  tabindex="1"
  class="input-text ios-user-select input-text-placeholder"
  v-html="currentValue"
  :data-placeholder="placeholder"
  @blur="checkInput"
  @input="edit">
</div>
```

```js
// 监听中文输入
mounted () {
  // 监听中文输入
  const el = this.$refs.input
  el.addEventListener('compositionstart', this.onCompositionstart, false)
  el.addEventListener('compositionend', this.onCompositionend, false)
},
methods: {
  onCompositionstart (e) {
    this.isLock = true
  },
  onCompositionend (e) {
    this.isLock = false
  },
  edit (e) {
    // 解决中文输入的时候，直接输出英文字母的问题(中文输入期间，不允许输入字符)
    setTimeout(() => {
      if (this.isLock) return
      let value = e.target.innerHTML
      // 去除换行符
      value = value.replace(/(\<\/?\w*\>)/g, '').replace(/(\r\n)|(\n)/g, '')
      this.$emit('input', {
        attr: this.attr,
        value: value
      })
    }, 0)
    // 如果是pc的话，timeout设置为5就好，ios经测试，使用40才有效果
    const timeout = 40
    setTimeout(() => {
      this.getCursor(e.target)
    }, timeout)
  },
  // 解决光标定位问题
  getCursor (el) {
    if (window.getSelection) {
      el.focus()
      const sel = getSelection()
      sel.selectAllChildren(el)
      sel.collapseToEnd()
    } else if (document.selection) {
      var range = document.selection.createRange()// 创建选择对象
      range.moveToElementText(el)// range定位到el
      range.collapse(false)// 光标移至最后
      range.select()
    }
  }
},
beforeDestroy () {
  // 清除监听中文输入
  const el = this.$refs.input
  el.removeEventListener('compositionstart', this.onCompositionstart, false)
  el.removeEventListener('compositionend', this.onCompositionend, false)
}
```
