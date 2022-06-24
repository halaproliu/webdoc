# JavaScript实现Cookie操作

> getCookie

```js
function getCookie(name) {
  var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
	  return unescape(arr[2])
  } else {
    return null
  }
}
```

> setCookie

```js
function setCookie(name, value) {
  var hour = 8
  var exp = new Date()
  exp.setTime(exp.getTime() + hour * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}

```