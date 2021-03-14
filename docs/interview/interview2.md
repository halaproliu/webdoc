# 2021大厂前端核心面试题详解

## 一、有做过前端加载优化相关的工作吗？都做过哪些努力

1、 做性能优化的目的是什么？

1. 首屏时间（FP）
2. 首次可交互时间（FIP）
3. 首次有意义内容渲染时间（FMP）

页面性能检测：https://developers.google.com/speed/pagespeed/insights

polyfill: https://polyfill.io/v3/url-builder/

1. 只请求当前需要的资源

    异步加载，懒加载，polyfill

2. 缩减资源体积

    打包压缩 webpack4内置 gzip
    图片格式的优化， 压缩， 根据分辨率展示不同分辨率的图片， webp
    尽量控制cookie的大小 request header， cookie

3. 时序优化

    js promise.all
    ssr, seo
    prefetch, prerender, preload
    <link rel="dns-prefetch" href="xxx1.com">
    <link rel="dns-prefetch" href="xxx2.com">
    <link rel="preconnect" href="xxx1.com">
    <link rel="preload" as="image" href="https://xxx1.com/p.png">

4. 合理利用缓存

    cdn cdn预热，cdn刷新

2、 如果一段js执行时间非常长，如何去分析

装饰器

```ts
export function mearsure (target: any, name: string, descriptor: any) {
    const oldValue = descriptor.value
    descriptor.value = async function () {
        console.time(name)
        const ret = await oldValue.apply(this, arguments)
        console.timeEnd(name)
        return ret
    }
    return descriptor
}
```

3、 阿里云oss支持通过链接后面

```js
function isWebp () {
    try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (e) {
        return false
    }
}
const supportsWebp = isWebp()
function getWebpImageUrl (url) {
    if (!url) {
        throw Error('url不能为空')
    }

    if (url.startsWith('data:')) {
        return url
    }

    if (!supportsWebp) {
        return url
    }

    return url + '?x-oss-processxxxxxxxxxxxxx'
}
```

4、 如果有巨量的图片需要展示，除了懒加载的方式，有没有什么其他方法限制一下同时加载的图片数量？

代码题，实现promise

```js
function limitLoad (urls, handler, limit) {
    const sequence = [].concat(urls)
    let promises = []
    
    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index
        })
    })

    let p = Promise.race(promises)
    for (let i = 0; i < sequence.length; i++) {
        p = p.then(res => {
            promises[res] = handler(sequence[i]).then(() => {
                return res
            })
            return Promise.race(promises)
        })
    }
}

const urls = []

function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log('-----' + url.info + ' start！')
        setTimeout(() => {
            console.log(url.info + 'OK!!!')
            resolve()
        }, url.time)
    })
}

limitLoad(urls, loadImg, 3)
// 1 2 3 4 5 6 7
```

## 二、平时有关注过前端的内存处理吗？

1. 内存的生命周期
    
    内存分配：声明变量，函数，对象的时候，js会自动分配内存。
    内存使用：调用的时候，使用的时候
    内存回收：引用计数，标记清除

2. js中的垃圾回收机制

    1. 引用计数垃圾回收

        a对象对b对象有访问权限，那么称为a引用b对象。
        缺陷： 循环引用
    
    2. 标记清除算法

        无法达到的对象进行内存回收

        1. 在运行的时候给存储在内存上的所有变量加上标记
        2. 从根部触发，能触及的对象，把标记清除
        3. 那些有标记的就被视为即将要删除的变量

    3. js中有哪些常见的内存泄露

        1. 全局变量

        2. 未被清除的定时器和函数
        
        3. 闭包

        4. dom的运用
            
        ```js
        /** 对象没回收，引用一直存在 */
        const elements = {
            image: document.getElementById('image')
        }

        document.body.appendChild(document.getElementById('image'))
        /** 处理 */
        elements.image = null
        ```
    
    4. 如何避免内存泄露

        减少不必要的全局变量
        使用完数据后，及时解除引用

### 2. 实现sizeOf函数，传入一个参数object，计算这个Object占用了多少bytes？

<!-- 类型size npm库 -->
const a = require('object-sizeof')

