# leetcode算法-8-字符串转换整数

### 问题描述

请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。接下来的转化规则如下：

如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。
注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0 。

提示：

本题中的空白字符只包括空格字符 ' ' 。
假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为[−2<sup>31</sup>, 2<sup>31</sup> − 1]。如果数值超过这个范围，请返回 INT_MAX (2<sup>31</sup> − 1) 或 INT_MIN (−2<sup>31</sup>) 。


***示例 1:***

```js
输入: "42"
输出: 42
```

***示例 2:***

```js
输入: "   -42"
输出: -42

解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
```

***示例 3:***

```js
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
```

***示例 4:***

```js
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
```

***示例 5:***

```js
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/string-to-integer-atoi
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 方法一：parseInt

从parseInt的文档可知其特性：
1. 字符串开头的空白符和结尾将会被忽略
2. parseInt 可以理解两个符号。+ 表示正数，- 表示负数
3. 如果第一个字符不能转换为数字，parseInt会返回 NaN

刚好符合我们本题的要求，同时要注意边界情况。

```js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let result = parseInt(str, 10)
    let INT_MIN = Math.pow(-2, 31)
    let INT_MAX = Math.pow(2, 31) - 1
    if (isNaN(result)) return 0
    if (result < INT_MIN) return INT_MIN
    if (result > INT_MAX) return INT_MAX
    return result
};
```

- 方法二：正则表达式

```js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let INT_MIN = Math.pow(-2, 31)
    let INT_MAX = Math.pow(2, 31) - 1
    let reg = /^[\+|\-)]?\d+/g
    let result = str.trim().match(reg) && str.trim().match(reg)[0]
    return Math.max(Math.min(result, INT_MAX), INT_MIN) || 0
};
```

- 方法三：状态机

1. 状态机分为四种状态，start,signed,in_number,end
2. 遍历字符串，获取每个字符对应的状态
3. 默认状态为start
    - 开头为空格，状态依然为start
    - 当出现第一个字符的时候，若是+或-符号，则为signed，若为数字，则状态为in_number，否则为end

```js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    let state = 'start'
    let sign = 1
    let ans = 0
    const table = {
        start: ['start', 'signed', 'in_number', 'end'],
        signed: ['end', 'end', 'in_number', 'end'],
        in_number: ['end', 'end', 'in_number', 'end'],
        end: ['end', 'end', 'end', 'end']
    }
    const INT_MIN = Math.pow(-2, 31)
    const INT_MAX = Math.pow(2, 31) - 1

    function getCol(c) {
        if (' ' === c) return 0
        if ('+' === c || '-' === c) return 1
        if (!isNaN(+c)) return 2
        return 3
    }

    function get(c) {
        state = table[state][getCol(c)]
        if (state === 'in_number') {
            ans = ans * 10 + +c - '0'
        } else if (state === 'signed') {
            sign = c === '+' ? 1 : -1
        }
    }

    let chars = str.split('')
    for (let i = 0; i < chars.length; i++) {
        get(chars[i])
    }
    return Math.max(Math.min(ans * sign, INT_MAX), INT_MIN)
};
```

### 执行结果

- parseInt

```js
执行用时 :76 ms, 在所有 JavaScript 提交中击败了97.69%的用户
内存消耗 :35.7 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 76ms  |  35.7MB |

- 正则表达式

```js
执行用时 :96 ms, 在所有 JavaScript 提交中击败了43.22%的用户
内存消耗 :37.1 MB, 在所有 JavaScript 提交中击败了12.50%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 96ms  |  37.1MB |

- 状态机

```js
执行用时 :120 ms, 在所有 JavaScript 提交中击败了13.76%的用户
内存消耗 :38.1 MB, 在所有 JavaScript 提交中击败了12.50%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 120ms  |  38.1MB |


