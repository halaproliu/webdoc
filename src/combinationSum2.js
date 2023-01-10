/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const res = []
    candidates.sort((a, b) => a - b)
    const dfs = (i, sum, ans) => {
        if (sum > target) return
        if (sum === target) {
            res.push([...ans])
        }
        for(; i < candidates.length; i++) {
            sum += candidates[i]
            ans.push(candidates[i])
            dfs(i + 1, sum, ans)
            sum -= candidates[i]
            ans.pop()
            while(candidates[i + 1] === candidates[i]) i++
        }
    }
    dfs(0, 0, [])
    return res
};

// console.log(combinationSum2([10,1,2,7,6,1,5], 8))