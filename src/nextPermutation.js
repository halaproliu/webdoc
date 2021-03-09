function swap (nums, i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]]
}

function reverse(nums, start, end) {
    while (start < end) {
        swap(nums, start, end)
        start++
        end--
    }
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    const len = nums.length

    let i = nums.length - 2
    // 找到第一个右侧数 大于 左侧数的 下标 i
    while (i >= 0 && nums[i + 1] <= nums[i]) {
        i--
    }
    // 如果i < 0 则代表这个数组不存在更大的排列即降序，所以只需要转化为升序即可
    if (i >= 0) {
        let j = nums.length - 1
        // 如果i大于0，则从右到左开始找 第一个大于 i下标数字的 下标 j
        while (j > 0 && nums[j] <= nums[i]) {
            j--
        }
        swap(nums, i, j)
    }
    // 将i下标往后的 数组 进行反序，变成最小排列；因为i往后的子数组一定是降序的
    reverse(nums, i + 1, len - 1)
};

export default nextPermutation
