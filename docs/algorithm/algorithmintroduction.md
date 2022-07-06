# 🐮写给零基础的前端算法入门指南，acmer带女友刷80+【递归与回溯篇】｜牛气冲天新年征文

## 前言

各位小伙伴们新年好呀，时隔一周，俺又回来更新文章啦！在上一篇发出去之后，虽然没有得到很多的阅读量，但是后面几篇文章还是得要更新出来，我想总能够帮助一小部分人咯~

> 现在和大家分享一下我们是如何准备算法这一块的，春招即将开启，还能最后准备一下，希望对大家有所帮助。

原本打算通过一篇文章介绍一下，推荐一下自己的刷题方式和刷题路线，得到一些伙伴的反馈：最好还是更加详细，面向零基础，小白这些，还有`github`访问速度也是一方面问题，可能图片都加载不出来。

因此，我打算分模块出几期文章，这样你只用通过首发在掘金的文章即可了解 `Chocolate` 同学整体刷题汇总啦。马上就要过年了，希望能够帮助你的春招。打算出的内容计划安排如下：

-   🐮写给零基础的前端算法入门指南，acmer带女友刷80+【栈与队列与链表篇】（已完成🎉）
-   🐮写给零基础的前端算法入门指南，acmer带女友刷80+【递归与回溯篇】（本期已完成🎉）
-   🐮写给零基础的前端算法入门指南，acmer带女友刷80+【双指针与字符串篇】
-   🐮写给零基础的前端算法入门指南，acmer带女友刷80+【二叉树篇】
-   🐮写给零基础的前端算法入门指南，acmer带女友刷80+【动态规划DP篇】
-   🐮写给零基础的前端算法入门指南，acmer带女友刷80+【总结篇】

## 算法这一块到底如何准备

首先，我来简单介绍一下自己，在校打过ACM（如果没听过，当我没说，因为没有很大价值的牌牌，铁牌，参赛证以及证书倒是一堆）

