# 买卖股票的最佳时机

<p>给定一个数组 <code>prices</code> ，它的第 <code>i</code> 个元素 <code>prices[i]</code> 表示一支给定股票第 <code>i</code> 天的价格。</p>

<p>你只能选择 <strong>某一天</strong> 买入这只股票，并选择在 <strong>未来的某一个不同的日子</strong> 卖出该股票。设计一个算法来计算你所能获取的最大利润。</p>

<p>返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 <code>0</code> 。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>[7,1,5,3,6,4]
<strong>输出：</strong>5
<strong>解释：</strong>在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,6,4,3,1]
<strong>输出：</strong>0
<strong>解释：</strong>在这种情况下, 没有交易完成, 所以最大利润为 0。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= prices.length <= 10<sup>5</sup></code></li>
	<li><code>0 <= prices[i] <= 10<sup>4</sup></code></li>
</ul>


### 求解

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/solutions/1658196/maimai-by-1105389168-heyc/?languageTags=javascript

```js
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
```