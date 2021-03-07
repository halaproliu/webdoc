# leetcode算法-14-最长公共前缀

### 问题描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

**示例 1:**

```js
输入: ["flower","flow","flight"]
输出: "fl"
```

**示例 2:**

```js
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-prefix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 使用滑动窗口算法

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (!strs.length) return ''
    if (strs.length === 1) return strs[0]
    let str = strs[0]
    let tmpStrs = strs.slice(1)
    let obj = {}
    let temp = ''
    let result = ''
    for (let i = 0; i < str.length; i++) {
        let prefix = str.substr(0, i + 1)
        tmpStrs.forEach(item => {
            if (item.substr(0, prefix.length) === prefix) {
                temp = prefix
            } else {
                obj[prefix] = 0
            }
        })
        if (obj[temp] !== 0) {
            result = temp
        }
    }
    return result
};
```

### 执行结果

```js
执行用时 :68 ms, 在所有 JavaScript 提交中击败了77.74%的用户
内存消耗 :36.9 MB, 在所有 JavaScript 提交中击败了15.15%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 68ms  |  36.9MB |


