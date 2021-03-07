# leetcode算法-6-Z 字形变换

### 问题描述

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

```js
L   C   I   R
E T O E S I I G
E   D   H   N
```
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

```js
string convert(string s, int numRows);
```

示例 1:

```js
输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
```

示例 2:

```js
输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:
```

```js
L     D     R
E   O E   I I
E C   I H   N
T     S     G
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zigzag-conversion
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

此解思路为：
- 创建一个数组，每一个元素为一行。
- 数组长度为字符串长度和numRows的最小值
- 若numRows = 1，则说明当前字符串即为最终结果。
- 初始化两个变量，loc为当前数组下标，down表示是否向下。
- 遍历字符串
- 当down = true时，则loc += 1, 数组对应下标数组拼接字符串。
- 当down = false时，则loc -= 1, 数组对应下标数组拼接字符串。
- 时间复杂度为：O(n)， n为字符串s的长度

```js
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;
    for(const c of s) {
        rows[loc] += c;
        if(loc === 0 || loc === numRows - 1)
            down = !down;
        loc += down ? 1 : -1;
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};
```

### 执行结果

```js
执行用时 :112 ms, 在所有 JavaScript 提交中击败了52.15%的用户
内存消耗 :39.5 MB, 在所有 JavaScript 提交中击败了66.67%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 112ms  |  39.5MB |


