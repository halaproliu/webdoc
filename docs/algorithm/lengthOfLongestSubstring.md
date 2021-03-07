# leetcode算法-3-无重复字符的最长子串

### 问题描述

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

***示例 1:***

```js
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

***示例 2:***

```js
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

***示例 3:***

```js
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


### 求解


```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  var str = ''
  var size = 0
  for (var i = 0, len = s.length; i < len; i++) {
    var char = s.charAt(i)
    var index = str.indexOf(char)
    if (index == -1) {
      str += char
      size = Math.max(str.length, size)
    } else {
      str = str.substr(index + 1) + char
    }
  }
  return size
};
```

>  <font color="deeppink">此题使用滑动窗口算法</font>

- 设置一个对象
- 使用左右两个指针，遍历字符串，判断对象中是否已包含字符，若不包含，则添加进对象，右指针+1
- 对比当前无重复子串的长度和最大值，计算出新的最大值
- 左指针右移，移除一个字符，继续先前的步骤
- 在枚举结束后，找到的最长子串即是答案

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const strs = new Set()
  const len = s.length
  let r = -1
  let max = 0
  for (let i = 0; i < len; i++) {
    if (i !== 0) {
      strs.delete(s.charAt(i - 1))
    }
    while (r + 1 < len && !strs.has(s.charAt(r + 1))) {
      strs.add(s.charAt(r + 1))
      r++
    }
    max = Math.max(max, r - i + 1)
  }
  return max
};
```


### 执行结果


```js
执行用时 :96 ms, 在所有 JavaScript 提交中击败了82.30%的用户
内存消耗 :39.8 MB, 在所有 JavaScript 提交中击败了61.64%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 96ms  |  39.8MB |


