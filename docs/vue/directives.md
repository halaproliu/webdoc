# Vue常用directives

### 防止按钮重复点击

```js
export default (Vue) => {
  Vue.directive('preventReclick', {
    inserted (el, binding) {
      let timeout = binding.value || 2000
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, timeout)
        }
      })
    }
  })
}
```