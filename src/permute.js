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
