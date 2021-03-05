# 跨域资源共享（CORS）

### 介绍

跨域资源共享（CORS）是一种基于HTTP的机制，该机制通过允许服务器标示除了它自己以外的其它origin（域，协议和端口），这样浏览器可以访问加载这些资源。
CORS需要浏览器和服务器同时支持，目前所有浏览器都支持该功能，IE浏览器从IE10开始对CORS进行了完整的支持。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

### 什么情况下需要使用CORS

浏览器具有同源策略，限制浏览器访问跨域资源。

```同源是指：域名、协议、端口号完全一致。```

- XMLHTTPRequest发起的跨域请求
- Web 字体 (CSS 中通过 @font-face 使用跨源字体资源)，因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
- WebGL 贴图
- 使用 drawImage 将 Images/video 画面绘制到 canvas

### 两种请求

浏览器将CORS请求分为简单请求和非简单请求。

简单请求满足以下条件：

> 1. 请求方法是以下方法之一：
> - get
> - post
> - head
> 2. HTTP的头信息不超出以下几种字段:
> - Accept
> - Accept-Language
> - Content-Language
> - DPR
> - Downlink
> - Save-Data
> - Viewport-Width
> - Width
> - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
> 3. 请求中的任意XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
> 4. 请求中没有使用 ReadableStream 对象。

凡是不满足以上条件，就是非简单请求，非简单请求一般会先发送一个预检（options）请求，当预检请求成功后，才会继续发起请求。

### 简单请求

对于简单请求，浏览器直接发起CORS请求，浏览器会在请求头（request header）信息中添加一个Origin字段，告诉服务器当前请求的来源。

```http
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Connection: keep-alive
Content-Encoding: gzip
Content-Length: 804
Content-Type: application/x-protobuf
Host: zhihu-web-analytics.zhihu.com
Origin: https://www.zhihu.com
Referer: https://www.zhihu.com/question/61064119/answer/766607894
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
User-Agent: Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Mobile Safari/537.36
```

如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Method: get,post
Content-Type: text/html; charset=UTF-8
```

### Access-Control-*

Access-Control-Allow-Origin: *表示任何外域都可以访问，Access-Control-Allow-Origin: https://www.zhihu.com表示只有https://www.zhihu.com这个域名可以访问。

- Allow-Origin-Allow-Method: 表示允许访问的方法。
- Allow-Origin-Allow-Credentials: 表示允许发送cookie
- Access-Control-Expose-Headers 头让服务器把允许浏览器访问的头放入白名单
在跨源访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

### withCredentials

对于需要发送cookie（附带身份凭证）的请求，Allow-Origin-Allow-Origin不允许设置为*,如果设置为*，会导致请求失败。而将Allow-Origin-Allow-Origin设置为https://www.zhihu.com，则https://www.zhihu.com域名则将请求成功。另外，响应头部中会带有Set-Cookie字段，尝试对cookie进行修改。如果操作失败，将会抛出异常。