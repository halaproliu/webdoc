// 斐波那契数列
var fib = function(n) {
    if (n < 2) {
        return n
    }
    let p = 0, q = 0, r = 1
    for (let i = 2; i <= n; ++i) {
        p = q
        q = r
        r = p + q
    }
    return r
}

function fib(n) {
    if (n < 2) return n
    return fib(n - 1) + fib(n - 2)
}