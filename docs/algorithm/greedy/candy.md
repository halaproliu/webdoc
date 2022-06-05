# 分发糖果

### 问题描述

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

**示例 1:**

```js
输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
```

**示例 2:**

```js
输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
```

**提示：**


```js
n == ratings.length
1 <= n <= 2 * 104
0 <= ratings[i] <= 2 * 104
```

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/candy
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
/**
 * @param {number[]} ratings
 * @return {number}
 */
 var candy = function(ratings) {
  let len = ratings.length
  if (len < 2) return len
  let nums = new Array(len).fill(1) 
  for (let i = 1; i < nums.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      nums[i] = nums[i - 1] + 1
    }
  }

  for (let i = len - 1; i > 0; i--) {
    if (ratings[i] < ratings[i - 1]) {
      nums[i - 1] = Math.max(nums[i - 1], nums[i] + 1)
    }
  }
  return nums.reduce((total, val) => total + val)
};
```


