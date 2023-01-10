# 合并区间

<p>以数组 <code>intervals</code> 表示若干个区间的集合，其中单个区间为 <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code> 。请你合并所有重叠的区间，并返回&nbsp;<em>一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间</em>&nbsp;。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,3],[2,6],[8,10],[15,18]]
<strong>输出：</strong>[[1,6],[8,10],[15,18]]
<strong>解释：</strong>区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
</pre>

<p><strong>示例&nbsp;2：</strong></p>

<pre>
<strong>输入：</strong>intervals = [[1,4],[4,5]]
<strong>输出：</strong>[[1,5]]
<strong>解释：</strong>区间 [1,4] 和 [4,5] 可被视为重叠区间。</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= intervals.length &lt;= 10<sup>4</sup></code></li>
	<li><code>intervals[i].length == 2</code></li>
	<li><code>0 &lt;= start<sub>i</sub> &lt;= end<sub>i</sub> &lt;= 10<sup>4</sup></code></li>
</ul>


### 求解

- 时间复杂度: O(nlogn)O(nlogn)O(nlogn)
- 空间复杂度: O(logn)O(logn)O(logn)

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0])
    const ret = []
    for (let i = 0; i < intervals.length; i++) {
        //用cur代表当前区间
        let cur = intervals[i]
        //如果ret数组为空或者ret数组中最后一个区间的右边界小于当前区间的左边界，将当前区间加入到ret数组中
        if (ret.length === 0 || ret.at(-1)[1] < cur[0]) {
            ret.push(cur)
        } else {
            //如果ret数组中最后一个区间的右边界大于等于当前区间的左边界，说明两者有重叠，这时候要对ret数组中最后一个区间的右边界进行修改
            ret.at(-1)[1] = Math.max(ret.at(-1)[1], cur[1])
        }
    }
    return ret
};
```
