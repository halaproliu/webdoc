/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let n = nums.length
    let ans = nums[0]
    for (let i = 1; i < nums.length; i++) {
        ans ^= nums[i]
    }
    return ans
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        let count = map.get(nums[i]) || 0
        count++
        map.set(nums[i], count)
    }
    for (let [key, value] of map.entries()) {
        if (value === 1) {
            return key
        }
    }
    return -1
};
