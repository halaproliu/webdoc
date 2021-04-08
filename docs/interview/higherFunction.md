# 几个面试手写题

### 根据Id查找树的任意一项，例如给出的输入

> 问题

```js
var data = [
    {
        id: '100',
        name: '上海',
        children: [
            {
                id: '101',
                name: '浦东',
                children: []
            },
            {
                id: '102',
                name: '浦西',
                children: []
            }
        ]
    },
    {
        id: '200',
        name: '杭州',
        children: [
            {
                id: '201',
                name: '西湖',
                children: [
                    {
                        id: '221',
                        name: '',
                        children: []
                    }
                ]
            },
            {
                id: '202',
                name: '余杭',
                children: []
            }
        ]
    }
]
```

> 解答
使用递归的方式进行迭代查找（深度优先遍历）

```js
const find = (data, target) => {
    let ans = ''
    const dfs = (arr) => {
        for (let item of arr) {
            if (item.id === target) {
                ans = item.name
                return
            } else if (item.children && item.children.length) {
                dfs(item.children)
            }
        }
    }
    dfs(data)
    return ans
}
```

### 以下方法存在安全漏洞，请对其进行攻击，执行 alert(1), 并回答如何解决问题

```js
function querySearch () {
    const qs = window.location.search.length > 0 ? window.location.search.substring(1) : ''
    const args = {}
    const items = qs.length > 0 ? qs.split('&') : []

    items.forEach(v => {
        let item = v.split('=')
        let key = decodeURIComponent(item[0])
        if (key) args[key] = decodeURIComponent(item[1])
    })

    if (name) return args[name] || null
    return args
}
var search = querySearch();
var content = '<img src = "' + search.url + '"/>';
document.getElementById('J_Container').innerHTML = content;
```

> 答案

攻击

http://sample.com/?url=javascript:alert(1)

```js
// 对输入字符进行转义
content = `${cotent.replace([\>\/], '')}/>`
```



### query 转换, 写一个函数 "parseUrl" 把 url 解析彻底 .补充测试用例

```js
function parseUrl(name) {
    const qs = window.location.search.length > 0 ? window.location.search.substring(1) : ''
    const args = {}
    const items = qs.length > 0 ? qs.split('&') : []

    items.forEach(v => {
        let item = v.split('=')
        let key = decodeURIComponent(item[0])
        if (key) args[key] = decodeURIComponent(item[1])
    })

    if (name) return args[name] || null
    return args
}
```

### 下列操作中，异步中的错误无法被try catch捕获，请修改

> 问题

```js
const url = '/sample/api'
try {
    asyncAjaxGet(url, (response) => {
        response.data.children = 1 // 可能有异常，期望被捕获
    })
} catch (e) {
    console.log('failed to get response children')
}
```

> 答案

```js
window.onError = (err) => {
    console.log('err', err)
}
asyncAjaxGet = new Proxy(window, {
    get: function (name, descripor) {
        if (name != 'asyncAjaxGet') {
            return descripor
        }
        let fn = descripor.value
        descripor.value = async function (...rest) {
            try {
                await fn(rest)
            } catch (err) {
                console.log('err', err)
            }
        }
        return descripor
    },
})
```

