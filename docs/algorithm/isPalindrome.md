## leetcode算法-9-回文数

### 问题描述

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

**示例 1:**

```js
输入: 121
输出: true
```

**示例 2:**

```js
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

**示例 3:**

```js
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/palindrome-number
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 暴力破解法

```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let tmp = x + ''
    let arr = tmp.split('')
    return +arr.reverse().join('') === x
};
```

- 取余翻转法
奇数位数：得到的新整数除以10，应与剩余的数相等
偶数位数：得到的新整数本身要与剩余的数相等

```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // 
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let rev = 0;
    while (rev < x) {
        rev = rev * 10 + x % 10;
        x = ~~(x / 10);
    }
    return (rev === x) || (~~(rev / 10) === x)
};
```

- 二分对比法

```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

    if(x<0) return false;
    let flag = true;
    x = x.toString()

    for(let i=0, len=x.length; i<len/2; i++){
        if(x[i] !== x[len-1-i]){
            flag = false;
            break
        }
    }
    return flag
};
```


### 执行结果

- 暴力破解法

```js
执行用时 : 352 ms, 在所有 JavaScript 提交中击败了5.13%的用户
内存消耗 : 45.8 MB, 在所有 JavaScript 提交中击败了52.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:-------:|:------:|:-------:|
|   通过   |  352ms | 45.8MB |

- 取余翻转法

```js
执行用时 : 220 ms, 在所有 JavaScript 提交中击败了73.22%的用户
内存消耗 : 45.2 MB, 在所有 JavaScript 提交中击败了82.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:-------:|:------:|:-------:|
|   通过   |  220ms | 45.2MB |

- 二分对比法

```js
执行用时 : 256 ms, 在所有 JavaScript 提交中击败了33.33%的用户
内存消耗 : 45.7 MB, 在所有 JavaScript 提交中击败了60.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:-------:|:------:|:-------:|
|   通过   |  256ms | 45.7MB |


