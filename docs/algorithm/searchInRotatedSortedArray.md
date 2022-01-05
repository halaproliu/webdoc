# leetcode算法-searchInRotatedSortedArray

### 问题描述

整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

***示例 1：***

```js
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
```

***示例 2：***

```
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
```

***示例 3：***

```
输入：nums = [1], target = 0
输出：-1
```

  - 1 <= nums.length <= 5000
  - -10^4 <= nums[i] <= 10^4
  - nums 中的每个值都 独一无二
  - 题目数据保证 nums 在预先未知的某个下标上进行了旋转
  - -10^4 <= target <= 10^4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


### 求解

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  let len = nums.length
  if (len === 0) {
      return -1
  }
  if (len === 1) {
      return nums[0] === target ? 0 : -1
  }
  let l = 0, r = len - 1
  while (l <= r) {
      let pivot = Math.floor((l + r) / 2)
      if (nums[pivot] === target) {
        return pivot
      }
      if (nums[0] <= nums[pivot]) {
          if (nums[0] <= target && target < nums[pivot]) {
              r = pivot - 1
          } else {
              l = pivot + 1
          }
      } else {
          if (nums[pivot] < target && target <= nums[len - 1]) {
              l = pivot + 1
          } else {
              r = pivot - 1
          }
      }
  }
  return -1
};
```

### 执行结果

```js
执行用时 : 64ms, 在所有 JavaScript 提交中击败了92.37%的用户
内存消耗 : 38.9MB, 在所有 JavaScript 提交中击败了51.44%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 64ms  |  38.9MB |
