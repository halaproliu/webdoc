# 中间件实现

```js
class Iterator {
    constructor () {
        this.middlewares = []
    }

    use (module) {
        Array.isArray(module) ? module.map(item => this.use(item)) : this.middlewares.push(module)
        return this
    }

    async run (ctx) {
        function createNext (middleware, oldNext) {
            return async () => {
                await middleware(ctx, oldNext)
            }
        }

        let len = this.middlewares.length
        let next = async () => {
            return Promise.resolve()
        }

        for (let i = len - 1; i >= 0; i--) {
            let currentMiddleware = this.middlewares[i]
            next = createNext(currentMiddleware, next)
        }
        await next()
    }
}
```
