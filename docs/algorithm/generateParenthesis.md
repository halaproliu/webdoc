# leetcode算法-22-括号生成

### 问题描述

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。


***示例：***

```js
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/generate-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

使用递归回溯法

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let res = []
    //  cur :当前字符  left：当前字符左括号 right:当前字符右括号
    const help = (cur, left, right) => {
        console.log(cur)
        if (cur.length === 2 * n) {
            res.push(cur)
            return
        }
        if (left < n) {
            help(cur + '(', left + 1, right)
        }
        if (right < left) {
            help(cur + ')', left, right + 1)
        }
    }
    help('', 0, 0)
    return res
}
```

### 执行结果

```js
执行用时 :148 ms, 在所有 JavaScript 提交中击败了5.56%的用户
内存消耗 :41.9 MB, 在所有 JavaScript 提交中击败了12.50%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 148ms  |  41.9MB |


