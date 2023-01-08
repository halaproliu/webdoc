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