import generateParenthesis from '../src/generateParenthesis'
import { isArrayEqual } from '../utils/array'
import { expect } from 'chai'

describe('generateParenthesis', () => {
    it('test n = 3', () => {
        let res = [
            "((()))",
            "(()())",
            "(())()",
            "()(())",
            "()()()"
        ]
        expect(isArrayEqual(generateParenthesis(3), res)).to.equal(true)
    })
})
