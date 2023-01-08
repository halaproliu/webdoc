/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    if (p === '*' || s === p) return true
    let m = s.length
    let n = p.length
    let dp = Array.from(Array(m + 1), _ => Array(n + 1).fill(false))
    dp[0][0] = true
    for (let i = 1; i <= n; i++) {
      if (!dp[0][i - 1]) break
      if (p[i - 1] === '*') dp[0][i] = true
    }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s[i - 1] === p[j - 1] || p[j - 1] === '?') {
          dp[i][j] = dp[i - 1][j - 1]
        } else if (p[j - 1] === '*') {
          dp[i][j] = dp[i - 1][j] || dp[i][j - 1]
        }
      }
    }
    return dp[m][n]
};

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  let sIdx = 0, pIdx = 0, sStarIdx = -1, pStarIdx = -1;
  while (sIdx < s.length) {
      if (pIdx < p.length && (s[sIdx] === p[pIdx] || p[pIdx] === '?')) {
          sIdx++, pIdx++;
      } else if (pIdx < p.length && p[pIdx] === '*') { //记录如果之后序列匹配不成功时， sIdx和pIdx需要回溯到的位置
          sStarIdx = sIdx;
          pStarIdx = pIdx++; // 将 pIdx++，sIdx不变，表示先让 * 匹配 0 个字符，不行再回溯
      } else if (pStarIdx > -1) { //发现当前字符不匹配且没有星号 但是 pStarIdx > -1 说明可能是 * 之前匹配的字符数量少了 这时回溯，让*匹配的字符增加一个
          sIdx = ++sStarIdx;
          pIdx = pStarIdx + 1;
      } else {
          return false;
      }
  }
  while (pIdx < p.length) if (p[pIdx++] !== '*') return false; //如果 p 中还有多余的字符的话，那必须都是 * 否则 匹配就不成功
  return true;
};