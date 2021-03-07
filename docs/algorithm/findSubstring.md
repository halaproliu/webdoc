# leetcode算法-30-串联所有单词的子串

### 问题描述

给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

 

***示例 1：***

```js
输入：
  s = "barfoothefoobarman",
  words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
输出的顺序不重要, [9,0] 也是有效答案。
```

***示例 2：***

```js
输入：
  s = "wordgoodgoodgoodbestword",
  words = ["word","good","best","word"]
输出：[]
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

### 求解

使用滑动窗口算法

- 先遍历words数组，计算出需要匹配的非重复字符串数量，使用needs对象储存
- 由于每个子字符串的长度相同，所以取第一个子字符串的长度oneWordLen
- 移动r指针，每次移动oneWordLen长度，一旦匹配则储存在matches对象中
- 接着判断matches指定字符串是否和needs对象中对应字符串的个数是否相同，相同则count++
- 然后判断count是否等于needs中元素个数，若是，则判断r-l是否等于所有子字符串的长度综合，若是则储存答案下标
- 接着移动l指针，减小matches值和count值，继续寻找其他答案

```js
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
```

### 执行结果

```js
执行用时 : 116ms, 在所有 JavaScript 提交中击败了85.34%的用户
内存消耗 : 45.3MB, 在所有 JavaScript 提交中击败了100.00%的用户
```

| 提交结果 | 执行用时 | 内存消耗 |
|:------:|:------:|:-------:|
|   通过  | 116ms  |  45.3MB |


