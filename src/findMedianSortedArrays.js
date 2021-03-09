/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var arr = nums1.concat(nums2);
    arr.sort((a, b) => a - b);
    var len = arr.length;
    var midIndex = Math.ceil(len / 2);
    var mid;
    if (len % 2 === 0) {
        mid = (arr[midIndex - 1] + arr[midIndex]) / 2;
    } else {
        mid = arr[midIndex - 1];
    }
    return mid;
};
