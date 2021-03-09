/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!s || !words || !words.length) return [];
    // 匹配字符串对象
    let matches = {}
    // 需要被匹配的字符串个数
    let needs = {}
    let oneWordLen = words[0].length;
    // 需要匹配的字符串，及每个子字符串对应的个数
    for (let w of words) {
        needs[w] ? needs[w]++ : needs[w] = 1;
    }
    // 左指针
    let l = 0
    // 右指针
    let r = 0
    // 匹配words子字符串的个数（非重复）
    let count = 0
    // 需要匹配的字符串个数（非重复）
    let needsKeyLen = Object.keys(needs).length
    // 结果
    let ans = [];
    for (let i = 0; i < oneWordLen; i++) {
        matches = {};
        r = l = i;
        count = 0;
        while (r <= s.length - oneWordLen) {
            let w1 = s.slice(r, r + oneWordLen);
            r += oneWordLen;
            // 当不能完全匹配时，中断匹配，清空对象和count统计
            if (!needs[w1]) {
                matches = {};
                l = r;
                count = 0;
                continue;
            }
            matches[w1] ? matches[w1]++ : matches[w1] = 1;
            // 相同的字符串匹配，count+1
            if (matches[w1] === needs[w1]) count++;
            // 完全匹配
            while (count === needsKeyLen) {
                // 当字符串长度匹配时，储存匹配的下标
                if (r - l === oneWordLen * words.length) ans.push(l);
                let w2 = s.slice(l, l + oneWordLen);
                l += oneWordLen;
                if (needs[w2]) {
                    matches[w2]--;
                    if (matches[w2] < needs[w2]) count--;
                }
            }
        }
    }
    return ans;
};

export default findSubstring
