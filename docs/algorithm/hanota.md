# leetcode算法-面试题08.06-汉诺塔问题

### 问题描述

在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子。一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)。移动圆盘时受到以下限制:
(1) 每次只能移动一个盘子;
(2) 盘子只能从柱子顶端滑出移到下一根柱子;
(3) 盘子只能叠在比它大的盘子上。

请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。

你需要原地修改栈。

***示例1:***

```js
 输入：A = [2, 1, 0], B = [], C = []
 输出：C = [2, 1, 0]
```

***示例2:***

```js
 输入：A = [1, 0], B = [], C = []
 输出：C = [1, 0]
```

***提示:***

A中盘子的数目不大于14个。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/hanota-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
    const len = A.length
    if (len === 0) return []
    function move (A, B, C) {
        if (C.length === len) return
        while (A.length > 1) {
            B.unshift(A.pop())
        }
        C.push(A.pop())
        move(B, A, C)
    }
    move(A, B, C)
    return C
};
```

### 执行结果

```js
执行用时 :68 ms, 在所有 JavaScript 提交中击败了53.64%的用户
内存消耗 :32.3 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 68ms  |  32.3MB |


