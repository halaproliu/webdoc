# JavaScript设计模式-享元模式

  享元模式是一种用于性能优化的模式，享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
   如果系统中创建了大量类似的对象而导致内存占用过高，享元模式就非常有用了。在JavaScript中，浏览器特别是移动端分配的内存并不算多，如何节省内存就成了一件非常有意义的事情。
  为了让我们能更好的理解享元模式，下面先说一个例子。

#### 享元模式案例

   假设有个网店，目前有50件男装和50件女装，为了推销产品，需要找模特穿上衣服，进行拍摄图片。在不适用享元模式的情况下，实现如下：

```js
const Model = function (sex, wear) {
  this.sex = sex
  this.wear = wear
}

Model.prototype.takePhoto = function () {
  console.log(`sex=${this.sex} wear=${this.wear}`)
}

for (let i = 1; i <= 50; i++) {
  let maleModel = new Model('male', `wear${i}`)
  maleModel.takePhoto()
  let femaleModel = new Model('female', `wear${i}`)
  femaleModel.takePhoto()
}
```
要得到一张照片，每次需要生成100个对象，如果将来有10000种衣服，那这个程序有可能因此而奔溃。
接下来我们来改造下上面的代码：

```js
const Model = function(sex) {
  this.sex = sex
}

Model.prototype.takePhoto = function () {
  console.log(`sex=${this.sex} wear=${this.wear}`)
}

const maleModel = new Model('male')
const femaleModel = new Model('female')

for (let i = 1; i <= 50; i++) {
  maleModel.wear = `wear${i}`
  maleModel.takePhoto()
  femaleModel.wear = `wear${i}`
  femaleModel.takePhoto()
}
```
可以看到，改性之后的代码，只需要两个对象便完成了同样的功能。上面的代码便是享元模式的雏形。

#### 内部状态与外部状态
享元模式要求将对象属性划分为内部状态和外部状态。
享元模式的目标是尽量减少共享对象的数量。
关于如何划分内部状态和外部状态，下面是几条大致的规则：

- **内部状态存储于对象内部**
- **内部状态可以被一些对象共享**
- **内部状态独立与具体的场景，通常不会改变**
- **外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享**

这样指定内部状态相同的对象都指定为同一个共享的对象。而外部状态可以从对象身上剥离出来，并存储在外部。

#### 享元模式的应用
跳转页面在前端开发过程中，是最常见的一种操作。在页面跳转的时候加上一些额外的操作，也是常见的。下面是使用享元模式实现的应用跳转：
```js
function setExternalState (...args) {
  sessionStorage.setItem('state', 1)
  alert(sessionStorage.getItem('state') + args[0])
}

function Page (urls) {
  this.urls = {
    baidu: 'https://www.baidu.com',
    taobao: 'https://www.taobao.com',
    jianshu: 'https://www.jianshu.com',
    ...urls
  }
}

Page.prototype.jumpUrl = function (key, fn, ...args) {
  fn && fn.apply(null, args)
  const url = this.urls[key]
  location.href = url
}
window.onload = () => {
  const page = new Page()
  page.jumpUrl('baidu', setExternalState, 'haha')
}
```
