function merge (nums1, m, nums2, n) {
    let p = m + n - 1
    let p1 = m - 1
    let p2 = n - 1
    while (p2 >= 0) {
        if(p1 < 0){
            nums1[p--] = nums2[p2--]
            continue
        }
        nums1[p--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--]
    }
}

export default merge
