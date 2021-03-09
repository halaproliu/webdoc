/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    let l, r, res = []
    let len = nums.length
    if (len < 4) return []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < len - 2; j++) {
            l = j + 1
            r = len - 1
            if (j - 1 > i && nums[j] === nums[j - 1]) continue;
            while (l < r) {
                let sum = nums[i] + nums[j] + nums[l] + nums[r]
                if (sum === target) {
                    res.push([nums[i], nums[j], nums[l], nums[r]])
                    while (l < r && nums[l] === nums[l + 1]) l++
                    while (l < r && nums[r] === nums[r - 1]) r--
                    l++
                    r--
                } else if (sum < target) {
                    while (nums[l] === nums[l + 1]) l++
                    l++
                } else {
                    while (nums[r] === nums[r - 1]) r--
                    r--
                }
            }
        }
    }
    return res
};

export default fourSum