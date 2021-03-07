# leetcode算法-4-寻找两个正序数组的中位数

### 问题描述

给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

 

***示例 1:***

```js
nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
```

***示例 2:***

```js
nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

解法：

- 首先合并两个数组
- 接着对数组进行排序
- 找到中位数
- 若数组个数为偶数，则找到中间位两位的前一位的下标，从而找到下一个下标，若为奇数，则直接找到中位数
- 从而计算出最终的结果


```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var arr = nums1.concat(nums2);
    arr.sort((a, b) => a - b);
    var len = arr.length;
    var midIndex = Math.ceil(len / 2);
    var mid;
    if (len % 2 === 0) {
        mid = (arr[midIndex - 1] + arr[midIndex]) / 2;
    } else {
        mid = arr[midIndex - 1];
    }
    return mid;
};
```

### 执行结果

```js
执行用时 :164 ms, 在所有 JavaScript 提交中击败了28.80%的用户
内存消耗 :39.7 MB, 在所有 JavaScript 提交中击败了75.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 164ms  |  39.7MB |


