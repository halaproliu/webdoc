# leetcode算法-20-有效的括号

### 问题描述

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

***示例 1:***

```js
输入: "()"
输出: true
```

***示例 2:***

```js
输入: "()[]{}"
输出: true
```

***示例 3:***

```js
输入: "(]"
输出: false
```

***示例 4:***

```js
输入: "([)]"
输出: false
```

***示例 5:***

```js
输入: "{[]}"
输出: true
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

思路：

- 利用栈的功能，如果遇到左括号，直接推入栈中，
- 遇到右括号，则取出栈顶的元素，如果不匹配则返回false，否则继续匹配。
- 同时每一个括号都应该有对应的匹配值，所以字符串整体长度应为偶数

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2) return false
    let arr = []
    for (let char of s) {
        switch(char) {
            case '(':
            case '[':
            case '{':
                arr.push(char)
                break
            case ')':
                if (arr.pop() !== '(') return false
                break
            case ']':
                if (arr.pop() !== '[') return false
                break
            case '}':
                if (arr.pop() !== '{') return false
                break
        }
    }
    return !arr.length
};
```

### 执行结果

```js
执行用时 :68 ms, 在所有 JavaScript 提交中击败了67.06%的用户
内存消耗 :33.5 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 68ms  |  33.5MB |


