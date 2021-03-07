# webpack懒加载

### 实现原理

定义了一个对象 installedChunks，作用是缓存动态模块。
定义了一个辅助函数 jsonpScriptSrc()，作用是根据模块 ID 生成 URL。
定义了两个新的核心函数 __webpack_require__.e() 和 webpackJsonpCallback()。
定义了一个全局变量 window["webpackJsonp"] = []，它的作用是存储需要动态导入的模块。
重写 window["webpackJsonp"] 数组的 push() 方法为 webpackJsonpCallback()。也就是说 window["webpackJsonp"].push() 其实执行的是 webpackJsonpCallback()。


```js
__webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    // JSONP chunk loading for javascript
    var installedChunkData = installedChunks[chunkId];
    if(installedChunkData !== 0) { // 0 means "already installed".
        // a Promise means "currently loading".
        if(installedChunkData) {
            promises.push(installedChunkData[2]);
        } else {
            // setup Promise in chunk cache
            var promise = new Promise(function(resolve, reject) {
                installedChunkData = installedChunks[chunkId] = [resolve, reject];
            });
            promises.push(installedChunkData[2] = promise);

            // start chunk loading
            var script = document.createElement('script');
            var onScriptComplete;

            script.charset = 'utf-8';
            script.timeout = 120;
            if (__webpack_require__.nc) {
                script.setAttribute("nonce", __webpack_require__.nc);
            }
            script.src = jsonpScriptSrc(chunkId);

            // create error before stack unwound to get useful stacktrace later
            var error = new Error();
            onScriptComplete = function (event) {
                // avoid mem leaks in IE.
                script.onerror = script.onload = null;
                clearTimeout(timeout);
                var chunk = installedChunks[chunkId];
                if(chunk !== 0) {
                    if(chunk) {
                        var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                        var realSrc = event && event.target && event.target.src;
                        error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                        error.name = 'ChunkLoadError';
                        error.type = errorType;
                        error.request = realSrc;
                        chunk[1](error);
                    }
                    installedChunks[chunkId] = undefined;
                }
            };
            var timeout = setTimeout(function(){
                onScriptComplete({ type: 'timeout', target: script });
            }, 120000);
            script.onerror = script.onload = onScriptComplete;
            document.head.appendChild(script);
        }
    }
    return Promise.all(promises);
};
```


它的处理逻辑如下：
先查看该模块 ID 对应缓存的值是否为 0，0 代表已经加载成功了，第一次取值为 undefined。
如果不为 0 并且不是 undefined 代表已经是加载中的状态。然后将这个加载中的 Promise 推入 promises 数组。
如果不为 0 并且是 undefined 就新建一个 Promise，用于加载需要动态导入的模块。
生成一个 script 标签，URL 使用 jsonpScriptSrc(chunkId) 生成，即需要动态导入模块的 URL。
为这个 script 标签设置一个 2 分钟的超时时间，并设置一个 onScriptComplete() 函数，用于处理超时错误。
然后添加到页面中 document.head.appendChild(script)，开始加载模块。
返回 promises 数组。
当 JS 文件下载完成后，会自动执行文件内容。也就是说下载完 0.bundle.js 后，会执行 window["webpackJsonp"].push()。
由于 window["webpackJsonp"].push() 已被重置为 webpackJsonpCallback() 函数。所以这一操作就是执行 webpackJsonpCallback() ，接下来我们看看 webpackJsonpCallback() 做了哪些事情。

### 小结

总的来说，动态导入的逻辑如下：
重写 window["webpackJsonp"].push() 方法。
入口模块使用 __webpack_require__.e() 下载动态资源。
资源下载完成后执行 window["webpackJsonp"].push()，即 webpackJsonpCallback()。
将资源标识为 0，代表已经加载完成。由于加载模块使用的是 Promise，所以要执行 resolve()。
再看一下入口模块的加载代码 __webpack_require__.e(0).then(__webpack_require__.bind(null, "./src/test2.js"))，下载完成后执行 then() 方法，调用 __webpack_require__() 真正开始加载代码，__webpack_require__() 在上文已经讲解过，如果不了解，建议再阅读一遍。
