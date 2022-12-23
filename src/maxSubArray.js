// 最大子数组和
function maxSubArray(nums) {
    let pre = 0
    let res = nums[0]
    for (let i = 0; i < nums.length; i++) {
        pre = Math.max(pre + nums[i], nums[i])
        res = Math.max(res, pre)
    }
    return res
}