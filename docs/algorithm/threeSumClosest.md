# leetcode算法-16-最接近的三数之和

### 问题描述

给定一个包括 n 个整数的数组 `nums` 和 一个目标值 `target`。找出 `nums` 中的三个整数，使得它们的和与 `target` 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```js
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 使用双指针，l和r，先对数组进行升序排序
- 遍历循环nums数组，当前三个指针进行求和sum
- 若sum与target相等，则直接返回答案
- 若sum小于target，左指针+1，若是相邻两个数相等，则再+1
- 若sum大于target，右指针-1，若是相邻两个数相等，则再-1
- 保留下当前的sum和sum和target的差值，若差值小于之前的差值，则重新赋值，否则直接保存当前的diff（差值）和sum

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let l, r, diff, sum = 0, ans
    let len = nums.length
    if (len < 3) return null
    // 先进行排序
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len; i++) {
        l = i + 1
        r = len - 1
        while (l < r) {
            // 求和
            sum = nums[i] + nums[l] + nums[r]
            if (sum === target) {
                return sum
            } else if (sum < target) {
                while (nums[l] === nums[l + 1]) l++
                l++
            } else {
                while (nums[r] === nums[r - 1]) r--
                r--
            }

            // 获取当前和于目标值的差值
            let currDiff = Math.abs(sum - target)
            if (!diff || currDiff < diff) {
                diff = currDiff
                ans = sum
            }
        }
    }
    return ans
};
```

### 执行结果

```js
执行用时 :80 ms, 在所有 JavaScript 提交中击败了73.06%的用户
内存消耗 :36.6 MB, 在所有 JavaScript 提交中击败了10.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 80ms  |  36.6MB |


