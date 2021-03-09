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
