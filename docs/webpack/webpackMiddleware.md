# webpack Mock中间件

### 方法一-中间件代码

```js
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()

let config = {}
let configPath = path.join(cwd, 'config.js')
if (fs.existsSync(configPath)) {
  config = require(configPath)
}

const getResponseJson = (url) => {
  const basePath = path.join(cwd, 'mock')
  let filename = url.replace(/\?.*/, '').match(/\/([^/]*)$/)[1]
  let destPath = path.join(basePath, filename)
  return require(destPath)
}

module.exports = (app) => {
  if (config.useMock) {
    app.get('/test', (req ,res) => {
      let json = getResponseJson(req.url)
      res.json(json)
    })
  }
}
```

### 使用方法

```js
const mockMiddleware = require('./middleware/mockMiddleware')
module.exports = {
  devServer: {
    disableHostCheck: true, // 避免浏览器验证host
    contentBase: path.join(__dirname, 'mock'),
    hot: true,
    before: (app) => {
      mockMiddleware(app)
    },
    proxy
  },
}
```

### 方法二-中间件代码

```js
const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const Mock = require('mockjs')

const getApiUrl = () => {
  let apiPath = path.join(cwd, 'mock')
  if (fs.existsSync(apiPath)) {
    return require(apiPath)
  }
  return {}
}

module.exports = async (req, res, next) => {
  let apiUrls = getApiUrl()
  let reqUrl = req.url.split('?')[0]
  let method = req.method.toLowerCase()
  let key = `${method} ${reqUrl}`
  let data = apiUrls[key]
  let result
  if (data) {
    if (typeof data === 'function') {
      result = data(req, res)
    } else {
      result = data
    }
    result = Mock.mock(result)
    res.json(result)
  } else {
    next()
  }
}
```

```js
// mock/index.js
const getMockData = (url) => {
  let data = null
  try {
    delete require.cache[require.resolve(url)]
    data = require(url)
  } catch (e) {
    console.log('error: get mock data fail')
  }
  return data
}
module.exports = {
  'get /test': getMockData('./test')
}
```

### 使用方法

```js
const mockMiddleware = require('./middleware/mockMiddleware')
module.exports = {
  devServer: {
    disableHostCheck: true, // 避免浏览器验证host
    contentBase: path.join(__dirname, 'mock'),
    hot: true,
    before: (app) => {
        app.use(mockMiddleware)
    },
    proxy
  },
}
```