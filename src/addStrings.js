/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    let i = num1.length - 1
    let j = num2.length - 1
    let carry = 0
    const ans = []
    while(i >= 0 || j >= 0 || carry !== 0) {
        let x = i >= 0 ? num1.charAt(i) - '0' : 0
        let y = j >= 0 ? num2.charAt(j) - '0' : 0
        let sum = x + y + carry
        ans.push(sum % 10)
        carry = Math.floor(sum / 10)
        i -= 1
        j -= 1
    }
    return ans.reverse().join('')
};

export default addStrings