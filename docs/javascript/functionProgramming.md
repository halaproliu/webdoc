# 浅谈关于「函数式编程」的理解

在诞生近 70 年之后， 函数式编程（Functional Programming）开始获得越来越多的关注。并且随着时间推移、技术演变，它与前端开发，结合的也越发紧密；前些日子，读了些文章，对函数式编程有了粗浅的了解，并在代码上做了些实践，发现这种思想非常有趣，喜之不已。近日我女神对它突感好奇，于是乎，便结合业界已有之分享，结合自己理解与实践，梳理成文，以便解释。

![函数式编程](https://lovejade.oss-cn-shenzhen.aliyuncs.com/Function.png)

## 与非函数式的区别

非函数式的示例代码如下：

```
let counter = 0
const increment = () => {
    counter++
}
```

```
const increment = (counter) => {
    return counter + 1
}
```

你可能会觉得这个例子太过普通。但，这就是函数式编程的准则：**不依赖于外部的数据，而且也不改变外部数据的值，而是返回一个新的值给你**。

再看一段复杂一点，却较为 [实用的代码示例](https://github.com/nicejade/blog.nicelinks.site/blob/master/src/components/search/index.js) ：

```
const handleSearch = (_keywords) => {
  let queryResultArr;
  if (!_keywords) {
    queryResultArr = []
  } else {
    queryResultArr = getQueryResult(_keywords)
  }
  setQueryResultArr(queryResultArr)
  setIsShowResults(queryResultArr.length > 0)
}

const throttle = (fn, wait) => {
  let pre = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args)
      pre = Date.now()
    }
  }
}

const requestSearchFunc = throttle(handleSearch, 200)

const handleInputChange = (event) => {
  const value = event.target.value;
  setKeywords(value)
  requestSearchFunc(value)
}
```

可以使用 `throttle` 来**节流函数**，如：requestSearchFunc；这个技术其实就是 Currying 技术（把一个函数的多个参数分解成多个函数， 然后把函数多层封装起来，每层函数都返回一个函数去接收下一个参数这样，可以简化函数的多个参数）。从这个技术上，你可能体会到函数式编程的理念：**把函数当成变量来用，关注于描述问题而不是怎么实现**，这样可以让代码更易读。

## 过程式 vs 函数式

过程式编程，主要要采取过程调用，或函数调用的方式来进行流程控制；它主要关注：一步一步地解决问题。这是完全有效的编码方式，但当您希望应用程序扩展时，它存在许多缺点。而函数式编程（ Functional Programming）关注的是：**描述要做什么，而不是如何做**（describe what to do, rather than how to do it）。

举例来说，对于一个英文名数组，需要将其中短横线命名，转化为大驼峰格式。基于传统过程式编程，可能你不会想太多，直接将想法用代码来表达出来，临时变量、循环语句，用的飞起：

```
const nameArr = ['nice-jade', 'rayso-lee', 'jon-snow', 'arya-stark'];
const newArr = [];
for (let i = 0, len = nameArr.length; i < len ; i++) {
  let name = nameArr[i];
  let tempNameArr = name.split('-');
  let newNameArr = [];
  for (let j = 0, nameLen = tempNameArr.length; j < nameLen; j++) {
    let newFormatName = tempNameArr[j][0].toUpperCase() + tempNameArr[j].slice(1);
    newNameArr.push(newFormatName);
  }
  newArr.push(newNameArr.join(' '));
}
console.log(newArr)
// [ 'Nice Jade', 'Rayso Lee', 'Jon Snow', 'Arya Stark' ]
```

这是可以达成目标的答案，它完全**面向过程**；虽然在编码时候，能够将想法淋漓尽致表现出来。但对于阅读的人，十分不够友好。因为这中间夹杂了复杂的逻辑，充斥了大量临时变量、循环、状态变化等等；通常您需要：**从头读到尾才知道它具体做了什么**，而且一旦出问题，很难定位。当然，你也可以将如上代码，拆分成几个函数：

```
const nameArr = ['nice-jade', 'rayso-lee', 'jon-snow', 'arya-stark']
const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()

const convertName = (name) => {
  let tempNameArr = name.split('-')
  let newNameArr = []
  for (let j = 0, nameLen = tempNameArr.length; j < nameLen; j++) {
    let newFormatName = capitalize(tempNameArr[j])
    newNameArr.push(newFormatName)
  }
  return newNameArr.join(' ')
}

const getNewArr = (nameArr) => {
    const newArr = []
    for (let i = 0, len = nameArr.length; i < len; i++) {
      let name = nameArr[i]
      const newName = convertName(name)
      newArr.push(newName)
    }
    return newArr
}

const newNameArr = getNewArr(nameArr)
console.log(newNameArr)
// [ 'Nice Jade', 'Rayso Lee', 'Jon Snow', 'Arya Stark' ]
```

如此一来，阅读代码时，需要考虑的上下文少了许多，也就更容易。不像第一个示例，如果没有合理的注释说明，你还需要花些时间来理解。**而把代码逻辑封装成了函数后，就相当于：给每个相对独立的程序逻辑取了个名字，于是代码成了自解释的**。幸好，在这份代码中，函数间调用，没有**依赖共享的变量**，否则将会更加复杂。但，仍是充斥了临时变量、循环，增加代码量的同时，也加大了理解之难度。

如果基于**函数式编程**思想，那会是怎样的代码呢？

```
const { compose, map, join, split } = require('ramda')

const nameArr = ['nice-jade', 'rayso-lee', 'jon-snow', 'arya-stark']
const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()
const convertName = compose(join(' '), map(capitalize), split('-'))
const newNameArr = nameArr.map((item) => convertName(item))

console.log(newNameArr)
// [ 'Nice Jade', 'Rayso Lee', 'Jon Snow', 'Arya Stark' ]
```

如上代码（有借助 [ramda](https://github.com/ramda/ramda) ——「实用的函数式 JavaScript 工具库」来实现），虽依然把程序的逻辑分成了函数，不过这些函数都是 Functional 的。因为它们有三个症状：

1.  它们之间没有共享的变量。
2.  函数间通过参数和返回值来传递数据。
3.  在函数里没有临时变量。

从这个编程思路，可以清晰看出，**函数式编程**的思维过程是完全不同的，它的着眼点是**函数**，而不是**过程**，它强调的是：通过函数的组合、变换去解决问题，而不是通过写什么样的语句去解决问题；当你的代码越来越多的时候，这种函数的拆分和组合，就会产生出更加强大的力量。

## 什么函数式编程？

> [**函数式编程**](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B) ，或称函数程序设计、泛函编程（英语：Functional Programming），是一种编程范式，它将电脑运算视为函数运算，并且避免使用程序状态以及易变对象。比起指令式编程，函数式编程更加强调程序执行的结果，而非执行的过程；倡导利用若干简单的执行单元，让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。
> 
> 在函数式编程中，函数是头等对象，意思是说一个函数，既可以作为其它函数的输入参数值，也可以从函数中返回值，被修改或者被分配给一个变量。
> 
> 不仅最古老的函数式语言 Lisp 重获青春，而且新的函数式语言层出不穷，比如 Erlang、clojure、Scala、F#等等。目前最当红的 Python、Ruby、Javascript，对函数式编程的支持都很强，就连老牌的面向对象的 Java、面向过程的 PHP，都忙不迭地加入对匿名函数的支持。越来越多的迹象表明，函数式编程已经不再是学术界的最爱，开始大踏步地在业界投入实用。
> 
> 也许继"面向对象编程"之后，"函数式编程"会成为下一个编程的主流范式（paradigm）。未来的程序员恐怕或多或少都必须懂一点。—— [函数式编程初探 @阮一峰](https://www.ruanyifeng.com/blog/2012/04/functional_programming.html) （2012 年）

函数，即是一种描述集合和集合之间的**转换关系**，输入通过函数，都会返回**有且只有一个**输出值。**函数**实际上是一个**关系**，或者说成一种映射，而这种映射关系是可 `组合` 的，当知道一个函数的输出类型，可以匹配另一个函数的输入，那他们就可以进行组合。如上述代码中提及的 `convertName` 函数。

在编程世界中，需要处理的逻辑，其实只有“数据”和“关系”，而关系就是 `函数`。一旦映射关系（函数）找到了，问题即能迎刃而解；剩下的事情，就是让数据通过这种关系，然后转换成另一个数据而已。

## 函数式编程的特点

### **函数是"第一等公民"**

所谓 ["第一等公民"](https://en.wikipedia.org/wiki/First-class_function) （First Class），指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。如上文中代码：

```
const convertName = compose(join(' '), map(capitalize), split('-'))
```

### 无状态和数据不可变

无状态（Statelessness）和数据不可变（Immutable data），这是函数式编程的核心概念：

-   **数据不可变**：它要求你所有的数据都是不可变的，这意味着如果你想修改一个对象，那你应该创建一个新的对象用来修改，而不是修改已有的对象。
-   **无状态**：主要是强调对于一个函数，不管你何时运行，它都应该像第一次运行一样，给定相同的输入，给出相同的输出，完全不依赖外部状态的变化。

为了实现这个目标，函数式编程提出函数应该具备的特性：没有副作用和纯函数。

### 没有"副作用"

所谓"副作用"（side effect），指的是函数内部与外部互动（最典型的情况，就是修改全局变量的值），产生运算以外的其他结果。

函数式编程强调没有"副作用"，意味着函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。

### **引用透明**

引用透明（Referential transparency），指的是函数的运行不依赖于外部变量或"状态"，只依赖于输入的参数，任何时候只要参数相同，引用函数所得到的返回值总是相同的。

有了前面的第三点和第四点，这点是很显然的。其他类型的语言，函数的返回值往往与系统状态有关，不同的状态之下，返回值是不一样的。这就叫"引用不透明"，很不利于观察和理解程序的行为。

### 惰性执行

所谓惰性执行（Lazy Evaluation），指的是函数只在需要的时候执行，即：不产生无意义的中间变量。像上面![👆](https://cdn.jsdelivr.net/gh/twitter/twemoji@13/assets/72x72/1f446.png)的例子，函数式编程跟命令式编程最大的区别就在于：几乎没有中间变量，它从头到尾都在写函数，只有在最后的时候才通过调用 `convertName` 产生实际的结果。

### 尾递归优化

迭代在函数式语言中常用**递归**来完成，用递归来实现控制流程的机制，是函数式编程的一个非常重要的特点。我想您当然知道 `递归` 的害处，那就是如果递归很深的话，stack 受不了，并会导致性能大幅度下降。所以，我们使用尾递归优化技术——每次递归时都会重用 stack，这样一来能够提升性能。尾递归的实现，其实是基于编译器的识别和优化的，编译器发现一个函数是尾递归，就会把它实现为与命令式编程中的迭代差不多的汇编码。

### 函数式编程相关技术

-   **map & reduce** ：这个技术不用多说了，函数式编程最常见的技术，就是对一个集合做 Map 和 Reduce 操作。这比起过程式的语言来说，在代码上要更容易阅读。（传统过程式的语言需要使用 for/while 循环，然后在各种变量中把数据倒过来倒过去的）这个很像 C++中的 STL 中的 foreach，find\_if，count\_if 之流的函数的玩法。
-   **pipeline**：这个技术的意思是，把函数实例成一个一个的 action，然后，把一组 action 放到一个数组或是列表中，然后把数据传给这个 action list，数据就像一个 pipeline 一样顺序地被各个函数所操作，最终得到我们想要的结果。
-   **compose**：它可以接收多个独立的函数作为参数，然后将这些函数进行组合串联，最终返回一个“组合函数”。`pipe` 与 `compose` 的共同点是：都返回“组合函数”，区别则是执行的顺序不同，前者是从左向右执行，后者则是从右向左执行。
-   **recursing 递归** ：递归最大的好处就简化代码，他可以把一个复杂的问题用很简单的代码描述出来。注意：递归的精髓是描述问题，而这正是函数式编程的精髓。
-   **currying**：把一个函数的多个参数分解成多个函数， 然后把函数多层封装起来，每层函数都返回一个函数去接收下一个参数这样，可以简化函数的多个参数。在 C++中，这个很像 STL 中的 bind\_1st 或是 bind2nd。
-   **higher order function 高阶函数**：所谓高阶函数就是函数当参数，把传入的函数做一个封装，然后返回这个封装函数。现象上就是函数传进传出，就像面向对象对象满天飞一样。

### 函数式编程的意义

-   **代码简洁，开发快速**：大量使用函数，减少了代码的重复，因此程序比较短，开发速度较快；
-   **接近自然语言，易于理解**：函数式编程的自由度很高，可以写出很接近自然语言的代码；
-   **更方便的代码管理**：不依赖、也不会改变外界的状态，只要给定输入参数，返回的结果必定相同；
-   **更少的出错概率**：因为每个函数都很小，而且相同输入，永远可以得到相同的输出，测试也很简单；
-   **易于"并发编程"**：因为它不修改变量，所以根本不存在"锁"线程的问题；
-   **代码的热升级**：基于没有副作用特点，只要保证接口不变，内部实现是外部无关的。

## 函数式编程，结语

正如您在函数式编程中看到的，它希望使用小的（理想情况下是**纯函数**）函数来解决问题。这种方法也非常具有可 `扩展性`，并且函数可以 `重用`。

没有更好和更坏的范式。有经验的开发人员，可以看到每种范式的优点，并为给定的问题选择相对更合适的。过程式编程，并不是说你不能使用函数；函数式编程也不会阻止你使用“类”。这些范式，只是以一种随代码增长而有益的方式，来帮助解决问题。

## 所参考系列文章

-   [函数式编程 | 酷 壳 – CoolShell](https://coolshell.cn/articles/10822.html)
-   [函数式编程初探 | 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2012/04/functional_programming.html)
-   [简明 JavaScript 函数式编程——入门篇](https://juejin.cn/post/6844903936378273799)
-   [我所了解的函数式编程 ｜ scarletsky](https://scarletsky.github.io/2017/06/30/functional-programming-i-have-learned/)

## 猜您可能感兴趣的文章

-   [如何基于 npm 在安装时为依赖重命名？](https://forum.lovejade.cn/d/117-npm)
-   [如何防范 CSRF 跨站请求伪造？](https://forum.lovejade.cn/d/104-csrf)
-   [H5 拉起微信小程序流程解析](https://forum.lovejade.cn/d/103-h5)
-   [如何基于 Flarum 搭建一个优雅简洁论坛？](https://forum.lovejade.cn/d/2-flarum)
-   [Mac、Linux 如何快速升级 Node.js 版本？](https://forum.lovejade.cn/d/28-maclinux-nodejs)
-   [如何在 Mac 上安装 Deno，并加入至 PATH](https://forum.lovejade.cn/d/62-mac-deno-path)
-   [如何启用 gmail 邮件的 SMTP 服务？](https://forum.lovejade.cn/d/3-gmail-smtp)
-   [Linux 系统如何设置开机启动脚本？](https://forum.lovejade.cn/d/54-linux)
-   [如何将 Flarum 论坛内容，主动推送至百度](https://forum.lovejade.cn/d/50-flarum)
-   [解决 Node.js 连接 MySQL 8.0 报错](https://forum.lovejade.cn/d/40-nodejs-mysql-80)
-   [如何快速升级 Ghost 博客至 4.0 版本？](https://forum.lovejade.cn/d/24-ghost-40)
-   [如何为 nginx 配置多个域名服务？](https://forum.lovejade.cn/d/4-nginx)