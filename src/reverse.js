/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let isNegative = x < 0
    let num = isNegative ? -x : x
    let min = -(2 ** 31)
    let max = 2 ** 31 - 1
    num = num.toString().split('').reverse().join('')
    num = isNegative ? -num : num
    if (num < min || num > max) return 0
    return num
};
