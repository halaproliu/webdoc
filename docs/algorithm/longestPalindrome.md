# leetcode算法-5-最长回文子串

### 问题描述

给给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

***示例 1：***

```js
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```
***示例 2：***

```js
输入: "cbbd"
输出: "bb"
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

解法：中心扩散法

- 遍历字符串，然后区分偶数和奇数两种情况
- 同时进行两种中心扩散的方式，并取长度最大值
- 接着可以通过获取的长度和中心点获取到起始和结束的下标
- 若当前长度最大值大于原先的end-start，则获取新的end和start
- 最后通过start和end获取最终的结果

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (!s || s.length < 2) return s
    let len = s.length;
    let start = 0
    let end = 0
    const getPalindrome = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--
            r++
        }
        return r - l - 1
    }

    for (let i = 0; i < len; i++) {
        let len1 = getPalindrome(i, i)
        let len2 = getPalindrome(i, i + 1)
        let maxLen = Math.max(len1, len2)
        if (maxLen > end - start) {
            start = i - Math.floor((maxLen - 1) / 2)
            end = i + Math.floor(maxLen / 2)
        }
    }

    return s.slice(start, end + 1)
};
```

### 执行结果

```js
执行用时 :92 ms, 在所有 JavaScript 提交中击败了86.67%的用户
内存消耗 :35.6 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 92ms  |  35.6MB |


