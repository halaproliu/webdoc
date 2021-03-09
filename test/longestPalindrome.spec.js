import longestPalindrome from '../src/longestPalindrome'
import { expect } from 'chai'

describe('longestPalindrome', () => {
    it('longestPalindrome test aabbcbbdd', () => {
        expect(longestPalindrome('aabbcbbdd')).to.equal('bbcbb')
    })

    it('longestPalindrome test cdaajksbb', () => {
        expect(longestPalindrome('cdaajksbb')).to.equal('bb')
    })
})