# chrome插件开发技巧

### 前言

chrome插件作为google官方提供的api工具，可以发挥难以计量的功能，如脚本注入，拦截请求，重写请求，猴子脚本等，能够极大的便利我们的日常工作需求。所以了解一些chrome插件的开发知识，还是很有必要的。

### manifest.json

以下为一个常见的范本

```json
{
  "manifest_version": 2,
  "name": "demo",
  "version": "1.0.0",
  "description": "demo extension",
  "background": {
    "scripts": [
      "js/jquery.min.js",
      "js/background.js"
    ]
  },
  "permissions": [
    "tabs",
    "activeTab",
    "contextMenus",
    "storage",
    "webRequest",
    "webRequestBlocking",
    "debugger",
    // 允许访问的网站
    "<all_urls>"
  ],
  "browser_action": {
    "default_icon": "imgs/icon.png",
    "default_title": "demo",
    "default_popup": "popup.html"
  },
  "content_scripts": [
    {
      "css": ["css/demo.css"],
      "js": [
        "js/jquery.min.js",
        "js/content-script.js"
      ],
      // <all_urls>表示匹配所有url地址
      "matches": [
        "http://*/*",
        "https://*/*"
      ],
      // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
			"run_at": "document_start"
    }
  ],
  "icons": {
    "16": "imgs/icon.png",
    "32": "imgs/icon.png",
    "64": "imgs/icon.png",
    "128": "imgs/icon.png"
  },
  "omnibox": {
    "keyword": "demo"
  },
  "devtools_page": "devtools.html"
}
```

### content_script

content_script是一种注入型页面，可以注入自定义的js和css文件，它会被注入到符合matches匹配的网站页面中，并通过run_at属性确认注入的时机。

<font color="red">注意：如果没有指定run_at为document_start(默认为document_idle),那么以下代码是不生效的</font>

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM加载完成！')
})

window.onload = () => {
  console.log('页面加载完成！')
}
```

content_script和原始页面共享DOM，但不共享js命令空间，如要访问页面JS，只能通过<font color="deeppink">injected js</font>来实现。

content_script支持的chrome api为以下4种:

- <font color="deeppink">chrome.extension</font>
- <font color="deeppink">chrome.i18n</font>
- <font color="deeppink">chrome.runtime</font>
- <font color="deeppink">chrome.storage</font>

### background

背景页面，是一个常驻内存的页面，它的生命周期也是所有类型页面中最长的，只要浏览器开着，它就始终运行着。所以通常把需要一直运行，启动就运行的的全局代码放在background页面中。

background页面的权限非常之高，几乎可以调用所有的Chrome extension api（除了devtools），而且可以无限制跨域，也就是可以跨域访问任何网站而无需要求对方设置CORS。

在manifest.json中，可以通过scripts属性直接指定一个js，也可以通过page属性指定一个html页面。

```json
{
  "background": {
    "page": "background.html"
  }
}

// or

