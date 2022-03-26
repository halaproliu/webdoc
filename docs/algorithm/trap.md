# 接雨水

### 问题描述

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

示例 1：

![](../imgs/rainwatertrap.png)

```js
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

示例 2：

```js
输入：height = [4,2,0,3,2,5]
输出：9
```

提示：

```js
n == height.length
0 <= n <= 3 * 104
0 <= height[i] <= 105
```

### 求解

```js
// 暴力法，时间复杂度O(n^2),空间复杂度O(1)
function trap (height) {
    if (height.length === 0) return 0
    let n = height.length
    let res = 0
    for (let i = 1; i < n - 1; i++) {
        let l_max = 0
        let r_max = 0
        for (let j = i; j < n; j++) {
            // 找右边最高的柱子
            r_max = Math.max(r_max, height[j])
        }
        
        for (let j = i; j >= 0; j--) {
            // 找左边最高的柱子
            l_max = Math.max(l_max, height[j])
        }
        
        res += Math.min(l_max, r_max) - height[i]
    }
    return res
}
```

```js
// 时间复杂度O(1), 空间复杂度O(n)
function trap (height) {
    if (height.length === 0) return 0
    let n = height.length
    let res = 0
    let l_max = new Array(n)
    let r_max = new Array(n)
    
    l_max[0] = height[0]
    r_max[n - 1] = height[n - 1]
    // 计算l_max，从左到右
    for (let i = 1; i < n; i++) {
        l_max[i] = Math.max(height[i], l_max[i - 1])
    }
    
    // 计算r_max，从右到左
    for (let i = n - 2; i >= 0; i--) {
        r_max[i] = Math.max(height[i], r_max[i + 1])
    }
    
    for (let i = 1; i < n - 1; i++) {
        res += Math.min(l_max[i], r_max[i]) - height[i]
    }
    return res
}
```

```js
// 双指针
function trap (height = []) {
    if (height.length === 0) return 0
    const n = height.length
    let res = 0
    
    let left = 0
    let right = n - 1
    
    let l_max = height[0]
    let r_max = height[n - 1]
    
    while (left <= right) {
        l_max = Math.max(l_max, height[left])
        r_max = Math.max(r_max, height[right])
        
        if (l_max < r_max) {
            res += l_max - height[left]
            left++
        } else {
            res += r_max - height[right]
            right--
        }
    }
    return res
}
```
