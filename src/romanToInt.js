/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let dicts = { 'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1 }
    let ans = 0, index = 0, now = 0, num = 0
    while (index < s.length) {
        now = dicts[s[index]]
        if (num < now) {
            ans -= num
        } else {
            ans += num
        }
        num = now
        index++
    }
    ans += num
    return ans
};

export default romanToInt
