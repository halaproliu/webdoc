/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let len = nums.length
    let maxPosition = 0
    let steps = 0
    let end = 0
    for (let i = 0; i < len - 1; i++) {
        maxPosition = Math.max(maxPosition, i + nums[i])
        if (i === end) {
            end = maxPosition
            steps++
        }
    }
    return steps
};