```js
const xxx = {}
const testData = {
    a: 111,
    b: 'cccc',
    2222: false,
    c: xxx,
    d: xxx
}

// 1. 对于计算机基础，js内存基础的考察
// 2. 递归
// 3. 递归终止条件，相同引用处理
const seen = new WeakSet()

function sizeOfObject(object) {
    if (object === null) {
        return 0
    }
    let bytes = 0
    // 对象里的key也是占用内存空间的
    const properties = Object.keys(object)
    for (let i = 0; i < properties.length; i++) {
        if (typeof object[key] === 'object' && object[key] !== null) {
            if (!seen.has(object[key])) {
                bytes += calculator(key)
                continue
            }
            seen.add(object[key])
        }
        bytes += calculator(key)
        bytes += calculator(object[key])
    }

    return bytes
}

function calculator(object) {
    const objectType = typeof object

    switch (objectType) {
        case 'string':
            return object.length * 2
        case 'boolean':
            return 4
        case 'number':
            return 8
        case 'object':
            if (Array.isArray(object)) {
                // 对数组的处理
                // [1, 2, 3, 4]
                // [{ x: 1 }, { x: 2 }]
                return object.map(calculator).reduce((res, current) => res + current, 0)
            } else {
                // 对对象的处理
                return sizeOfObject(object)
            }
    }
}
```

number: 8字节
string：每个长度 2字节
boolean： 4个字节


## 三、来聊一下前端HTTP请求相关吧

1. 平时解决跨域问题

    1. jsonp
    2. cors
    3. node 正向代理，/api -> 同域的node服务 -> /api -> 前端
    4. nginx反向代理, proxy_pass, /api -> $proxy/same/api
    5. img

2.  有做过全局的请求处理吗？ 比如统一处理登录态？统一处理全局错误？

    axios

    adapter

    interceptor request reponse

3. 代码题，你能给xhr添加hook， 实现在各个阶段打日志吗？

    new XMLHTTPRequest()

    open
    onreadystatechange
    onload
    onerror

    ```js
    // 1. class的使用，new对象
    // 2. this指向
    // 3. apply， call的使用
    // 4. Object.defineProperty的使用
    // 5. 代码的设计能力
    // 6. hook的理解
    class XhrHook {
        constructor(beforeHooks = {}, afterHooks = {}) {
            this.XHR = window.XMLHttpRequest
            this.beforeHooks = beforeHooks
            this.afterHooks = afterHooks
            this.init()
        }

        init () {
            let _this = this
            window.XMLHttpRequest = function () {
                this._xhr = new _this.XHR()
                _this.overwrite(this)
            }
        }

        overwrite (proxyXHR) {
            for (let key in proxyXHR._xhr) {
                if (typeof proxyXHR._xhr[key] === 'function') {
                    this.overwriteMethod(key, proxyXHR)
                    continue
                }

                this.overwriteAttributes(key, proxyXHR))
            }
        }

        /** 重写方法 */
        overwriteMethod (key, proxyXHR) {
            let beforeHooks = this.beforeHooks // 我们应该可以拦截原有行为
            let afterHooks = this.afterHooks

            proxyXHR[key] = (...args) => {
                // 拦截
                if (beforeHooks[key]) {
                    const res = beforeHooks[key].call(proxyXHR, args)
                    if (res === false) {
                        return
                    }

                }

                const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args)

                afterHooks[key] && afterHooks[key].call(proxyXHR._xhr, res)

                return res
            }
        }

        /** 重写属性 */
        overwriteAttributes (key, proxyXHR) {
            Object.defineProperty(proxyXHR, key, this.setPropertyDescriptor)
        }

        setPropertyDescriptor (key, proxyXHR) {
            let obj = Object.create(null)
            let _this = this

            obj.set = function (val) {
                if (!key.startsWith('on')) {
                    proxyXHR['__' + key] = val
                    return
                }

                if (_this.beforeHooks[key]) {
                    this._xhr[key] = function (...args) {
                        _this.beforeHooks[key].call(proxyXHR)
                        val.apply(proxyXHR, args)
                    }
                    return
                }

                this._xhr[key] = val
            }

            obj.get = function () {
                return proxyXHR['__' + key] || this._xhr[key]
            }
        }
    }

    new XhrHook({
        open: function () {
            console.log('open')
        },
        onload: function () {
            console.log('onload')
        },
        onreadystatechange: function () {
            console.log('onreadystatechange')
        },
        onerror: function () {
            console.log('onerror')
        }
    })

    var xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://www.baidu.com')


    ```

