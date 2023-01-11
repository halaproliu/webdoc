/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
    let revStr = s.split('').reverse().join('')
    let str = s + '#' + revStr
    let next = new Array(str.length)
    next[0] = 0
    for (let i = 1, j = 0; i <= str.length - 1; i++) {
        while (j > 0 && str[i] !== str[j]) {
            j = next[j - 1]
        }
        if (str[i] === str[j]) {
            j++
        }
        next[i] = j
    }
    return s.slice(next[str.length - 1]).split('').reverse().join('') + s
};