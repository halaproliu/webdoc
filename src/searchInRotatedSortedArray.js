/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
  let len = nums.length
  if (len === 0) {
      return -1
  }
  if (len === 1) {
      return nums[0] === target ? 0 : -1
  }
  let l = 0, r = len - 1
  while (l <= r) {
      let pivot = Math.floor((l + r) / 2)
      if (nums[pivot] === target) {
        return pivot
      }
      if (nums[0] <= nums[pivot]) {
          if (nums[0] <= target && target < nums[pivot]) {
              r = pivot - 1
          } else {
              l = pivot + 1
          }
      } else {
          if (nums[pivot] < target && target <= nums[len - 1]) {
              l = pivot + 1
          } else {
              r = pivot - 1
          }
      }
  }
  return -1
};