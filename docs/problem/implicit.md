# 隐式类型转换问题

### 问题1

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

### 答案解析

这题考察的是隐式类型转换，考引用类型在比较运算符时候,隐式转换会调用本类型toString或valueOf方法。

```js
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}

// 或
var a = {
	i: 1,
	valueOf () {
		return a.i++;
	}
};
// 或
Object.defineProperty(window, 'a', {
    get: function() {
	if (this.value) {
	    return this.value += 1
	} else {
	    return this.value = 1;
	}
    }
});
// 或
var a = [1, 2, 3];
a.join = a.shift;
// 或
let a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)}
```

### 问题2

```js
// example 1
var a={}, b='123', c=123;
a[b]='b';
a[c]='c';
console.log(a[b]);

// example 2
var a={}, b=Symbol('123'), c=Symbol('123');
a[b]='b';
a[c]='c';
console.log(a[b]);

// example 3
var a={}, b={key:'123'}, c={key:'456'};
a[b]='b';
a[c]='c';
console.log(a[b]);
```

- 答案解析

这题考察的是对象的键名的转换。

```js
// example 1
var a={}, b='123', c=123;
a[b]='b';

// c 的键名会被转换成字符串'123'，这里会把 b 覆盖掉。
a[c]='c';  

// 输出 c
console.log(a[b]);
```

```js
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  

// b 是 Symbol 类型，不需要转换。
a[b]='b';

// c 是 Symbol 类型，不需要转换。任何一个 Symbol 类型的值都是不相等的，所以不会覆盖掉 b。
a[c]='c';

// 输出 b
console.log(a[b]);
```

```js
// example 3
var a={}, b={key:'123'}, c={key:'456'};  

// b 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。
a[b]='b';

// c 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
a[c]='c';  

// 输出 c
console.log(a[b]);
```
