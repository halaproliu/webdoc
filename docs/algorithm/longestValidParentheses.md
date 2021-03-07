# leetcode算法-32-最长有效括号

### 问题描述

给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

***示例 1:***

```js
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
```

***示例 2:***

```js
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

从左向右扫描，已扫描的左括号等待被匹配，用一个栈暂存起来。
在栈中预设一个-1作为参照物，题目最终结果是求最长有效括号的长度，因此存取左括号的索引到栈中。
当遇到右括号时，则出栈，，当栈还有元素时，并计算当前有效括号长度，并计算长度最大值。
若栈没有长度时，则修改括号的起始索引，重新计算有效长度，
时间复杂度O(n)， 空间复杂度O(n)

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let max = 0
    let len = s.length
    let stack = [-1]
    for (let i = 0; i < len; i++) {
        if (s[i] === '(') {
            stack.push(i)
        } else {
            stack.pop()
            if (stack.length) {
                max = Math.max(max, i - stack[stack.length - 1])
            } else {
                stack.push(i)
            }
        }
    }
    return max
};
```

### 执行结果

```js
执行用时 : 80ms, 在所有 JavaScript 提交中击败了84.28%的用户
内存消耗 : 40.2MB, 在所有 JavaScript 提交中击败了43.35%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 80ms  |  40.2MB |


