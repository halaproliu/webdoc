// 旋转数组(寻找最小的索引)
function search(arr, target) {
    let l = 0
    let r = arr.length - 1
    while(l <= r) {
        let mid = Math.floor((l + r) / 2)
        if (arr[l] === target) return l
        if (arr[mid] === target) {
            // 有可能有更小的索引
            r = mid
        } else if (arr[l] > arr[mid]) { // 左指针大于中间数
            if (arr[mid] < target && target < arr[l]) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        } else if (arr[l] < arr[mid]) {
            if (arr[mid] > target && target >= arr[l]) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        } else if (arr[l] === arr[mid]) { // 相等的话，左边就不是一个递增的区间了，无法直接判断
            l++
        }
    }
    return -1
}