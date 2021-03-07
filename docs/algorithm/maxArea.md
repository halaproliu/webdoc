# leetcode算法-11-盛最多水的容器

### 问题描述

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

***说明***：你不能倾斜容器，且 n 的值至少为 2。

![](../imgs/maxArea.jpg)


图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

 

示例：

```js
输入：[1,8,6,2,5,4,8,3,7]
输出：49
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

此解思路为：

<font color="deeppink">使用双指针法，双向进行</font>

- 设定left，right，max三个基本变量
- 盛水部分即为一个矩形，长为right-left的长度，宽为left和right中较低的一个部分
- 进行遍历循环，获取当前可盛水面积，当前面积大于最大值时，则当前面积为最大值
- 当left的高度小于right的高度时，则left+1，反之，right+1


```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max = 0
    let left = 0
    let right = height.length - 1
    while (left < right) {
        let current = (right - left) * Math.min(height[left], height[right])
        max = current > max ? current : max
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return max
};
```

### 执行结果

```js
执行用时 :64 ms, 在所有 JavaScript 提交中击败了93.91%的用户
内存消耗 :35.6 MB, 在所有 JavaScript 提交中击败了94.12%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 64 ms  |  35.6 MB |


