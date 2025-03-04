# leetcode算法-组合总和

### 问题描述

给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

***示例 1：***

```js
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

***示例 2：***
```js
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
```

***示例 3：***
```js
输入: candidates = [2], target = 1
输出: []
```

***提示:***

 - 1 <= candidates.length <= 30
 - 1 <= candidates[i] <= 200
 - candidate 中的每个元素都 互不相同
 - 1 <= target <= 500

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum = function(candidates, target) {
    const result = []
    const dfs = (target, combine, idx) => {
        if (idx === candidates.length) return

        if (target === 0) {
            result.push(combine)
            return
        }
        dfs(target, combine, idx + 1)
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx)
        }
    }
    dfs(target, [], 0)
    return result
}
```

### 执行结果

```js
执行用时 : 92ms, 在所有 JavaScript 提交中击败了38.23%的用户
内存消耗 : 44.6MB, 在所有 JavaScript 提交中击败了6.61%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 92ms  |  44.6MB |
