# 全排列

<p>给定一个不含重复数字的数组 <code>nums</code> ，返回其 <em>所有可能的全排列</em> 。你可以 <strong>按任意顺序</strong> 返回答案。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3]
<strong>输出：</strong>[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1]
<strong>输出：</strong>[[0,1],[1,0]]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1]
<strong>输出：</strong>[[1]]
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 6</code></li>
	<li><code>-10 &lt;= nums[i] &lt;= 10</code></li>
	<li><code>nums</code> 中的所有整数 <strong>互不相同</strong></li>
</ul>

### 求解

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = []
  const path = []
  backtracking(nums, nums.length, []) //调用回溯函数 传入nums，nums长度，used数组
  return res

  function backtracking(n, k, used) {
    if (path.length === k) {
      //递归终止条件
      res.push(Array.from(path))
      return
    }
    for (let i = 0; i < k; i++) {
      if (used[i]) continue //已经使用过了就跳过本轮循环
      path.push(n[i])
      used[i] = true
      backtracking(n, k, used) //递归
      path.pop() // 回溯 将push进的元素pop出来 然后标记成未使用 继续其他分支
      used[i] = false
    }
  }
}
```