{
  "background": {
    "scripts": ["js/background.js"]
  }
}
```

需要注意的是，虽然你可以通过chrome-extension://xxx/background.html直接打开背景页，但是你打开的背景页和真正一直在后台运行的背景页不是同一个，而且你永远看不到他的页面，只能调试它的代码。

- 拦截xmlhttprequest请求，并重写headers

```js
// 修改request header的Origin属性
chrome.webRequest.onBeforeSendHeaders.addListener (

  function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
        //查找和修改需要处理头信息
        if (details.requestHeaders[i].name === 'Origin') {
            details.requestHeaders[i].value ="http://juejin.im";
            break;
        }
    }
    
    return { requestHeaders: details.requestHeaders };

  },

  {urls:["http://juejin.im/*"], types: ["xmlhttprequest"]},  //监听页面请求,你也可以通过*来匹配。
  ["blocking", "requestHeaders"]
);
```

### popup

popup是点击<font color="deeppink">browser_action</font>或者<font color="deeppink">page_action</font>图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性交互。

```js
{
  "browser_action": {
    "default_icon": "imgs/icon.png",
    "default_title": "demo",
    "default_popup": "popup.html"
  }
}
```

popup单击图标打开，焦点离开又关闭，所以popup的生命周期一般很短，需要长时间运行的代码不适合放在popup里面。

在权限上和background类似，同时popup可以通过<font color="deeppink">chrome.extension.getBackgroundPage()</font>获取background的window对象,或直接调用background页面的方法。

### injected-script

chrome extensions可以通过在content_script中插入js脚本的方式，注入到页面中，但必须配置<font color="deeppink">web_accessible_resources</font>，才有权限访问注入的js

web_accessible_resources可以弥补content_script无法访问页面中的js的缺陷。


```js
{
  "permissions": [
    "activeTab"
  ],
  "web_accessible_resources": ["js/inject.js"]
}
```

在content_script中通过DOM方式向页面注入inject.js

```js
chrome.tabs.executeScript({
  file: 'contentScript.js'
});
```

或直接注入一段js脚本

```js
chrome.tabs.executeScript({
  code: 'document.body.style.backgroundColor="orange"'
});
```

若没有配置<font color="deeppink">web_accessible_resources</font>，则会报错

```js
Denying load of chrome-extension://<id>/js/inject.js. Resources must be listed in the web_accessible_resources manifest key in order to be loaded by pages outside the extension.
```

### devtools

常见的有Vue.js devtools，React Developer Tools,可以自定义一个或多个和Elements，Console等同级别的面板。

创建一个panel面板

```js
chrome.devtools.panels.create('demo', null, './panel/panel.html')
```

每打开一个开发者工具窗口，都会创建devtools页面的实例，检查元素窗口关闭，页面也随着关闭，所以devtools页面的生命周期和devtools窗口是一致的。devtools页面可以访问一组特有的DevTools API以及有限的扩展API，这组特有的DevTools API只有devtools页面才可以访问，background都无权访问，这些API包括：

- <font color="deeppink">chrome.devtools.panels：面板相关；</font>
- <font color="deeppink">chrome.devtools.inspectedWindow：获取被审查窗口的有关信息；</font>
- <font color="deeppink">chrome.devtools.network：获取有关网络请求的信息；</font>


大部分扩展API都无法直接被DevTools页面调用，但它可以像content-script一样直接调用chrome.extension和chrome.runtimeAPI，同时它也可以像content-script一样使用Message交互的方式与background页面进行通信。

- 拦截http请求

```js
const log = (...args) =>
    chrome.devtools.inspectedWindow.eval(`
        console.log(...${JSON.stringify(args)});
`)

function networkRequest(callback, errorCallback) {
    chrome.devtools.network.onRequestFinished.addListener(async (...args) => {
        try {
            const [
                {
                    // 请求的类型，查询参数，以及url
                    request: { method, queryString, url },
                    // 该方法可用于获取响应体
                    getContent
                }
            ] = args

            // log(method, queryString, url)
            // 将callback转为await promise
            // warn: content在getContent回调函数中，而不是getContent的返回值
            const content = await new Promise(res => getContent(res))
            // const res = JSON.parse(content)
            // log(content)
            callback(url, content)
        } catch (err) {
            log(err.stack || err.toString())
            typeof errorCallback === 'function' && errorCallback(err)
        }
    })
}
```

### omnibox

omnibox是向用户提供搜索建议的一种方式。
注册某个关键字以触发插件自己的搜索建议界面，然后可以任意发挥了。

首先，配置文件如下:

```json
{
  "omnibox": {
    "keyword": "demo"
  }
}
```

接着，在background.js中注册监听事件：

```js
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  if (!text) return
  if (text === 'search') {
    suggest([{
      content: '百度', description: '百度搜索',
      content: '谷歌', description: '谷歌搜索'
    }])
  }
})
```

在地址栏输入关键词，按tab键进行搜索。

### 通信介绍

> popup和background

- popup访问background

popup可以直接调用background中的js方法，也可以直接访问background的DOM：

```js
// background.js
function test () {
  console.log('background')
}

// popup
let bg = chrome.extension.getBackgroundPage()
bg.test()
bg.document.body.innerHTML // 访问background的DOM
```


- background访问popup

此处有个前提是popup已经打开

```js
let views = chrome.extension.getViews({type: popup})
if (views.length > 0) {
  console.log(views.location.href)
}
```


> popup或者background向content_script主动发送消息

```js
function sendMessage (message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      typeof callback === 'function' && callback(response)
    })
  })
}

sendMessage({type: 'msg', value: 'hello!'}, function (response) {
  console.log('from content_script:', response)
})
```



在content_script中接收信息：

```js
// content_script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'msg') {
    console.log(request.value)
    sendResponse('received！')
  }
})
```

> content_script发送消息给background

content_script.js

```js
chrome.runtime.sendMessage({msg: "hello, it's content script"}, function (response) {
  console.log('from background', response)
})
```

> background或者popup

```js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('received message from content_script：');
	console.log(request, sender, sendResponse);
	sendResponse('has received message' + JSON.stringify(request));
});
```


注意：

- content_script向popup主动发信息的前提是popup必须打开，否则需要利用background中转。
- 如果background和popup同时监听，那么它们可以同时收到消息，但是只有一个可以sendResponse，一个先发送了，另一个再发送就无效。
