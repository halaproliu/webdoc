import letterCombinations from '../src/letterCombinations'
import { expect } from 'chai'

function isEqual (input, ans) {
    let res = letterCombinations(input)
    for (let i = 0; i < res.length; i++) {
        if (!ans.includes(res[i])) {
            return false
        }
    }
    return true
}

describe('letterCombinations', () => {
    it('test digits = "23", ans = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]', () => {
        let digits = '23'
        let ans = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
        expect(isEqual(digits, ans)).to.equal(true)
    })

    it('test digits = "234", ans = ["adg", "aeg", "afg", "adh", "aeh", "afh", "adi", "aei", "afi", "bdg", "beg", "bfg", "bdh", "beh", "bfh", "bdi", "bei", "bfi", "cdg", "ceg", "cfg", "cdh", "ceh", "cfh", "cdi", "cei", "cfi"]', () => {
        let digits = '234'
        let ans = ["adg", "aeg", "afg", "adh", "aeh", "afh", "adi", "aei", "afi", "bdg", "beg", "bfg", "bdh", "beh", "bfh", "bdi", "bei", "bfi", "cdg", "ceg", "cfg", "cdh", "ceh", "cfh", "cdi", "cei", "cfi"]
        expect(isEqual(digits, ans)).to.equal(true)
    })
})
