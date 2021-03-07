# leetcode算法-17-电话号码的字母组合

### 问题描述

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![](../imgs/phoneCode.png)

***示例:***

```js
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

思路：

- 使用递归

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits) {
        return [];
    }
    var len = digits.length;
    var map = new Map();
    map.set('2','abc');
    map.set('3','def');
    map.set('4','ghi');
    map.set('5','jkl');
    map.set('6','mno');
    map.set('7','pqrs');
    map.set('8','tuv');
    map.set('9','wxyz');
    var result = [];
    function _generate(i, str) {
        if (i === len) {
            result.push(str);
            return;
        }
        var tmp = map.get(digits[i]);
        for(var r = 0; r < tmp.length; r++){
            _generate(i + 1, str + tmp[r]);
        }
    }
    _generate(0, '');
    return result;
};
```

### 执行结果

```js
执行用时 :56 ms, 在所有 JavaScript 提交中击败了94.45%的用户
内存消耗 :32.3 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 56ms  |  32.3MB |


