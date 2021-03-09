/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var violence = function(nums, target) { // 空间复杂度O(n2)
  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j <= nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return []
}

var hashmap = function(nums, target) { // 空间复杂度O(n)
  const hash = {}

  for (let index = 0; index < nums.length; index++) {
    const currentNum = nums[index]
    if (hash[target - currentNum] !== void 0) {
      return [hash[target - currentNum], index]
    }
    hash[currentNum] = index
  }
}



module.exports = {
  violence,
  hashmap
}
