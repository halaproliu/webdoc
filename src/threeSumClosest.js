/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let l, r, diff, sum = 0, ans
    let len = nums.length
    if (len < 3) return null
    // 先进行排序
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len; i++) {
        l = i + 1
        r = len - 1
        while (l < r) {
            // 求和
            sum = nums[i] + nums[l] + nums[r]
            if (sum === target) {
                return sum
            } else if (sum < target) {
                while (nums[l] === nums[l + 1]) l++
                l++
            } else {
                while (nums[r] === nums[r - 1]) r--
                r--
            }

            // 获取当前和于目标值的差值
            let currDiff = Math.abs(sum - target)
            if (!diff || currDiff < diff) {
                diff = currDiff
                ans = sum
            }
        }
    }
    return ans
};

export default threeSumClosest
