// 数组中重复的数字
function findRepeatNumber(nums) {
    let set = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return nums[i]
        set.add(nums[i])
    }
    return -1
}