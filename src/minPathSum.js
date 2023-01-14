function minPathSum(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const dp = new Array(m);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const cur = grid[i][j]
            if (i === 0 && j === 0) {
                dp[j] = cur;
                continue;
            }
            if (i === 0) {
                dp[j] = dp[j - 1] + cur;
                continue;
            }
            if (j === 0) {
                dp[j] = dp[j] + cur;
                continue;
            }
            dp[j] = Math.min(dp[j - 1], dp[j]) + cur;
        }
    }
    return dp[m - 1]
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length
    const n = grid[0].length
    const dp = Array.from(new Array(m), _ => new Array(n).fill(0))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let i = 1; i < n; i++) {
        dp[0][i] = dp[0][i - 1] + grid[0][i]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
        }
    }
    return dp[m - 1][n - 1]
};