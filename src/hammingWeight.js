// 位1的个数
// n & (n - 1)即是把二进制位中最低位的1变为0之后的结果，因此计算位1的个数就是不断重复这个的过程
var hammingWeight = function(n) {
    let ret = 0;
    while (n) {
        n &= n - 1;
        ret++;
    }
    return ret;
};