// 买卖股票的最佳时机
// 贪心
function maxProfit(prices) {
    if (prices.length === 0) return 0
    let min = prices[0]
    let max = 0
    for (let p of prices) {
        min = Math.min(min, p)
        max = Math.max(max, p - min)
    }
    return max
}
// 动态规划
function maxProfit(prices) {
    let n = prices.length
    let dp = Array.from(new Array(n), () => new Array(2))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
    }
    return dp[n - 1][0]
}

// 动态规划+状态压缩
function maxProfit(prices) {
    let n = prices.length
    let dp = Array.from(new Array(n), () => new Array(2))
    dp[0] = 0
    dp[1] = -prices[0]
    for (let i = 1; i < n; i++) {
        dp[0] = Math.max(dp[0], dp[1] + prices[i])
        dp[1] = Math.max(dp[1], -prices[i])
    }
    return dp[0]
}