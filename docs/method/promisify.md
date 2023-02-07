# promisify实现

```js
function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
}
```