## 四、平时用过发布订阅模式吗？比如Vue的event bus，node的EventEmmitter

```js
class EventEmitter {
    constructor (maxListeners) {
        this.events = {}
        this.maxListeners = maxListeners || 0
    }

    on (key, cb) {
        if (!this.events[key]) {
            this.events[key] = []
        }
        // 拦截最大监听
        if (this.maxListeners !== 0 && this.events[key].length >= this.maxListeners) {
            console.log(`当前事件${key}超过最大监听数`)
            return this
        }

        this.events[key].push(cb)
        return this
    }

    emit (key, ...args) {
        if (!this.events[key]) {
            console.log('该事件不存在')
            return this
        }
        this.events[key].forEach(fn => fn.apply(this, args))
        return this
    }

    off (key, cb) {
        if (!cb) {
            this.events[key] = null
            return
        }
        this.events[key] = this.events[key].filter(item => item !== cb)
        return this
    }

    once (key, cb) {
        const func = (...args) => {
            this.off(key, func)
            cb.apply(this, args)
        }
        this.on(key, func)
        return this
    }
}
```

## 五、来一道算法题 01背包问题

leetcode原题

1. 明确【状态】和【选择】
    可选物品
    背包的容量的限制

    所以状态有两个：
    1. 可选择的物品
    2. 背包的容量

    所以选择有两个
    1. 装进背包
    2. 不装进背包

```js
for 状态1 in 状态1的所有数值
    for 状态2 in 状态2的所有取值
        dp[状态1][状态2] = 选择(选择1, 选择2)
```

2. 明确dp数组的定义

状态有两个， 二维dp数组

dp[i][w] = 对于前i个物品，当前背包容量w，这种情况下可以装的最大价值是dp[i][w]

边界条件：
dp[0][w] = 0
dp[i][0] = 0

dp[3][5] = 6, 对于所有物品，如果只对前三个进行选择，当背包容量为5的时候，最多能装下的价值是6

```js
let dp[N+1][W+1]
dp[0][xxxx] = 0
dp[xxxx][0] = 0

for 状态1 in 状态1的所有数值
    for 状态2 in 状态2的所有取值
        dp[状态1][状态2] = 选择(把物品装进背包, 不装进背包)

return dp[N][W]
```

3. 状态转移方程怎么写？

    dp[i][w] 对于前i个物品，当前背包的容量为w，这种情况下可以装下的最大价值是dp[i][w];

    1. 如果没有把第i个物品装进背包

    dp[i][w] = dp[i-1][w]

    2. 如果把第i个物品装进背包

    第i个物品的价值是val[i-1]
    第i个物品的重量是wt[i-1]

    dp[i][w] = dp[i-1][w-wt[i-1]] + val[i-1]

    ```js

    for i in [1..N]
        for w in [1..W]
        dp[i][w] = Math.max(
            dp[i-1][w],
            dp[i][w] = dp[i-1][w-wt[i-1]] + val[i-1]
        )
    ```

4. 把伪代码转换为代码

    ```js
    /**
     * @decription 0-1背包问题
     * @param {Number} W 背包重量
     * @param {Number} N 价值
     * @param {Array} wt 重量数组
     * @param {Array} val 价值数组
     */
    function knapsack(w, N, wt = [], val = []) {
        const dp = Array.from(new Array(N + 1), () =>  new Array(W + 1).fill(0))
        for (let i = 0; i <= N; i++) {
            for (let w = 1; w <= W; w++) {
                if (w-wt[i-1] < 0) {
                    dp[i][w] = dp[i-1][w]
                } else {
                    dp[i][w] = Math.max(
                        dp[i-1][w],
                        dp[i][w] = dp[i-1][w-wt[i-1]] + val[i-1]
                    )
                }
            }
        }
        return dp[N][W]
    }
    ```
