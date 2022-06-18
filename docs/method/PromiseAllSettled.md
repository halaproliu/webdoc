# Promise.allSettled实现

### 代码实现

> 注意点：

1. 入参必须是一个数组
2. 返回结果必须与入参顺序一致
3. 返回结果必须是Promise
4. 入参无论是什么值，最终必须包裹Promise
5. 必须获得所有结果（这点是和Promise.all的区别）


```js
function PromiseAllSettled (promiseArray) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseArray)) {
            return reject(new Error('传入的参数必须是数组！'))
        }
        const res = []
        const len = promiseArray.length
        let counter = 0
        for (let i = 0; i < len; i++) {
            // Promise.resolve可以直接转为promise
            Promise.resolve(promiseArray[i]).then(value => {
                res[i] = value
            }).catch(e => {
                res[i] = e
            }).finally(() => {
                // 关注结果的顺序
                counter++
                // 不能使用res.length === len判断，数组特性，假如输入arr[3],则length为4，会出错
                if (counter === len) {
                    resolve(res)
                }
            })
        }
    })
}
```