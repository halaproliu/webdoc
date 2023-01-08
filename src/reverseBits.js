// 颠倒二进制位
function reverseBits(n) {
    let rev = 0;
    for (let i = 0; i < 32 && n > 0; ++i) {
        rev |= (n & 1) << (31 - i)
        n >>>= 1
    }
    return rev >>> 0
}