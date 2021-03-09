/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
    const len = A.length
    if (len === 0) return []
    function move (A, B, C) {
        if (C.length === len) return
        while (A.length > 1) {
            B.unshift(A.pop())
        }
        C.push(A.pop())
        move(B, A, C)
    }
    move(A, B, C)
    return C
};

export default hanota
