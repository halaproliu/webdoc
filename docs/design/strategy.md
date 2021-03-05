# JavaScript设计模式-策略模式

策略模式指的是定义一系列算法，并且把它们封装起来，将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外。策略模式的目的是将算法和使用算法的方式隔离开来。

下面以计算购买的促销衣服为例。双11的时候，各个商家都在打折促销，衣服分为A，B，C三类产品，对应的折扣分别为9折，8折，7折。假设财务要求我们提供一段代码，来方便我们计算最终价格。
### 1. 最初的代码实现
```js
const calculatePrice = (type, price) => {
  if (type === 'A') {
    return price * 0.9
  }
  if (type === 'B') {
    return price * 0.8
  }
  if (type === 'C') {
    return price * 0.7
  }
}

calculatePrice('A', 300) // 270
calculatePrice('C', 500) // 350
```
可以发现这段代码很简单，但是存在着显而易见的缺点。函数包含了许多if...else语句，且需要罗列出所有情况。当我们新增一个类型的时候，就需要深入代码内部去修改，这是违反开放-封闭原则的。且代码的复用性差。
### 2. 使用组合函数重构代码
```js
const clothesA = (price) => {
  return price * 0.9
}

const clothesB = (price) => {
  return price * 0.8
}

const clothesC = (price) => {
  return price * 0.7
}

const calculatePrice = (type, price) => {
  if (type === 'A') {
    return clothesA(price)
  }
  if (type === 'B') {
    return clothesB(price)
  }
  if (type === 'C') {
    return clothesC(price)
  }
}
```
目前程序得到了一定的改善，但是改善十分有限，我们依然没有解决最重要的问题，就是当程序越来越庞大的时候，系统变化缺乏弹性。
### 3. 使用策略模式进行重构
```js
function clothesA () {}
clothesA.prototype.calculate = (price) => {
  return price * 0.9
}

function clothesB () {}
clothesB.prototype.calculate = (price) => {
  return price * 0.8
}

function clothesC () {}
clothesC.prototype.calculate = (price) => {
  return price * 0.7
}

function Price () {
  this.price = null
  this.strategy = null
}

Price.prototype.setPrice = (price) => {
  this.price = price
}

Price.prototype.setStrategy = (strategy) => {
  this.strategy = strategy
}

Price.prototype.getPrice = () => {
  return this.strategy.calculate(this.price)
}

const price = new Price()
price.setPrice(300)
price.setStrategy(clothesA)
price.getPrice()
```
### 4. JavaScript的策略模式
```js
const strategies = {
  A: (price) => price * 0.9,
  B: (price) => price * 0.8,
  C: (price) => price * 0.7,
}

const calculatePrice = (type, price) => {
  return strategies[type](price)
}
```
### 5. 表单校验
在一个web项目中，注册，登录，修改用户信息等功能都离不开表单校验。在用户输入的过程中，进行一些数据校验，在把用户数据交给后台前，进行第一步的把关，可以避免提交不合法数据的一些网络开销。下面是策略模式在表单校验中的实战。
```js
var strategies = {
  // 不为空
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  // 限制最小长度
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  // 手机号码格式或电话号码格式
  isMobile: function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value) && !/^0\d{2,3}-?\d{7,8}$/.test(value)) {
      return errorMsg
    }
  },
  isImage: function (type, errorMsg) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg')
    var r = type.match(/png|jpeg|bmp|gif/);
    
    if (!r) {
      return errorMsg
    }
  }
}

class Validator {
  constructor () {
    this.cache = []
  }

  add (dom, rule, errorMsg) {
    var ary = rule.split(':')
    this.cache.push(function () {
      var strategy = ary.shift()
      ary.unshift(dom.value)
      ary.push(errorMsg)
      return strategies[strategy].apply(dom, ary)
    })
  }

  start () {
    for (var i = 0, validatorFunc; i < this.cache.length; i++) {
      var validatorFunc = this.cache[i]
      var msg = validatorFunc()
      if (msg) {
        return msg
      }
    }
  }
}
```
