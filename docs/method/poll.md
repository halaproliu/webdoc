# 实现ajax轮询的通用方法

### 背景介绍

在浏览器去请求接口结果时，接口还未成获取到结果，这时候就需要使用长轮询或者websocket技术，但是为了兼容更低级的设备。因此选择了长轮询。

### 实现方式

封装轮询通用类，通过传入循环方法体，轮询间隔和轮询次数，进行通用轮询。
以下为具体实现：

```js
class Poll {
    timeObj = {} // 轮询对象
    timeId = 0 // 轮询id
    isFirst = true // 是否首次轮询
    constructor(fn, interval = 3000, count = 10) {
        this.fn = fn // 轮询方法体
        this.interval = interval // 轮询时间
        this.defaultCount = count // 默认轮询次数
        this.count = count // 轮询次数
    }
    setCallback(cb) {
        this.cb = cb
    }
    setArgs(...args) {
        this.args = args
    }
    // 开启轮询
    start() {
        const id = this.timeId++
        this.timeObj[id] = true
        const timerFn = () => {
            if (!this.timeObj[id]) return
            if (this.args) {
                this.fn.apply(this, this.args)
            } else {
                this.fn()
            }
        }
        // 若是首次，直接执行方法体，并修改是否首次状态为false，并减少次数
        if (this.isFirst) {
            timerFn()
            this.count--
            this.isFirst = false
            return
        }
        if (this.count > 0) {
            setTimeout(timerFn, this.interval)
            this.count--
        } else {
            this.stop()
            typeof this.cb === 'function' && this.cb()
        }
    }
    // 停止轮询
    stop() {
        this.count = this.defaultCount
        this.timeObj = {}
        this.isFirst = true
    }
}
```

### 使用方式

```js
export default {
    data () {
        return {
            poll: null
        }
    },
    created () {
        this.poll = new Poll(this.getApi)
        this.poll.setCallback(this.afterPoll)
        this.poll.start()
    },
    methods: {
        async getApi () {
            let res = axios.get('/xxx')
            if (res.code === '0') { // 需要继续轮询
                this.poll.start()
            } else if (res.code === '1') {
                this.poll.stop()
            }
        },
        afterPoll () {
            console.log('poll finish')
        }
    }
}
```
