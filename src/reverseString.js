// 反转字符串
function reverseString(s) {
    for(let l = 0, r = s.length - 1; l < r; l++, r--) {
        [s[l], s[r]] = [s[r], s[l]]
    }
    return s
}

