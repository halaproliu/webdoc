# 最小路径之和

<p>给定一个包含非负整数的 <code><em>m</em>&nbsp;x&nbsp;<em>n</em></code>&nbsp;网格&nbsp;<code>grid</code> ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。</p>

<p><strong>说明：</strong>一个机器人每次只能向下或者向右移动一步。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg" style="width: 242px; height: 242px;" /></p>

<pre>
<strong>输入：</strong>grid = [[1,3,1],[1,5,1],[4,2,1]]
<strong>输出：</strong>7
<strong>解释：</strong>因为路径 1&rarr;3&rarr;1&rarr;1&rarr;1 的总和最小。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,2,3],[4,5,6]]
<strong>输出：</strong>12
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 200</code></li>
	<li><code>0 &lt;= grid[i][j] &lt;= 100</code></li>
</ul>

<p>&nbsp;</p>

<p><meta charset="UTF-8" />注意：本题与主站 64&nbsp;题相同：&nbsp;<a href="https://leetcode-cn.com/problems/minimum-path-sum/">https://leetcode-cn.com/problems/minimum-path-sum/</a></p>


### 求解

- 使用动态规划

使用dp[i][j]表示从左上角出发到(i,j)位置的最小路径和。
dp[0][0] = grid[0][0],其他元素的状态转移方程如下：

- 当i > 0且j = 0时，dp[i][0] = dp[i - 1][0] + grid[i][0]
- 当j = 0且j > 0时，dp[0][j] = dp[0][j - 1] + grid[0][j]
- 当i > 0且j > 0时，dp[i][j] = min(dp[i - 1][j] + dp[i][j - 1]) + grid[i][j]

最后得到的dp[m - 1][n - 1]的值即为从网格左上角到网格右下角的最小路径和。

```js
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
```

- 状态压缩

```js
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
```