# 类数组问题

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
// 结果：[,,1,2], length为4
```

> - push方法将值追加到数组中。
> - push方法有意具有通用性。
> - 该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。
> - push方法根据 length 属性来决定从哪里开始插入给定的值。
> - 如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
> - 唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

根据MDN的说法理解，push方法应该是根据数组的length来根据参数给数组创建一个下标为length的属性，我们可以做以下测试：

[](../imgs/arrayLike1.png)

根据这个测试我们发现，push方法影响了数组的length属性和对应下标的值。
然后:

> 在对象中加入splice属性方法，和length属性后。这个对象变成一个类数组。

我们使用题目中的代码时得到了这个结果：

[](../imgs/arrayLike2.png)

这个时候控制台输出的是一个数组，但是实际上它是一个伪数组，并没有数组的其他属性和方法，我们可以通过这种方法验证：

[](../imgs/arrayLike3.png)

所以我认为题目的解释应该是：

使用第一次push，obj对象的push方法设置 obj[2] = 1; obj.length += 1
2.使用第二次push，obj对象的push方法设置 obj[3] = 2; obj.length += 1
3.使用console.log输出的时候，因为obj具有 length 属性和 splice 方法，故将其作为数组进行打印
4.打印时因为数组未设置下标为 0 1 处的值，故打印为empty，主动 obj[0] 获取为 undefined
第一第二步还可以具体解释为：因为每次push只传入了一个参数，所以 obj.length 的长度只增加了 1。push方法本身还可以增加更多参数，详见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
