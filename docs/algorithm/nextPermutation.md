# leetcode算法-31-下一个排列

### 问题描述

实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
```js
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/next-permutation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
function swap (nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]]
}

function reverse(nums, start, end) {
    while (start < end) {
        swap(nums, start, end)
        start++
        end--
    }
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    const len = nums.length

    let i = nums.length - 2
    // 找到第一个右侧数 大于 左侧数的 下标 i
    while (i >= 0 && nums[i + 1] <= nums[i]) {
        i--
    }
    // 如果i < 0 则代表这个数组不存在更大的排列即降序，所以只需要转化为升序即可
    if (i >= 0) {
        let j = nums.length - 1
        // 如果i大于0，则从右到左开始找 第一个大于 i下标数字的 下标 j
        while (j > 0 && nums[j] <= nums[i]) {
            j--
        }
        swap(nums, i, j)
    }
    // 将i下标往后的 数组 进行反序，变成最小排列；因为i往后的子数组一定是降序的
    reverse(nums, i + 1, len - 1)
};
```

### 执行结果

```js
执行用时 : 84ms, 在所有 JavaScript 提交中击败了54.65%的用户
内存消耗 : 35.6MB, 在所有 JavaScript 提交中击败了50.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 80ms  |  35.9MB |


