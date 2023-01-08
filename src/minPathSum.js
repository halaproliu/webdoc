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