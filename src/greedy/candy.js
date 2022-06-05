/**
 * @param {number[]} ratings
 * @return {number}
 */
 var candy = function(ratings) {
  let len = ratings.length
  if (len < 2) return len
  let nums = new Array(len).fill(1) 
  for (let i = 1; i < nums.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      nums[i] = nums[i - 1] + 1
    }
  }

  for (let i = len - 1; i > 0; i--) {
    if (ratings[i] < ratings[i - 1]) {
      nums[i - 1] = Math.max(nums[i - 1], nums[i] + 1)
    }
  }
  return nums.reduce((total, val) => total + val)
};