# leetcode算法-18-四数之和

### 问题描述

给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

***示例：***

```js
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 使用双指针加上双重循环迭代
- 先对nums数组进行升序排序

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    let l, r, res = []
    let len = nums.length
    if (len < 4) return []
    // 对数组进行升序排序
    nums.sort((a, b) => a - b)
    // 对数组进行迭代，从0开始
    for (let i = 0; i < len - 3; i++) {
        // 当相邻两数相等时，不需要重复操作，继续+1，
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        // 对数组进行迭代，从1开始
        for (let j = i + 1; j < len - 2; j++) {
            // 左指针从2开始
            l = j + 1
            // 右指针从右边最后一位开始
            r = len - 1
            // 若j和i指针相差大于1，且相邻元素相等，则跳过
            if (j - 1 > i && nums[j] === nums[j - 1]) continue;
            while (l < r) {
                // 对4个数求和
                let sum = nums[i] + nums[j] + nums[l] + nums[r]
                if (sum === target) {
                    // 若满足条件保存下条件
                    res.push([nums[i], nums[j], nums[l], nums[r]])
                    // 检测相邻元素若相同，则跳过
                    while (l < r && nums[l] === nums[l + 1]) l++
                    while (l < r && nums[r] === nums[r - 1]) r--
                    l++
                    r--
                } else if (sum < target) {
                    while (nums[l] === nums[l + 1]) l++
                    l++
                } else {
                    while (nums[r] === nums[r - 1]) r--
                    r--
                }
            }
        }
    }
    return res
};
```

### 执行结果

```js
执行用时 :124 ms, 在所有 JavaScript 提交中击败了38.93%的用户
内存消耗 :38.4 MB, 在所有 JavaScript 提交中击败了11.11%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 124ms  |  38.4MB |


