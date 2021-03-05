### Set与Map数据结构

Set和Map的主要应用场景在于数据重组和数据储存

Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构

### 集合Set

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

<font color="#008cff">Set本身是一个构造函数，用来生成 Set 数据结构。</font>

```js
new Set([iteratable])
```

Set对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。

向Set加入值的时候，不会发生类型转换，所以<font color="#008cff">1</font>和<font color="#008cff">'1'</font>是两个不同的值，Set内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符(<font color="#008cff">===</font>),主要的区别是<font color="#008cff">NaN等于自身，而精确相等运算符认为NaN不等于自身。</font>

```js
let s = new Set()
let a = NaN
let b = NaN
s.add(a)
s.add(b)
s // Set {NaN}

let s1 = new Set()
s1.add(1)
s1.add('1')
console.log([...s1]) // [1, '1']
```

### 字典Map

集合与字典的区别：

- 共同点: 集合、字典可以储存不重复的值
- 不同点：集合是以[value, value]的形式储存元素，字典是以[key, value]的形式储存元素。

```js
const a = new Map()
const o = { a: 1 }
a.set(o, 2)
a.get(o) // 2

a.has(o) // true
a.delete(o) // true
a.has(o) // false
```

<font color="#008cff">任何具有iterator接口、且每个成员都是一个双元素的数组的数据结构都可以当做Map构造函数的参数，</font>例如：

```js
const s = new Set([
  ['a', 1],
  ['b', 2]
])

const m1 = new Map(s)
m1.get'a') // 1

const m2 = new Map([['c', 3]])
const m3 = new Map(m2)
m3.get('c') // 3
```

如果读取一个未知的键，则返回<font color="#008cff">undefined</font>。

```js
new Map().get('hjshfjhdjsf')
// undefined
```

注意，只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。

```js
const m = new Map()
m.set(['a'], 111)
m.get(['a']) // undefined
```

上面代码的<font color="#008cff">set</font>和<font color="#008cff">get</font>方法，表面是针对同一个键，但实际上这是两个值，内存地址不一样的，因此<font color="#008cff">get</font>方法无法读取该键，返回<font color="#008cff">undefined</font>。

由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果Map的键是一个简单类型的值（数字，字符串，布尔类型），则只要两个值严格相等，Map就将其视为一个键，如：0和-0，字符串true和布尔类型true则是两个不同的键。另外undefined和nullue是两个不同的键。虽然NaN不严格等于自身，但Map将其视为同一个键。

```js
let m = new Map()
m.set(-0, 123)
m.get(+0) // 123

m.set(true, 1)
m.set('true', 2)
m.get(true) // 1

m.set(undefined, 3)
m.set(null, 4)
m.get(undefined) // 3

m.set(NaN, 5)
m.get(NaN) // 5
```

### Set与WeakSet区别

1. WeakSet只能存放对象
2. WeakSet不支持遍历，没有size属性
3. WeakSet存放的对象不会计入到对象的引用计数，因此不会影响GC的回收
4. WeakSet存在的对象如果在外界消失了，那么在WeakSet里面也不会存在

### Map与WeakMap的区别

1. WeakMap只能接受对象作为键名字(null除外)
2. WeakMap键名指向对象不会计入对象的引用数

弱引用最大的特点就是：我们有时候需要对对象添加一些数据，但是又不希望把该引用计入引用计数影响了GC。以前非弱引用对象需要我们手动清除引用（xx=null），然后被GC回收，现在弱引用不需要我们这么做，只要弱引用指向的对象不再被其他对象引用，那么弱引用对象就会自动消失。
