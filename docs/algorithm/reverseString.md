<!--
 * @Author: liuwenjian
 * @Date: 2022-12-23 10:17:15
 * @LastEditors: liuwenjian
 * @LastEditTime: 2022-12-23 10:22:55
 * @FilePath: /webdoc/docs/algorithm/reverseString.md
 * @Description: 
-->
# 反转字符串

<p>编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 <code>s</code> 的形式给出。</p>

<p>不要给另外的数组分配额外的空间，你必须<strong><a href="https://baike.baidu.com/item/原地算法" target="_blank">原地</a>修改输入数组</strong>、使用 O(1) 的额外空间解决这一问题。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = ["h","e","l","l","o"]
<strong>输出：</strong>["o","l","l","e","h"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = ["H","a","n","n","a","h"]
<strong>输出：</strong>["h","a","n","n","a","H"]</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s[i]</code> 都是 <a href="https://baike.baidu.com/item/ASCII" target="_blank">ASCII</a> 码表中的可打印字符</li>
</ul>

### 求解

```js
function reverseString(s) {
    for(let l = 0, r = s.length - 1; l < r; l++, r--) {
        [s[l], s[r]] = [s[r], s[l]]
    }
    return s
}
```
