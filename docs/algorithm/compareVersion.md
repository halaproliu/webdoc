# 比较版本号

<p>给你两个版本号 <code>version1</code> 和 <code>version2</code> ，请你比较它们。</p>

<p>版本号由一个或多个修订号组成，各修订号由一个 <code>'.'</code> 连接。每个修订号由 <strong>多位数字</strong> 组成，可能包含 <strong>前导零</strong> 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，<code>2.5.33</code> 和 <code>0.1</code> 都是有效的版本号。</p>

<p>比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 <strong>忽略任何前导零后的整数值</strong> 。也就是说，修订号 <code>1</code> 和修订号 <code>001</code> <strong>相等 </strong>。如果版本号没有指定某个下标处的修订号，则该修订号视为 <code>0</code> 。例如，版本 <code>1.0</code> 小于版本 <code>1.1</code> ，因为它们下标为 <code>0</code> 的修订号相同，而下标为 <code>1</code> 的修订号分别为 <code>0</code> 和 <code>1</code> ，<code>0 &lt; 1</code> 。</p>

<p>返回规则如下：</p>

<ul>
	<li>如果&nbsp;<code><em>version1&nbsp;</em>&gt;&nbsp;<em>version2</em></code>&nbsp;返回&nbsp;<code>1</code>，</li>
	<li>如果&nbsp;<code><em>version1&nbsp;</em>&lt;&nbsp;<em>version2</em></code> 返回 <code>-1</code>，</li>
	<li>除此之外返回 <code>0</code>。</li>
</ul>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>version1 = "1.01", version2 = "1.001"
<strong>输出：</strong>0
<strong>解释：</strong>忽略前导零，"01" 和 "001" 都表示相同的整数 "1"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>version1 = "1.0", version2 = "1.0.0"
<strong>输出：</strong>0
<strong>解释：</strong>version1 没有指定下标为 2 的修订号，即视为 "0"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>version1 = "0.1", version2 = "1.1"
<strong>输出：</strong>-1
<strong>解释：</strong>version1 中下标为 0 的修订号是 "0"，version2 中下标为 0 的修订号是 "1" 。0 &lt; 1，所以 version1 &lt; version2
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= version1.length, version2.length &lt;= 500</code></li>
	<li><code>version1</code> 和 <code>version2</code> 仅包含数字和 <code>'.'</code></li>
	<li><code>version1</code> 和 <code>version2</code> 都是 <strong>有效版本号</strong></li>
	<li><code>version1</code> 和 <code>version2</code> 的所有修订号都可以存储在 <strong>32 位整数</strong> 中</li>
</ul>

### 求解

使用parseInt解决前置0的数字问题，再进行比较

```js
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
    const v1 = version1.split('.')
    const v2 = version2.split('.')
    for (let i = 0; i < v1.length || i < v2.length; i++) {
        let x = 0, y = 0
        if (i < v1.length) {
            x = parseInt(v1[i])
        }
        if (i < v2.length) {
            y = parseInt(v2[i])
        }
        if (x > y) {
            return 1
        }
        if (x < y) {
            return - 1
        }
    }
    return 0
};
```