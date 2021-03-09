import strStr from '../src/strStr'
import { expect } from 'chai'

describe('strStr', () => {
    it('test haystack = "hello", needle = "ll"', () => {
        expect(strStr('hello', 'll')).to.equal(2)
    })

    it('test haystack = "aaaaa", needle = "bba"', () => {
        expect(strStr('aaaaa', 'bba')).to.equal(-1)
    })

    it('test haystack = "aaaaa", needle = ""', () => {
        expect(strStr('aaaaa', '')).to.equal(0)
    })
})
