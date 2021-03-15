# Promise实现

### Promise.all实现

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

### Promise.allSettled

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

### 使用Promise实现flow

- 使用promise实现flow方法，使得可以按顺序执行以下方法

```js
function a() {
    console.log('a')
}
function b() {
        console.log('b')
}
function c() {
        console.log('c')
}
function d() {
        console.log('d')
}

console.log(flow([a, b]))
console.log(flow([a, [b, c], d]))
```

```js
function flow(que){
    let index =0
    const calculate = function(i){
        let fn = que[i]
        fn = Array.isArray(fn) ? fn:[fn]
        Promise.all(fn).then(res => {
            res.forEach(v => v())
            index++
            return index
        }).then(i => {
            if(i < que.length){
                calculate(i)
            }
        })
    }
    calculate(index)
}
```

### PromiseA+实现

```js
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'
const isFn = fn => typeof fn === 'function'
const isDef = val => val !== null && val !== void 0
class Promise {
  constructor(executor) {
    if (!isFn(executor)) throw new Error('Promise must receive a function for parameter')
    this.status = PENDING
    this.value = void 0
    this.reason = void 0
    this.onFullfilledCallbacks = []
    this.onRejectedCallbacks = []
    // on resolve
    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      setTimeout(_ => {
        if (this.status !== PENDING) return
        this.status = FULLFILLED
        this.value = value
        this.onFullfilledCallbacks.forEach(cb => cb(this.value))
      })
    }
    // on reject
    const reject = reason => {
      setTimeout(_ => {
        if (this.status !== PENDING) return
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(cb => cb(this.reason))
      })
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFullfilled, onRejected) {
    let promise2
    const { status } = this
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }
    return (promise2 = new Promise((resolve, reject) => {
      switch (status) {
        case PENDING:
          this.onFullfilledCallbacks.push(value => {
            try {
              let x = onFullfilled(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
          this.onRejectedCallbacks.push(reason => {
            try {
              let x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
          break
        case FULLFILLED:
          gen(onFullfilled, promise2, resolve, reject)(this.value)
          break
        case REJECTED:
          gen(onRejected, promise2, resolve, reject)(this.reason)
          break
      }
    }))
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(value) {
    return new Promise(resolve => resolve(value))
  }

  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      let values = []
      promises.forEach(promise => {
        Promise.resolve(promise).then(val => {
          count++
          values.push(val)
          if (count === promises.length) {
            resolve(values)
          }
        }, reject)
      })
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        Promise.resolve(promise).then(resolve, reject)
      })
    })
  }

  static deferred() {
    let defer = {}
    defer.promise = new Promise((resolve, reject) => {
      defer.resolve = resolve
      defer.reject = reject
    })
    return defer
  }
}

function gen(_resolver, promise2, resolve, reject) {
  return function(val) {
    setTimeout(() => {
      try {
        let x = _resolver(val)
        resolvePromise(promise2, x, resolve, reject)
      } catch (e) {
        reject(e)
      }
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
    return reject(new TypeError('循环引用'))
  }

  let called = false // 避免多次调用
  // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
  if (x instanceof Promise) {
    // 获得它的终值 继续resolve
    if (x.status === PENDING) {
      // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject)
        },
        reason => {
          reject(reason)
        }
      )
    } else {
      // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
      x.then(resolve, reject)
    }
    // 如果 x 为对象或者函数
  } else if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 是否是thenable对象（具有then方法的对象/函数）
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        // 说明是一个普通对象/函数
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```
