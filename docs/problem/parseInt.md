# parseInt的特殊情况

早在2013年，加里伯恩哈德就在微博上发布了以下代码段：

```js
['10', '10', '10', '10', '10'].map(parseInt);
// [10, NaN, 2, 3, 4]
```


### parseInt定义和用法
parseInt() 函数可解析一个字符串，并返回一个整数。

### 语法

```js
parseInt(string, radix)
```

### 参数

| 参数 | 描述 |
|:----:|:-------------------------------:|
| string | 必需。要被解析的字符串。 |
| radix  | 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。|

```js
['1', '2', '3'].map(parseInt)
```

所执行的代码实际是：

```js
['1', '2', '3'].map((item, index) => {
  return parseInt(item, index)
})
```

即返回的值分别为：

```js
parseInt('1', 0) // 1
parseInt('2', 1) // NaN
parseInt('3', 2) // NaN, 3不是二进制
```

所以:

```js
['1', '2', '3'].map(parseInt)
// 1, NaN, NaN
```

- 在30-seconds-of-code看到这个题的变形

```js
let unary = fn => val => fn(val)
let parse = unary(parseInt)
console.log(['1.1', '2', '0.3'].map(parse))
// 1, 2, 0
```

### 替代方法

可以使用以下方法将数组中的字符串转为数字类型

```js
['1', '2', '3'].map(Number)
```
