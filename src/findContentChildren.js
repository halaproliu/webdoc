// 分发饼干
function findContentChildren(g, s) {
    g = g.sort((a, b) => a - b)
    s = s.sort((a, b) => a - b)
    let l = 0
    let r = 0
    while(l < g.length && r < s.length) {
        if (g[l] <= s[r]) l++
        r++
    }
    return l
}