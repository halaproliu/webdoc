function longestCommonSuffix (nums) {
    if (!nums.length) return
    if (nums.length === 1) return nums[0]
    let strs = nums.map(num => num.toString())
    let str = strs[0]
    let tmpStrs = strs.slice(1)
    let obj = {}
    let tmp = ''
    let result = ''
    let len = str.length
    for (let i = 0; i < len; i++) {
        let suffix = str.substr(-(i + 1), i + 1)
        tmpStrs.forEach(item => {
            if (item.substr(-(i + 1), i + 1) === suffix) {
                tmp = suffix
            } else {
                obj[suffix] = 0
            }
        })
        if (obj[tmp] !== 0) {
            result = tmp
        }
    }
    return result
}

export default longestCommonSuffix
