## leetcode算法-1-两数之和

### 问题描述

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**示例:**

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 暴力破解法

通过简单的双层循环，进行暴力破解
<font color="red">时间复杂度O(n<sup>2</sup>)</font>

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j <= nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return []
};
```

- hashmap求解法

<font color="red">时间复杂度O(n)</font>

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const hash = {}

  for (let index = 0; index < nums.length; index++) {
    const currentNum = nums[index]
    if (hash[target - currentNum] !== void 0) {
      return [hash[target - currentNum], index]
    }
    hash[currentNum] = index
  }
}
```

### 执行结果

```js
执行用时 :64 ms, 在所有 JavaScript 提交中击败了90.32%的用户
内存消耗 :35.3 MB, 在所有 JavaScript 提交中击败了27.12%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:-------:|:------:|:-------:|
|   通过   |  64ms  |  35.3MB |



