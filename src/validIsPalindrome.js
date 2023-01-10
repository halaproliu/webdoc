/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
    let left = 0
    let right = s.length - 1
    while (left < right) {
        if (s[left] !== s[right]) {
            return false
        }
        left++
        right--
    }
    return true
};

var isPalindrome = function(s) {
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
    let len = s.length
    let middle = Math.floor((len - 1) / 2)
    for (let i = 0; i <= middle; i++) {
        if (s[i] !== s[len - 1 - i]) {
            return false
        }
    }
    return true
};