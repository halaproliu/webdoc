# leetcode算法-15-三数之和

### 问题描述

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

 

***示例：***

```js
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

- 首先对数组进行从小到大排序
- 循环遍历数组，l指针从i+1开始，r指针则从数组的最右侧开始
- 当i+l+r第三个数值相加为0时，则满足条件，储存进数组，大于0，则r--,小于0，则l++
- 当相邻值相等时，则无需遍历，直接+1

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let l, r, res = []
    let arr = nums.sort((a, b) => a - b)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) break
        if(nums[i] === nums[i - 1]) continue
        l = i + 1
        r = arr.length - 1
        while (l < r) {
            let sum = arr[i] + arr[l] + arr[r]
            if (sum === 0) {
                res.push([arr[i], arr[l], arr[r]])
                while (arr[l] === arr[l + 1]) l++
                l++
            } else if (sum > 0) {
                r--
            } else if (sum < 0) {
                l++
            }
        }
    }
    return res
};
```


### 执行结果

```js
执行用时 :156 ms, 在所有 JavaScript 提交中击败了97.32%的用户
内存消耗 :46.1 MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 156ms  |  46.1MB |


