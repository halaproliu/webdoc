# 最短回文串

<p>给定一个字符串 <em><strong>s</strong></em>，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aacecaaa"
<strong>输出：</strong>"aaacecaaa"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abcd"
<strong>输出：</strong>"dcbabcd"
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 <= s.length <= 5 * 10<sup>4</sup></code></li>
	<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


### 求解

- KMP算法

1.把字符串反转

2.原字符串+反转字符串

3.求next数组（找出公共前后缀）

4.对比原字符串与公共前后缀，多出的部分加到原字符串前边

```js
/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
    let revStr = s.split('').reverse().join('')
    let str = s + '#' + revStr
    let next = new Array(str.length)
    next[0] = 0
    for (let i = 1, j = 0; i <= str.length - 1; i++) {
        while (j > 0 && str[i] !== str[j]) {
            j = next[j - 1]
        }
        if (str[i] === str[j]) {
            j++
        }
        next[i] = j
    }
    return s.slice(next[str.length - 1]).split('').reverse().join('') + s
};
```