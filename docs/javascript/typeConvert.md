# 详解JavaScript强制类型转换

> toString

规范的9.8节中定义了抽象操作ToString,它负责处理非字符串到字符串的强制类型转换。

对普通对象来说，除非自行定义，否则toString()返回内部属性[[Class]]是值，如'[object Object]'。

数组的默认toString()方法经过了重新定义，将所有单元字符串化以后再用“,”链接起来。


```javascript
var a = [4, 5, 6];

a.toString(); // 4, 5, 6
```

### JSON字符串化

工具函数JSON.stringify()在JSON对象序列化为字符串时也用到了toString()。

所有安全的JSON值都可以使用JSON.stringify()字符串化。安全的JSON值是指能够呈现有为有效JSON格式的值。

以下为不安全的JSON值。

- undefined
- function
- symbol(ES6+)
- 包含循环引用的对象

JSON.stringify()在对象中遇到undefined,function和symbol时会自动忽略，在数组中则会返回null。
eg:


```javascript
JSON.stringify(undefined) // undefined
JSON.stringify(function() {}) // undefined

JSON.stringify([1, undefined, function() {}, 2]); // "[1, null, null, 2]"
JSON.stringify({a: 1, b: function () {}}) // "{"a": 2}"
```

**对包含对象循环引用的对象执行JSON.stringify()会出错。**

如果对象中定义了toJSON()方法，JSON字符串化时会首先调用该方法，然后用它的返回值来进行序列化。

toJSON()应该返回一个能够被字符串化的安全的JSON值，而不是返回一个JSON字符串。

JSON.stringify可以传递一个可选参数replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和toJSON()很像。

如果replacer是一个**数组**，那么它必须是一个**字符串数组**，其中包含序列化要处理的对象的属性名称，其他属性将被忽略。

如果是replacer是一个**函数**，则会对对象本身调用一次，然后对对象中的每个属性各调用一次，每次传递两个参数，键和值。如果要忽略某个键就返回undefined，否则返回指定值。


```javascript
var a = {
    b: 12,
    c: '12',
    d: [1, 2, 3]
};

JSON.stringify(a, ['b', 'c']); // "{"b": 12, "c": "12"}"

JSON.stringify(a, function (k, v) {
    if (k !== c) return v;
});
// "{"b": 12, "d": [1, 2, 3]}"
```

JSON.stringify()还有一个可选参数space，用来指定输出的缩进格式。

- 正整数

    当space为正整数时指缩进格数。
    
- 字符串

    当space为字符串时，此时最前面的十个字符被用于每一级的缩进。
    
    
```javascript
var a = {
    b: 12,
    c: '12',
    d: [1, 2, 3]
};

JSON.stringify(a, null, 3);
// "{
//     "b": 12,
//     "c": "12",
//     "d": [
//        1,
//        2,
//        3
//     ]
//  }"

JSON.stringify(a, null, '-----');
// "{
// -----"b": 12,
// -----"c": "12",
// -----"d": [
// ----------1,
// ----------2,
// ----------3
// -----]
// }"
```

> toNumber

ES5规范在9.3节定义了抽象操作ToNumber。

其中true转换为1，false转换为0。undefined转换为NaN,null转换为0。

toNumber处理失败时返回NaN（处理数字常量失败时会产生语法错误）。不同之处是ToNumber对以0开头的十六进制并不按十六进制处理（而是按十进制）。

对象（包括数组）会首先转换为基本类型值，如果返回的是非数字类型，再遵循规则进行转换为数字。

将值转换为基本类型，抽象操作ToPrimitive会首先通过内部操作DefaultValue，检查该值是否有valueOf()方法，进行强制类型转换，如果没有就使用toString()方法进行强制类型转换。如果两个方法都没有，就产生TypeError错误。

从ES5开始，Object.create(null)创建的对象[[Prototype]]属性为null，并且没有valueOf()和toString()方法，因此无法进行强制类型转换。


> toBoolean

JavaScript中的值可以分为以下两类：
(1)可以被强制类型转换为false的值
(2)其他（被强制类型转换为true的值）

ES5规范9.2节中定义了抽象操作ToBoolean,列举了布尔类型转换所有可能出现的结果。
以下这些是假值：

- undefined
- null
- false
- +0、-0和NaN
- ""

假值的布尔强制类型转换结果为false。

从逻辑上来说，假值以外的都应该是真值。但JavaScript规范对此并没有明确定义，只是给出了一些实例，例如规定所有的对象都是真值。我们可以理解为假值列表以外的都是真值。接下来让我们来看一个例子。


```javascript
var a = new Boolean( false );
var b = new Number(0);
var c = new String('');
var d = Boolean( a && b && c );
d // true
```

