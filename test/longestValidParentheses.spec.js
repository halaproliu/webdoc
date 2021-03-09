import longestValidParentheses from '../src/longestValidParentheses'
import { expect } from 'chai'

describe('longestValidParentheses', () => {
    it('s = "(()", max = 2', () => {
        expect(longestValidParentheses('(()')).to.equal(2)
    })

    it('s = ")()())", max = 4', () => {
        expect(longestValidParentheses(')()())')).to.equal(4)
    })

    it('s = "()(())", max = 6', () => {
        expect(longestValidParentheses('()(())')).to.equal(6)
    })
})
