/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max = 0
    let left = 0
    let right = height.length - 1
    while (left < right) {
        let current = (right - left) * Math.min(height[left], height[right])
        max = current > max ? current : max
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return max
};
