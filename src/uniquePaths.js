/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const f = Array.from(new Array(m), _ => new Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        f[i][0] = 1
    }
    for (let j = 0; j < n; j++) {
        f[0][j] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            f[i][j] = f[i - 1][j] + f[i][j - 1]
        }
    }
    return f[m - 1][n - 1]
};