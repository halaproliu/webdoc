# chrome插件添加ajax拦截功能

### 前言

通过chrome插件的注入js脚本的功能，重写XMLHttpRequest方法，从而实现拦截ajax功能。

### 实现方式

首先通过content_script注入脚本inject/main.js

```js
// 注入main.js到页面
var file = chrome.extension.getURL('inject/main.js')
var s = document.createElement('script')
s.type = 'text/javascript'
s.src = file
document.documentElement.appendChild(s)

// 传递参数到background页面
window.addEventListener('injectScript', (event) => {
  console.log(event.detail)
  chrome.runtime.sendMessage({
    type: 'demo',
    data: event.detail.data
  }, (response) => {
    console.log('demo response:', response)
  })
})
```

需要在manifest.json中添加配置，否则无法注入

```json
{
  "web_accessible_resources": ["inject/main.js"]
}
```

核心代码:

```js
let interceptor = {
  urls: [],
  originalXHR: window.XMLHttpRequest,
  myXHR: function () {
    let isScriptDispatched = false
    const modifyResponse = () => {
      if (!isScriptDispatched) {
        let matchUrls = interceptor.urls.filter(url => xhr.responseURL.indexOf(url) > -1)
        let match = matchUrls.length > 0
        if (match) {
          let data;
          if (!xhr.responseType || xhr.responseType === "text") {
              data = xhr.responseText;
          } else if (xhr.responseType === "document") {
              data = xhr.responseXML;
          } else {
              data = xhr.response;
          }
          this.responseText = this.response = data
          let detail = { url: xhr.responseURL, data }
          window.dispatchEvent(new CustomEvent("injectScript", { detail }));
          isScriptDispatched = true
        }
      }
    }
    const xhr = new interceptor.originalXHR
    for (let attr in xhr) {
      if (attr === 'onreadystatechange') {
        xhr.onreadystatechange = (...args) => {
          if (this.readyState === 4) {
            modifyResponse()
          }
          this.onreadystatechange && this.onreadystatechange.apply(this, args)
        }
        continue
      } else if (attr === 'onload') {
        xhr.onload = (...args) => {
          modifyResponse()
          this.onload && this.onload.apply(this, args)
        }
        continue
      }

      if (typeof xhr[attr] === 'function') {
        this[attr] = xhr[attr].bind(xhr);
      } else {
        // responseText和response不是writeable的，但拦截时需要修改它，所以修改就存储在this[`_${attr}`]上
        if (attr === 'responseText' || attr === 'response') {
          Object.defineProperty(this, attr, {
            get: () => this[`_${attr}`] == undefined ? xhr[attr] : this[`_${attr}`],
            set: (val) => this[`_${attr}`] = val,
            enumerable: true
          });
        } else {
          Object.defineProperty(this, attr, {
            get: () => xhr[attr],
            set: (val) => xhr[attr] = val,
            enumerable: true
          });
        }
      }
    }
  }
}


window.XMLHttpRequest = interceptor.myXHR
```