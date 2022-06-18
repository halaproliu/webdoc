# Promise.all方法实现

### 介绍

Promise.all作为开发过程中常使用的方法，其实现原理也是很值得学习的，接下来让我们来了解下


### 方法实现

> 注意点：

1. 入参必须是一个数组
2. 返回结果必须与入参顺序一致
3. 返回结果必须是Promise
4. 入参无论是什么值，最终必须包裹Promise
5. 一旦有错误，必须终止操作


```js
function PromiseAll (promiseArray) {
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
                // 关注结果的顺序
                counter++
                res[i] = value
                // 不能使用res.length === len判断，数组特性，假如输入arr[3],则length为4，会出错
                if (counter === len) {
                    resolve(res)
                }
            }).catch(e => reject(e))
        }
    })
}
```