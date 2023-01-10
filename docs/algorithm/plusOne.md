# 加一

<p>给定一个由 <strong>整数 </strong>组成的<strong> 非空</strong> 数组所表示的非负整数，在该数的基础上加一。</p>

<p>最高位数字存放在数组的首位， 数组中每个元素只存储<strong>单个</strong>数字。</p>

<p>你可以假设除了整数 0 之外，这个整数不会以零开头。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>digits = [1,2,3]
<strong>输出：</strong>[1,2,4]
<strong>解释：</strong>输入数组表示数字 123。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>digits = [4,3,2,1]
<strong>输出：</strong>[4,3,2,2]
<strong>解释：</strong>输入数组表示数字 4321。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>digits = [0]
<strong>输出：</strong>[1]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= digits.length <= 100</code></li>
	<li><code>0 <= digits[i] <= 9</code></li>
</ul>


### 求解

### 思路

- 没有9的直接末尾加一

- 末尾有若干个9，找出末尾第一个不为9的数字加一，后面的数字置为0

- 如果全为9，新建数组填充0，将首元素置为1

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    const n = digits.length
    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] !== 9) {
            digits[i]++
            for (let j = i + 1; j < n; ++j) {
                digits[j] = 0
            }
            return digits
        }
    }
    const ans = new Array(n + 1).fill(0)
    ans[0] = 1
    return ans
};
```