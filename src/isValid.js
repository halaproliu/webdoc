/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s.length % 2) return false
    let arr = []
    for (let char of s) {
        switch(char) {
            case '(':
            case '[':
            case '{':
                arr.push(char)
                break
            case ')':
                if (arr.pop() !== '(') return false
                break
            case ']':
                if (arr.pop() !== '[') return false
                break
            case '}':
                if (arr.pop() !== '{') return false
                break
        }
    }
    return !arr.length
};

export default isValid
