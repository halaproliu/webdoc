/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (!s || s.length < 2) return s
    let len = s.length;
    let start = 0
    let end = 0
    const getPalindrome = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--
            r++
        }
        return r - l - 1
    }

    for (let i = 0; i < len; i++) {
        let len1 = getPalindrome(i, i)
        let len2 = getPalindrome(i, i + 1)
        let maxLen = Math.max(len1, len2)
        if (maxLen > end - start) {
            start = i - Math.floor((maxLen - 1) / 2)
            end = i + Math.floor(maxLen / 2)
        }
    }

    return s.slice(start, end + 1)
};

export default longestPalindrome
