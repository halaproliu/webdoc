# leetcode算法-29-两数相除

### 问题描述

给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

 

***示例 1:***

```js
输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
```
***示例 2:***

```js
输入: dividend = 7, divisor = -3
输出: -2
解释: 7/-3 = truncate(-2.33333..) = -2
```
 

***提示：***

- 被除数和除数均为 32 位有符号整数。
- 除数不为 0。
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/divide-two-integers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    // 是否是正数
    let sign = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0)
    // 被除数绝对值
    let a = Math.abs(dividend)
    // 商绝对值
    let b = Math.abs(divisor)
    let ans = ''
    let cur = ''
    let dividendStr = a.toString()
    // 使用被除数减去商，从高位到低位计算结果
    for (let i = 0; i < dividendStr.length; i++) {
        // 每个位数的值
        let count = 0
        cur += dividendStr[i]
        cur = +cur
        while (cur >= b) {
            cur -= b
            count++
        }
        ans += count
    }
    const INT_MAX = Math.pow(2, 31) - 1 // 2147483647
    const INT_MIN = Math.pow(-2, 31) // -2147483648
    ans = +ans
    // 判断结果是否超出边界
    if (sign) {
        return ans > INT_MAX ? INT_MAX : ans 
    } else {
        return -ans < INT_MIN ? INT_MIN : -ans
    }
}
```

### 执行结果

```js
执行用时 : 88ms, 在所有 JavaScript 提交中击败了73.85%的用户
内存消耗 : 37.8MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 88ms  |  37.8MB |
