/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (!strs.length) return ''
    if (strs.length === 1) return strs[0]
    let str = strs[0]
    let tmpStrs = strs.slice(1)
    let obj = {}
    let temp = ''
    let result = ''
    for (let i = 0; i < str.length; i++) {
        let prefix = str.substr(0, i + 1)
        tmpStrs.forEach(item => {
            if (item.substr(0, prefix.length) === prefix) {
                temp = prefix
            } else {
                obj[prefix] = 0
            }
        })
        if (obj[temp] !== 0) {
            result = temp
        }
    }
    return result
};

export default longestCommonPrefix