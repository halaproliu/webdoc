/*
 * @Author: liuwenjian
 * @Date: 2022-12-23 10:23:15
 * @LastEditors: liuwenjian
 * @LastEditTime: 2022-12-23 10:23:24
 * @FilePath: /webdoc/src/firstUniqChar.js
 * @Description: 
 */
var firstUniqChar = function(s) {
    const position = new Map()
    const n = s.length
    for (let [i, ch] of Array.from(s).entries()) {
        if (position.has(ch)) {
            position.set(ch, -1)
        } else {
            position.set(ch, i)
        }
    }
    let first = n
    for (let pos of position.values()) {
        if (pos !== -1 && pos < first) {
            first = pos
        }
    }
    if (first === n) {
        return -1
    }
    return first
}