/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
    // 是否是正数
    let sign = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0)
    // 被除数绝对值
    let a = Math.abs(dividend)
    // 商绝对值
    let b = Math.abs(divisor)
    let ans = 0
    let partialSum = 1
    let absDivisor = b
    const INT_MAX = Math.pow(2, 31) - 1 // 2147483647
    const INT_MIN = Math.pow(-2, 31) // -2147483648
    // 若被除数小于商，则为0
    if (a < b) return 0
    if (dividend === INT_MAX && divisor === 1) return INT_MAX
    if (dividend === INT_MIN && divisor === -1) return INT_MAX
    if (dividend === INT_MIN && divisor === 1) return INT_MIN
    while ((b << 1) < a) {
        b = b << 1
        partialSum = partialSum << 1
    }

    while (a >= absDivisor) {
        a -= b
        ans += partialSum
        while (b > a) {
            b >>= 1
            partialSum >>= 1
        }
    }
    
    if (sign) {
        return ans > INT_MAX ? INT_MAX : ans
    } else {
        return -ans < INT_MIN ? INT_MIN : -ans
    }
};

divide = function (dividend, divisor) {
    // 是否是正数
    let sign = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0)
    // 被除数绝对值
    let a = Math.abs(dividend)
    // 商绝对值
    let b = Math.abs(divisor)
    let ans = ''
    let cur = ''
    let dividendStr = a.toString()
    // 使用被除数减去商，从高位到低位计算结果
    for (let i = 0; i < dividendStr.length; i++) {
        // 每个位数的值
        let count = 0
        cur += dividendStr[i]
        cur = +cur
        while (cur >= b) {
            cur -= b
            count++
        }
        ans += count
    }
    const INT_MAX = Math.pow(2, 31) - 1 // 2147483647
    const INT_MIN = Math.pow(-2, 31) // -2147483648
    ans = +ans
    // 判断结果是否超出边界
    if (sign) {
        return ans > INT_MAX ? INT_MAX : ans 
    } else {
        return -ans < INT_MIN ? INT_MIN : -ans
    }
}

export default divide
