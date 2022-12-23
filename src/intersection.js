// 两个数组的交集
function intersection(nums1, nums2) {
    const set1 = new Set(nums1)
    const set2 = new Set(nums2)
    const intersection = new Set()
    if (set1.size > set2.size) {
        for (let num of set2) {
            if (set1.has(num)) {
                intersection.add(num)
            }
        }
    } else {
        for (let num of set1) {
            if (set2.has(num)) {
                intersection.add(num)
            }
        }
    }
    return [...intersection]
}