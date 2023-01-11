# 只出现一次的数字

<p>给你一个 <strong>非空</strong> 整数数组 <code>nums</code> ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。</p>

<p>你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。</p>

<div class="original__bRMd">
<div>
<p>&nbsp;</p>

<p><strong class="example">示例 1 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,2,1]
<strong>输出：</strong>1
</pre>

<p><strong class="example">示例 2 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [4,1,2,1,2]
<strong>输出：</strong>4
</pre>

<p><strong class="example">示例 3 ：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>1
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>-3 * 10<sup>4</sup> &lt;= nums[i] &lt;= 3 * 10<sup>4</sup></code></li>
	<li>除了某个元素只出现一次以外，其余每个元素均出现两次。</li>
</ul>
</div>
</div>

### 求解

- 异或，使用异或相同数字结果为0的特性，最后剩下的数字与0异或就是结果

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let n = nums.length
    let ans = nums[0]
    for (let i = 1; i < nums.length; i++) {
        ans ^= nums[i]
    }
    return ans
};
```

- 使用map获取每个数字的重复次数，再找出只有一次的数字

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        let count = map.get(nums[i]) || 0
        count++
        map.set(nums[i], count)
    }
    for (let [key, value] of map.entries()) {
        if (value === 1) {
            return key
        }
    }
    return -1
};
```