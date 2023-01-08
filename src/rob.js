// 打家劫舍
function rob(nums) {
    if (nums === null || nums.length === 0) return 0
    let len = nums.length
    if (len === 1) return nums[0]
    let dp = []
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }
    return dp[len - 1]
}