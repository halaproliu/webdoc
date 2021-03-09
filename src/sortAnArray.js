/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    return nums.sort((a, b) => b - a)
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    if (nums.length <= 1) return nums
    var pivotIndex = ~~(nums.length / 2)
    var pivot = nums.splice(pivotIndex, 1)[0]
    var left = []
    var right = []
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] < pivot) {
            left.push(nums[i])
        } else {
            right.push(nums[i])
        }
    }
    return sortArray(left).concat([pivot], sortArray(right))
};
