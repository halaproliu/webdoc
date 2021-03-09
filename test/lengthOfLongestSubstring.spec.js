import lengthOfLongestSubstring from '../src/lengthOfLongestSubstring'
import { expect } from 'chai'

describe('lengthOfLongestSubstring', () => {
    it('longestPalindrome test abcabcbb', () => {
        expect(lengthOfLongestSubstring('abcabcbb')).to.equal(3)
    })

    it('lengthOfLongestSubstring test bbbbb', () => {
        expect(lengthOfLongestSubstring('bbbbb')).to.equal(1)
    })

    it('lengthOfLongestSubstring test pwwkew', () => {
        expect(lengthOfLongestSubstring('pwwkew')).to.equal(3)
    })
})
