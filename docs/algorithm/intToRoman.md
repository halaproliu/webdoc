# leetcode算法-12-整数转罗马数字

### 问题描述

罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

```js
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

- I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
- X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
- C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

***示例 1:***

```js
输入: 3
输出: "III"
```
***示例 2:***

```js
输入: 4
输出: "IV"
```
***示例 3:***

```js
输入: 9
输出: "IX"
```
***示例 4:***

```js
输入: 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
```
***示例 5:***

```js
输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

### 求解

- 使用字典保存罗马字符的个十百千位1-10的字符
- 使用除法获取个十百千位数字，并取模去除最大位数
- 分别取得个十百千位对应的字符字典值
- 注意：边界为1-3999


```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    if (num < 1 || num > 3999) return ''
    function getDictValue (key, value) {
        const dicts = {
            units: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            tens: ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
            hundreds: ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
            throusands: ['M', 'MM', 'MMM']
        }
        return dicts[key][value - 1] || ''
    }
    let mod = 0
    let throusands = ~~(num / 1000)
    mod = num % 1000
    let hundreds = ~~(mod / 100)
    mod = mod % 100
    let tens = ~~(mod / 10)
    mod = mod % 10
    let units = mod
    let result = getDictValue('throusands', throusands) + getDictValue('hundreds', hundreds) + getDictValue('tens', tens) + getDictValue('units', units)
    return result
};
```


