/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    var str = ''
    var size = 0
    for (var i = 0, len = s.length; i < len; i++) {
      var char = s.charAt(i)
      var index = str.indexOf(char)
      if (index === -1) {
        str += char
        size = size < str.length ? str.length : size
      } else {
        str = str.substr(index + 1) + char
      }
    }
    return size
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const strs = new Set()
  const len = s.length
  let r = -1
  let max = 0
  for (let i = 0; i < len; i++) {
    if (i !== 0) {
      strs.delete(s.charAt(i - 1))
    }
    while (r + 1 < len && !strs.has(s.charAt(r + 1))) {
      strs.add(s.charAt(r + 1))
      r++
    }
    max = Math.max(max, r - i + 1)
  }
  return max
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  const map = new Map()
  let max = 0
  let r = 0
  for (let l = 0; l < s.length; l++) {
    if (map.has(s[l])) {
      r = Math.max(map.get(s[l]) + 1, r)
    }
    max = Math.max(max, l - r + 1)
    map.set(s[l], l)
  }
  return max
};

export default lengthOfLongestSubstring
