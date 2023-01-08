# 通配符匹配

<p>给定一个字符串&nbsp;(<code>s</code>) 和一个字符模式&nbsp;(<code>p</code>) ，实现一个支持&nbsp;<code>&#39;?&#39;</code>&nbsp;和&nbsp;<code>&#39;*&#39;</code>&nbsp;的通配符匹配。</p>

<pre>&#39;?&#39; 可以匹配任何单个字符。
&#39;*&#39; 可以匹配任意字符串（包括空字符串）。
</pre>

<p>两个字符串<strong>完全匹配</strong>才算匹配成功。</p>

<p><strong>说明:</strong></p>

<ul>
	<li><code>s</code>&nbsp;可能为空，且只包含从&nbsp;<code>a-z</code>&nbsp;的小写字母。</li>
	<li><code>p</code>&nbsp;可能为空，且只包含从&nbsp;<code>a-z</code>&nbsp;的小写字母，以及字符&nbsp;<code>?</code>&nbsp;和&nbsp;<code>*</code>。</li>
</ul>

<p><strong>示例&nbsp;1:</strong></p>

<pre><strong>输入:</strong>
s = &quot;aa&quot;
p = &quot;a&quot;
<strong>输出:</strong> false
<strong>解释:</strong> &quot;a&quot; 无法匹配 &quot;aa&quot; 整个字符串。</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre><strong>输入:</strong>
s = &quot;aa&quot;
p = &quot;*&quot;
<strong>输出:</strong> true
<strong>解释:</strong>&nbsp;&#39;*&#39; 可以匹配任意字符串。
</pre>

<p><strong>示例&nbsp;3:</strong></p>

<pre><strong>输入:</strong>
s = &quot;cb&quot;
p = &quot;?a&quot;
<strong>输出:</strong> false
<strong>解释:</strong>&nbsp;&#39;?&#39; 可以匹配 &#39;c&#39;, 但第二个 &#39;a&#39; 无法匹配 &#39;b&#39;。
</pre>

<p><strong>示例&nbsp;4:</strong></p>

<pre><strong>输入:</strong>
s = &quot;adceb&quot;
p = &quot;*a*b&quot;
<strong>输出:</strong> true
<strong>解释:</strong>&nbsp;第一个 &#39;*&#39; 可以匹配空字符串, 第二个 &#39;*&#39; 可以匹配字符串 &quot;dce&quot;.
</pre>

<p><strong>示例&nbsp;5:</strong></p>

<pre><strong>输入:</strong>
s = &quot;acdcb&quot;
p = &quot;a*c?b&quot;
<strong>输出:</strong> false</pre>

### 求解

##### 解法一：

1. 定义 dp table

- dp[i][j] 表示字符串 s[0:i] 与字符串 p[0:j] 是否匹配

2. 定义 dp 方程

- if (s[i] == p[j] || p[j] == '?' ) dp[i][j] = dp[i - 1][j - 1]
- else if (p[j === "*"]) dp[i][j] = dp[i - 1][j] || dp[i][j - 1]
  - dp[i - 1][j] 表示 '*' 匹配一个或多个字符
  - dp[i][j - 1] 表示 '*' 匹配空字符串
- else dp[i][j] = false

```js
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
```

##### 解法二

- 遍历字符串 s 和 p
  - if (s[sIdx] === p[pIdx] || p[pIdx] === '?')，当前字符匹配成功，sIdx++ pIdx++
  - else if ( p[pIdx] === '*')
    - 记录当前匹配 * 的位置，sStarIdx = sIdx;pStarIdx = pIdx++;
    - 这时先让 * 匹配 0 个字符，如果匹配 0 个字符不成功，则根据之前记录的 sStarIdx 和 pStarIdx 回溯到这个地方，再让 * 匹配 1 个字符，如果匹配 1 个字符也不成功，则继续回溯回来，匹配 2 个字符，以此类推
  - else if (pStarIdx < 0)，则说明当前字符串不匹配，并且没有 * ，则直接 return false;
当遍历完后，如果 p 中还有多余的字符的话，那么必须都得是 * ，否则就匹配不成功，则直接 return false;
  - 最后 return true; 表示匹配成功

```js
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
```