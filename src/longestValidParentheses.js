/**
 * @param {string} s
 * @return {number}
 */
// var longestValidParentheses = function(s) {
//     let max = 0
//     let len = s.length
//     let stack = [-1]
//     for (let i = 0; i < len; i++) {
//         if (s[i] === '(') {
//             stack.push(i)
//         } else {
//             stack.pop()
//             if (stack.length) {
//                 max = Math.max(max, i - stack[stack.length - 1])
//             } else {
//                 stack.push(i)
//             }
//         }
//     }
//     return max
// }

var longestValidParentheses = s => {
    let maxLen = 0
    const len = s.length
    const dp = new Array(len).fill(0)
    for (let i = 1; i < len; i++) {
        if (s[i] == ')') {
            if (s[i - 1] == '(') {
                if (i - 2 >= 0) {
                    dp[i] = dp[i - 2] + 2
                } else {
                    dp[i] = 2
                }
            } else if (s[i - dp[i - 1] - 1] == '(') {
                if (i - dp[i - 1] - 2 >= 0) {
                    dp[i] = dp[i - 1] + 2 + dp[i - dp[i - 1] - 2]
                } else {
                    dp[i] = dp[i - 1] + 2
                }
            }
        }
        maxLen = Math.max(maxLen, dp[i])
    }
    return maxLen
}

export default longestValidParentheses
