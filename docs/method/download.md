# JavaScript实现下载文件

### 介绍

现在的大多数的后台管理系统都是以展示数据，管理流程为主，时不时的要导出数据，下载图片等。这时候下载功能就变得很常见，下面让我们来看看使用js实现的下载方法

### 通过Blob对象实现

```js
function downloadFile(content, filename) {
    var a = document.createElement('a')
    var blob = new Blob([content])
    var url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
}
```

### 通过Ajax实现请求数据

```js
function ajax(url, callback, options) {
    window.URL = window.URL || window.webkitURL
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    if (options.responseType) {
        xhr.responseType = options.responseType
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr)
        }
    }
    xhr.send()
}
```

### 实现方法

```js
function download() {
    var url = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=20550366,3650143321&fm=26&gp=0.jpg' // demo图片
    ajax(url, function(xhr) {
        var filename = 'xxx.' + url.replace(/(.*\.)/, '') // 自定义文件名+后缀
        downloadFile(xhr.response, filename)
    }, {
        responseType: 'blob'
    })
}
```
