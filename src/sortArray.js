/*
 * @Author: liuwenjian
 * @Date: 2022-12-09 10:26:54
 * @LastEditors: liuwenjian
 * @LastEditTime: 2022-12-23 13:29:14
 * @FilePath: /webdoc/src/sortArray.js
 * @Description: 
 */
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
    for (let i = 0; i < nums.length; i++) {
        let curr = nums[i]
        let j = i
        while(j > 0 && curr < nums[j - 1]) {
            nums[j] = nums[j - 1]
            j--
        }
        nums[j] = curr
    }
    return nums
};