如果你知道acm，并且参与过，对于国内前端（注意是说前端）面试的话，应该不需要花费很长的刷题时间，如果大家有想法了解我的acm经历的话，这个后续我会考虑在 [B站发布一期视频](https://space.bilibili.com/351534170")。

那么对于零基础的小白来说，可能需要花10-20天左右时间来准备算法，而对于非科班来说这个周期可能会更长一点。那么，现在我准备来分享我是如何带着女友零基础刷题的。

-   第一点，明确算法它不是很难的东西，理解了其实就那会事，或许你还会喜欢上做题，当然，对于acm大佬做的题就另当别论了，这篇文章主体与面试水平为准
-   第二点，前端对于算法这一块的考察相对来说会偏简单一点，我在春秋招过程中遇到的笔试题都是一些常见的题目，比如搜索，贪心，简单动态规划，经典排序算法，都是以 `leetcode`一些简单以及中等难度的居多，而这些算法对于科班来说的话，应该在学校都学习过，比如算法分析与设计，数据结构与算法这一类课程，那么有这个基础，你的刷题时间又可以进行缩短了
-   第三点，既然说到要刷题，该如何刷，我在掘金参考了几个大佬（文末有参考处），大家都会推荐分专题来刷，在这里，我也是非常推荐的，在这里，我希望的是将刷算法题的数量再减少一点，带你入门，当你刷完这些专题之后，你就有相关思维能力主动去刷题了，而不是很被动的去刷，这样也很方便自己总结归纳~
-   其它，可以参考大佬的文章，这里不再赘述...

## 一份思维导图，让你的刷题路线更简单

开门见山地说，首先提供一份思维导图，让知识由繁到简。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30337832145d4969833ccb6cf4009d7e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

> 获取高清PDF，请在微信公众号【小狮子前端】回复【LeetCode】，一起刷题或者交流学习可以加企鹅群【666151691】

> 本仓库刷题路线参考 [ssh](https://github.com/sl1673495/leetcode-javascript")

感谢大佬的归纳总结，原本打算在大佬那里打卡学习，后面考虑不太友好，还是自己新建了一个仓库打卡学习。

其次，本仓库解题代码大部分是自己的代码风格，题量也进行了拓展，将会持续更新下去，何不star收藏一下？

## 仓库介绍

> 仓库地址：[github.com/Chocolate19…](https://github.com/Chocolate1999/leetcode-javascript")

本仓库将全程使用的语言是 `JavaScript`，是一个纯前端刷题路线，对于前端刷题没有方向的小伙伴简直是福音。解题代码会记录在本仓库的 `Issues` 中，会按照 `label` 进行分类。比如想查看 「递归与回溯」 分类下的问题，那么选择标签进行筛选即可。

同时，小伙伴们可以在 `Issues` 中提交自己的解题代码，🤝 欢迎 `Contributing` ，可打卡刷题，坚持下来的人最酷！Give a ⭐️ if this project helped you !

## 刷题路线

下面正式开始我们的刷题之路，给本篇文章点个赞，拿出自己心仪的键盘，开始！

> 以下专题顺序仅个人以及面试高频点来总结的刷题方式，大家可以根据自己的想法来组合。更多题集请参考本仓库哈~

## 热身题

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/680b01925d5e41cabb0adfe496a5042f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#pic_center)

### 面试题 16.11. 跳水板

[面试题 16.11. 跳水板原题传送门](https://leetcode-cn.com/problems/diving-board-lcci")

**题目描述**

你正在使用一堆木板建造跳水板。有两种类型的木板，其中长度较短的木板长度为shorter，长度较长的木板长度为longer。你必须正好使用k块木板。编写一个方法，生成跳水板所有可能的长度。

返回的长度需要从小到大排列。

示例 1

```
输入：
shorter = 1
longer = 2

k = 3
输出： [3,4,5,6]
解释：
可以使用 3 次 shorter，得到结果 3；使用 2 次 shorter 和 1 次 longer，得到结果 4 。以此类推，得到最终结果。
```

提示：

```
0 < shorter <= longer
0 <= k <= 100000
```

**解题思路**

排列组合也算比较简单，需要 `k` 个板子，当我们短板有 `i` 个的时候，长板子就是 `k-i` 个，由于题目要求是将结果从小到大进行排序，那么我们起初就尽可能多的取短板子，最后结果就是通过 `[0,k]` 范围内遍历一遍即可。

对于特殊情况，即短板和长板长度相同时，我们只需要返回 `k*len` 即可，不然会重复计算。

```
var divingBoard = function(shorter, longer, k) {
    if(k===0) return []
    if(shorter === longer) return [k*shorter]
    let res = []
    for(let i=k;i>=0;i--){
        let shortCnt = i
        let longCnt = k-i
        let cnt = shortCnt*shorter + longCnt*longer
        res.push(cnt)
    }
    return res
};
```

### 1291\. 顺次数

[1291\. 顺次数原题传送门](https://leetcode-cn.com/problems/sequential-digits")

**题目描述**

我们定义「顺次数」为：每一位上的数字都比前一位上的数字大 1 的整数。

请你返回由 \[low, high\] 范围内所有顺次数组成的 有序 列表（从小到大排序）。

示例 1：

```
输出：low = 100, high = 300
输出：[123,234]
```

示例 2：

```
输出：low = 1000, high = 13000
输出：[1234,2345,3456,4567,5678,6789,12345]
 
```

提示：

```
10 <= low <= high <= 10^9
```

**解题思路**

「顺次数」为：每一位上的数字都比前一位上的数字大 1 的整数。

也就是例如 `1234`这样的数字，然后给你一段区间确定范围。

官方给了枚举方式，反正数据量也不是很大，但是我觉得还是有很多数字没必要枚举，可以直接剪枝掉。我的做法是先求出最小值和最大值对应字符串的长度，即求出我们能枚举的数字的长度范围。

然后我们的起点的最小值从 `1` 开始，起点的最大值从 `10-len` 开始。为什么是 `10-len`？举例说明，示例1给的是 `[100,300]`范围的值，那么可枚举的长度 `len` 为 3，起点的最大值就位 10 - 3 = 7。那么此时顺次数为 `789` 但是不在我们区间范围内，舍弃。然后`8、9`开头的数字就不需要枚举了。 这样，我们就能剪掉一部门数据了。（虽然暴力是永远滴神...）

```
/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
    let res = []
    let lowLen = low.toString().length
    let highLen = high.toString().length
    for(let i=lowLen;i<=highLen;i++){
        for(let j=1;j<=10-i;j++){
            let str = ''
            let num = j
            str += num
            let k = i-1
            while(k--){
                num++
                str += num
            }
            let ans = parseInt(str)
            if(ans>=low && ans<=high){
                res.push(ans)
            }
        }
    }
    return res    
};
```

## 矩阵

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e62290db28694f91a72900fdf776a433~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#pic_center)

### 73\. 矩阵置零

[73\. 矩阵置零原题传送门](https://leetcode-cn.com/problems/set-matrix-zeroes")

**题目描述**

给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。

示例 1:

```
输入: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

示例 2:

```
输入: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

进阶:

```
一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
你能想出一个常数空间的解决方案吗？
```

**解题思路**

用 O(n) 空间复杂度来做，先遍历矩阵，找到等于0的坐标，然后遍历坐标，将对应行和列置为 0 即可

时间复杂度 O(m \* n)

```
var setZeroes = function(matrix) {
    let n = matrix.length
    let m = matrix[0].length
    let arr = []
    for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            if(matrix[i][j] == 0){
                arr.push([i,j])
            }
        }
    }
    while(arr.length){
        let [x,y] = arr.pop()
        for(let i=0;i<n;i++) matrix[i][y] = 0
        for(let j=0;j<m;j++) matrix[x][j] = 0
    }
    return matrix
};
```

另外一种，**原地算法**，空间复杂度 O(1)，我们无需借助外部空间。找到下标为 0 的坐标，然后直接对该行和该列不等于 0 的数字设置为 `-0` 即可。这里巧妙运用了 `JS` 中的 `Object.is()`方法，此时 `0` 和 `-0` 不相等，但是最终返回的矩阵还是为 `0`

```
var setZeroes = function(matrix) {
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[0].length;j++){
            if(Object.is(matrix[i][j],0)){
                // 对行进行操作
                for(let k=0;k<matrix.length;k++)
                    if(!Object.is(matrix[k][j],0) && k!==i) matrix[k][j] = -0
                // 对列进行操作
                for(let k=0;k<matrix[0].length;k++)
                    if(!Object.is(matrix[i][k],0) && k!==j) matrix[i][k] = -0
            }
        }
    }
    return matrix
};
```

### 54\. 螺旋矩阵

[54\. 螺旋矩阵原题传送门](https://leetcode-cn.com/problems/spiral-matrix")

**题目描述**

给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

示例 1:

```
输入:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
输出: [1,2,3,6,9,8,7,4,5]
```

示例 2:

```
输入:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**解题思路**

和 [上一期](https://blog.csdn.net/weixin_42429718/article/details/108535286") 螺旋矩阵差不多，这个是让我么输出，而上次是让我们构造，还是按照螺旋矩阵模拟即可，先从左到右，在从上到下，再从右到左，再从下到上。

不过这里的矩阵行和列不相同了，可能会出现不成环的情况，那么最后会留一列或一行出来，这里借用[大佬](https://leetcode-cn.com/problems/spiral-matrix/solution/shou-hui-tu-jie-liang-chong-bian-li-de-ce-lue-kan-/")一张图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ea8f7bf70e441f982cc92fd6f18426a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 然后我们需要提前跳出去一下，就是避免重复计算，总数够了直接跳出去。注意下面代码 `break`。只能放在那里，因为遍历顺序，如果最后留下一行的话，需要从左到右遍历，此时 `top > bottom` 。如果最后留下一列的话，需要从上到下遍历，此时 `left > right`。

```
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if(!matrix.length) return []
    let n = matrix.length
    let m = matrix[0].length
    let total = n*m
    let top = 0,bottom = n-1
    let left = 0,right = m-1
    let res = []
    while(res.length < total){
        for(let i=left;i<=right;i++) res.push(matrix[top][i]) // 从左到右
        top++
        for(let i=top;i<=bottom;i++) res.push(matrix[i][right]) // 从上到下
        right--
        /* 因为n 和 m 不相同的时候，最后可能会留一列或一行，避免重复计算，总数够了直接跳出去 */
        if(res.length === total) break
        for(let i=right;i>=left;i--) res.push(matrix[bottom][i]) // 从右到左
        bottom--
        for(let i=bottom;i>=top;i--) res.push(matrix[i][left]) // 从下到上
        left++
    }
    return res
};
```

### 59\. 螺旋矩阵 II

[59\. 螺旋矩阵 II原题传送门](https://leetcode-cn.com/problems/spiral-matrix-ii")

**题目描述**

给定一个正整数 n，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

示例:

```
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

**解题思路**

按照螺旋矩阵模拟即可，先从左到右，在从上到下，再从右到左，再从下到上。

每次进行`cur++`操作，直到累加到`total`为止。最后返回二维数组即可（没想到 `js`二维数组也是这样方便...）

```
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    let top = 0, bottom =n-1
    let left = 0, right = n-1
    let res = []
    for(let i=0;i<n;i++) res[i] = []
    let cur = 1, total = n*n
    while(cur<=total){
        for(let i=left;i<=right;i++) res[top][i] = cur++  // 从左到右
        top++
        for(let i=top;i<=bottom;i++) res[i][right] = cur++ // 从上到下
        right--
        for(let i=right;i>=left;i--) res[bottom][i] = cur++ // 从右到左
        bottom--
        for(let i=bottom;i>=top;i--) res[i][left] = cur++ // 从下到上
        left++
    }
    return res
};
```

## 子集

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f5fbae783db41acbd25ee8c7b3dfad8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 46\. 全排列

[46\. 全排列原题传送门](https://leetcode-cn.com/problems/permutations")

**题目描述**

给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

**解题思路**

序列不重复就很简单了，维护一个 `vis`数组，不重复取就好了。

```
var permute = function (nums) {
  let res = [];
  let vis = {};
  let dfs = (t) => {
    if (t.length == nums.length) {
      res.push(t);
    }
    for (let i = 0; i < nums.length; i++) {
      if (vis[i]) continue;
      vis[i] = true;
      t.push(nums[i]);
      dfs(t.slice());
      t.pop();
      vis[i] = false;
    }
  }
  dfs([]);
  return res;
};
```

### 47\. 全排列 II

[47\. 全排列 II原题传送门](https://leetcode-cn.com/problems/permutations-ii")

**题目描述**

给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

```
输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

**解题思路**

本题是求全排列，并且排列不能重复。我们用一个 `vis`数组维护一下，让每一条路线保证不重复选取元素，而对于每一层而言，需要判断相邻元素是否相同，相同的就没必要走了，例如下图中红色三角形部分。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef6ca8a013504d59a995b6b3b33cf132~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 果当前的选项 `nums[i]` ，与同一层的上一个选项 `nums[i - 1]` 相同，且 `nums[i - 1]`有意义（即索引 `>= 0`），且没有被使用过，那就跳过该选项。

因为 `nums[i - 1]`如果被使用过，它会被修剪掉，不是一个选项了，即便它和 `nums[i]`重复，`nums[i]`还是可以选的。

[参考xiao\_ben\_zhu大佬题解](https://leetcode-cn.com/problems/permutations-ii/solution/shou-hua-tu-jie-li-yong-yue-shu-tiao-jian-chong-fe/")

```
var permuteUnique = function(nums) {
    let res = [];
    nums.sort((a,b) => a-b);
    let vis = {};
    let dfs = (t) => {
      if(t.length === nums.length){
        res.push(t);
      }
      for(let i=0;i<nums.length;i++){
        if(i-1>=0 && nums[i] == nums[i-1] && !vis[i-1]) continue;
        if(vis[i]) continue;
        vis[i] = true;
        t.push(nums[i]);
        dfs(t.slice(),i+1);
        t.pop();
        vis[i] = false;
      }
    }
    dfs([],0);
    return res;
};
```

### 78\. 子集

[78\. 子集原题传送门](https://leetcode-cn.com/problems/subsets")

**题目描述**

给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

```
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

**解题思路**

一道组合相关的题目，采用回溯来做即可，题目说明不包含重复元素，于是我们也无需排序然后判断相邻元素是否相等来去重了。

```
var subsets = function(nums) {
  let res = [];
  let dfs = (t,start) => {
    res.push(t);
    for(let i=start;i<nums.length;i++){
      t.push(nums[i]);
      dfs(t.slice(),i+1);
      t.pop();
    }
  }
  dfs([],0);
  return res;
};
```

### 90\. 子集 II

[90\. 子集 II原题传送门](https://leetcode-cn.com/problems/subsets-ii")

**题目描述**

给定一个可能包含重复元素的整数数组 `nums`，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

```
输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```

**解题思路**

本题还是挺有意思的，我们要求的是子集，但是子集要进行去重操作，采用的做法是先对原数组进行排序，那么排序后的数组重复的元素必定是相邻的，然后在遍历解空间树的时候，要做一个去重的操作，当遇到重复出现，也就是和前面相邻元素相同的时候，直接跳过该节点，不让它向下递归。具体示意图如下：

![](https://leetcode-cn.com/problems/subsets-ii/solution/li-jie-li-jie-qu-zhong-cao-zuo-by-jin-ai-yi/")

`dfs`的话，一条路会一直走下去，然后回溯回来，在走之前，`start`是当前层第一个元素，只有当前元素下标大于 `start`才会有重复元素，而对于不同层的重复元素，我们不应该切断，应该继续走，不然就不会有 `[1,2,2]`这样的子集出现了。

```
var subsetsWithDup = function(nums) {
  let res = [];
  nums.sort((a,b)=>a-b);
  let dfs = (t,start) => {
    res.push(t);
    for(let i=start;i<nums.length;i++){
      // 同层重复，跳过
      if(i>start && nums[i-1] == nums[i]) continue;
      t.push(nums[i]);
      dfs(t.slice(),i+1);
      t.pop();
    }
  }
  dfs([],0);
  return res;
};
```

## 递归与回溯

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be726155ff8749d4a13dd1f36b1edfe7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp#pic_center)

### 784\. 字母大小写全排列

[784\. 字母大小写全排列原题传送门](https://leetcode-cn.com/problems/letter-case-permutation")

**题目描述**

给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

示例：

```
输入：S = "a1b2"
输出：["a1b2", "a1B2", "A1b2", "A1B2"]

输入：S = "3z4"
输出：["3z4", "3Z4"]

输入：S = "12345"
输出：["12345"]
 
```

提示：

```
S 的长度不超过12。
S 仅由数字和字母组成。
```

**解题思路**

这道题就是递归操作，没有回溯，是一个挺有意思的题目，在讲解思路之前，我先搬运一下大佬的图解，方便我后续补充。

[参考大佬 liweiwei1419 图解](https://leetcode-cn.com/problems/letter-case-permutation/solution/shen-du-you-xian-bian-li-hui-su-suan-fa-python-dai/")

第一步 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bda7c0a0868442d914e44e7e958e9b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 第二步 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeccab3832da4a0aaed6ef0f034d66bd~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 第三步 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d8428bf39f14fd899b5622803aef6cc~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 第四步

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1eb2cd278b24b68a7c4ef584f5627f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 第五步 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c13eb1af70ca4504b4b9b9a42ef221d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 第六步 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5161fa187ddb4115804728731c7bc02c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 好了，有了上述图解之后（还是感谢大佬的图解，万分感谢orz），我相信明白的已经明白了，如果不明白我继续解释。

此题我们只需要从头往后遍历一遍即可，对于非字母节点，我们只会产生一个分支，而对于字母节点，我们可以产生两个分支，即大写字母和小写字母。（详细请参见下述代码）

于是，我们只要简单搜一遍就可以了。

```
/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
    let res = []
    let dfs = (t,str) => {
        if(t.length === S.length)
            return res.push(t)
        let ch = str[0]
        let nextStr = str.substr(1)
        // 当前位置为数字，只有一个分支
        if(!isNaN(Number(ch))){
            dfs(t+ch,nextStr)
        }else{
            //当前位置为字母，会产生两个分支
            let tmp = ch.toUpperCase()
            if(tmp === ch) tmp = ch.toLowerCase()
            dfs(t+ch,nextStr)
            dfs(t+tmp,nextStr)
        }
    }
    dfs('',S)
    return res
};
```

### 面试题 08.08. 有重复字符串的排列组合

[面试题 08.08. 有重复字符串的排列组合原题传送门](https://leetcode-cn.com/problems/permutation-ii-lcci")

**题目描述**

有重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合。

示例1:

```
 输入：S = "qqe"
 输出：["eqq","qeq","qqe"]
```

示例2:

```
 输入：S = "ab"
 输出：["ab", "ba"]
```

提示:

```
字符都是英文字母。
字符串长度在[1, 9]之间。
```

**解题思路**

全排列，直接用回溯法即可，数据量比较小，暴力完事~

```
var permutation = function (S) {
  let res = new Set()
  let vis = []
  let dfs = (t) => {
    if (t.length === S.length) return res.add(t)
    for (let i = 0; i < S.length; i++) {
      if (vis[i]) continue
      vis[i] = true
      dfs(t + S[i])
      vis[i] = false
    }
  }
  dfs('')
  return [...res]
}
```

### 980\. 不同路径 III

[980\. 不同路径 III原题传送门](https://leetcode-cn.com/problems/unique-paths-iii")

**题目描述**

在二维网格 `grid` 上，有 4 种类型的方格：

`1` 表示起始方格。且只有一个起始方格。 `2` 表示结束方格，且只有一个结束方格。 `0` 表示我们可以走过的空方格。 `-1` 表示我们无法跨越的障碍。 返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。

每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。

示例 1：

```
输入：[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
输出：2
解释：我们有以下两条路径：
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
```

示例 2：

```
输入：[[1,0,0,0],[0,0,0,0],[0,0,0,2]]
输出：4
解释：我们有以下四条路径： 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
```

示例 3：

```
输入：[[0,1],[2,0]]
输出：0
解释：
没有一条路能完全穿过每一个空的方格一次。
请注意，起始和结束方格可以位于网格中的任意位置。
```

提示：

```
1 <= grid.length * grid[0].length <= 20
```

**解题思路**

回溯算法，不过这道题需要我们走完所有空格，所以我们起初遍历的时候需要统计一下空格的数目，然后还有一个注意点就是重点也算是可走的路径的一个点，也需要统计进去，所以代码 `cnt` 值 初始化为 1

接下来就是回溯过程了，写了一个 `check` 函数，进行简单判断剪枝，然后就是往四个方向搜，每走一个格子就将当前格子设置为障碍（即 `-1`），然后搜索完后，回溯时，需要将障碍重设置为空格。

```
/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function(grid) {
    let cnt = 1 // 统计地图中可走的方格个数，包括终点，故初始值为1
    let sx,sy // 记录起点坐标
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j] === 1){
                sx = i
                sy = j
            }
            else if(grid[i][j] === 0){
                cnt++
            }
        }
    }
    return dfs(sx,sy,cnt,grid)
};
// 剪枝条件
let check = (sx,sy,grid) => {
    if(sx<0 || sx>=grid.length || sy<0 || sy>=grid[0].length || grid[sx][sy] == -1) return false
    return true
}

let dfs = (sx,sy,cnt,grid) => {
    if(!check(sx,sy,grid)) return 0
    if(grid[sx][sy] === 2){ // 走到终点时，也要判断一下当前所有空格是否走完
        return cnt === 0 ? 1:0
    }
    let res = 0
    grid[sx][sy] = -1  //走过的空格进行标记，设置为障碍即可
    res += dfs(sx+1,sy,cnt-1,grid)  // 四个方向进行搜索
    res += dfs(sx,sy+1,cnt-1,grid)
    res += dfs(sx-1,sy,cnt-1,grid)
    res += dfs(sx,sy-1,cnt-1,grid)
    grid[sx][sy] = 0  // 回溯过程，不影响后续dfs
    return res
}
```

### 1219\. 黄金矿工

[1219\. 黄金矿工原题传送门](https://leetcode-cn.com/problems/path-with-maximum-gold")

**题目描述**

你要开发一座金矿，地质勘测学家已经探明了这座金矿中的资源分布，并用大小为 `m * n` 的网格 `grid` 进行了标注。每个单元格中的整数就表示这一单元格中的黄金数量；如果该单元格是空的，那么就是 `0`。

为了使收益最大化，矿工需要按以下规则来开采黄金：

每当矿工进入一个单元，就会收集该单元格中的所有黄金。 矿工每次可以从当前位置向上下左右四个方向走。 每个单元格只能被开采（进入）一次。 不得开采（进入）黄金数目为 `0` 的单元格。 矿工可以从网格中 任意一个 有黄金的单元格出发或者是停止。

示例 1：

```
输入：grid = [[0,6,0],[5,8,7],[0,9,0]]
输出：24
解释：
[[0,6,0],
 [5,8,7],
 [0,9,0]]
一种收集最多黄金的路线是：9 -> 8 -> 7。
```

示例 2：

```
输入：grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
输出：28
解释：
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
一种收集最多黄金的路线是：1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7。
```

提示：

```
1 <= grid.length, grid[i].length <= 15
0 <= grid[i][j] <= 100
最多 25 个单元格中有黄金。
```

**解题思路**

这题也是搜索相关，四个方向，不允许重复，不过这次我们需要从不同起点搜索，而且为了减少搜索次数，我们得从黄金数量不为0的点开始搜。然后每当走不下去的时候，就比较一下当前黄金数量，求出最大值即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b531b6c0a9434b7197cf335fdf04644c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

```
/**
 * @param {number[][]} grid
 * @return {number}
 */
var getMaximumGold = function(grid) {
    if(!grid || !grid.length) return 0
    let vis = []
    // 最终收集的最多黄金数量
    let maxGold = 0
    for(let i=0;i<grid.length;i++) vis[i] = []
    // 剪枝条件
    let check = (x,y) => {
        if(x<0 || x>=grid.length || y<0 || y>=grid[0].length || vis[x][y] === 1 || !grid[x][y]) return false
        return true
    }
    let dfs = (x,y,total) => {
        if(check(x,y)){
            vis[x][y] = 1 //防止重复
            dfs(x+1,y,total+grid[x][y]) // 四个方向搜索
            dfs(x,y+1,total+grid[x][y])
            dfs(x-1,y,total+grid[x][y])
            dfs(x,y-1,total+grid[x][y])
            vis[x][y] = 0
        }else{
            // 走到底了，就比较一下当前黄金数量
            maxGold = Math.max(maxGold,total)
        }
    }
    // 起点从非0单元格开始
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j]){
                dfs(i,j,0)
            }
        }
    }
    return maxGold
};
```

### 79\. 单词搜索

[79\. 单词搜索原题传送门](https://leetcode-cn.com/problems/word-search")

**题目描述**

给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

示例:

```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false
```

提示：

```
board 和 word 中只包含大写和小写英文字母。
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3
```

**解题思路**

上一期做了单词搜索2 `hard` 版本之后，这道题也想用字典树玩一玩，没想到超时了，后面一想，数据确实有点大，而且对于一个单词来说，建立一颗字典树岂不是很浪费，还要花时间码代码...

本题也是回溯的思路，不过期间做了一点小优化，还是通过动态更改当前所走的格子，省去了那份 开辟`vis` 数组的空间。

对于递归层次，由于最后一次计算时，层次多算了一次（即多加了一次），所以条件为 `>`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4f7c855b6574ce993f4c4d88e4616b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

```
var exist = function(grid, word) {
  let dfs = (x,y,t) => {
    // 最后一次还会 +1 因此，条件是大于
    if(t > word.length-1){
      return true
    }
    // 剪枝条件
    if(x<0 || x>=grid.length || y<0 || y>=grid[0].length || grid[x][y]!= word[t] || grid[x][y] == '#') return false
    let tmp = grid[x][y]
    // 开始走
    grid[x][y] = '#'
    // 从四个方向搜索，只要一个方向搜索有结果，那么直接返回 true即可
    let res = dfs(x+1,y,t+1) || dfs(x,y+1,t+1) || dfs(x-1,y,t+1) || dfs(x,y-1,t+1)
    if(res) return true
    // 回溯（重置）
    grid[x][y] = tmp
    return false
  }
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){
      if(grid[i][j] == word[0]){
        let res = dfs(i,j,0)
        if(res) return true
      }
    }
  }
  return false
};
```

### 212\. 单词搜索 II

[212\. 单词搜索 II原题传送门](https://leetcode-cn.com/problems/word-search-ii")

**题目描述**

给定一个二维网格 `board` 和一个字典中的单词列表 `words`，找出所有同时在二维网格和字典中出现的单词。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。

示例:

```
输入: 
words = ["oath","pea","eat","rain"] and board =
[
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]

输出: ["eat","oath"]
说明:
你可以假设所有输入都由小写字母 a-z 组成。
```

提示:

```
你需要优化回溯算法以通过更大数据量的测试。你能否早点停止回溯？
如果当前单词不存在于所有单词的前缀中，则可以立即停止回溯。什么样的数据结构可以有效地执行这样的操作？散列表是否可行？为什么？ 前缀树如何？如果你想学习如何实现一个基本的前缀树，请先查看这个问题： 实现Trie（前缀树）。
```

**解题思路**

[参考力扣官网分析：实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/solution/shi-xian-trie-qian-zhui-shu-by-leetcode/")

-   判断是否找到了，通过传递节点的END来判断
    
-   判断是否重复访问，通过动态更改走过的网格点来判断，就不需要再定义一个`vis`数组了
    

[参考大佬：秦时明月字典树建树解法（二）](https://leetcode-cn.com/problems/word-search-ii/solution/212-dan-ci-sou-suo-ii-by-alexer-660/")

```
var findWords = function(grid, words) {
  // 存放最终结果集
  let res = []
  // 字典树节点
  class TrieNode {
    constructor(){
      this.end = false
      this.child = {}
    }
  }
  // 最终形成的字典树根节点
  let root = null
  let Trie = function(){
    root = new TrieNode()
  }
  // 建立字典树
  Trie.prototype.insert = (word) => {
    let cur = root
    for(let i=0;i<word.length;i++){
      if(!cur.child[word[i]]){
        cur.child[word[i]] = new TrieNode()
      }
      cur = cur.child[word[i]]
    }
    cur.end = true
  }
  // 创建根节点
  let trie = new Trie()
  // 进行建树操作
  for(let i=0;i<words.length;i++){
    trie.insert(words[i])
  }
  let dfs = (x,y,t,cur) => {
    if(cur.end){
      res.push(t)
      cur.end = false // 避免重复计算
    }
    // 剪枝条件：1.边界处理 2.下一步是否可走 3.下一步字典树是否可走
    if(x<0 || x>=grid.length || y<0 || y>=grid[0].length || grid[x][y] == '#' || !cur.child[grid[x][y]]) return
    let tmp = grid[x][y]
    grid[x][y] = '#'  // 走
    cur = cur.child[tmp]
    dfs(x+1,y,t+tmp,cur)  // 上下左右四个方向遍历
    dfs(x,y+1,t+tmp,cur)
    dfs(x-1,y,t+tmp,cur)
    dfs(x,y-1,t+tmp,cur)
    grid[x][y] = tmp // 回溯（还原）
  }
  // 对单词表进行全局搜索
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){
      dfs(i,j,'',root)
    }
  }
  return res
};
```

附上完整字典树（前缀树）模板，日后可用~

**在 Trie 树中查找键**

每个键在 `trie` 中表示为从根到内部节点或叶的路径。我们用第一个键字符从根开始，。检查当前节点中与键字符对应的链接。有两种情况：

-   存在链接。我们移动到该链接后面路径中的下一个节点，并继续搜索下一个键字符。
-   不存在链接。若已无键字符，且当前结点标记为 `isEnd`，则返回 `true`。否则有两种可能，均返回 `false` :

还有键字符剩余，但无法跟随 `Trie` 树的键路径，找不到键。 没有键字符剩余，但当前结点没有标记为 `isEnd`。也就是说，待查找键只是`Trie`树中另一个键的前缀。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/431ea3d098804eab88e4cc677c956330~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) **查找 Trie 树中的键前缀**

该方法与在 `Trie` 树中搜索键时使用的方法非常相似。我们从根遍历 `Trie` 树，直到键前缀中没有字符，或者无法用当前的键字符继续 `Trie` 中的路径。与上面提到的“搜索键”算法唯一的区别是，到达键前缀的末尾时，总是返回 `true`。我们不需要考虑当前 `Trie` 节点是否用 `“isend”` 标记，因为我们搜索的是键的前缀，而不是整个键。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20c06dfbfe20496c9ff5747ca8cda21b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

```
var findWords = function(grid, words) {
  // 存放最终结果集
  let res = []
  // 字典树节点
  class TrieNode {
    constructor(){
      this.end = false
      this.child = {}
    }
  }
  // 最终形成的字典树根节点
  let root = null
  let Trie = function(){
    root = new TrieNode()
  }
  // 建立字典树
  Trie.prototype.insert = (word) => {
    let cur = root
    for(let i=0;i<word.length;i++){
      if(!cur.child[word[i]]){
        cur.child[word[i]] = new TrieNode()
      }
      cur = cur.child[word[i]]
    }
    cur.end = true
  }
  // 在 Trie 树中查找键
  let searchPrefix = (word) => {
    let cur = root
    for(let i=0;i<word.length;i++){
      if(cur.child[word[i]]){
        cur = cur.child[word[i]]
      }else{
        return null
      }
    }
    return cur
  }
  Trie.prototype.search = (word) => {
    let cur = searchPrefix(word)
    return cur !== null && cur.end
  }
  // 查找 Trie 树中的键前缀
  Trie.prototype.startsWith = (pre) => {
    return searchPrefix(pre) != null
  }
  // 创建根节点
  let trie = new Trie()
  // 进行建树操作
  for(let i=0;i<words.length;i++){
    trie.insert(words[i])
  }
  let dfs = (x,y,t,cur) => {
    if(cur.end){
      res.push(t)
      cur.end = false // 避免重复计算
    }
    // 剪枝条件：1.边界处理 2.下一步是否可走 3.下一步字典树是否可走
    if(x<0 || x>=grid.length || y<0 || y>=grid[0].length || grid[x][y] == '#' || !cur.child[grid[x][y]]) return
    let tmp = grid[x][y]
    grid[x][y] = '#'  // 走
    cur = cur.child[tmp]
    dfs(x+1,y,t+tmp,cur)  // 上下左右四个方向遍历
    dfs(x,y+1,t+tmp,cur)
    dfs(x-1,y,t+tmp,cur)
    dfs(x,y-1,t+tmp,cur)
    grid[x][y] = tmp // 回溯（还原）
  }
  // 对单词表进行全局搜索
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){
      dfs(i,j,'',root)
    }
  }
  return res
};
```

### 77\. 组合

[77\. 组合原题传送门](https://leetcode-cn.com/problems/combinations")

**题目描述**

给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:

```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

**解题思路**

直接套用组合题解题模板即可

```
var combine = function (n, k) {
  let res = [];
  let dfs = (t, start) => {
    if (t.length === k) {
      res.push(t);
      return;
    }
    for (let i = start; i <= n; i++) {
      t.push(i);
      dfs(t.slice(), i + 1);
      t.pop();
    }
  }
  dfs([], 1);
  return res;
};
```

### 39\. 组合总和

[39\. 组合总和原题传送门](https://leetcode-cn.com/problems/combination-sum")

**题目描述**

给定一个无重复元素的数组 `candidates` 和一个目标数 `target` ，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的数字可以无限制重复被选取。

说明：

```
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
```

示例 1：

```
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
```

示例 2：

```
输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

提示：

```
1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都是独一无二的。
1 <= target <= 500
```

**解题思路**

这道题是组合题，但是这道题有意思的是当前元素可以重复无限制选取，那么我们可以改一下另外一道组合题的思路，下一层也从 `i`开始即可，然后本题元素重复，那么我们不需要进行排序然后剪枝了。

```
// 当前元素可以无限制选取，下一层也从i开始取
dfs(t.slice(),i,sum+candidates[i]); 
```

![](https://leetcode-cn.com/problems/combination-sum/solution/shou-hua-tu-jie-zu-he-zong-he-combination-sum-by-x/")

```
var combinationSum = function(candidates, target) {
  let res = [];
  let dfs = (t,start,sum) => {
    if(sum >= target){ // 防止爆掉
      if(sum === target){
        res.push(t);
      }
      return;
    }
    for(let i=start;i<candidates.length;i++){
      t.push(candidates[i]);
      // 当前元素可以无限制选取，下一层也从i开始取
      dfs(t.slice(),i,sum+candidates[i]); 
      t.pop();
    }
  }
  dfs([],0,0);
  return res;
};
```

### 40\. 组合总和 II

[40\. 组合总和 II原题传送门](https://leetcode-cn.com/problems/combination-sum-ii")

**题目描述**

给定一个数组 `candidates` 和一个目标数 target ，找出 `candidates` 中所有可以使数字和为`target`的组合。

`candidates` 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。 解集不能包含重复的组合。 示例 1:

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

示例 2:

```
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
```

**解题思路**

这道题也是一道组合题，但是这道题数组里面是存在重复元素的，组合题的话，为了更好地去重，我们可以先对数组进行排序，然后对于每一层如果相邻元素相同，就剪掉该分支即可。 ![](https://leetcode-cn.com/problems/combination-sum-ii/solution/man-tan-wo-li-jie-de-hui-su-chang-wen-shou-hua-tu-/")

注意求和那里，如果只判断是否相等的话，可能会出现爆掉情况。

```
var combinationSum2 = function (candidates, target) {
  let res = [];
  candidates.sort((a, b) => a - b);
  let dfs = (t, start, sum) => {
    if (sum >= target) { // 加这外层，超出范围了也终止，防爆栈
      if (sum === target) {
        res.push(t);
      }
      return;
    }
    // 组合
    for (let i = start; i < candidates.length; i++) {
      // 组合元素不能重复，去掉同一层重复的元素
      if (i > start && candidates[i] == candidates[i - 1]) continue;
      t.push(candidates[i]);
      // 组合元素去重，即当前选择和下一层的不能重复
      dfs(t.slice(), i + 1, sum + candidates[i]);
      t.pop();
    }
  }
  dfs([], 0, 0);
  return res;
};
```

### 216\. 组合总和 III

[216\. 组合总和 III原题传送门](https://leetcode-cn.com/problems/combination-sum-iii")

**题目描述**

找出所有相加之和为 `n` 的 `k` 个数的组合。组合中只允许含有 `1 - 9` 的正整数，并且每种组合中不存在重复的数字。

说明：

所有数字都是正整数。 解集不能包含重复的组合。 示例 1:

```
输入: k = 3, n = 7
输出: [[1,2,4]]
```

示例 2:

```
输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]
```

来源：力扣（LeetCode） 链接： 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**解题思路**

首先，还是搬运一下大佬的图解，然后我再来解释一番。 ![](https://leetcode-cn.com/problems/combination-sum-iii/solution/shou-hua-tu-jie-216-zu-he-zong-he-iii-by-xiao_ben_/")

本题需要一层一层来，第一层我们可以有 `i`(1-9)个选择，而第二层的每一个值只有 `i+1`个选择了，因为不能重复。比如你第一次拿了 `2`，在下一次，你只能从 `3`开始拿了，如果还是 `1`的话就会有重复的组合了。这样我们也不用维护 `vis`数组来去重，因为每一层取的值是不一样的。

```
var combinationSum3 = function (k, n) {
  let res = [];
  let dfs = (t, start, sum) => {
    if (t.length === k && sum === n) {
      res.push(t);
    }
    for (let i = start; i < 10; i++) {
      t.push(i);
      dfs(t.slice(), i + 1, sum + i);
      t.pop();
    }
  }
  dfs([], 1, 0);
  return res;
};
```

### 401\. 二进制手表

[401\. 二进制手表原题传送门](https://leetcode-cn.com/problems/binary-watch")

**题目描述**

二进制手表顶部有 4 个 LED 代表 **小时（0-11）**，底部的 6 个 LED 代表 **分钟（0-59）**。

每个 LED 代表一个 0 或 1，最低位在右侧。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10703e3641de4430be4ed602da9e71c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

例如，上面的二进制手表读取 “3:25”。

给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。

示例：

```
输入: n = 1
返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
 
```

提示：

```
输出的顺序没有要求。
小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。
```

**解题思路**

回溯算法，我的解法类似于全排列做法，将10个小灯泡进行排列组合，然后根据 `0` 和 `1` 来判断灯泡是否亮，如果亮了，加上对应二进制，然后将 `0-3`分给小时来计算，将 `4-9`分给分钟来计算，但是要考虑一下，就是可能会出现重复情况，于是用 `Set`数据结构维护一下就好了。

```
var readBinaryWatch = function(num) {
    let res = new Set();
    let vis = new Array(10).fill(0)
    let check = (hour,minutes) => {
      if(hour>=0 && hour<=11 && minutes>=0 && minutes<=59) return true;
      return false;
    }
    let dfs = (t,vis) => {
      if(t==0){
        let hour = vis[0]*1 + vis[1]*2 + vis[2]*4 + vis[3]*8;
        let minutes = vis[4]*1 + vis[5]*2 + vis[6]*4 + vis[7]*8 + vis[8]*16 + vis[9]*32;
        if(check(hour,minutes)){
          let tmp = `${hour}:${minutes >= 10? minutes: '0'+minutes}`;
          res.add(tmp);
        }
      }
      for(let i=0;i<10;i++){
        if(vis[i]) continue;
        vis[i] = 1;
        dfs(t-1,vis);
        vis[i] = 0;
      }
    }
    dfs(num,vis);
    return [...res];
};
```

补充，后面看到有大佬这样做，进行了去重操作，关键点在回溯 `for`循环那里。其实这个相当于全排列了。

```
var readBinaryWatch = function(num) {
    let res = [];
    let vis = new Array(10).fill(0)
    let check = (hour,minutes) => {
      if(hour>=0 && hour<=11 && minutes>=0 && minutes<=59) return true;
      return false;
    }
    let dfs = (t,cnt,vis) => {
      if(t==0){
        let hour = vis[0]*1 + vis[1]*2 + vis[2]*4 + vis[3]*8;
        let minutes = vis[4]*1 + vis[5]*2 + vis[6]*4 + vis[7]*8 + vis[8]*16 + vis[9]*32;
        if(check(hour,minutes)){
          let tmp = `${hour}:${minutes >= 10? minutes: '0'+minutes}`;
          res.push(tmp);
        }
        return;
      }
      for(let i=cnt;i<=10-t;i++){
        if(vis[i]) continue;
        vis[i] = 1;
        dfs(t-1,i+1,vis);
        vis[i] = 0;
      }
    }
    dfs(num,0,vis);
    return res;
};
```

### 37\. 解数独

[37\. 解数独原题传送门](https://leetcode-cn.com/problems/sudoku-solver")

**题目描述**

编写一个程序，通过填充空格来解决数独问题。

一个数独的解法需**遵循如下规则**：

数字 1-9 在每一行只能出现一次。 数字 1-9 在每一列只能出现一次。 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。 空白格用 `'.'` 表示。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1ee26d3924d4add918f366f62adbf3d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 一个数独。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/281ebc894dee4897a4e7e959ce2591bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 答案被标成红色。

提示：

```
给定的数独序列只包含数字 1-9 和字符 '.' 。
你可以假设给定的数独只有唯一解。
给定数独永远是 9x9 形式的。
```

**解题思路**

我们一行一行的放，如果能得到一个解，直接返回 `true`，然后剪枝条件如下述 `check`函数。 ![](https://leetcode-cn.com/problems/sudoku-solver/solution/shou-hua-tu-jie-jie-shu-du-hui-su-suan-fa-sudoku-s/")

```
var solveSudoku = function (board) {
  let check = (x, y, val) => {
    // 一行或者一列有重复元素，剪掉
    for (let i = 0; i < 9; i++) {
      if (board[x][i] == val || board[i][y] == val) return true;
    }
    let xx = Math.floor(x / 3) * 3;
    let yy = Math.floor(y / 3) * 3;
    // 3x3宫格内重复的情况，剪掉
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[xx + i][yy + j] == val) return true;
      }
    }
    return false; // 没有冲突情况
  }
  let dfs = (x, y) => {
    if (y == 9) {
      x++;
      y = 0;
      if (x == 9) return true; // 都填完了，直接返回 true
    }
    if (board[x][y] != '.') return dfs(x, y + 1);
    for (let i = 1; i < 10; i++) {
      if (check(x, y, String(i))) continue;
      board[x][y] = String(i);
      if (dfs(x, y + 1)) return true; // 如果往下走，能够解出数独，直接返回 true
      board[x][y] = '.'; // 回溯，因为往下走得不到一个解
    }
    return false;
  }
  dfs(0, 0);
  return board;
};
```

### 51\. N 皇后

[51\. N 皇后原题传送门](https://leetcode-cn.com/problems/n-queens")

**题目描述**

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99b6f31cf14a4af4b4e69721030d31f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

上图为 8 皇后问题的一种解法。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例：

```
输入：4
输出：[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

提示：

```
皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
```

**解题思路**

对于 n 皇后问题，经典的回溯算法，我们采用一行放一个，然后逐行来放，这样我们就不用在剪枝的时候判断是否同行了。只需要判断是否同列 或者 同一斜线就好了。 ![](https://leetcode-cn.com/problems/n-queens/solution/shou-hua-tu-jie-cong-jing-dian-de-nhuang-hou-wen-t/")

```
var solveNQueens = function(n) {
  let res = [];
  let grid = new Array(n); // 初始化一个地图
  for(let i=0;i<n;i++){
    grid[i] = new Array(n).fill('.');
  }
  // 剪枝条件 
  let check = (x,y)=>{
    for(let i=0;i<x;i++){
      for(let j=0;j<n;j++){
        // 判断同列 或者 同一斜线即可（不需要判断同行是因为一行一行放的，一定不同行）
        if(grid[i][j] == 'Q' && (j == y || i+j == x+y || i-j == x-y) ){
          return true;
        }
      }
    }
    return false;
  }
  let dfs = (t) => {
    if(t === n ){
      let ans = grid.slice(); // 拷贝一份，对输出做处理
      for(let i=0;i<n;i++){
        ans[i] = ans[i].join('');
      }
      res.push(ans);
      return;
    }
    for(let i=0;i<n;i++){
      if(check(t,i)) continue;
      grid[t][i] = 'Q';
      dfs(t+1);
      grid[t][i] = '.';
    }
  }
  dfs(0);
  return res;
};
```

### 131\. 分割回文串

[131\. 分割回文串原题传送门](https://leetcode-cn.com/problems/palindrome-partitioning")

**题目描述**

给定一个字符串 `s`，将 `s` 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。

示例:

```
输入: "aab"
输出:
[
  ["aa","b"],
  ["a","a","b"]
]
```

**解题思路**

借鉴 [zesong-wang-c](https://leetcode-cn.com/problems/palindrome-partitioning/solution/chui-su-fa-jian-dan-jie-ti-chao-qing-xi-tu-li-by-z/") 大佬的图解 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d00f75bd8aa942c0bccea61185dc284c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp) 本题采用回溯思想，看上图基本已经明白，每次进行一次切割，直到切到最后一个元素，然后压入结果集合里，期间对于每次切割的字符串，我们判断一下是否是回文，如果不是，直接减掉即可。

和组合的思想有点类似。

```
// 判断是否是回文
function isPal(str) {
  let len = Math.floor(str.length / 2);
  if (len === 0) {
    return true;
  }
  let add = str.length % 2 === 0 ? 0 : 1;
  let subStr = str.slice(0, len);
  for (let i = 0; i < len; i++) {
    if (subStr[len - i - 1] !== str[len + add + i]) {
      return false;
    }
  }
  return true;
}
var partition = function (s) {
  let res = [];
  let dfs = (cur, start) => {
    // 当前已经到达了最后一个元素
    if (start >= s.length) {
      res.push(cur.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      // 字符串切割
      let str = s.slice(start, i + 1);
      if (str && isPal(str) ) {
        cur.push(str);
        dfs(cur, i + 1);
        // 回溯
        cur.pop();
      }
    }
  }
  dfs([], 0);
  return res;
};
```

### 93\. 复原IP地址

[93\. 复原IP地址原题传送门](https://leetcode-cn.com/problems/restore-ip-addresses")

**题目描述**

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如：`"0.1.2.201" 和 "192.168.1.1"` 是 有效的 IP 地址，但是 `"0.011.255.245"、"192.168.1.312" 和 "192.168@1.1"` 是 无效的 IP 地址。

示例 1：

```
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
```

示例 2：

```
输入：s = "0000"
输出：["0.0.0.0"]
```

示例 3：

```
输入：s = "1111"
输出：["1.1.1.1"]
```

示例 4：

```
输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]
```

示例 5：

```
输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 
```

提示：

```
0 <= s.length <= 3000
s 仅由数字组成
```

**解题思路**

直接看图解，显然要用回溯来做，我的做法是对于当前位置，我们可以有三种选择，选一个，选两个，还有选三个。此时就需要判断一下是不是会出现选出边界的情况。

然后对于我们选择的数字，要判断是否出现前导 0 ，同时也要看一下如果是三位数字的话，是不是会超过 255 。题目不能重复选择，于是用组合思想，免去 `vis` 数组。 ![](https://leetcode-cn.com/problems/restore-ip-addresses/solution/shou-hua-tu-jie-huan-yuan-dfs-hui-su-de-xi-jie-by-/") 图解

```
var restoreIpAddresses = function (s) {
  let res = [];
  let dfs = (cur, start) => {
    if (cur.length == 4 && start>=s.length) {
      res.push(cur.join('.'));
      return;
    }
    if(cur.length == 4 && start != s.length) return;
    for(let k=1;k<=3;k++){
      // 如果取的范围超过了字符串长度，直接剪掉
      if(start+k-1>=s.length) return;
      // 切割字符串
      let str = s.substring(start,start+k);
      if(str.length>=2 && str[0] == 0) return;
      if(str.length>=3 && +str > 255) return;
      cur.push(str);
      dfs(cur.slice(),start+k);
      // 回溯
      cur.pop();
    }
  }
  dfs([], 0);
  return res;
};
```

### 22\. 括号生成

[22\. 括号生成原题传送门](https://leetcode-cn.com/problems/generate-parentheses")

**题目描述**

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：

```
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
```

**解题思路**

这道题，看了大佬的题解，发现真是有意思，现在来解释一下。

我们可以直接走可行的情况，对于不可行的情况，自然就剪掉了。

关键在于左右括号如何选择，首先，对于左括号，起初我们必然是要选的，然后我们也可以全部选完，因此，只要有左括号我们必须选，而对于右括号而言，它的剩余数量必须大于剩余左括号数量，我们才能选右括号。

举个反例，假如我们现在已经有了 `(())`，`n = 3`，然后左右括号都还剩一个，如果理解选 `)`，岂不是就 `(()))`了，显示不是有效的括号，应该被剪掉才是，因此，我们必须严格右括号剩余数量必须大于剩余左括号数量，我们才能选右括号。 ![](https://leetcode-cn.com/problems/generate-parentheses/solution/shou-hua-tu-jie-gua-hao-sheng-cheng-hui-su-suan-fa/") 大佬图解

```
var generateParenthesis = function (n) {
  let res = [];
  let dfs = (cur, left, right) => {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    // 左括号还存在，就可以选左括号
    if (left > 0) dfs(cur + '(', left - 1, right);
    // 右括号数量要大于左括号，才可以选右括号
    if (right > left) dfs(cur + ')', left, right - 1);
  }
  dfs('', n, n);
  return res;
};
```

## 本文参考

-   [前端该如何准备数据结构和算法？](https://juejin.cn/post/6844903919722692621")
-   [写给前端的算法进阶指南，我是如何两个月零基础刷200题](https://juejin.cn/post/6847009772500156429")
-   [(1.8w字)负重前行，前端工程师如何系统练习数据结构和算法？【上】](https://juejin.cn/post/6844904061947346957")
-   leetcode && leetcode各位题解大佬们，感谢你们~

## 结语

❤️关注+点赞+收藏+评论+转发❤️，原创不易，您的支持将会是我最大的动力~

[访问超逸の博客](https://yangchaoyi.vip/")，方便小伙伴阅读玩耍~

最后，祝各位新年快乐，牛年大吉，好运++，在准备春招の你，能够早点结束春招，offer拿到手软，希望我的文章能够帮助到你，我们很快会在下期相遇~

【作者：Chocolate】[](https://juejin.cn/user/2981531267112520/posts")