d为true，说明a、b、c都为true。这些统称为假值对象(falsy object)。

值得注意的是，虽然JavaScript中会出现假值对象，但它实际上并不属于JavaScript语言的范畴。
**浏览器**在某些特定情况下，在常规JavaScript语法基础上自己创建了一些外来值，这些就是“假值对象”。

假值对象看起来和普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为false


## 特殊的运算符
- +运算符
- ~运算符

> +运算符能够显式地将字符串和日期转换为数字


```javascript
var timestamp = +new Date();
console.log(timestamp); // 1532449536154 (笔者试验的时间)
```

> ~运算符

~首先将值强制类型转换为32位数字，然后执行字位操作“非”（对每一个字位进行反转）。
字位翻转是个很晦涩的主题，JavaScript开发人员一般很少需要关心到字位级别。
简单来说，~x大致等同于-(x+1)


```javascript
~12 // -(12+1) ===> -13
```

下面来介绍一个~运算符的特别适用场景：

-1是一个“哨位值”，哨位值经常被用在各个方法的返回值中。例如indexOf方法，找到字符串就返回0以及以上的位置，否则返回-1。

```javascript
var a = 'Hello World';

if (a.indexOf('lo') >= 0) { // true
    console.log('111');
}

if (!a.indexOf('ol') !== -1) { // true
    console.log('222')
}

if (~a.indexOf('lo')) { // true
    console.log('333');
}

if (!~a.indexOf('ol')) { // true
    console.log('444');
}
```

~(-1) ==> -(-1+1) ==> -0 ==> 0
因此如果indexOf()返回-1,~将其转换为假值0，其他情况则为真值。


> ES5之前的parseInt(..)有一个坑导致了很多bug。即如果没有第二个参数来指定转换的基数(又称为radix)，parseInt(..)会根据字符串的第一个字符来自行决定基数。
如果第一个字符为x或X，则转换为十六进制，如果是0，则转换为八进制。


**这里有一个有趣的问题，是parseInt的一个坑。**


```javascript
parseInt( 1/0, 19 ); // 18
```

1/0的结果为Infinity,parseInt()先将参数强制类型转换为字符串再进行解析。
而基数19，在实际的JavaScript代码中不会用到基数19。它的有效数字字符范围是0-9和a-i（区分大小写）。

parseInt(1/0, 19)实际上是parseInt('Infinity', 19)。第一个字符是'I',以19为基数时值为18，第二个字符'n'不是一个有效的数字字符，解析到此为止。

最后的结果是18，而非Infinity或者报错。

## 隐式强制类型转换
> **字符串和数字之间的相等比较**
ES5规范11.9.3.4-5这样定义：
1. 如果Type(x)是数字，Type(y)是字符串，则返回x == ToNumber(y)的结果。
2. 如果Type(x)是字符串，Type(y)是数字，则返回ToNumber(x) == y的结果。


> **其他类型和布尔类型之间的相等比较**
ES5规范11.9.3.4-5这样定义：
1. 如果Type(x)是布尔类型，则返回ToNumber(x) == y的结果。
2. 如果Type(y)是布尔类型，则返回x == ToNumber(y)的结果。

> **null和undefined之间的相等比较**
ES5规范11.9.3.2-3规定：
1. 如果x为null，y为undefined，则结果为true。
2. 如果x为undefined，y为null，则结果为true。

> **对象和非对象之间的相等比较**
ES5规范11.9.3.4-5这样定义：
1. 如果Type(x)是字符串或数字，Type(y)是对象，则返回x == ToPrimitive(y)的结果。
2. 如果Type(x)是对象，Type(y)是字符串或数字，则返回ToPrimitive(x) == y的结果。


==中的隐式类型转换最为人诟病的地方是假值的相等比较。
# 强制类型转换

下面列出了常规和非常规的情况：


```javascript
'0' == null; // false
'0' == undefined // false
'0' == false // true
'0' == NaN // false
'0' == 0 // true
'0' == '' // false

false == null; // false
false == undefined; // false
false == NaN; // false
false == 0; // true
false == ''; // true
false == []; // true
false == {}; // false
 
'' == null; // false
'' == undefined; // false
'' == NaN; // false
'' == 0; // true
'' == []; // true
'' == {}; // false
 
0 == null; // false
0 == undefined; // false
0 == NaN; // false
0 == []; // true
0 == {}; // false
```

### 极端情况


```javascript
[] == ![]; // true
```
由于![] == false,所以[] == ![]相当于[] == false,然后将对象转换为基本类型，即0 == false,根据布尔类型比较规则，0 == false相当于0 == 0,所以为true。
