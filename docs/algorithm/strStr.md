# leetcode算法-28-实现strStr()

### 问题描述

实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

***示例 1:***

```js
输入: haystack = "hello", needle = "ll"
输出: 2
```
***示例 2:***

```js
输入: haystack = "aaaaa", needle = "bba"
输出: -1
```
***说明:***

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-strstr
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (!needle) return 0
    return haystack.indexOf(needle)
};

```

### 执行结果

- splice方法

```js
执行用时 : 68ms, 在所有 JavaScript 提交中击败了70.17%的用户
内存消耗 : 32.4MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 68ms  |  32.4MB |


