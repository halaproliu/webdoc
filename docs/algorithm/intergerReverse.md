## leetcode算法-7-整数翻转

### 问题描述

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

***示例 1:***

```js
输入: 123
输出: 321
```

***示例 2:***

```js
输入: -123
输出: -321
```

***示例 3:***

```js
输入: 120
输出: 21
```

***注意:***

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-integer
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

思路：

- 首先确认输入参数的正负值
- 先移除符号位的影响
- 接着转换到String类型进行翻转
- 接着对符号位进行处理
- 最后对数字边界进行处理


```js
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let isNegative = x < 0
    let num = isNegative ? -x : x
    let min = -(2 ** 31)
    let max = 2 ** 31 - 1
    num = num.toString().split('').reverse().join('')
    num = isNegative ? -num : num
    if (num < min || num > max) return 0
    return num
};
```

### 执行结果

```js
执行用时 :88 ms, 在所有 JavaScript 提交中击败了70.60%的用户
内存消耗 :35.9 MB, 在所有 JavaScript 提交中击败了77.39%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 88ms  |  35.9MB |


