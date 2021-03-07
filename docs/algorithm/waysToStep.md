# leetcode算法-面试题08.01-三步问题

### 问题描述

三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。实现一种方法，计算小孩有多少种上楼梯的方式。结果可能很大，你需要对结果模1000000007。

***示例1:***

```js
 输入：n = 3 
 输出：4
 说明: 有四种走法
```

***示例2:***

```js
 输入：n = 5
 输出：13
```

***提示:***

n范围在[1, 1000000]之间

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/three-steps-problem-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


### 求解

```js
/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function(n) {
    let nums = [1, 2, 4]
    let i
    if (n < 4) return nums[n - 1]
    for (i = 3; i < n; i++) {
        nums[i] = (nums[i - 1] + nums[i - 2]  + nums[i - 3]) % (1e9 + 7)
    }
    return nums[i - 1]
};
```

### 执行结果

```js
执行用时 :116 ms, 在所有 JavaScript 提交中击败了34.83%的用户
内存消耗 :68.1 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 116ms  |  68.1MB |


