// x的平方根，保留整数部分
function mySqrt(x) {
    let ans = -1, l = 0, r = x
    while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2)
        if (mid * mid <= x) {
            ans = mid
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return ans
}