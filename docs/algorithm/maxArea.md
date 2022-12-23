<!--
 * @Author: liuwenjian
 * @Date: 2022-12-09 10:26:54
 * @LastEditors: liuwenjian
 * @LastEditTime: 2022-12-23 12:43:01
 * @FilePath: /webdoc/docs/algorithm/maxArea.md
 * @Description: 
-->
# leetcode算法-11-盛最多水的容器

### 问题描述

<p>给定一个长度为 <code>n</code> 的整数数组&nbsp;<code>height</code>&nbsp;。有&nbsp;<code>n</code>&nbsp;条垂线，第 <code>i</code> 条线的两个端点是&nbsp;<code>(i, 0)</code>&nbsp;和&nbsp;<code>(i, height[i])</code>&nbsp;。</p>

<p>找出其中的两条线，使得它们与&nbsp;<code>x</code>&nbsp;轴共同构成的容器可以容纳最多的水。</p>

<p>返回容器可以储存的最大水量。</p>

<p><strong>说明：</strong>你不能倾斜容器。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg" /></p>

<pre>
<strong>输入：</strong>[1,8,6,2,5,4,8,3,7]
<strong>输出：</strong>49 
<strong>解释：</strong>图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为&nbsp;49。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>height = [1,1]
<strong>输出：</strong>1
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>n == height.length</code></li>
	<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>
</ul>

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

此解思路为：

<font color="deeppink">使用双指针法，双向进行</font>

- 设定left，right，max三个基本变量
- 盛水部分即为一个矩形，长为right-left的长度，宽为left和right中较低的一个部分
- 进行遍历循环，获取当前可盛水面积，当前面积大于最大值时，则当前面积为最大值
- 当left的高度小于right的高度时，则left+1，反之，right-1


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


