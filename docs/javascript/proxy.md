# 学会 Proxy 就可以为所欲为吗？一段巧妙代码的简单解读

今天刷 github 的时候，看到 [justjavac](https://github.com/justjavac) 大佬 po 出来了这样的一段代码（[justjavac/proxy-www](https://github.com/justjavac/proxy-www)）：

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        let o = Reflect.get(target, prop);
        if (typeof o === 'function') {
            return o.bind(target)
        }
        if (typeof prop !== 'string') {
            return o;
        }
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        target = new URL(target);
        target.hostname += `.${prop}`;
        return new Proxy(target, { get });
    }
});
```

乍一看可能有点不明所以，但使用起来让人眼前一亮！可以直接把网址作为变量进行访问：

```js
www.baidu.com.then(response => {
    console.log(response.status);
    // ==> 200
})
```


用 async / await 语法则变得更为简单：

```js
const response = await www.baidu.com

console.log(response.ok)
// ==> true

console.log(response.status);
// ==> 200

```

这一切都来源于 ES6 中提出的 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 和 [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect) 语法，我们不妨用这段代码来简单学习一下他们吧~
[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 也就是代理。学习过计算机网络的朋友对这个词肯定不陌生。在计算机网络中，代理是指客户端不直接连接服务器，而是通过一些中间的机器进行请求的传递，从而达到提高访问速度，提升安全性之类的需求。


![](../imgs/proxy.awebp)

javascript 中的 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 也是类似的功能，只不过阻隔的不再是服务器和客户端，而是一般的对象和使用对象的用户。以这段代码为例，[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 就是夹在 new URL("www") 和要访问或修改这个 URL 的用户之间：

```js
const www = new Proxy(new URL('https://www'), { ... }});
```


额外加入一层代理自然是要进行一些自定义的操作，[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 会通过传入的第二个参数去劫持对象的 <font color="#D33200">[[Get]]</font>，<font color="#D33200">[[Set]]</font> 这样的内部方法。这段代码劫持的是 <font color="#D33200">[[Get]]</font>：

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) { ... }
});

```

替换的 <font color="#D33200">[[Get]]</font> 函数有两个参数：target 是指原本的对象，也就是 URL；prop 则是需要访问的对象名，对于 www.baidu.com 的例子来说，第一层的 prop 就是 "baidu"，第二层是 "com"。
继续研究这段代码，我们遇到了 [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect)。[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect) 是和 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 一同提出的，简单理解的话就是把 <font color="#D33200">[[Get]]</font>、<font color="#D33200">[[Set]]</font>这样的内部函数转化为函数式的调用方法。[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect) 常常和 Proxy 配合使用，来把被劫持的操作重新施加于原有的对象。在这里：

```js
let o = Reflect.get(target, prop);

```

也可以理解为：

```js
let o = target[prop]
```

剩下的代码就很好理解了：

```js
const www = new Proxy(new URL('https://www'), {
    get: function get(target, prop) {
        let o = Reflect.get(target, prop);
        // 当 `[[Get]]` 的属性为 `URL` 已有的函数，那么就返回这个已有的函数
        // 补：例如 www.justjavac.com.toString()
        if (typeof o === 'function') {
            return o.bind(target)
        }
        // 当 `prop` 不是字符串的时候，返回当前的属性
        // 补：object key 只能是字符串和 Symbol，所以这里是判断是否为 Symbol。
        //    使用场景是 www.justjavac.com + 'foo/bar'
        if (typeof prop !== 'string') {
            return o;
        }
        // 如果 `prop` 为 `then`，就把 `URL` 转化为 `fetch` 后的
        // `Promise`。（这样的结果就是不能调用 `www.then.com` 这样的网址了）
        if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
        }
        // 对于其余的情况，把新增加的字符串加进域名中，并重新包一层 `Proxy`。
        target = new URL(target);
        target.hostname += `.${prop}`;
        return new Proxy(target, { get });
    }
});

```


到这里，你看懂这一段代码了吗？是不是也对 Proxy 和 [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect) 的用法有了基本的了解呢？如果想要更深度的理解他们，推荐这篇万字长文：[Proxy 和 Reflect](https://juejin.cn/post/6844904090116292616) by 王小酱。