/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const numberOfSubarrays = (nums, k) => {
    let n = nums.length, counts = new Array(n+1).fill(0).fill(1, 0, 1), oddCount = 0, result = 0
    for (let i = 0; i < n; i++) {
        oddCount += nums[i] & 1
        result += oddCount >= k ? counts[oddCount - k] : 0
        counts[oddCount] += 1
    }
    return result
}

export default numberOfSubarrays
