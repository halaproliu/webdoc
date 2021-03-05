# JavaScript设计模式-职责链模式

在平时开发过程中，我们经常遇到这样的情况，就是需要判断很多条件。常规时候我们都会使用if...else
比如现在有一个周杰伦的演唱会门票，有388元，588元，888元三种，按照逻辑，正常我们会使用如下代码：
```js
let getConcertTicket = (type) => {
  if (type === '388') {
    console.log('购买388元演唱会门票')
  } else if (type === '588') {
    console.log('购买588元演唱会门票')
  } else if (type === '888') {
    console.log('购买888元演唱会门票')
  }
}
```
这样虽然解决了问题，但是当下次新增了1288元的门票，我们又得修改函数，这样违反了开放-封闭原则。
为了函数更加灵活，使用职责链模式进行重构：
```js
// 职责链模式
class Chain {
  constructor (fn) {
    this.fn = fn
    this.successor = null
  }

  setNextSuccessor (successor) {
    this.successor = successor
    return successor
  }

  passRequest (...args) {
    let ret = this.fn.apply(this, args)
    if (ret === 'nextSuccessor') {
      return this.successor && this.successor.passRequest.apply(this.successor, args)
    }
    return ret
  }
}
```

```js
const ticket388 = (type) => {
  if (type === '388') {
    console.log('购买388元演唱会门票')
  } else {
    return 'nextSuccessor'
  }
}

const ticket588 = (type) => {
  if (type === '588') {
    console.log('购买588元演唱会门票')
  } else {
    return 'nextSuccessor'
  }
}

const ticket888 = (type) => {
  if (type === '888') {
    console.log('购买888元演唱会门票')
  } else {
    return 'nextSuccessor'
  }
}

// 把三个门票类别包装成三个职责链节点
const chain388 = new Chain(ticket388)
const chain588 = new Chain(ticket588)
const chain888 = new Chain(ticket888)
// 指定职责链顺序
chain388.setNextSuccessor(chain588)
chain588.setNextSuccessor(chain888)
chain388.passRequest('388') // 购买388元演唱会门票
chain388.passRequest('588') // 购买588元演唱会门票
chain388.passRequest('888') // 购买888元演唱会门票
```
这时候如果新增一个1288的类别，只需要新增一个方法，并设置节点位置，即可
```js
const ticket1288 = (type) => {
  if (type === '1288') {
    console.log('购买1288元演唱会门票')
  } else {
    return 'nextSuccessor'
  }
}

const chain1288 = new Chain(ticket1288)
chain888.setNextSuccessor(chain1288)
```
### 职责链模式的优缺点
优点：
1. 解耦了请求发送者和N个接收者之间的复杂关系
2. 可以灵活的拆分重组，增加或删除一个节点
3. 可以手动指定起始节点，请求并非一定得从第一个节点开始传递，这在普通的if语句中是做不到的

缺点：
1. 不能保证某个请求一定会被链中的节点处理，所以最好设置一个default节点处理
2. 在某一次传递过程中，大部分节点并没有起到实质性作用，从性能方面考虑，要避免过长的职责链带来的性能损耗。
