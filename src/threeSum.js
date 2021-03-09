/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let l, r, res = []
    let arr = nums.sort((a, b) => a - b)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) break
        if(arr[i] === arr[i - 1]) continue
        l = i + 1
        r = arr.length - 1
        while (l < r) {
            let sum = arr[i] + arr[l] + arr[r]
            if (sum === 0) {
                res.push([arr[i], arr[l], arr[r]])
                while (arr[l] === arr[l + 1]) l++
                l++
            } else if (sum > 0) {
                r--
            } else if (sum < 0) {
                l++
            }
        }
    }
    return res
};

export default threeSum
