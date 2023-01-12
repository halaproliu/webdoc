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

let isValid = function(s) {
    if (s.length % 2 === 1) {
        return false
    }
    let map = new Map([
        [')', '('],
        ['}', '{'],
        [']', '['],
    ])
    let stack = []
    for (let char of s) {
        if (map.has(char)) {
            if (stack.pop() !== map.get(char)) {
                return false
            }
        } else {
            stack.push(char)
        }
    }
    return !stack.length
}

export default isValid
